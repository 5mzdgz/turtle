<template>
  <div class="home">
    <div class="home-img">
      <img :src="homeImg" alt="">
      <router-link to="/home/answer">
        <button>开始答题</button>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      homeImg: require('@/assets/images/homeImg.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .home-img {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 179%;
    position: relative;
    img {
      width: 100%;
    }
    button {
      position: absolute;
      bottom: 1.7rem;
      width: 50%;
      left: 25%;
      height: .8rem;
      border-radius: .4rem;
      background-color: rgb(255,194, 0);
      color: rgb(253, 48, 48);
      font-size: .35rem;
      box-shadow: inset -3px -3px 5px rgb(255, 137, 0);
    }
  }
}
</style>
