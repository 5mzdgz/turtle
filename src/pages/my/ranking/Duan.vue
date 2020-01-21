<template>
  <div class="duan">
    <t-nav-bar :navTitle='navTitle'/>
    <div class="img-box">
      <img src="@/assets/images/duan.gif" alt="">
      <div class="content">
        <van-row class="navTitle" type="flex" align="center">
          <van-col span="12">段位</van-col>
          <van-col span="12">积分</van-col>
        </van-row>
        <van-row type="flex" align="center" v-for="(item, index) of duanArr" :key="index">
          <van-col span="12">{{item.rankDesc}}</van-col>
          <van-col span="12">{{item.minRank}}-{{item.maxRank}}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/api'
export default {
  name: 'duan',
  data () {
    return {
      navTitle: '段位说明',
      duanArr: []
    }
  },
  mounted () {
    this.getrule(1, 50)
  },
  methods: {
    /**
     * 获取段位规则
     */
    async getrule (page, pageSize) {
      const res = await Api.duanData(page, pageSize)
      this.duanArr = res.data.data.records.reverse()
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.duan {
  .img-box {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 179%;
    img {
      width: 100%;
    }
    .content {
      position: absolute;
      top: 2rem;
      margin: 0 4%;
      width: 92%;
      z-index: 222;
      .van-row {
        text-align: center;
        height: .7rem;
        &.navTitle {
          height: .9rem;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
