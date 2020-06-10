define(function (require, exports, module) {

    // Usage
    // -----------------------------
    // var Http = require('U/http');
    // Http.ajax({
    //     data: { user_phone: 13800138005, password: 123123},
    //     url: '/app/user/login.do',
    //     success: function(ret){},
    //     error: function(err){},
    // });

    var MD5 = require('U/md5'); // MD5('string')
    var Ksort = require('U/ksort'); // Ksort(object)
    var UserInfo = _g.getLS('UserInfo');
    var sessionKey = _g.getLS('SessionKey');

    function Http() {
        this._opts = {
            // 接口版本号
            apiVersions: 'v1',
            // app版本号
            appVersion: api ? api.appVersion : '0.0.0',
            // 设备唯一标识
            deviceCode: api ? api.deviceId : 'developer',
            // 平台标识
            platform: api ? (function () {
                if (api.systemType === 'android') return 1;
                else if (api.systemType === 'ios') return 2;
                else if (api.systemType === 'web') return 0;
            })() : 0,
            // 接口请求参数 Json格式，如果无值，可留空或直接传递{}
            data: {},
            // 当前登录SESSIONKEY，登录时由接口返回，如果没有，则留空
            sessionKey: sessionKey,
            // 用户id，当前登录的用户id，登录时由接口返回，如果没有，则留空
            // user_id: (UserInfo && UserInfo.user_id) ? UserInfo.user_id : 0,
            // 10位时间戳
            timestamp: Number(new Date().getTime().toString().substring(0, 10)),
            // MD5加密串
            token: _g.getLS('tocken') || ""
        };
        // this._opts = {
        //     // 接口版本号
        //     apiVersions: 'v1',
        //     // app版本号
        //     appVersion: api ? api.appVersion : '0.0.0',
        //     // 设备唯一标识
        //     deviceCode: api ? api.deviceId : 'developer',
        //     // sessionKey
        //     sessionKey: sessionKey || '',
        //     // 平台标识
        //     platform: api ? (function () {
        //         if (api.systemType === 'android') return 1;
        //         else if (api.systemType === 'ios') return 2;
        //         else if (api.systemType === 'web') return 0;
        //     })() : 0,
        //     // 10位时间戳
        //     timestamp: (new Date()).getTime() / 1000,
        // };

        this.isLock = false;
    }

    Http.prototype = {
        jsonToPostDataStr: function (json) {
            // var PostDataStr = '';
            // for (var i in json) {
            //     if (i == 'data') {
            //         PostDataStr += i + '=' + JSON.stringify(json[i]) + '&';
            //     } else {
            //         PostDataStr += i + '=' + json[i] + '&';
            //     }
            // }
            // return PostDataStr == '' ? PostDataStr : PostDataStr.slice(0, -1);
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(JSON.stringify(json));
            return json;
        },
        fetchToken: function (postData) {
            return MD5(this.jsonToPostDataStr(Ksort(postData)));
            return postData;
        },
        fetchPostData: function (data) {
            // this.update();
            // var postData = $.extend(true, {}, this._opts);
            // postData.data = $.extend(true, {}, data);
            // postData.token = this.fetchToken(postData);
            // return postData;
            this.update();
            var postData = $.extend(true, {}, this._opts);
            // postData.data = Ksort($.extend(true, {}, data));
            _.each(data, function (value, key) {
                postData[key] = value;
            });
            postData.timestamp = Math.round(new Date().getTime() / 1000);
            postData.token = this.fetchToken(postData);
            return postData;
        },
        imgUpload: function (opts) {
            if (['none', 'unknown'].indexOf(api.connectionType) > -1) {
                return
            }
            var startTime = new Date().getTime();
            _g.setLS('LastTime', startTime);
            var self = this;
            if (self.isLock) return;
            if (!opts.data || !opts.url) return;
            // var postData = self.fetchPostData(opts.data);
            var postData = opts.data;
            if (opts.lock !== false) self.lock();
            if (opts.isSync) _g.showProgress();
            if (opts.url == '/admin/users/logout' || opts.url ==  '/admin/Upload') {
                var url = CONFIG.HOST.replace('/api', '') + opts.url;
            } else {
                var url = CONFIG.HOST.replace('/api', '') + opts.url;
            }
            if (opts.isFile) {
                var data = {
                    files: opts.data
                };
            } else {
                // var data = {
                //     values: postData
                // };
                var data =opts.data;
            }
            var headers = {
                // 'token': _g.getLS('SessionKey') + '%' + btoa((new Date()).getTime()),
                'Content-Type':"multipart/form-data",
                "version":"3",
                "type":"1",
                "token":_g.getLS('tocken')
            };
            api && api.ajax({
                headers: headers,
                url: "http://39.99.222.188:8888"+url,
                // url: "http://192.168.31.31:8888/"+url,
                method: opts.method || 'post',
                timeout: 60 * 30,
                dataType: 'json',
                returnAll: false,
                data:{
                  body:data
                }
            }, function (ret, err) {
                // console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvv");
                console.log(JSON.stringify(ret));

                self.unlock();
                window.isLoading = false;
                if (window.isSetPullDownRefresh) _g.refreshDone();
                if (opts.isSync) {
                    setTimeout(function () {
                        _g.hideProgress();
                    }, 200);
                }

                if (ret) {
                    ret.code = parseInt(ret.code);
                    // console.log(JSON.stringify(ret));
                    if (ret.code != 200) {
                      // ret.code = parseInt(ret.error.split('::')[0]);
                      // ret.message = ret.error.split('::')[1];

                    }
                    if (ret.code === 9999) {
                        _g.rmLS('UserInfo');
                        _g.rmLS('SessionKey');
                        return;
                    }
                    if ([200,50002,1007,3003].indexOf(ret.code) < 0) {
                        // _g.toast(ret.message);
                        _g.hideProgress();
                    }
                    setTimeout(function () {
                        opts.success && opts.success(ret);
                    }, 0);
                } else {
                    // _g.toast('错误接口：'+opts.url+'，错误码：'+err.code+'，错误信息：'+err.msg+'，网络状态码：'+err.statusCode);
                    _g.toast('网络连接失败, 请检查网络!');
                    _g.hideProgress();
                    opts.error && opts.error(err);
                }
            });
        },
        ajax: function (opts) {
            if (['none', 'unknown'].indexOf(api.connectionType) > -1) {
                return
            }
            var startTime = new Date().getTime();
            _g.setLS('LastTime', startTime);
            var self = this;
            if (self.isLock) return;
            if (!opts.data || !opts.url) return;
            // var postData = self.fetchPostData(opts.data);
            var postData = opts.data;
            if (opts.lock !== false) self.lock();
            if (opts.isSync) _g.showProgress();

            if (opts.isFile) {
                var data = {
                    files: opts.data
                };
            } else {
                // var data = {
                //     values: postData
                // };
                var data =opts.data;
            }
            var headers = {
                // 'token': _g.getLS('SessionKey') + '%' + btoa((new Date()).getTime()),
                'Content-Type':"application/json",
                "version":"3",
                "type":"1",
                "token":_g.getLS('tocken')
            };
            if (opts.url == '/admin/users/logout' || opts.url ==  '/admin/Upload') {
                var url = CONFIG.HOST.replace('/api', '') + opts.url;
            } else {
                var url = CONFIG.HOST.replace('/api', '') + opts.url;
            }
            api && api.ajax({
                headers: headers,
                url: "http://39.99.222.188:8888"+url,
                // url: "http://192.168.31.31:8888/"+url,
                method: opts.method || 'post',
                timeout: 60 * 20,
                dataType: 'json',
                returnAll: false,
                data:{
                  body:data
                }
            }, function (ret, err) {
                // console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvv");
                console.log(JSON.stringify(ret));

                self.unlock();
                window.isLoading = false;
                if (window.isSetPullDownRefresh) _g.refreshDone();
                if (opts.isSync) {
                    setTimeout(function () {
                        _g.hideProgress();
                    }, 200);
                }

                if (ret) {
                    ret.code = parseInt(ret.code);
                    // console.log(JSON.stringify(ret));
                    if (ret.code != 200) {
                      // ret.code = parseInt(ret.error.split('::')[0]);
                      // ret.message = ret.error.split('::')[1];

                    }
                    if (ret.code === 9999) {
                        _g.rmLS('UserInfo');
                        _g.rmLS('SessionKey');
                        return;
                    }

                    if (ret.message == '版本号过低，需要更新') {
                      api.confirm({
                          title: '提示',
                          msg: '请前往更新app',
                          buttons: ['确定']
                      }, function(ret, err) {
                          var index = ret.buttonIndex;
                          api.closeWidget({
                            silent: true
                          });
                      });

                    }
                    // if (ret.code === 4005 || ret.code === 4001 || ret.code === 4006) {
                    //     _g.rmLS('UserInfo');
                    //     _g.rmLS('SessionKey');
                    //     api.alert({
                    //         title: '提示',
                    //         msg: ret.message
                    //     }, function (ret, err) {
                    //         if (_g.getLS('openMeFlag')) {
                    //             _g.execScript({
                    //                 winName: 'main-index-win',
                    //                 frameName: 'me-index-frame',
                    //                 fnName: 'logout'
                    //             });
                    //         }
                    //         _g.execScript({
                    //             winName: _g.getLS('rootWinName'),
                    //             fnName: 'logoutSuc'
                    //         });
                    //         _g.execScript({
                    //             winName: 'root',
                    //             fnName: 'reloadApp'
                    //         });
                    //     });
                    //     return;
                    // }
                    if ([200,50002,1007,3003].indexOf(ret.code) < 0) {
                        _g.toast(ret.message);
                        _g.hideProgress();
                    }
                    setTimeout(function () {
                        opts.success && opts.success(ret);
                    }, 0);
                } else {
                    // _g.toast('错误接口：'+opts.url+'，错误码：'+err.code+'，错误信息：'+err.msg+'，网络状态码：'+err.statusCode);
                    _g.toast('网络连接失败, 请检查网络!');
                    _g.hideProgress();
                    opts.error && opts.error(err);
                }
            });
        },
        lock: function () {
            this.isLock = true;
        },
        unlock: function () {
            this.isLock = false;
        },
        update: function () {
            var UserInfo = _g.getLS('UserInfo');
            var sessionKey = _g.getLS('SessionKey');
            this._opts.sessionKey = sessionKey || '';
        }
    };

    Http.prototype.constructor = Http;

    module.exports = new Http();

});
