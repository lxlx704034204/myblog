# mpvue使用示例demo

## 操作全局变量

```
getApp().globalData.isPages = 0
```

## 缓存操作:

```
 this.userInfo = wx.getStorageSync('userInfo')
```

## 请求:

原生:

```js
import * as api from '@/utils/api'
var that = this
var userInfo = getApp().globalData.userInfo
var authorization = userInfo.userId + '_' + userInfo.token
wx.request({
  url: api.Logout,
  // data: {openid: getApp().globalData.openId, userNo: this.LoginName, password: this.loginPsw},
  method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  header: {
    'Content-Type': 'application/json',//application/x-www-form-urlencoded
    'authorization': authorization
  },
  success: res => {
      if (res.data.code === '200') {
          getApp().globalData.isLogin = false
    	  that.isLogin = false
      }    
  }
})
```

fly

```js
this.$http.post(api.MessageBoardAdd,
  {
    'content': that.commentText,
    'fromUserNo': userInfo.userNo,
    'replyMsgSysNo': that.type === 0 ? '' : that.msgList[that.chosedIndex].msgSysNo,
    'sourceKey': that.sourceKey,
    'sourceType': that.sourceType,
    'toUserNo': toUserNo
  })
  .then((res) => {
    if (res.data.code === '200') {
      console.log(res.data.data)
      that.getMsgList()
      that.commentText = ''
      wx.pageScrollTo({
        scrollTop: that.windowHeight + 100,
        duration: 300
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        duration: 2000,
        icon: 'none'
      })
    }
  }).catch(err => {
    console.log(err)
  })
```



## 跳转

跳转指定页面

```
const url = '../poDistribution/main'
wx.navigateTo({ url })
```

返回上一页

```
wx.navigateBack({ delta: 1 })// 返回上一页
```



## 提示

```js
          wx.showToast({
            title: '该用户不存在',
            icon: 'success',
            image: '../../static/images/fail_login.png',
            duration: 2000
          })
          
          //不显示图标，此时 title 文本最多可显示两行
          wx.showToast({
            title: '商品数量不能为字母',
            duration: 2000,
            icon: 'none'
          })
```



## 页面标题

```js
import Vue from 'vue'
import App from './login'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '登录'
  }
}

```



## 获取系统信息 屏幕高宽

```js
wx.getSystemInfo({
  success: res => {
    this.windowWidth = res.windowWidth
    this.windowHeight = res.windowHeight
  }
})
```

