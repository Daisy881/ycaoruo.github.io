<template>
	<div class="pay-container">
    <div class="logoClass">
      <img src="../../icons/img/图标.png" style="width: 210px; height: 100px;">
    </div>
		<div class="border-main">
			<div style="text-align: center; margin-bottom: 20px;">
				<div class="payTime">支付剩余时间：{{this.minutes}}分{{this.seconds}}秒</div>
				<div style="font-size: 24px;">￥21.00</div>
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
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
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
	export default {
		name: 'pay',
		data() {
			return {
				id: 1,
				minutes: 20,
				seconds: 0,
				dialogVisible: false,
				number: ''
			}
		},
		components: {
			copyright
		},
		mounted(){
			this.add()
			this.orderNumber()
		},
		watch: {
      second: {
        handler (newVal) {
          this.num(newVal)
        }
      },
      minute: {
        handler (newVal) {
          this.num(newVal)
        }
      }
    },
    computed: {
      second() {
        return this.num(this.seconds)
      },
      minute() {
        return this.num(this.minutes)
      }
    },
		methods: {
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

			},
			num(n) {
        return n < 10 ? '0' + n : '' + n
      },
      // 倒计时
      add() {
        let time = window.setInterval(() => {
          if (this.seconds === 0 && this.minutes !== 0) {
            this.seconds = 59
            this.minutes -= 1
          } else if (this.minutes === 0 && this.seconds === 0) {
            this.seconds = 0
            this.dialogVisible = true
            window.clearInterval(time)
          } else {
            this.seconds -= 1
          }
        }, 1000)
      },
      confirm() {
      	this.dialogVisible = false
      	this.$router.push({
      		name: 'orderManagement',
      		query: {
      			id: '1'
      		}
      	})
      },
      // 生成订单号 4位随机数+当前时间+4位随机数
      orderNumber(t) {
      	let nowTime = new Date() 
      	let tY = nowTime.getFullYear() // 年
      	let tM = nowTime.getMonth() + 1 // 月
      	let tD = nowTime.getDate() // 日
      	let tH = nowTime.getHours() // 时
      	let mm = nowTime.getMinutes() // 分
      	let mr = Math.floor(Math.random() * 10000)
        let mr2 = Math.floor(Math.random() * 10000)
      	if (tY >= 1 && tY <= 9) {
      		tY = "0" + tY
      	}
      	if (tM >= 1 && tM <= 9) {
      		tM = "0" + tM
      	}
      	if (tD >= 1 && tD <= 9) {
      		tD = "0" + tD
      	}
      	if (tH >= 1 && tH <= 9) {
      		tH = "0" + tH
      	}
      	if (mm >= 1 && mm <= 9) {
      		mm = "0" + mm
      	}
        console.log(typeof tM)
      	this.number = mr + '' + tY + tM + tD + tH + mm + mr2
      }
		}
	}
</script>

<style scoped>

</style>