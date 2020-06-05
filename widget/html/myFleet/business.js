define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var Http = require('U/http');
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('myFleet/business_view'),
        data: {
            businessName:"",
            businessList:[]
        },
        created: function() {
            this.init();
        },
        filters: {

        },
        methods: {
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
                  sn:item,
                }
            })
          },
          init(){
            this.businessName = api.pageParam.businessName;
            // this.businessList = api.pageParam.businessList;
            Http.ajax({
              data: {
                "customer": api.pageParam.businessName,
                // "userAccount":_g.getLS('userAccount')
              },
              url: '/api/truckexcel/getTruckSnByCustomer',
              isSync: true,
              lock: true,
              success: function(ret) {
                main.businessList=ret.data.list
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
