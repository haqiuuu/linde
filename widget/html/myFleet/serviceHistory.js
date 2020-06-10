define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var Http = require('U/http');
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('myFleet/serviceHistory_view'),
        data: {
            tableHead: [{
                no: LANGUAGE.myfleet_service_history_orderTab,
                sn: LANGUAGE.myfleet_service_history_truck,
            }],
            tableList: [],
            LANGUAGE: LANGUAGE,
            search:'',
        },
        created: function() {

        },
        mounted: function () {
          this.init()
        },
        filters: {

        },
        methods: {
            text: function() {
                // console.log(tableList[0].date);

            },
            onDetailTap: function(item){
              _g.openWin({
                  header: {
                      title: 'Order History'
                  },
                  bounces: true,
                  slidBackEnabled: false,
                  name: 'myFleet-spec',
                  url: '../myFleet/spec_frame.html',
                  pageParam: {
                    orderId:item.orderId
                  }
              })

            },
            onSearch(){
              this.init();
            },
            init(){
              var that = this;
              Http.ajax({
                data: {
                  "idempotentId": "",
                	"language": "",
                	"pageNo": 0,
                	"pageSize": 0,
                	"roleId": _g.getLS('roleId'),
                	"systemType": "",
                	"taskId": that.search,
                	"userId": _g.getLS('userId')
                },
                url: '/api/list/getOrderHistory',
                isSync: true,
                lock: false,
                success: function(ret) {
                  that.tableList=ret.data;
                  console.log(ret);
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
