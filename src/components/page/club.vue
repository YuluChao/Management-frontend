<template>
	<div id="club">
		<navbar></navbar>
    <div class="club-content">
      <menubar></menubar>
      <router-view></router-view>    
    </div>
	</div>
</template>

<script>
import navbar from '../common/navbar'
import menubar from '../common/menubar'
export default {
  name: 'basic',
  components: {
    navbar,
    menubar
  }
}
</script>

<style>
#club{
  width: 100%;
  min-width: 1170px;
}
#club .club-content{
  width: 1170px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
