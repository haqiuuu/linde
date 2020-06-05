define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var Http = require('U/http');
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('myFleet/customer_view'),
        data: {
            list: [],
            LANGUAGE: LANGUAGE
        },
        created: function() {
          this.init();
        },
        filters: {

        },
        methods: {
            onSearchTap: function () {
                console.log(this.search);
            },
            onDetailTap: function(item){
              _g.openWin({
                  header: {
                      title: 'detail'
                  },
                  bounces: true,
                  slidBackEnabled: false,
                  name: 'myfleet-detail',
                  url: '../myFleet/detail_frame.html',
                  pageParam: {
                    //传递参数
                    header:'Detail Of The Note',
                    sn:item
                  }
              })
            },
            init(){
              Http.ajax({
                data: {
                	"customerCode": _g.getLS('customCode'),
                  // "truckId": "0000/F0008",
                },
                url: '/api/truckexcel/getTrucks',
                isSync: true,
                lock: false,
                success: function(ret) {
                  main.list=ret.data.list
                },
                error: function(err) {
                  alert(err)
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
