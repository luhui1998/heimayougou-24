import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    goods: [],
    allprice: 0,
    numner: 1

  },
  onLoad() {
    this.setData({
      address: wx.getStorageSync("address") || {}
    })
  },
  onShow() {
    this.setData({
        goods: wx.getStorageSync('goods')
      }),
      this.handallprice();
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
        wx.setStorageSync("address", this.data.address)
      }
    })
  },
  handallprice() {
    let price = 0;
    this.data.goods.forEach(v => {
      if(v.selete){
        price += v.goods_price * v.number
      }
    })
    this.setData({
      allprice: price,
    })
    wx.setStorageSync('goods', this.data.goods)
  },
  handnumber(e) {
    const {
      index,
      number
    } = e.currentTarget.dataset
    this.data.goods[index].number += number
    if (this.data.goods[index].number === 0) {
      wx.showModal({
        title: '提示',
        content: '是否删除',
        success: (res) => {
          if (res.confirm) {
            this.data.goods.splice(index, 1)
          } else {
            this.data.goods[index].number += 1
          }
          this.setData({
            goods: this.data.goods
          })
         
        }
      })
    }
    this.setData({
      goods: this.data.goods
    })
    this.handallprice();
  },
  handblur(e){
    const { index}= e.currentTarget.dataset;
    let {value} = e.detail
    value = Math.floor(Number(value))
    if(value <= 0){
      value = 1
    }
    this.data.goods[index].number = Number(value)
    console.log(e)
    this.setData({
      goods: this.data.goods
    })
    this.handallprice();
  },
  handclickicon(e){
    const { index } = e.currentTarget.dataset;
    const { selete } = this.data.goods[index];
    this.data.goods[index].selete = !selete
    this.setData({
      goods: this.data.goods
    })
    this.handallprice();
  }
})