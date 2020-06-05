define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var UserId = _g.getLS('userId');
    var Http = require('U/http');
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('news/news_view'),
        data: {
            itemsList: [
                // {
                //     time: '25-29-2019 20:54',
                //     content: 'The forklift truck repair order with body num',
                // },
            ],
            LANGUAGE:LANGUAGE,
            search:'',
        },
        created: function() {
          this.init();
        },
        filters: {

        },
        methods: {
          //打开详情
          onDetailTap: function(value){
            _g.openWin({
                header: {
                    title: 'News'
                },
                bounces: true,
                slidBackEnabled: false,
                name: 'news-detail',
                url: '../news/detail_frame.html',
                pageParam: {
                  newsid:value
                }
            })
          },
          init(){
            Http.ajax({
              data: {
                "endTime": "",
              	"idempotentId": "",
              	"language": "",
              	"listNewsId": [],
              	"newsContent": "",
              	"newsId": "",
              	"newsLink": "",
              	"newsSort": 0,
              	"newsStatus": 1,
              	"newsTitle": "",
              	"pageNo": 0,
              	"pageSize": 0,
              	"startTime": "",
              	"systemType": ""
              },
              url: '/api/news/list',
              isSync: true,
              lock: true,
              success: function(ret) {
                main.itemsList = ret.data.list;
              },
              error: function(err) {
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
