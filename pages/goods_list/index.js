import request from "../../utils/request.js"
Page({
  data: {
    list:[],
    getIndex:0
  },
  onLoad() {
    request({
      url:"/goods/search"
    }).then(res=>{
      const { message } = res.data
      console.log(message)
      this.setData({
        list: message
      })
    })
  },
  handclick(e){
    const { index } = e.currentTarget.dataset
    this.setData({
      getIndex : index
    })
  }
})