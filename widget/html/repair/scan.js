define(function(require, exports, module) {
    var FNScanner = api.require('FNScanner');
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var Http = require('U/http');
    var scanFrame = _g.frameBuilder({
        name: 'repair-cover-frame',
        url: '../repair/cover_frame.html',
        bounces: false,
        vScrollBarEnabled: false,
        hScrollBarEnabled: false,
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        pageParam: {
            // paddingTop: headerHeight
        },
        scrollEnabled: false
    });


    api.requestPermission({
        list: ['camera', 'photos'],
        code: 1
    }, function(ret, err) {
        if (ret.list[0].granted) {
            FNScanner.openView({
                autorotation: true
            }, function(ret, err) {
                if (ret) {
                    if (ret.eventType == 'show') {
                        setTimeout(function () {
                            scanFrame.open();
                        }, 20);
                    } else if (ret.eventType == 'success') {
                      Http.ajax({
                        data: {
                          "customerCode":_g.getLS("customCode"),
                          "truckId":ret.content
                        },
                        url: '/api/truckexcel/getTruck',
                        isSync: false,
                        lock: false,
                        success: function(ret) {
                          if(ret.message == 'List Success'){
                            _g.openWin({
                                header: {
                                    title: 'Request Service Order'
                                },
                                bounces: true,
                                slidBackEnabled: false,
                                name: 'raiseRepairOrder-form',
                                url: '../raiseRepairOrder/requestServiceOrder_frame.html',
                                hideFooter:true,
                                pageParam: {
                                  sn:ret.data.truckId,
                                  company:ret.data.customer,
                                  model:ret.data.model,
                                  fleet:ret.data.fleet,
                                }
                            });
                          }else{
                            _g.toast(ret.message);
                          }

                        },
                        error: function(err) {
                          alert("faild")
                          console.log(JSON.stringify(err))
                        }
                      });
                        // alert(JSON.stringify(ret));
                    }
                } else {}
            });
        } else {
            alert('Please open camera permission');
        }
    });

    window.frameReady = function () {

    };

    window.closeWin = function () {
        FNScanner.closeView();
        api.closeWin();
    };

    // var main = new Vue({
    //     el: '#main',
    //     template: _g.getTemplate('repair/scan_view'),
    //     data: {},
    //     filters: {},
    //     methods: {}
    // });
    // var _page = {};
    // (function() {})();
    module.exports = {};
});
