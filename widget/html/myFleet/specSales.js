define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('myFleet/specSales_view'),
        data: {
            language: LANGUAGE,
            item:{
                salesName:'CHI',
                customerName:'abc',
                model:'Model',
                truck:'C11275H02791',
                mast:'Triplex 4470/2069/1468mm',
                slide:'SS',
                spec:'Connect',
                attachment:'Pull&Push',
                battery:'48V700Ah w/aqua',
                schedule:'2019/2/22',
                period:12,
                stratDate:'2019/2/22'
            }
        },
        created: function() {

        },
        filters: {

        },
        methods: {

        }

    });

    var _page = {

    };

    (function() {

    })();
    module.exports = {};
});