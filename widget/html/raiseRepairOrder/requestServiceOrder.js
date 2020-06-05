define(function (require, exports, module) {
    var Http = require('U/http');
    var LANGUAGE = require('U/language')[_g.getLS('LANGUAGE')];
    var UIAlbumBrowser = api.require('UIAlbumBrowser');
    var fs = api.require('fs');
    var main = new Vue({
        el: '#main',
        // template: _g.getTemplate('baseWin/base_header_view'),
        template: _g.getTemplate('raiseRepairOrder/requestServiceOrder_view'),
        data: {
            language: LANGUAGE,
            loading: false,
            showDropdown: false,
            showModal: false,
            imageList: [],
            descriptionList: [{
                label: 'aaa',
                value: 'aaa',
            }, {
                label: 'bbb',
                value: 'bbb',
            }, {
                label: 'ccc',
                value: 'ccc',
            }],
            form: {
                companyName: '',
                truckModel: '',
                truckSN: '',
                fleetNumber: '',
                contactPerson: '',
                truckLocation: '',
                tel: '',
                description: '',
                remarks: '',
                field:'',
            },
            ImgList:[],
            tips: {
                contactPerson: '',
                truckLocation: '',
                tel: '',
            },
            validator: {
                contactPerson: function (value) {
                    if (!value) {
                        return 'Incorrect contactPerson';
                    }
                    return true;
                },
                truckLocation: function (value) {
                    if (!value) {
                        return 'Incorrect truckLocation';
                    }
                    return true;
                },
                tel: function (value) {
                    if (!value) {
                        return 'Incorrect tel';
                    }
                    return true;
                },
            },
            formListTop: [{
                label: LANGUAGE.raiseRepairOrder_request_service_order_company_name,
                field: 'companyName',
            }, {
                label: LANGUAGE.raiseRepairOrder_request_service_order_truck_model,
                field: 'truckModel',
            }, {
                label: LANGUAGE.raiseRepairOrder_request_service_order_truckSN,
                field: 'truckSN',
            }, {
                label: LANGUAGE.raiseRepairOrder_request_service_order_fleet_number,
                field: 'fleetNumber',
            }, {
                label: LANGUAGE.raiseRepairOrder_request_service_order_contact_person,
                field: 'contactPerson',
                type: 'input',
            }, {
                label: LANGUAGE.raiseRepairOrder_request_service_order_truck_location,
                field: 'truckLocation',
                type: 'area',
            }, {
                label: LANGUAGE.raiseRepairOrder_request_service_order_tel,
                field: 'tel',
                type: 'input',
            }],
            formListBottom: [{
                label: LANGUAGE.raiseRepairOrder_request_service_order_description,
                field: 'description',
                type: 'input',
            }, {
                label: LANGUAGE.raiseRepairOrder_request_service_order_remarks,
                field: 'remarks',
                type: 'area',
            }, {
                label: '',
                field: '',
                type: 'img',
            }],
        },
        filters: {},
        computed: {
          getImg(){
            console.log(JSON.stringify(this.imageList));
            return this.imageList;

          }
        },
        mounted: function () {
            this.init();
            var self = this;
            $('.ui-main').click(function (e) {
                self.showDropdown = false;
            });
            $('.ui-form__dropdown').click(function (e) {
                self.showDropdown = true;
                e.stopPropagation();
            });
        },
        methods: {
            // 关闭弹窗
            onCloseModalTap: function () {
                this.showModal = false;
            },
            onCloseDropdown: function () {
                $('.ui-main').click();
            },
            changeDescriptionDropDown: function () {
                $('.ui-form__dropdown').click();
            },
            onChangeTap: function (item) {
                this.form.description = item.value;
                this.showDropdown = false;
            },
            // 点击选择的图片进行删除
            onDeleteImgTap: function (index) {
                this.imageList.splice(index, 1);
            },
            // 打开选择图片
            onOpenPhotoTap: function () {
                console.log('onOpenPhotoTap');
                var self = this;

                _g.openPicActionSheet({
                    type: 'UIMediaScanner',
                    suc(ret, type) {
                      // alert(1)
                      console.log(1);
                      console.log(JSON.stringify(ret));

                        if (ret && ret.list && ret.list.length) {
                            self.imageList=[];
                            var find = ret.list.find(function (v) {return v.size > (5 * 1024 * 1024);});
                            if (find) {
                                self.showModal = true;
                                return false;
                            }
                            // 选择本地图片绝对路径  将其上传至服务器获取返回url渲染至页面上
                            // var resultList = ret.list.map(function (v) {
                            //     return {url: v.thumbPath};
                            // })
                            var resultList = ret.list.map(function (v) {
                                return {url: v.thumbPath};
                            })
                            self.ImgList = ret;
                            for (var i = 0; i < resultList.length; i++) {
                              self.imageList.push(resultList[i].url)
                            }
                            // self.imageList.push(resultList);
                            console.log(JSON.stringify(self.imageList));
                        }

                    },
                });
            },
            onPreviewTap: function (index) {
              var photoBrowser = api.require('photoBrowser');
              var times=0;
              photoBrowser.open({
                  images: this.imageList,
                  activeIndex:index,
                  bgColor: '#000',
              }, function(ret, err) {
                  if (ret) {
                    // click:closeImg()
                    // alert(JSON.stringify(ret))
                      console.log(JSON.stringify(ret))
                      var type = JSON.stringify(ret)
                    if (ret.eventType=="click") {
                        closeImg();
                    }
                  } else {
                    // alert(2);
                    // alert(JSON.stringify(err));
                  }
              });
            },
            // 提交
            onSubmitTap: function () {
                console.log('onSubmitTap');
                var self = this;
                var forms = this.form;
                // self.validate(function () {
                //     this.loading = true;
                // });

                // if (forms.companyName == '' || forms.truckModel == '' || forms.truckSN == ''
                // || forms.fleetNumber == '' || forms.contactPerson == '' || forms.truckLocation == '' ||
                // forms.tel == '' ||forms.description == '' ||forms.remarks == '' || forms.field == '') {
                //   _g.toast("Check Your Input");
                //   return;
                // }

                Http.ajax({
                  data: {
                    // "customerCode":_g.getLS("customCode"),
                    "customer":forms.companyName,
                    "model":forms.truckModel,
                    "truckId":forms.truckSN,
                    "fleet":forms.fleetNumber,
                    "contact":forms.contactPerson,
                    "location":forms.truckLocation,
                    "phone":forms.tel,
                    "faultDecrip":forms.field,
                    "remarks":forms.remarks,
                    "img":self.ImgList
                  },
                  url: '/api/list/insert',
                  isSync: false,
                  lock: false,
                  success: function(ret) {
                    if(ret.message == 'Insert Success'){
                      _g.toast(ret.message);
                      api.closeWin();
                    }else{
                      _g.toast(ret.message);
                    }

                  },
                  error: function(err) {
                    alert("faild")
                    console.log(JSON.stringify(err))
                  }
                });

            },
            onAutoFocusTap: function (field) {
                console.log(this.$refs);
                // this.$refs[field] && this.$refs[field][0] && this.$refs[field][0].focus()
            },
            onChangeValueInput: function (event, field) {
                this.form[field] = event.target.value;
            },
            // 校检
            validate: function (fn) {
                if (this.loading) {return;}
                this.isSubmit = false;
                var self = this;
                var successCount = _.keys(this.validator).reduce(function (tol, cur) {
                    return tol + self.dataValidation(cur);
                }, 0);
                console.log(successCount, 'successCount');
                if (successCount === _.keys(this.validator).length) {
                    this.isSubmit = true;
                    fn && fn();
                }
            },
            // 验证数据
            dataValidation: function (field) {
                if (this.isSubmit) {return;}
                var result = null;
                if (this.validator[field]) {
                    result = this.validator[field](this.form[field]);
                }
                if (typeof result === 'boolean') {
                    this.tips[field] = '';
                    return 1;
                } else if (typeof result === 'string') {
                    this.tips[field] = result;
                    return 0;
                } else {
                    this.tips[field] = result;
                    return 0;
                }
            },
            init(){
              this.form.truckSN = api.pageParam.sn;
              this.form.companyName = api.pageParam.company;
              this.form.truckModel = api.pageParam.model;
              this.form.fleetNumber = api.pageParam.fleet;

            }
        },
    });
    var _page = {
        openPage: function () {
            _g.openWin({
                name: 'home-index',
                url: '../home/index_frame.html',
                bounces: true,
            });
        },
    };
    var sendApi = {};


    (function () {
    })();
    function closeImg(){
      var photoBrowser = api.require('photoBrowser');
      photoBrowser.close();
    }

    module.exports = {};
});
