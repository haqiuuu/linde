define(function(require, exports, module) {
    var paddingTop = api.pageParam.paddingTop || 0;
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];

    var navList = [];

    if (_g.getLS('UserType') == '6') {
        navList = [{
                icon: '../../image/baseWin/icon-news.png',
                title: LANGUAGE.nav_news_title,
                tag: 'news'
            }, {
                icon: '../../image/baseWin/icon-fleet.png',
                title: LANGUAGE.nav_fleet_title,
                tag: 'fleet'
            }, {
                icon: '../../image/baseWin/icon-order.png',
                title: LANGUAGE.nav_order_title,
                tag: 'order'
            }, {
                icon: '../../image/baseWin/icon-history.png',
                title: LANGUAGE.nav_history_title,
                tag: 'history'
            }, {
                icon: '../../image/baseWin/icon-service.png',
                title: LANGUAGE.nav_service_title,
                tag: 'service'
            }, {
                icon: '../../image/baseWin/icon-notice.png',
                title: LANGUAGE.nav_notification_title,
                tag: 'notification'
            }, {
                icon: '../../image/baseWin/icon-setting.png',
                title: LANGUAGE.nav_setting_title,
                tag: 'setting'
            }];
    } else if (_g.getLS('UserType') == '5'){
        navList = [{
                icon: '../../image/baseWin/icon-news.png',
                title: LANGUAGE.nav_news_title,
                tag: 'news'
            }, {
                icon: '../../image/baseWin/icon-fleet.png',
                title: LANGUAGE.nav_fleet_title,
                tag: 'fleet'
            }, {
                icon: '../../image/baseWin/icon-notice.png',
                title: LANGUAGE.nav_notification_title,
                tag: 'notification'
            }, {
                icon: '../../image/baseWin/icon-setting.png',
                title: LANGUAGE.nav_setting_title,
                tag: 'setting'
            },{
                icon: '../../image/baseWin/icon-history.png',
                title: LANGUAGE.nav_history_title,
                tag: 'history'
            }];
    }else if (_g.getLS('UserType') == '7'){
        navList = [{
                icon: '../../image/baseWin/icon-news.png',
                title: LANGUAGE.nav_news_title,
                tag: 'news'
            }, {
                icon: '../../image/baseWin/icon-fleet.png',
                title: LANGUAGE.nav_fleet_title,
                tag: 'fleet'
            }, {
                icon: '../../image/baseWin/icon-notice.png',
                title: LANGUAGE.nav_notification_title,
                tag: 'notification'
            }, {
                icon: '../../image/baseWin/icon-setting.png',
                title: LANGUAGE.nav_setting_title,
                tag: 'setting'
            }];
    }else if (_g.getLS('UserType') == '8' || _g.getLS('UserType') == null){
        navList = [{
                icon: '../../image/baseWin/icon-news.png',
                title: LANGUAGE.nav_news_title,
                tag: 'news'
            }, {
                icon: '../../image/baseWin/icon-service.png',
                title: LANGUAGE.nav_service_title,
                tag: 'service'
            },{
                icon: '../../image/baseWin/icon-notice.png',
                title: LANGUAGE.nav_notification_title,
                tag: 'notification'
            }, {
                icon: '../../image/baseWin/icon-setting.png',
                title: LANGUAGE.nav_setting_title,
                tag: 'setting'
            }];
    }

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('baseWin/navigator_view'),
        data: {
            list: []
        },
        created: function () {
            this.list = navList;
        },
        mounted: function() {
            $('.ui-main').css('padding-top', paddingTop + 'px');
        },
        filters: {

        },
        methods: {
            onHideTap: function() {
                _g.execScript({
                    winName: api.winName,
                    fnName: 'hideNav'
                });
            },
            onItemTap: function(index) {
                var tag = main.list[index].tag;
                var action = {
                    news: function () {
                        _g.openWin({
                            header: {
                                title: LANGUAGE.menu_linde_news
                            },
                            name: 'news-news',
                            url: '../news/news_frame.html',
                            bounces: true,
                            slidBackEnabled: false
                        });
                    },
                    fleet: function () {
                        _g.openWin({
                            header: {
                                title: LANGUAGE.menu_my_fleet
                            },
                            name: 'myFleet-customer',
                            url: '../myFleet/customer_frame.html',
                            bounces: false,
                            slidBackEnabled: false
                        });
                    },
                    order: function () {
                        _g.openWin({
                            header: {
                                title: LANGUAGE.menu_service_order_title
                            },
                            name: 'repair-index',
                            url: '../repair/index_frame.html',
                            bounces: true,
                            slidBackEnabled: false
                        });
                    },
                    history: function () {
                        _g.openWin({
                            header: {
                                title: LANGUAGE.menu_service_title
                            },
                            name: 'myFleet-serviceHistory',
                            url: '../myFleet/serviceHistory_frame.html',
                            bounces: false,
                            slidBackEnabled: false
                        });
                    },
                    service: function () {
                        api.call({
                            type: 'tel_prompt',
                            number: '10086'
                        });
                    },
                    notification: function () {
                      if(_g.getLS("UserType")==null){
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
                        })
                        }else{
                          _g.openWin({
                              header: {
                                  title: LANGUAGE.menu_notification
                              },
                              name: 'notification-notification',
                              url: '../notification/notification_frame.html',
                              bounces: true,
                              slidBackEnabled: false
                          });
                        }

                    },
                    setting: function () {
                      if(_g.getLS("UserType")==null){
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
                        })
                      }else{
                        _g.openWin({
                            header: {
                                title: LANGUAGE.menu_setting
                            },
                            name: 'setting-system',
                            url: '../setting/system_frame.html',
                            bounces: true,
                            slidBackEnabled: false
                        });
                      }

                    },
                };
                action[tag] && action[tag]();
                main.onHideTap();
            }
        }

    });

    var _page = {

    };

    (function() {

    })();
    module.exports = {};
});
