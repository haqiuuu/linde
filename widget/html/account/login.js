define(function (require, exports, module) {
    var Http = require('U/http');
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('account/login_view'),
        data: {
            form: {
                account:'',
                password: '',
            },
            tips: {
                account:'',
                password: '',
            },
            language: LANGUAGE,
            globalTips: '',
            isSubmit: false,
            loading: false,
            validator: {
                account: function (value) {
                    if (!value) {
                        return LANGUAGE.account_login_account_tip;
                    }
                    return true;
                },
                password: function (value) {
                    if (!value) {
                        return LANGUAGE.account_login_password_tip;
                    }
                    return true;
                },
            },
        },
        created: function () {

        },
        filters: {

        },
        methods: {
            onChangeValueInput: function (event, field) {
                this.form[field] = event.target.value;
            },
            // 校检
            validate: function (fn) {
                if (this.loading) {return;}
                this.isSubmit = false;
                var self = this;
                var successCount = _.keys(this.validator).reduce(function (tol, cur) {
                    return tol + self.dataValidation(cur);
                }, 0);
                console.log(successCount, 'successCount');
                if (successCount == _.keys(this.validator).length) {
                    this.isSubmit = true;
                    fn && fn();
                }
            },
            // 验证数据
            dataValidation: function (field) {
                if (this.isSubmit) {return;}
                this.globalTips = '';
                var result = this.validator[field](this.form[field]);
                if (typeof result === 'boolean') {
                    this.tips[field] = '';
                    return 1;
                } else {
                    this.tips[field] = result;
                    return 0;
                }
            },
            // 提交
            onSubmitTap: function () {
                var self = this;
                var account =this.form.account;
                var password = this.form.password;
                Http.ajax({
                	data: {
                    "userAccount":account,
                    "password":password
                  },
                	url: '/api/user/login',
                	isSync: true,
                	lock: true,
                	success: function(ret) {
                    if(ret.result == true){
                      _g.setLS('UserType', ret.data.roleId);
                      _g.setLS('userAccount', ret.data.userAccount);
                      _g.setLS('userId', ret.data.userId);
                      _g.setLS('userName', ret.data.userName);
                      _g.setLS('phone', ret.data.phone);
                      _g.setLS('email', ret.data.email);
                      _g.setLS('company', ret.data.company);
                      _g.setLS('roleId', ret.data.roleId);
                      _g.setLS('userStatus', ret.data.userStatus);
                      _g.setLS('ifNotify', ret.data.ifNotify);
                      // _g.setLS('createTime', res.data.);
                      // _g.setLS('updateTime', res.data.);
                      _g.setLS('customCode', ret.data.customCode);
                      _g.setLS('truckSN', ret.data.truckSN);
                      _g.setLS('tocken', ret.data.token);
                      _g.execScript({
                          winName: 'root',
                          fnName: 'reloadApp'
                      });
                    }

                  },
                	error: function(err) {
                    alert("faild")
                    console.log(JSON.stringify(err))
                  }
                });
                self.validate(function () {
                    this.loading = true;
                });

            },
            // 跳转注册
            onEnterRegisterTap: function () {
                _g.openWin({
                    header: {
                        title: LANGUAGE.account_title
                    },
                    customHeader: _g.getTemplate('../baseWin/base_header_view.html'),
                    bgColor: 'widget://image/account/bg.png',
                    bounces: true,
                    slidBackEnabled: false,
                    name: 'account-register',
                    url: '../../html/account/register_frame.html',
                });
            },
            // 找回密码
            onEnterForgetPasswordTap: function () {
                _g.openWin({
                    header: {
                        title: LANGUAGE.account_title
                    },
                    customHeader: _g.getTemplate('../baseWin/base_header_view.html'),
                    bgColor: 'widget://image/account/bg.png',
                    bounces: true,
                    slidBackEnabled: false,
                    name: 'account-forgetPassword',
                    url: '../../html/account/forgetPassword_frame.html',
                });
            },
            // 找回账号
            onEnterForgetNameTap: function () {
                _g.openWin({
                    header: {
                        title: LANGUAGE.account_title
                    },
                    customHeader: _g.getTemplate('../baseWin/base_header_view.html'),
                    bgColor: 'widget://image/account/bg.png',
                    bounces: true,
                    slidBackEnabled: false,
                    name: 'account-forgetLoginName',
                    url: '../../html/account/forgetLoginName_frame.html',
                });
            },
        },
    });

    var _page = {

    };

    var sendApi = {
        login: function (obj, fn) {
            Http.ajax({
                data: obj,
                url: '',
                isSync: true,
                lock: true,
                success: function (ret) {
                    _g.setLS('UserInfo', ret.data);
                    // if (ret.code === 200) {
                    //     _g.openWin({
                    //         header: {
                    //             title: ''
                    //         },
                    //         name: 'home-index',
                    //         url: '../home/index_frame.html',
                    //         pageParam: {}
                    //     });
                    // }
                },
            });
        },
    };

    (function () {

    })();
    module.exports = {};
});
