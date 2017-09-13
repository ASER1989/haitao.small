// pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: "https://source.gsrunhe.com/tuj/",
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 600,
    imgUrls: [],
    idxItemlist: [],
    ctime: new Date(),

  },
  fn: {
    getT: function (valitime, ctime) {
      console.log("======================")
      var letime = valitime - ctime;
      var day = (letime / 1000 / 60 / 60 / 24).toFixed(0);
      var hour = (letime / 1000 / 60 / 60 % 24).toFixed(0);
      var min = (letime / 1000 / 60 % 60).toFixed(0);

      return { day: day, hour: hour, min: min };
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    wx.request({
      url: `https://source.gsrunhe.com/tuj/wx/sa/validAD`,
      success: function (data) {
        var data = data.data;
        if (data.obj != null && data.obj.length > 0) {

          that.setData({
            imgUrls: data.obj
          })
        }
      }
    });

    wx.request({
      url: 'https://source.gsrunhe.com/tuj/wx/sa/actlist',
      success: function (data) {
        var data = data.data;

        if (data.obj.content != null && data.obj.content.length > 0) {
          for (var i = 0, item; item = data.obj.content[i++];) {
            item.ltimestr = that.fn.getT(item.validtime, data.ctime)
          }
          that.setData({
            idxItemlist: data.obj.content
          })
          console.log(that, data)
        }

      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})