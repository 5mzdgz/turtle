<template>
  <div class="page">
    <router-view/>
    <van-tabbar v-model="active" :active="active" route>
      <van-tabbar-item to="/home">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active : icon.inactive"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>个人中心</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.myActive : icon.myInactive"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'page',
  data () {
    return {
      active: 0,
      icon: {
        active: require('@/assets/images/home_selected.gif'),
        inactive: require('@/assets/images/home_select.gif'),
        myActive: require('@/assets/images/my_selected.gif'),
        myInactive: require('@/assets/images/my_select.gif')
      }
    }
  }
}
</script>

<style lang="scss">
.van-tabbar {
  box-shadow: 2px 0px 20px rgba(57, 59, 213, .3);
}
</style>
