define(function(require, exports, module) {
    var Http = require('U/http');
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var UserType = _g.getLS('UserType');
    if (UserType == '6') {
        var Menus = [{
            title: LANGUAGE.menu_linde_news,
            img: '../../image/home/lindenews.png',
            icon: '',
            name: 'news-news',
            url: '../news/news_frame.html',
            id: 1,
        }, {
            title: LANGUAGE.menu_my_fleet,
            icon: '',
            img: '../../image/home/myfleet.png',
            name: 'myFleet-customer',
            url: '../myFleet/customer_frame.html',
            id: 2,
        }, {
            title: LANGUAGE.menu_raise_repair_order,
            icon: '',
            img: '../../image/home/raiserepairorder.png',
            name: 'repair-index',
            url: '../repair/index_frame.html',
            id: 3,
        }, {
            title: LANGUAGE.menu_customer_service,
            icon: '',
            img: '../../image/home/customerservice.png',
            name: '',
            url: '',
            id: 4,
        }, {
            title: LANGUAGE.menu_notification,
            icon: '',
            img: '../../image/home/notification.png',
            name: 'notification-notification',
            url: '../notification/notification_frame.html',
            id: 5,
        }, {
            title: LANGUAGE.menu_order_history,
            icon: '',
            img: '../../image/home/orderhistory.png',
            name: 'myFleet-serviceHistory',
            url: '../myFleet/serviceHistory_frame.html',
            id: 6,
        }, {
            title: LANGUAGE.menu_setting,
            icon: '',
            img: '../../image/home/setting.png',
            name: 'setting-system',
            url: '../setting/system_frame.html',
            id: 7,
        }];
    } else if(UserType == '5'){
        var Menus = [{
            title: LANGUAGE.menu_linde_news,
            img: '../../image/home/lindenews.png',
            icon: '',
            name: 'news-news',
            url: '../news/news_frame.html',
            id: 1,
        }, {
            title: LANGUAGE.menu_my_fleet,
            icon: '',
            img: '../../image/home/myfleet.png',
            name: 'myFleet-sales',
            url: '../myFleet/sales_frame.html',
            id: 2,
        }, {
            title: LANGUAGE.menu_notification,
            icon: '',
            img: '../../image/home/notification.png',
            name: 'notification-notification',
            url: '../notification/notification_frame.html',
            id: 5,
        }, {
            title: LANGUAGE.menu_order_history,
            icon: '',
            img: '../../image/home/orderhistory.png',
            name: 'myFleet-serviceHistory',
            url: '../myFleet/serviceHistory_frame.html',
            id: 6,
        }, {
            title: LANGUAGE.menu_setting,
            icon: '',
            img: '../../image/home/setting.png',
            name: 'setting-system',
            url: '../setting/system_frame.html',
            id: 7,
        }];
    }else if(UserType == '7'){
        var Menus = [{
            title: LANGUAGE.menu_linde_news,
            img: '../../image/home/lindenews.png',
            icon: '',
            name: 'news-news',
            url: '../news/news_frame.html',
            id: 1,
        }, {
            title: LANGUAGE.menu_my_fleet,
            icon: '',
            img: '../../image/home/myfleet.png',
            name: 'myFleet-sales',
            url: '../myFleet/sales_frame.html',
            id: 2,
        }, {
            title: LANGUAGE.menu_notification,
            icon: '',
            img: '../../image/home/notification.png',
            name: 'notification-notification',
            url: '../notification/notification_frame.html',
            id: 5,
        }, {
            title: LANGUAGE.menu_setting,
            icon: '',
            img: '../../image/home/setting.png',
            name: 'setting-system',
            url: '../setting/system_frame.html',
            id: 7,
        }];
    }else if(UserType == '8' || UserType == null){
        var Menus = [{
            title: LANGUAGE.menu_linde_news,
            img: '../../image/home/lindenews.png',
            icon: '',
            name: 'news-news',
            url: '../news/news_frame.html',
            id: 1,
        },  {
            title: LANGUAGE.menu_notification,
            icon: '',
            img: '../../image/home/notification.png',
            name: 'notification-notification',
            url: '../notification/notification_frame.html',
            id: 5,
        },{
            title: LANGUAGE.menu_customer_service,
            icon: '',
            img: '../../image/home/customerservice.png',
            name: '',
            url: '',
            id: 4,
        },
         {
            title: LANGUAGE.menu_setting,
            icon: '',
            img: '../../image/home/setting.png',
            name: 'setting-system',
            url: '../setting/system_frame.html',
            id: 7,
        }];
    }

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('home/index_view'),
        data: {
            menus: Menus,
            swiperList: [],
            showModal: false,
            lang: LANGUAGE,
            showMessage:false,
            code:"",
            time:60,
            isGetCode:false,
            email:"",
            emailShow:false,
        },
        computed:{

        },
        mounted() {

        },
        created: function() {
            // this.getMenus();
            this.getSwiperData();

            this.init();
            this.checkuser();
            if((_g.getLS("email")==null || _g.getLS("email")=='')&&_g.getLS("userId")) {
              this.emailShow = true;

            }
            // this.checkVersion();
        },
        filters: {

        },
        mounted: function () {

        },
        methods: {
            // 获取菜单
            getMenus: function() {
                // main.menus = Menus;
            },
            // 获取验证码
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
                  	"email": this.email,
                    "type":"reset_email_",
                    "userId":_g.getLS("userId")
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
            // 提交邮箱
            onSubmit: function () {
              var that =this;
                Http.ajax({
                	data: {
                  	"email": this.email,
                    "type":"reset_email_",
                    "userId":_g.getLS("userId"),
                    "verCode":this.code
                  },
                	url: '/api/user/updateEmail',
                	isSync: true,
                	lock: true,
                	success: function(ret) {
                    console.log("code-success");
                    if(ret.message == 'Update Success'){
                      _g.toast(ret.message);
                      _g.setLS('email', that.email);
                      that.emailShow=false;
                      that.init();
                    }else{
                      _g.toast(ret.message);
                      that.init();
                      return
                    }
                  },
                	error: function(err) {
                    alert("faild")
                    console.log(JSON.stringify(err))
                  }
                });
            },

            // 获取轮播图
            getSwiperData: function() {
              var that = this
                // this.swiperList = [{"pictureUrl":"/picture/QQ浏览器截图20190107131931.png","newsId":"bb4b0c8d-36e2-4da5-ae88-4dcc53edcd89","sort":null,"status":0,"rotationTime":null,"newsStatus":0,"id":1,"img":"/picture/QQ浏览器截图20190107131931.png","url":""},
                // {"pictureUrl":"/picture/QQ浏览器截图20200120005255.png","newsId":"63c0eee7-5bf4-4eb1-bc39-8210454cdbaa","sort":null,"status":0,"rotationTime":null,"newsStatus":1,"id":2,"img":"/picture/QQ浏览器截图20200120005255.png","url":""},
                // {"pictureUrl":"/picture/QQ浏览器截图20181211145150.png","newsId":"6e9ccba3-c02f-4544-9486-cdcb5909c8b3","sort":null,"status":0,"rotationTime":null,"newsStatus":1,"id":3,"img":"/picture/QQ浏览器截图20181211145150.png","url":""},
                // {"pictureUrl":"/picture/QQ浏览器截图20190107132256.png","newsId":"a1c93f6e-8691-471c-9f05-99cf8e58ae0e","sort":null,"status":0,"rotationTime":null,"newsStatus":1,"id":4,"img":"/picture/QQ浏览器截图20190107132256.png","url":""},
                // {"pictureUrl":"/picture/QQ浏览器截图20190107132357.png","newsId":"60a64e6e-34ca-479e-a611-9075f74ea8b9","sort":null,"status":0,"rotationTime":null,"newsStatus":1,"id":5,"img":"/picture/QQ浏览器截图20190107132357.png","url":""}];
                Http.ajax({
                	data: {
                    "idempotentId": "",
                  	"language": "",
                  	"listShowPictureId": [],
                  	"pageNo": 0,
                  	"pageSize": 0,
                  	"showPictureId": "",
                  	"systemType": "",
                  	"voList": [
                  		{
                  			"newsId": "",
                  			"newsStatus": 0,
                  			"pictureUrl": "",
                  			"rotationTime": 0,
                  			"sort": 0,
                  			"status": 0
                  		}
                  	]
                  },
                	url: '/api/show/picture/list',
                	isSync: false,
                	lock: false,
                	success: function(ret) {
                    if(ret.message == 'List Success'){
                      for (var i = 0; i < ret.data.list.length; i++) {
                        ret.data.list[i].id = i+1;
                        ret.data.list[i].img = ret.data.list[i].pictureUrl;
                        ret.data.list[i].url = '';
                        _g.setLS("rotationTime",ret.data.list[i].rotationTime);
                      }
                      that.swiperList=ret.data.list;
                      that.initSwiper();
                    }else{
                      alert(ret.message);
                    }

                    console.log(JSON.stringify(that.swiperList))

                  },
                	error: function(err) {
                    alert("faild")
                    console.log(JSON.stringify(err))
                  }
                });

            },
            checkuser(){
              // alert(_g.getLS('UserType'))
              if(_g.getLS('UserType') == null){
                api.confirm({
                    title:'提醒',
                    msg:'您当前未登录，请前往登录',
                    button:['确定','取消']
                },function(ret, err){
                  if(ret.buttonIndex == 1){ return ;}
                  else if(ret.buttonIndex == 2){
                  _g.openWin({
                      header: {
                          title: LANGUAGE.account_title
                      },
                      customHeader: _g.getTemplate('../baseWin/base_header_view.html'),
                      bounces: true,
                      slidBackEnabled: false,
                      bgColor: 'widget://image/account/bg.png',
                      name: 'account-login',
                      url: '../account/login_frame.html',
                  });
                }
                  this.showModal = false;
                })
              }
            },
            // 验证用户状态
            checkUserStatus: function() {
                if (_g.checkUser()) {
                    return true;
                } else {
                    this.showModal = true;
                    // _g.toast('用户为游客，禁止访问');
                    return;
                }
            },
            // 点击上方菜单
            onEnterMenuTap: function(item) {
                if(_g.getLS('UserType') == null && item.id != 1 &&item.id != 4){
                  this.checkuser();
                  return;
                }

                console.log('onMenuEnterTap');
                // 拨打电话
                if (item.id === 4) {
                    api.call({
                        type: 'tel_prompt',
                        number: '10086',
                    });
                    return;
                }
                _g.openWin({
                    header: {
                        title: item.title,
                    },
                    bounces: false,
                    name: item.name,
                    url: item.url,
                });
            },
            // 点击下方滑动图片
            onEnterSwiperTap: function(item) {

              if(item == '' || item == null){
                _g.toast("News Dosen't Exit");
                return;
              }
                _g.openWin({
                    header: {
                        title: 'News'
                    },
                    bounces: true,
                    slidBackEnabled: false,
                    name: 'news-detail',
                    url: '../news/detail_frame.html',
                    pageParam: {
                      newsid:item
                    }
                })

            },
            // 点击logo
            onEnterLogoTap: function(item) {
                // _g.openWin({
                //     header: {
                //         title: 'service',
                //     },
                //     hideFooter: true,
                //     name: 'raiseRepairOrder-requestServiceOrder',
                //     url: '../raiseRepairOrder/requestServiceOrder_frame.html',
                // });
            },
            initSwiper() {
                var swiper = new Swiper('.swiper-container', {
                    // direction: 'horizontal',
                    // initialSlide: 0,
                    // loop : true,
                    // initialSlide :0,
                    observer:true,  //修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,  //修改swiper的父元素时，自动初始化swiper
                    autoplay: Math.min(_g.getLS("rotationTime")*1000,6000),
                    autoplayDisableOnInteraction : false,
                    loopAdditionalSlides : 2,
                    // loop:true,
                    // autoplayDisableOninteraction: false,
                    // onSlideChangeEnd: function(swiper){
                    //     swiper.update();  //更新Swiper，这个方法包含了updateContainerSize，updateSlidesSize，updateProgress，updatePagination，updateClasses方法。也就是数据改变是重新初始化一次swiper；
                    //     swiper.startAutoplay();  //重新开始自动切换；
                    //     swiper.reLoop();  //重新对需要循环的slide个数进行计算，当你改变了slidesPerView参数时需要用到，需要自动轮播的时候必须要加上；
                    // }
                });
            },
            init(){
              // var ajpush = api.require('ajpush');
              //  if(api.systemType == "android"){
              //      ajpush.init(function(ret) {
              //          var param = {alias:'user1',tags:['user']};
              //          ajpush.bindAliasAndTags(param,function(ret) {
              //          });
              //          ajpush.setListener(jpushListener);
              //      });
              //  }else if(api.systemType == "ios"){
              //      ajpush.setListener(jpushListener);
              //      var param = {alias:'user2',tags:['user']};
              //      ajpush.bindAliasAndTags(param,function(ret) {
              //      });
              //  }



            },
            // 进入登录
            onEnterLoginTap: function() {
                _g.openWin({
                    header: {
                        title: LANGUAGE.account_title
                    },
                    customHeader: _g.getTemplate('../baseWin/base_header_view.html'),
                    bounces: true,
                    slidBackEnabled: false,
                    bgColor: 'widget://image/account/bg.png',
                    name: 'account-login',
                    url: '../account/login_frame.html',
                });
                this.showModal = false;
            },
            onCloseMaskTap: function() {
                this.showModal = false;
            },
            onUserTap: function() {
                _g.execScript({
                    winName: 'root',
                    fnName: 'reloadApp'
                });
            },
            onSalesTap: function() {
                _g.execScript({
                    winName: 'root',
                    fnName: 'reloadApp'
                });
            }
        },
    });

    var _page = {
        initSwiper: function() {
            var swiper = new Swiper('.swiper-container', {
                // direction: 'horizontal',
                // initialSlide: 0,
                // loop : true,
                // initialSlide :0,
                observer:true,  //修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,  //修改swiper的父元素时，自动初始化swiper
                autoplay: 3000,
                autoplayDisableOnInteraction : false,
                loopAdditionalSlides : 2,
                // loop:true,
                // autoplayDisableOninteraction: false,
                // onSlideChangeEnd: function(swiper){
                //     swiper.update();  //更新Swiper，这个方法包含了updateContainerSize，updateSlidesSize，updateProgress，updatePagination，updateClasses方法。也就是数据改变是重新初始化一次swiper；
                //     swiper.startAutoplay();  //重新开始自动切换；
                //     swiper.reLoop();  //重新对需要循环的slide个数进行计算，当你改变了slidesPerView参数时需要用到，需要自动轮播的时候必须要加上；
                // }
            });
        },
    };

    var sendApi = {


    };

    // _page.initSwiper();

    (function() {

    })();
    module.exports = {};
});
