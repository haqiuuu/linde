define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('myFleet/serviceHistory_view'),
        data: {
            tableHead: [{
                no: LANGUAGE.myfleet_service_history_orderTab,
                sn: LANGUAGE.myfleet_service_history_truck,
            }],
            tableList: [
                {
                    no: '2020040318353252123',
                    sn: 'C11275H02791',
                },
                {
                    no: '2020040318353252123',
                    sn: 'C11275H02791',
                },
                {
                    no: '2020040318353252123',
                    sn: 'C11275H02791',
                },
                {
                    no: '2020040318353252123',
                    sn: 'C11275H02791',
                },
                {
                    no: '2020040318353252123',
                    sn: 'C11275H02791',
                },

            ],
            LANGUAGE: LANGUAGE,
            search:'',
        },
        created: function() {

        },
        mounted: function () {

        },
        filters: {

        },
        methods: {
            text: function() {
                // console.log(tableList[0].date);

            },
            onDetailTap: function(){
              _g.openWin({
                  header: {
                      title: 'Order History'
                  },
                  bounces: true,
                  slidBackEnabled: false,
                  name: 'myFleet-spec',
                  url: '../myFleet/spec_frame.html',
              })
            }

        }

    });

    var _page = {

    };

    (function() {

    })();
    module.exports = {};
});
