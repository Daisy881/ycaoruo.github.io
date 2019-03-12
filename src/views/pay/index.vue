<template>
	<div class="pay-container">
    <div class="logoClass">
      <img src="../../icons/img/图标.png" style="width: 210px; height: 100px;">
    </div>
		<div class="border-main">
			<div style="text-align: center; margin-bottom: 20px;">
				<div class="payTime">支付剩余时间：{{this.startTime}}</div>
				<div style="font-size: 24px;">￥{{price}}</div>
				<div class="merchant-order">订单号：{{this.number}}</div>
			</div>
			<div class="payWay" @click="doBankCard">银行卡支付
				<img src="@/icons/img/勾选.png" class="chooseImg" v-if="id === 1"/>
				<img src="@/icons/img/未勾选.png" class="chooseImg" v-else/>
			</div>
			<div class="payWay" @click="doWechatPay">微信支付
				<img src="@/icons/img/勾选.png" class="chooseImg chooseImgs" v-if="id === 2"/>
				<img src="@/icons/img/未勾选.png" class="chooseImg chooseImgs" v-else/>
			</div>
			<div class="payWay" @click="doAlipay">支付宝支付
				<img src="@/icons/img/勾选.png" class="chooseImg" v-if="id === 3"/>
				<img src="@/icons/img/未勾选.png" class="chooseImg" v-else/>
			</div>
			<div class="payWay" @click="doQQPay">QQ钱包&nbsp;&nbsp;
				<img src="@/icons/img/勾选.png" class="chooseImg chooseImgs" v-if="id === 4"/>
				<img src="@/icons/img/未勾选.png" class="chooseImg chooseImgs" v-else/>
			</div>
			<div class="payButton" @click="doPay">支付</div>
		</div> 
		<el-dialog title="提示" :visible.sync="dialogVisible" :closeOnClickModal="false" :showClose="false" width="30%" center>
			<span style="margin-left: 90px;">支付时间已失效，请重新下单支付！</span>
			<span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="confirm">确 定</el-button>
		  </span>
		</el-dialog>
		<copyright></copyright>
	</div>
</template>

<script>
	import copyright from '@/views/copyright/index'
  import Cookies from 'js-cookie'
	export default {
		name: 'pay',
		data() {
			return {
				id: 1,
        startTime: '',
        lockSeconds: 5,
				number: '',
        dialogVisible: false,
        listQuery: []
			}
		},
		components: {
			copyright
		},
		mounted(){
      this.number = Cookies.get('number')
      this.getTime()
      this.listQuery = this.$route.params.shoppingCarList
		},
    computed: {
      price() {
        return Cookies.get('price')
      },
    },
		methods: {
      // 读取cookies
      getTime() {
        // cookies存在
        if(Cookies.get('endTime')) {
          // 当前时间戳
          let nowTime = new Date()
          let d = new Date(nowTime)
          let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
          // 结束时间与当前时间差值（秒）
          this.lockSeconds = Cookies.get('endTime') - this.timeToSec(time)
          if (this.lockSeconds <= 0) { // 结束时间与当前时间差值小于0 时间结束
            this.dialogVisible = true
            Cookies.set('endTime', '')
          } else { // 时间未结束
            this.continueTime(this.lockSeconds)
          }
        } else {
          this.continueTime(this.lockSeconds)
        }
      },
      // 倒计时
      continueTime(lockSeconds) {
        //1.获取当前系统时间戳
        let nowTime = new Date()
        let d = new Date(nowTime)
        let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
        //2.获取 lockSeconds 后的系统时间
        time = lockSeconds + this.timeToSec(time)
        //3.用cookie保存到期时间
        Cookies.set('endTime', time)
        // 使用结束时间与当前时间的差值作为倒计时
        this.startTime = this.secToTime(lockSeconds) 
        // 根据lockSeconds倒计时
        let timer = window.setInterval(() => {
          if (lockSeconds > 0) {
            lockSeconds --
            this.startTime = this.secToTime(lockSeconds)
          } else {
            this.dialogVisible = true
            window.clearInterval(timer)
            Cookies.set('endTime', '')
          }
        }, 1000)
      },
      // 将时间转为秒
      timeToSec(time) {
        let hour = time.split(':')[0]
        let min = time.split(':')[1]
        let sec = time.split(':')[2]
        return parseInt(hour * 3600) + parseInt(min * 60) + parseInt(sec)
      },
      // 将秒转为 分:秒
      secToTime(time) {
        let t = ''
        if (time >= 0) {
          let min = Math.floor(time/60) % 60
          let sec = time % 60
          if (min < 10) {
            t = '0'
          }
          t += min + '分'
          if (sec < 10) {
            t += '0'
          }
          t += sec + '秒'
        }
        return t
      },
			doBankCard() {
				this.id = 1
			},
			doWechatPay() {
				this.id = 2
			},
			doAlipay() {
				this.id = 3
			},
			doQQPay() {
				this.id = 4
			},
			doPay() {
        // this.$router.push({
        //   name: ''
        // })
			},
      // 订单超时
      confirm() {
      	this.dialogVisible = false
      	this.$router.push({
      		name: 'orderManagement',
          params: { shoppingCarList: this.listQuery }
      	})
      }
		}
	}
</script>

<style scoped>

</style>