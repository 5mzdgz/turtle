<template>
  <div class="login" :style="{height:(height)+'px'}">
    <dl>
      <dd><router-link to="/home"><span class="canenl">×</span></router-link></dd>
      <dd class="wx-title">
        <span class="title">微信登录</span>
        <p class="sub">微信安全登录</p>
      </dd>
    </dl>
    <div class="content">
      <img src="@/assets/images/uy.png" alt="">
      <p class="com-name">贵港红色主题公园知识答题</p>
      <p class="com-name">灵龟宝山</p>
      <p class="auth">网页由改公众号开发，请确认授权一下信息</p>
      <p class="user-info">·获取你的公开信息（昵称、头像）</p>
    </div>
    <button @click="login">确认登录</button>
  </div>
</template>

<script>
import Api from '@/api/api'

export default {
  name: 'login',
  data () {
    return {

    }
  },
  async beforeCreate() {
    const code = this.$route.query.code
    console.log('code', code)
    if (code) {
      const res = await Api.loginData(code)
      console.log(res)
      const token = JSON.parse(res.data.data[1]).token
      console.log('token', token)
      localStorage.setItem('token', token)
      localStorage.setItem('userId', res.data.data[0])
      this.$store.dispatch('userId', res.data.data[0])
      
      const currentLogin = JSON.parse(sessionStorage.getItem('currentLogin'))
      this.$router.push({name: currentLogin})
    }
  },
  created () {
    this.height = window.innerHeight
  },
  methods: {
    async login() {
      const isLogin = await Api.loginToken()
      console.log(isLogin)
      if (isLogin) {
        const currentLogin = JSON.parse(sessionStorage.getItem('currentLogin'))
        this.$router.push({name: currentLogin})
      } else {
        const appid = 'wxaba6a5ab4077c3d7'
        const secret = 'dea229347b02e410ead0ee41aafa5fcb'
        const redirect_uri = encodeURI(window.location.href)
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
        window.location.href = encodeURI(url)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    background: #fff;
    dl {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: .8rem;
      padding: 0 .3rem;
      background-color: rgba(77, 74, 89, 0.95);
      color: #fff;
      dd {
        &.wx-title {
          padding: 0 .3rem;
          border-left: 2px solid #333;
        }
        .canenl {
          font-size: .6rem;
          margin-right: .2rem;
        }
        .sub {
          font-size: .2rem;
          color: #bfbbbb;
          margin-top: .1rem;
        }
      }
    }
    .content {
      text-align: center;
      img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 100%;
        margin-top: 1.5rem;
      }
      .com-name {
        font-size: .3rem;
        font-weight: 700;
        margin-top: .2rem;
      }
      .auth {
        margin-top: 1.2rem;
      }
      .user-info {
        margin-top: .6rem;
        color: #aaa;
      }
    }
    button {
      width: 80%;
      margin-left: 10%;
      height: .8rem;
      margin-top: 1rem;
      background: #03BD00;
      color: #fff;
    }
  }
</style>