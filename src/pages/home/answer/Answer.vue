<template>
  <div class="answer">
    <t-nav-bar :navTitle='navTitle' :statusData="statusData"/>
    <van-loading v-if="!currentArr.length || isDisabled" size="24px">加载中...</van-loading>
    <div v-else>
      <div class="img-box">
        <img src="@/assets/images/answer.gif" alt="">
        <div class="content" v-if="!statusData.finished">
          <div class="count">
            <!-- <van-count-down
              class="time"
              ref="countDown"
              :time="time"
              :auto-start="true"
              format="mm:ss"
              @finish="finish"
            /> -->
            <span class="num">{{index}}/50</span>
          </div>
          <p class="subject">{{currentData.desct}}</p>
          <van-radio-group v-model="radio" :disabled="disabled">
            <van-radio name="A">A. {{currentData.answerA}}</van-radio>
            <van-radio name="B">B. {{currentData.answerB}}</van-radio>
            <van-radio name="C">C. {{currentData.answerC}}</van-radio>
            <van-radio name="D" v-if="currentData.answerD !=' '">D. {{currentData.answerD}}</van-radio>
          </van-radio-group>
          <div class="content-bottom" v-if="!statusData.finished">
            <span>每题{{branch}}分</span>
            <p>
              <span class="left">本题正确答案 : {{disabled?currentData.correctAnswer:''}}</span>
              <span class="right">本题参与 : {{currentData.statistics}}人</span>
            </p>
          </div>
        </div>
        <div class="finished" v-if="statusData.finished">
          <p>本次答题得分</p>
          <span>{{score}}</span>
        </div>
      </div>
      <div class="btn" v-if="statusData.finished">
        <button class="last" @click="myClick">个人中心</button>
        <button class="next" @click="socreClick">积分排行</button>
      </div>
      <div class="btn" v-if="!statusData.finished">
        <button class="last" @click="lastClick(currentData)" v-if="index > 1">上一题</button>
        <button class="next" :disabled="isDisabled" @click="nextClick(currentData)">{{index===50?'提交':'下一题'}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/api'
export default {
  name: 'answer',
  data () {
    return {
      navTitle: '正在答题',
      statusData: {
        name: 'answer',
        finished: false,
      },
      disabled: false,
      isDisabled: false,
      radio: '',
      index: 1,
      currentData: {},
      currentArr: [],
      page: 1,
      pageSize: 50,
      arr: [],
      time: 30 * 60 * 1000 / 6,
      score: 0,
      branch: 2
    }
  },
  watch: {
    radio: function(newVal, oldVal) {
      this.currentArr[this.index - 1].radio = newVal
      if (newVal != '') {
        this.currentData.disabled = true
        this.disabled = true
      } else {
        this.currentData.disabled = false
        this.disabled = false
      }
    }
  },
  mounted () {
    this.getAnswerArr(this.page, this.pageSize)
  },
  methods: {
    myClick () {
      this.statusData.name = 'my'
      this.$router.push('/my')
    },
    socreClick () {
      this.statusData.name = 'ranking'
      this.$router.push('/my/ranking')
    },
    /**
     * 倒计时结束
     */
    finish() {
      this.saveConfrim()
    },
    /**
     * 获取题库
     */
    async getAnswerArr (page, pageSize) {
      const res = await Api.answerData(page, pageSize)
      let { code, data } = res.data
      let disabled = false
      data.forEach(item => {
        item.disabled = disabled
      })
      this.currentArr = data[0].records.sort(function(a, b) { return a.questionIndex > b.questionIndex ? 1 : -1 })
      this.currentData = data[0].records[0]
      this.branch = data[1].questionRule
    },
    /**
     * 上一题
     */
    lastClick () {
      this.index--
      if (this.index === 1) {
        this.index = 1
      }
      this.currentData = this.currentArr[this.index - 1]
      this.radio = this.currentArr[this.index - 1].radio
      this.disabled = this.currentArr[this.index - 1].disabled
    },
    /**
     * 下一步
     */
    nextClick (currentData) {
      if (currentData.radio === '') {
        this.disabled = false
        return false
      }

      if (this.currentArr[this.index]) {
        this.radio = this.currentArr[this.index].radio
        this.disabled = this.currentArr[this.index].disabled
      }

      this.index++
      if (this.index === 51) {
        this.index = 50
        this.saveConfrim()
      }
      this.currentData = this.currentArr[this.index - 1]
      console.log(this.currentData)
      if (!this.currentData.radio) {
        this.radio = ''
      }
    },
    /**
     * 提交答题
     */
    async saveConfrim () {
      this.navTitle = '正在统计分数···'
      this.isDisabled = true
      const userId = this.$store.state.userId || localStorage.getItem('userId')
      this.currentArr.forEach(item => {
        const obj = {
          userId: userId,
          questionId: item.questionId,
          questionIndex: item.questionIndex,
          questionType: item.questionType,
          userSelectAnswer: item.radio,
          questionAnswer: item.correctAnswer
        }
        this.arr.push(obj)
      })
      console.log(this.arr)
      const objs = {
        answerEntityList: this.arr
      }
      const res = await Api.comfrimAnswer(objs)
      this.navTitle = '答题结果'
      console.log(res)
      let { code, data } = res.data
      if (code === 200) {
        this.isDisabled = false
        this.statusData.finished = true
        this.score = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.answer {
  position:relative;
  .van-loading {
    margin:auto;
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-50px;
    margin-top:-50px;
  }
  div {
    .img-box {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-bottom: 170.66%;
      img {
        width: 100%;
      }
      .content {
        position: absolute;
        top: 2.45rem;
        z-index: 11;
        padding: 0 .6rem;
        height: 7.2rem;
        font-size: .25rem;
        font-weight: 600;
        width: 82%;
        .count {
          width: 100%;
          font-size: .24rem;
          width: 100%;
          text-align: center;
          color: #fff;
          margin-top: .16rem;
          overflow: hidden;
          clear: both;
          .time {
            float: left;
            color: #333;
          }
          .num {
            // float: left;
            // margin-left: 1.8rem;
          }
        }
        .subject {
          overflow-y: auto;
          text-indent: .4rem;
          text-align: justify;
          margin-top: .6rem;
          line-height: .35rem;
          letter-spacing: 2px;
          margin-bottom: .2rem;
        }
        .van-radio-group {
          .van-radio {
            padding: .1rem 0;
          }
        }
        .content-bottom {
          position: absolute;
          bottom: .1rem;
          right: -.1rem;
          z-index: 11;
          padding: 0 .6rem;
          font-size: .2rem;
          font-weight: 600;
          height: .8rem;
          line-height: .4rem;
          text-align: right;
          .left {
            margin-right: .3rem;
          }
        }
      }
      .finished {
        position: absolute;
        top: 5rem;
        z-index: 11;
        padding: 0 .6rem;
        font-size: .2rem;
        font-weight: 600;
        width: 82%;
        text-align: center;
        p {
          font-size: .3rem;
          margin-bottom: .5rem;
        }
        span {
          font-size: 1rem;
        }
      }
    }
    .btn {
      position: fixed;
      bottom: .3rem;
      width: 100%;
      height: .6rem;
      text-align: center;
      button {
        width: 2rem;
        height: .6rem;
        line-height: .6rem;
        background:linear-gradient(#f0787a, #c70a0a);
        border-radius: .1rem;
        color: #fff;
        overflow: hidden;
        &.last {
          margin-right: .5rem;
        }
      }
    }
  }
}
</style>
