define(function (require, exports, module) {
    var Http = require('U/http');
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var emailReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('account/forgetLoginName_view'),
        data: {
            language: LANGUAGE,
            form: {
                email: '',
                code: '',
            },
            tips: {
                email: '',
                code: '',
            },
            globalTips: '',
            isSubmit: false,
            loading: false,
            isGetCode: false,
            time: 0,
            timer: null,
            validator: {
                email: function (value) {
                    if (!value) {
                        return LANGUAGE.account_forget_login_name_emailTip;
                    } else if (!(emailReg.test(value))) {
                        return LANGUAGE.account_forget_login_name_emailTip;
                    }
                    return true;
                },
                code: function (value) {
                    if (!value) {
                        return LANGUAGE.account_forget_login_name_codeTip;
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
                if (successCount === _.keys(this.validator).length) {
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
                console.log('onSubmitTap');
                var self = this;
                self.validate(function () {
                    this.loading = true;
                    console.log(self.globalTips, 'globalTips');
                });

                Http.ajax({
                	data: {
                    "email": this.form.email,
                  	"verCode": this.form.code,

                  },
                	url: '/api/user/forgetName',
                	isSync: true,
                	lock: true,
                	success: function(ret) {
                    console.log("forgetPassword-success");
                    api.closeWin();
                  },
                	error: function(err) {
                    alert("faild")
                    console.log(JSON.stringify(err))
                  }
                });
            },
            // 发送验证码
            getCode: function () {
                console.log('getCode');
                clearInterval(this.timer);
                let self = this;
                this.isGetCode = true;
                this.time = 60;
                this.timer = setInterval(function () {
                    if (self.time <= 0) {
                        clearInterval(self.timer);
                        self.isGetCode = false;
                        return;
                    }
                    self.time--;

                }, 1000);
                Http.ajax({
                	data: {
                  	"email": this.form.email,
                    "type":"forgot_name_code_"
                  },
                	url: '/api/user/sendVerCode',
                	isSync: true,
                	lock: true,
                	success: function(ret) {
                    console.log("code-success");
                  },
                	error: function(err) {
                    alert("faild")
                    console.log(JSON.stringify(err))
                  }
                });


            },

        },
    });

    var _page = {

    };

    var sendApi = {
        submit: function (obj, fn) {
            Http.ajax({
                data: obj,
                url: '',
                isSync: true,
                lock: true,
                success: function (ret) {
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
