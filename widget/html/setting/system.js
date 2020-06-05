define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var Http = require('U/http');
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('setting/system_view'),
        data: {
            language: LANGUAGE,
            isSlide: false,
            isTriangle: false,
            isSwitch: false,
            list: [{
                title:'English',
                type:'EN',
                id:0,
                isActive:true
            },{
                title:'繁體',
                type:'CN',
                id:1,
                isActive:false
            }],
            activeIndex: 0,
            showmessage:false,
        },
        mounted: function(){
            var self = this;
            _.each(this.list, function(item, index) {
                if (item.type == _g.getLS('LANGUAGE')) {
                    self.activeIndex = index;
                }
            });
        },
        filters: {

        },
        methods: {
            //点击展示下拉框事件
            onToggleTap: function() {
                main.isSlide = !main.isSlide;
                main.isTriangle = !main.isTriangle;
            },
            //点击切换开关事件
            onSwithTap: function() {
                main.isSwitch = !main.isSwitch;
            },
            //点击切换语言事件
            onToggleLanguageTap: function(index) {
                var item = main.list[index];



                if(item.type == _g.getLS('LANGUAGE')) return;
                _g.setLS('LANGUAGE', item.type);
                _g.execScript({
                    winName: 'root',
                    fnName: 'reloadApp'
                });
            },
            // 点击跳转account info页面
            onAccountInfoTap: function() {
                _g.openWin({
                    header: {
                        title: LANGUAGE.setting_account_title
                    },
                    bounces: true,
                    slidBackEnabled: false,
                    name: 'account-info',
                    url: '../setting/account_frame.html',
                })
            },
            // 点击跳转termofuse页面
            onTermOfUse: function() {
                _g.openWin({
                    header: {
                        title: "Setting"
                    },
                    bounces: true,
                    slidBackEnabled: false,
                    name: 'setting-termofuse',
                    url: '../setting/termofuse_frame.html',
                })
            },
            // 点击跳转statement页面
            onStatement: function() {
                _g.openWin({
                    header: {
                        title: "Setting"
                    },
                    bounces: true,
                    slidBackEnabled: false,
                    name: 'setting-statement',
                    url: '../setting/statement_frame.html',
                })
            },
            // 点击跳转termCondition页面
            ontermCondition: function() {
                _g.openWin({
                    header: {
                        title: "Setting"
                    },
                    bounces: true,
                    slidBackEnabled: false,
                    name: 'setting-termCondition',
                    url: '../setting/termCondition_frame.html',
                })
            },
            // 点击跳转aboutus页面
            onaboutus: function() {
                _g.openWin({
                    header: {
                        title: "Setting"
                    },
                    bounces: true,
                    slidBackEnabled: false,
                    name: 'setting-aboutus',
                    url: '../setting/aboutus_frame.html',
                })
            },
            // 弹窗信息的开关
            onopenmsg: function() {
                this.showmessage=true;
            },
            onclosemsg: function() {
                this.showmessage=false;
            },
            onLogout: function() {
              var that =this
              Http.ajax({
                  data: {
                  	"token":_g.getLS("tocken"),
                  	"userId":_g.getLS("userId")
                  },
                  url: '/api/user/logout',
                  isSync: false,
                  lock: false,
                  success: function(ret) {
                    _g.execScript({
                        winName: 'root',
                        fnName: 'reloadApp'
                    });
                    this.showmessage=false;
                    _g.rmLS('UserType');
                    _g.rmLS('userAccount');
                    _g.rmLS('userId');
                    _g.rmLS('userName');
                    _g.rmLS('phone');
                    _g.rmLS('email');
                    _g.rmLS('company');
                    _g.rmLS('roleId');
                    _g.rmLS('userStatus');
                    _g.rmLS('ifNotify');
                    _g.rmLS('customCode');
                    _g.rmLS('truckSN');
                    _g.rmLS('tocken');

                  },
                  error: function(err) {
                    alert("faild")
                  }
                });
                this.showmessage=false;
            },
        }

    });

    var _page = {
        openPage: function() {

        },
    };

    (function() {

    })();
    module.exports = {};
});
