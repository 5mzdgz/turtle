<template>
  <div class="my" :style="{height:(height)+'px'}">
    <div class="top-img">
      <img :src="my_top" alt="">
    </div>
    <div class="user-box">
      <div class="headImg-box">
        <img :src="headimgurl" alt="">
      </div>
      <div class="duan" v-if="userId"><router-link to="/my/duan" style="color: #fff;"><span>{{rankDesc?rankDesc:'书童'}}</span></router-link></div>
      <div v-if="userId">
        <p class="user-name">昵称: {{username}}</p>
        <p class="integral">积分: {{fraction?fraction:'0'}}</p>
      </div>
      <p v-if="!userId" class="login" @click="loginClick">点击登录</p>
    </div>
    <div class="item">
      <div class="item-box" v-for="(item, index) of itembox" :key="index" @click="goItemClick(index)">
        <span>{{item}}</span>
        <van-icon name="arrow" color="#aaa" />
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/api'
export default {
  name: 'my',
  data () {
    return {
      my_top: require('@/assets/images/my_top.png'),
      itembox: ['积分排行榜', '段位说明'],
      headimgurl: '',
      rankDesc: '',
      username: '',
      fraction: '',
      height: 0,
      userId: null
    }
  },
  created () {
    this.userId = localStorage.getItem('userId')
    this.height = window.innerHeight
    if (this.userId) {
      this.getUserInfo()
    }
  },
  methods: {
    loginClick() {
      this.$router.push('/login')
    },
    /**
     * 获取用户信息
     * @param {id}
     */
    async getUserInfo () {
      const userId = this.$store.state.userId || localStorage.getItem('userId')
      const res = await Api.userData(userId)
      this.headimgurl = res.data.data.loginUser.headimgurl
      this.rankDesc = res.data.data.rankDesc
      this.username = res.data.data.loginUser.username
      this.fraction = res.data.data.fraction
      console.log(res)
    },
    goItemClick (index) {
      if (index === 0) {
        this.$router.push('/my/ranking')
      } else {
        this.$router.push('/my/duan')
      }
    },
    shouDuan () {}
  }
}
</script>

<style lang="scss" scoped>
.my {
  background: #fff;
  position: relative;
  .top-img {
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 57.6%;
    background-color: rgb(77, 77, 247);
    img {
      width: 100%;
    }
  }
  .user-box {
    display: flex;
    flex-direction: column;
    align-content: center;
    position: relative;
    margin-left: 4%;
    margin-top: -1rem;
    width: 92%;
    height: 2.4rem;
    text-align: center;
    border-radius: .16rem;
    background-color: #fff;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.16);
    font-size: .2rem;
    .headImg-box {
      position: absolute;
      top: -.8rem;
      left: 37%;
      width: 1.6rem;
      height: 1.6rem;
      background: #ddd;
      border-radius: 100%;
      box-shadow: 0px 2px 5px rgb(230, 68, 78);
      z-index: 999;
      img {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 100%;
        display: block;
      }
    }
    .duan {
      margin-top: .9rem;
      padding: .1rem 0;
      color: #fff;
      font-size: .16rem;
      span {
        display: block;
        background-color: rgb(0, 153, 68);
        max-width: 1rem;
        height: .13rem;
        padding: .1rem 0;
        border-radius: .07rem;
        margin: 0 auto;
      }
    }
    .login {
      width: 100%;
      font-size: .4rem;
      margin-top: 1.2rem;
    }
    .user-name {
      font-size: .3rem;
      padding-top: .2rem;
    }
    .integral {
      text-align: right;
      margin-top: .1rem;
      font-size: .25rem;
      padding-right: .1rem;
      color: rgb(244, 161, 45);
    }
  }
  .item {
    margin-top: .5rem;
    padding: 0 4%;
    .item-box {
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: space-between;
      padding: .25rem 0;
    }
  }
}
</style>
