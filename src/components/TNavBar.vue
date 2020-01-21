<template>
  <div class="nav-bar">
    <van-row type="flex" align="center">
      <van-col span="3" @click="onClickLeft(statusData)"><van-icon name="arrow-left" /></van-col>
      <van-col span="18">{{navTitle}}</van-col>
      <van-col span="3"></van-col>
    </van-row>
  </div>
</template>

<script>
import { finished } from 'stream'
import { Dialog } from 'vant'
export default {
  props: {
    navTitle: String,
    statusData: Object
  },
  methods: {
    onClickLeft (statusData) {
      console.log(statusData)
      if (statusData) {
        if (!statusData.name) {
          this.$router.go(-1)
        } else if (statusData.name === 'answer' && !statusData.finished) {
          Dialog.confirm({
            title: '温馨提示',
            message: '正在答题，请勿离开；否则本次答题无效'
          }).then(() => {
            this.$router.go(-1)
          }).catch(() => {
            
          })
        } else if(statusData.name === 'my') {
          this.$router.push({name: 'my'})
        }
      } else {
        this.$router.push({name: 'my'})
      }
    }
  }
}
</script>

<style lang="scss">
.nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  height: .7rem;
  line-height: .7rem;
  color: #fff;
  z-index: 99999;
  .van-row {
    text-align: center;
  }
}
</style>
