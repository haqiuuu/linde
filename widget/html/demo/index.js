define(function (require, exports, module) {
    var Http = require('U/http');
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    console.log(LANGUAGE);
    var main = new Vue({
        el: '#main',
        // template: _g.getTemplate('baseWin/base_header_view'),
        template: _g.getTemplate('demo/index_view'),
        data: {},
        filters: {},
        methods: {
            onTestTap: function () {
                console.log(333);
                
            }
        }
    });
    var _page = {
        openPage: function () {
            //base page
            _g.openWin({
                header: {
                    title: '',
                    leftIcon: '',
                    rightIcon: ''
                },
                name: 'demo-index',
                url: '../demo/index_frame.html',
                hideFooter: true, //是否隐藏底部
                bounces: true,
                slidBackEnabled: false
            });

            //account page
            _g.openWin({
                customHeader: _g.getTemplate('baseWin/base_header_view'),
                name: 'demo-index',
                url: '../demo/index_frame.html',
                bounces: true,
                slidBackEnabled: false
            });
        }
    };
    var sendApi = {};

    
    (function () {})();

    module.exports = {};
});
