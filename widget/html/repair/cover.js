define(function(require, exports, module) {
    var headerHeight = $('#header').height();
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    $('#title').text(LANGUAGE['repair_cover_title']);
    window.onCloseTap = function () {
        _g.execScript({
            winName: api.winName,
            fnName: 'closeWin'
        });
        // api.closeWin();
    };
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('repair/cover_view'),
        data: {
            title:LANGUAGE.repair_cover_name
        },
        filters: {},
        methods: {}
    });

    var _page = {};
    (function() {})();
    module.exports = {};
});