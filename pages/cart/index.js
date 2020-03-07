import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}
  },
  onLoad() {
    this.setData({
      address: wx.getStorage("address") || {}
    })
  },
  handleGetAdd(e) {
    wx.chooseAddress({
      success: (res) => {
        // console.log(res.userName)
        // console.log(res.postalCode)
        // console.log(res.provinceName)
        // console.log(res.cityName)
        // console.log(res.countyName)
        // console.log(res.detailInfo)
        // console.log(res.nationalCode)
        // console.log(res.telNumber)
        this.setData({
          address: {
            name: res.userName,
            tel: res.telNumber,
            detail: res.provinceName + res.postalCode + res.provinceName + res.cityName
          }

        })
        wx.setStorageSync('address', this.data.address)
      }
    })
  }

})