define(function(require, exports, module) {
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var Http = require('U/http');
    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('repair/index_view'),
        data: {
            title: LANGUAGE.repair_index_title,
            buttonName: LANGUAGE.repair_index_buttonName,
            showMessage:false,
            value:""
        },
        created: function() {

        },
        filters: {

        },
        methods: {
            // 点击跳转二维码扫描界面
            onScanTap: function() {
                _g.openWin({
                    header: {
                        title: 'Request Service Order'
                    },
                    bounces: true,
                    slidBackEnabled: false,
                    name: 'repair-scan',
                    url: '../repair/scan_win.html',
                }, 'normal');

            },
            // 点击跳转raiserepairoder页面
            onform: function() {
              Http.ajax({
                data: {
                  "customerCode":_g.getLS("customCode"),
                  "truckId":this.value
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


            }

        }

    });

    var _page = {

    };

    (function() {

    })();
    module.exports = {};
});
