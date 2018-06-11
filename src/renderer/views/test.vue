<template lang="pug">
  div
    ul.menu-list
      router-link(to="/home") test      
      router-link(to="/home") 首页
      router-link(to="/shequ") 社区
      router-link(to="/shici") shici
      router-link(to="/shuji") shuji
      router-link(to="/baodao") baodao
      router-link(to="/caidan") caidan
      router-link(to="/dangdaibiao") dangdaibiao
      router-link(to="/dangri") dangri
      router-link(to="/fengcai") fengcai
      router-link(to="/gongyi") gongyi                                            
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.menu-list
  display flex
  flex-direction column
</style>
