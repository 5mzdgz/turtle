<template>
  <div class="ranking">
    <t-nav-bar :navTitle='navTitle'/>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="img-box">
        <img src="@/assets/images/ranking.png" alt="">
      </div>
      <div class="ranking-box">
        <div class="ranking-top"> 
          <div class="ranking-item">
            <span class="iconfont ranking-img">&#xe66b;</span>
            <img class="head-img" :src="twoData.loginUser.headimgurl" alt="">
            <p class="user-name">{{twoData.loginUser.nickname}}</p>
            <p class="score">总得分 : {{twoData.fraction}}</p>
          </div>
          <div class="ranking-item">
            <span class="iconfont ranking-img">&#xe66d;</span>
            <img class="head-img" :src="fristData.loginUser.headimgurl" alt="">
            <p class="user-name">{{fristData.loginUser.nickname}}</p>
            <p class="score">总得分 : {{fristData.fraction}}</p>
          </div>
          <div class="ranking-item">
            <span class="iconfont ranking-img">&#xe66c;</span>
            <img class="head-img" :src="threeData.loginUser.headimgurl" alt="">
            <p class="user-name">{{threeData.loginUser.nickname}}</p>
            <p class="score">总得分 : {{threeData.fraction}}</p>
          </div>
        </div>
        <div class="ranking-bottom" v-if="rankingArr.length > 0">
          <van-row type="flex" align="center" v-for="(item, index) of rankingArr" :key="index">
            <van-col class="dese" span="3">{{index + 4}}</van-col>
            <van-col span="4"><img :src="item.loginUser.headimgurl" alt=""></van-col>
            <van-col class="user-name ellipsis-1" span="10">{{item.loginUser.nickname}}</van-col>
            <van-col class="score" span="7">总得分 : {{item.fraction}}</van-col>
          </van-row>
        </div>

        <button class="tips" v-if="rankingArr.length === 0" @click="goAnswersClick">每日排行答题，抢夺第一！</button>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import Api from '@/api/api'
export default {
  name: 'ranking',
  data () {
    return {
      navTitle: '排行榜',
      isLoading: false,
      REQUIRE: true,
      fristData: {
        iconfont: '&#xe66b;',
        loginUser: { headimgurl: require('@/assets/images/headImg.gif'), nickname: '暂存' },
        fraction: '暂存'
      },
      twoData: {
        iconfont: '&#xe66c;',
        loginUser: { headimgurl: require('@/assets/images/headImg.gif'), nickname: '暂存' },
        fraction: '暂存'
      },
      threeData: {
        iconfont: '&#xe66d;',
        loginUser: { headimgurl: require('@/assets/images/headImg.gif'), nickname: '暂存' },
        fraction: '暂存'
      },
      rankingArr: [],
      page: 1,
      pageSize: 25
    }
  },
  mounted () {
    this.getRanking(this.page, this.pageSize)
    window.addEventListener("scroll", this.scrollBottom)
  },
  methods: {
    /**
     * 上拉刷新
     */
    onRefresh() {
      console.log(111)
      this.page = 1
      this.getRanking(1, 25)
    },
    /**
     * 滚动到地方加载更多
     */
    scrollBottom() {
      // 滚动到页面底部时
      // console.log(window.screen.height, document.body.scrollTop, document.body.clientHeight)
     if (((window.screen.height + document.body.scrollTop) > (document.body.clientHeight)) && this.REQUIRE) {
        this.page++
        this.getRanking(this.page, this.pageSize)
      }
    },
    /**
     * 获取，抽取123名
     */
    async getRanking (page, pageSize) {
      const res = await Api.rankingData(page, pageSize)
      this.isLoading = false
      let { code, data } = res.data
      if (page > 1) {
        if (data.length > 0) {
          data.forEach(element => {
            this.rankingArr.push(element)
          })
        } else {
          this.REQUIRE = false
        }
        console.log(data)
        console.log(this.rankingArr)
      } else {
        console.log(data)
        console.log(this.rankingArr)
        if (data.length === 1) {
          this.fristData = data[0]
        } else if (data.length === 2) {
          this.fristData = data[0]
          this.twoData = data[1]
        }

        if (data.length >= 3) {
          this.fristData = data[0]
          this.twoData = data[1]
          this.threeData = data[2]
          this.rankingArr = data.slice(3, data.length)
        }
      }
    },
    goAnswersClick () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.ranking {
  position: relative;
  .img-box {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 179%;
    img {
      width: 100%;
    }
  }
  .ranking-box {
    position: absolute;
    top: 2rem;
    left: 1%;
    width: 98%;
    border-radius: .12rem;
    background-color: #fff;
    padding-bottom: .2rem;
    .ranking-top {
      display: flex;
      flex-direction: row;
      .ranking-item {
        text-align: center;
        position: relative;
        &:nth-child(1) {
          border-right: 1px solid rgba(255,194, 0, .8);
          flex: 1;
          .ranking-img {
            color: #c5d2ff;
            font-size: .5rem;
          }
        }
        &:nth-child(2) {
          margin-top: -.4rem;
          background-color: #fff;
          border-top-left-radius: .08rem;
          border-top-right-radius: .08rem;
          flex: 1.2;
          .head-img {
            width: 1rem;
            height: 1rem;
          }
          .ranking-img {
            left: 40%;
            color: #fcd115;
            font-size: .5rem;
          }
        }
        &:nth-child(3) {
          border-left: 1px solid rgba(255,194, 0, .8);
          flex: 1;
        }
        .ranking-img {
          position: absolute;
          top: -.4rem;
          left: 38%;
          width: .5rem;
          height: .5rem;
          color: #ff96ad;
          font-size: .5rem;
        }
        .head-img {
          width: .8rem;
          height: .8rem;
          border-radius: 100%;
          box-shadow: 0px 2px 5px rgb(230, 68, 78);
          margin-top: .5rem;
        }
        .user-name {
          padding: .2rem 0;
        }
        .score {
          font-size: .25rem;
          color: rgb(255, 109, 75);
        }
      }
    }
    .ranking-bottom {
      overflow: hidden;
      height: 100%;
      margin-top: .6rem;
      padding: 0 .2rem;
      .van-row {
        padding: .2rem 0;
        border-bottom: 1px solid rgba(74, 76, 244, .1);
        img {
          width: .7rem;
          height: .7rem;
          border-radius: 100%;
        }
        .dese {
          text-align: center;
        }
        .user-name {
          font-weight: 550;
        }
        .score {
          font-size: .25rem;
          text-align: right;
          color: rgb(255, 109, 75);
        }
      }
    }
    .tips {
      margin: 10%;
      width: 80%;
      height: .5rem;
      color: #fff;
      border-radius: .16rem;
      background:linear-gradient(#f0787a, #c70a0a);
    }
  }
}
</style>
