<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  watch: {
    '$route.name': function (newVal, oldVal) {
      // console.log(newVal, oldVal)
      if(newVal.indexOf('login') >= 0 && oldVal && oldVal.indexOf('login') < 0) {
        sessionStorage.setItem('currentLogin', JSON.stringify(oldVal))
      }
		} 
  },
  methods: {

  }
}
</script>

<style lang="scss">

</style>
