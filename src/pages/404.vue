<template>
  <div class="notfound">
    <span class="text">404</span>
  </div>
</template>

<script>

  export default {
    data () {
      return {

      }
    },
  }

</script>

<style lang="scss" scoped>
.notfound {
  .text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 48px;
    font-weight: 600;
  }
}
</style>