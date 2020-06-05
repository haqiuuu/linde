define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var Http = require('U/http');
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('setting/account_view'),
        data: {
            language: LANGUAGE,
            userInfo: {},
            holder:'',
            title:'',
            showmessage:false,
            showReset:false,
            old:"",
            newpswd:"",
            renew:"",
            operateType:"",
            operteInput:""
        },
        created: function() {
          this.init();
        },
        filters: {

        },
        methods: {
          //弹窗开关
          onOpenmsg: function() {
              if(this.userInfo.truckSN != null){
                return;
              }
              this.operateType = "sn"
              this.showmessage=true;
              this.title='Set Truck S/N'
              this.holder='Enter one truck S/N'
          },
          onOpenmsg2: function() {
            if(this.userInfo.customCode != null){
              return;
            }
              this.operateType = "code"
              this.showmessage=true;
              this.title='Set Customer Code'
              this.holder='Enter one Customer Code'
          },
          onOpenPhone:function() {
              this.operateType = "phone";
              this.showmessage=true;
              this.title='Set Phone';
              this.holder='Enter Your Phone';
              this.operteInput = this.userInfo.phone;

          },
          onOpenEmail:function() {
              this.operateType = "email";
              this.showmessage=true;
              this.title='Set email';
              this.holder='Enter Your email';
              this.operteInput = this.userInfo.email;
          },
          onOpenName:function() {
              this.operateType = "name";
              this.showmessage=true;
              this.title='Set Name';
              this.holder='Enter Your Name';
              this.operteInput = this.userInfo.userName;
          },
          onSubmit: function() {
            var that = this;
            if(this.operateType == "name"){
              Http.ajax({
                  data: {
                    "userId": _g.getLS('userId'),
                  	"userName": that.operteInput,
                  },
                  url: '/api/user/update',
                  isSync: false,
                  lock: false,
                  success: function(ret) {
                    _g.toast(ret.message)
                    that.operteInput='';
                    that.operateType='';
                    that.init();
                  },
                  error: function(err) {
                    _g.toast(ret.message)
                  }
                });
            }else if(this.operateType == "email"){
              Http.ajax({
                  data: {
                    "userId": _g.getLS('userId'),
                  	"email": that.operteInput,
                  },
                  url: '/api/user/update',
                  isSync: false,
                  lock: false,
                  success: function(ret) {
                    _g.toast(ret.message)
                    that.operteInput='';
                    that.operateType='';
                    that.init();
                  },
                  error: function(err) {
                    _g.toast(ret.message)
                  }
                });
            }else if(this.operateType == "phone"){
              Http.ajax({
                  data: {
                    "userId": _g.getLS('userId'),
                  	"phone": that.operteInput,
                  },
                  url: '/api/user/update',
                  isSync: false,
                  lock: false,
                  success: function(ret) {
                    _g.toast(ret.message)
                    that.operteInput='';
                    that.operateType='';
                    that.init();
                  },
                  error: function(err) {
                    _g.toast(ret.message)
                  }
                });
            }

              this.showmessage=false;
          },
          onOpenReset: function() {
              this.showReset=true;
          },

          onClosemsg: function() {
              this.showmessage=false;
          },
          onCloseReset: function() {
              this.showReset=false;
          },
          onConfirmReset: function() {
            var that = this;
            if(that.newpswd=='' || that.old=='' || that.renew==''){
              _g.toast("Check Input");
              return;
            }

            Http.ajax({
                data: {
                  "npassword": that.newpswd,
                	"password": that.old,
                	"spassword": that.renew,
                	"userAccount": _g.getLS("userAccount")
                },
                url: '/api/user/resetPassword',
                isSync: false,
                lock: false,
                success: function(ret) {
                  _g.toast(ret.message)
                  that.newpswd='';
                  that.old='';
                  that.renew='';
                },
                error: function(err) {
                  alert("faild")
                }
              });
              this.showReset=false;
          },
          init(){
            var that = this
            Http.ajax({
                data: {
                },
                url: '/api/user/get',
                isSync: false,
                lock: false,
                success: function(ret) {
                  that.userInfo = ret.data;
                },
                error: function(err) {
                  alert("faild")
                }
              });
          }
        }

    });

    var _page = {

    };

    (function() {

    })();
    module.exports = {};
});
