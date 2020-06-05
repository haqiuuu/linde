define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var Http = require('U/http');
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('myFleet/detail_view'),
        data: {
            menuchecked:true,
            status:{},
            LANGUAGE: LANGUAGE,
            tableHead: [{
                dateTab: LANGUAGE.myfleet_service_history_dateTab,
                jobTab: LANGUAGE.myfleet_service_history_jobTab,
                statusTab: LANGUAGE.myfleet_service_history_statusTab,
                documentTab: LANGUAGE.myfleet_service_history_documentTab,
            }],
            tableList: [
              {
                date: '01-02-2019',
                job: '維修油喉',
                status: '未完成，叉車需暫停使用',
                document: '(NEW)1902-ST-CKW-0008',
              },
              {
                date: '01-02-2019',
                job: '維修油喉',
                status: '未完成，叉車需暫停使用',
                document: '(NEW)1902-ST-CKW-0008',
              },
              {
                date: '01-02-2019',
                job: '維修油喉',
                status: '未完成，叉車需暫停使用',
                document: '(NEW)1902-ST-CKW-0008',
              },
            ]
        },
        created: function() {
          this.init();
          // this.historyInit();
        },
        filters: {

        },
        methods: {
            onSearchTap: function () {
                console.log(this.search);
            },
            onDetailTap: function(){

            },

            changestatus: function(){
              this.menuchecked=true;
            },
            changeRepair: function(){
              this.menuchecked=false;
            },
            init(){
              Http.ajax({
                data: {
                	"truckId": api.pageParam.sn,
                  // "truckId": "0000/F0008",
                },
                url: '/api/salesexcel/getSalesDetail',
                isSync: true,
                lock: false,
                success: function(ret) {
                  main.status=ret.data
                },
                error: function(err) {
                  alert(err)
                }
              });
              this.historyInit();
            },
            historyInit(){
              Http.ajax({
                data: {
                	"truckId": api.pageParam.sn,
                  // "truckId": "0000/F0008",
                },
                url: '/api/taskexcel/searchServiceHistory',
                isSync: true,
                lock: false,
                success: function(ret) {
                  main.tableList=ret.data
                },
                error: function(err) {
                  alert(err)
                }
              });
            },
        }

    });

    var _page = {

    };

    (function() {

    })();
    module.exports = {};
});
