import request from "../../utils/request.js"
Page({
  data:{
    navigation:[],
    current:0
  },
  onLoad() {
    request({
      url: "/categories"
    }).then(res=>{
      const { message } = res.data
      console.log(message)
      this.setData({
        navigation : message
      })
    })
  },
  handclick(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      current : index
    })
  }
})