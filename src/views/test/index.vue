
<template>
  <div class="test">
    <h1>{{ msg }}你好你好你好好好好好好好好好。。。。</h1>
    <form>
      <!-- <input type="text" name="hostName" v-model="hostName"> <br>
      <input type="text" name="hostRoom" v-model="hostRoom"> <br>
      <a href="javascript:;" @click="addUser">提交</a> -->
    </form>
  </div>
</template>
 
<script>
export default {
  name: 'test',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hostName: '',
      hostRoom: ''
    }
  },
  methods: {
    addUser() {
      var hostName = this.hostName
      var hostRoom = this.hostRoom
      this.$axios.post('/api/user/addUser', {
        hostName: hostName,
        hostRoom: hostRoom
      },{}).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>