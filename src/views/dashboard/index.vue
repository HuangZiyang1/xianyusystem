<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您：尊敬的管理员</div>
    <div style="width:200px;height:200px;background-color:pink">扫尼码</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VConsole from 'vconsole'
let vConsole = new VConsole();

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
