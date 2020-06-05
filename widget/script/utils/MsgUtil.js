/**
 * Created by PromeYang on 17/7/20.
 */
define(function (require, exports, module) {
    var Http = require('U/http');
    // var Fleet = require('./html/fleet/fleet');

    var actions = {
        1000: function (extra) {
            
        }
    };

    var MsgUtil = {
        action: function (extra) {
            var extraId = null;
            actions[extra.type] && actions[extra.type](extra);
        }
    };

    module.exports = MsgUtil;

});

