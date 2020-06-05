define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('../setting/aboutus_view.html'),
        created: function() {
            this.init();
        },
        filters: {

        },
        methods: {
          init(){

          }
        }

    });

    var _page = {

    };

    (function() {

    })();
    module.exports = {};
});
