define(function (require, exports, module) {
    var Http = require('U/http');
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var FNScanner = api.require('FNScanner');
    // var phoneReg = /^1[3456789]\d{9}$/;
    var phoneReg = /^([6|9])\d{7}$/;
    var phoneReg853 = /^[6]([8|6])\d{5}$/;
    var phoneReg886 = /^[0][9]\d{8}$/;
    var emailReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('account/register_view'),
        data: {
            language: LANGUAGE,
            phonePrefixData: [{
                label: LANGUAGE.account_register_menu_hongkong,
                value: '852',
            }, {
                label: LANGUAGE.account_register_menu_macao,
                value: '853',
            }, {
                label: LANGUAGE.account_register_menu_taiwan,
                value: '886',
            }],
            form: {
                account:"",
                phonePrefix: '852',
                username: '',
                phone: '',
                email: '',
                code: '',
                password: '',
                confirmPassword: '',
                customerCode: '',
                truckSN: '',
            },
            tips: {
                account:'',
                username: '',
                phone: '',
                email: '',
                code: '',
                password: '',
                confirmPassword: '',
                customerCode: '',
                truckSN: '',
            },
            isStopPropagation: false,
            globalTips: '',
            isSubmit: false,
            loading: false,
            showPhoneDropdown: false,
            isGetCode: false,
            time: 0,
            timer: null,
            validator: {
                account: function (value) {
                    if (!value) {
                        return LANGUAGE.account_login_account_tip;
                    }
                    return true;
                },
                username: function (value) {
                    if (!value) {
                        return LANGUAGE.account_register_name_tip;
                    }
                    return true;
                },
                phone: function (value) {
                    if (!value) {
                        return LANGUAGE.account_register_phone_tip;
                    } else if ((this.form.phonePrefix=='852' && !(phoneReg.test(value)))
                    || (this.form.phonePrefix=='853' && !(phoneReg853.test(value)))
                    || (this.form.phonePrefix=='886' && !(phoneReg886.test(value)))
                  ) {
                        return LANGUAGE.account_register_phone_tip;
                    }
                    return true;
                },
                email: function (value) {
                    if (!value) {
                        return LANGUAGE.account_register_mail_tip;
                    } else if (!(emailReg.test(value))) {
                        return LANGUAGE.account_register_mail_tip;
                    }
                    return true;
                },
                code: function (value) {
                    if (!value) {
                        return LANGUAGE.account_register_code_tip;
                    }
                    return true;
                },
                password: function (value) {
                    if (!value) {
                        return LANGUAGE.account_register_password_tip;
                    }

                    return true;
                },
                confirmPassword: function (value) {
                    if (!value) {
                        return LANGUAGE.account_register_againPassword_tip;
                    }
                    if (value != this.form.password) {
                        return LANGUAGE.account_register_againPassword_tip;
                    }

                    return true;
                },
                customerCode: function (value) {
                    if (!value) {
                        return LANGUAGE.account_register_customerCode_tip;
                    }
                    return true;
                },
                truckSN: function (value) {
                    if (!value) {
                        return LANGUAGE.account_register_truck_tip;
                    }
                    return true;
                },
            },
        },
        created: function () {

        },
        mounted: function () {
            var self = this;
            $('.ui-main').click(function (e) {
                self.showPhoneDropdown = false;
            });
            $('.ui-form__dropdown').click(function (e) {
              // if (self.showPhoneDropdown == true) {
              //   self.showPhoneDropdown = false;
              // }else if (self.showPhoneDropdown == false){
              //
              //   self.showPhoneDropdown = true;
              // }
                self.showPhoneDropdown = true;
                e.stopPropagation();
            });
            $('.ui-dropdown__items').click(function (e) {
                e.stopPropagation();
                $('.ui-form__email').click(function (e) {
                    return;
                });
            });

        },
        computed: {
        },
        filters: {

        },
        methods: {
            onScanTap: function (event) {
                var self = this;
                FNScanner.open({
                    autorotation: true,
                }, function (ret) {
                    if (ret) {
                        alert(JSON.stringify(ret));
                        if (ret.content) {
                            self.form.truckSN = ret.content;
                        }
                    } else {
                        console.log(JSON.stringify(err));
                    }
                });
            },
            onCloseDropDownTap: function () {
                var self = this;
                $('.ui-main').click();
            },
            changePhoneDropDown: function () {
                var self = this;
                $('.ui-form__dropdown').click();

            },
            onChangePrefixTap: function (item) {
                this.form.phonePrefix = item.value;
                this.showPhoneDropdown = false;
            },
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
                var result = this.validator[field].call(this, this.form[field]);
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
                // var account;
                // var username;
                // var phone;
                // var email;
                // var code;
                // var password;
                // var spassword;
                // form: {
                //     account:"",
                //     phonePrefix: '852',
                //     username: '',
                //     phone: '',
                //     email: '',
                //     code: '',
                //     password: '',
                //     confirmPassword: '',
                //     customerCode: '',
                //     truckSN: '',
                // }
                Http.ajax({
                	data: {
                    "sapShipTo": this.form.customerCode,
                  	"email": this.form.email,
                  	"password": this.form.password,
                  	"phone": '+'+this.form.phonePrefix+this.form.phone,
                  	"spassword": this.form.confirmPassword,
                  	"truckSN": this.form.truckSN,
                  	"userAccount": this.form.account,
                  	"userName":this.form.username,
                  	"verCode": this.form.code
                  },
                	url: '/api/user/insert',
                	isSync: true,
                	lock: true,
                	success: function(ret) {
                    console.log("login-success");
                    api.closeWin();
                  },
                	error: function(err) {
                    alert("faild")
                    console.log(JSON.stringify(err))
                  }
                });
                self.validate(function () {
                    this.loading = true;
                    console.log(self.globalTips, 'globalTips');
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
                    "type":"register_code_",
                    "userAccount":this.form.account
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
