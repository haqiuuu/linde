define(function (require, exports, module) {
    var Http = require('U/http');
    var isAppear = false;
    var opts = api.pageParam.opts || {};
    var headerHeight = $('#header').height();
    // if (api.winName == '') {

    // }
    // if (api.winName == '') {

    // }
    // if (api.winName == '') {

    // }
    var navFrame = _g.frameBuilder({
        name: 'baseWin-navigator-frame',
        url: '../baseWin/navigator_frame.html',
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
            paddingTop: headerHeight
        },
        scrollEnabled: false,
        isOpen: false
    });

    // frame加载完成
    window.frameReady = function () {

        if (window.isFrameReady) return;
        window.isFrameReady = true;
        $('.loader').remove();
    };
    // 左边按钮事件传递
    window.leftBtnTap = function () {
        navFrame.show();
        api.bringFrameToFront({
            from: 'baseWin-navigator-frame'
        });
        // if (window.isFrameReady) {
        //     api.execScript({
        //         name: opts.name + '-win',
        //         frameName: opts.name + '-frame',
        //         script: 'window.leftBtnTap();'
        //     });
        // } else {
        // }
    };
    // 右边按钮事件传递
    window.rightBtnTap = function () {
        if (window.isFrameReady) {
            api.execScript({
                name: opts.name + '-win',
                frameName: opts.name + '-frame',
                script: 'window.rightBtnTap();'
            });
        } else {
            api.closeWin();
        }
    };
    // 扩展按钮事件传递
    window.extraBtnTap = function (params) {
        if (window.isFrameReady) {
            api.execScript({
                name: opts.name + '-win',
                frameName: opts.name + '-frame',
                script: 'window.extraBtnTap(' + JSON.stringify(params) + ');'
            });
        }
    };
    //底部按钮
    window.footerBtnTap = function (type) {
        //TODO change url
        var url="";
        Http.ajax({
          data: {
            "id": "",
          	"idempotentId": "",
          	"language": "",
          	"listId": [],
          	"pageNo": 0,
          	"pageSize": 0,
          	"systemType": ""
          },
          url: '/api/setting/list',
          isSync: true,
          lock: true,
          success: function(ret) {
            if(type=='register'){
              url=ret.data.list[1].url
            }else if(type=='facebook'){
              url=ret.data.list[0].url
            }else {
              url=ret.data.list[2].url
            }

            _g.openWin({
                name: 'website',
                url: url
            });
          },
          error: function(err) {
            alert("faild")
            console.log(JSON.stringify(err))
          }
        });


    };

    // 监听frame是否加载完成
    api.setFrameClient({
        frameName: opts.name + '-frame'
    }, function (ret, err) {
        // alert(ret.state);
        if (ret.state == 2) {
            window.frameReady();
        }
    });

    // 页面过渡动画完成
    _g.viewAppear(function () {
        isAppear = true;
        opts && _g.addContent(opts);
        if (api.winName == '') {

        }
    });
    // 检查450毫秒之后是否已经打开win
    setTimeout(function () {
        if (!isAppear) opts && _g.addContent(opts);
    }, 450);

    (function () {
        if (api.winName == 'website-win') {
            window.rightBtnTap = function () {
                api.closeWin();
            };
        }
        api.addEventListener({
            name: 'keyback'
        }, function (ret, err) {
            window.rightBtnTap();
        });
        if (api.winName == 'home-index-win') {
            window.rightBtnTap = function () {};
            api.addEventListener({
                name: 'keyback'
            }, function (ret, err) {
                api.closeWidget();
            });
        }
        window.hideNav = function () {
            navFrame.hide();
        };
    })();

    module.exports = {};

});
