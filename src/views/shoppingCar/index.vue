<template>
	<div class="shoppingCar-container">
		<div class="product-nums" v-for="(item, index) in this.listQuery" :key="index">
			<el-row :gutter="0">
				<el-col :span="19">{{item.shops_Name}}</el-col>
				<el-col :span="5">
					<el-button size="mini" @click="delGoods(item)">删除</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="0">
				<el-col :span="24" style="height: 50px">
					<img src="../../icons/img/商品1.png" class="product-img" />
				</el-col>
			</el-row>
			<div style="width: 300px; height: auto; float: right; position: relative; top: -50px;">
				<el-row :gutter="0">
					<el-col :span="24">
						<span class="">{{item.shops_goodsName}}</span>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :span="9" style="color: red;">￥{{item.shops_price | priceFormat}}</el-col>
					<el-col :span="12">
						<el-input-number size="mini" v-model="item.shops_count" :min="1" @change="calTotalPrice(item)"></el-input-number>
					</el-col>
				</el-row>
			</div>
		</div>
		<div v-show="this.listQuery.length===0" style="margin: 20px 100px;">对不起，没有任何商品！</div>
		<div style="background-color: #66B0FF; height: 80px;">
			<div class="total-font">合计：</div>
			<div class="total-nums">￥{{this.totalPrice | priceFormat}}</div>
			<div class="calculate-total" @click="doCount(totalPrice)">去结算</div>
		</div>
	</div>
</template>

<script>
	import { getList, editGoodsCount,  delGoods, delAllGoods } from '@/api/frame/shoppingCar'
  import Cookies from 'js-cookie'
	export default {
		name: 'shoppingCar',
		data(){
			return {
    		listQuery: [],
    		totalPrice: 0,
    		number: 0
			}
		},
		mounted () {
			this.getList()
      this.number = this.orderNumber()
		},
		methods: {
			//初始化
			getList() {
				getList(sessionStorage.getItem('username'))
				 .then(response => {
				 		this.listQuery = response.data
						this.calTotalPrice()
				 }).catch(() => {
				 		return false
				 })
			},
			delGoods(params) {
				delGoods(params.id)
				 .then(response => {
				 		this.getList()
				 })
			},
			// 计算总价 并把当前数量传到页面上
			calTotalPrice(params) {
				this.totalPrice = 0
				for(const i in this.listQuery) {
					this.totalPrice += this.listQuery[i].shops_price * this.listQuery[i].shops_count
				}
				this.$emit('setCountToHomeTop', params.shops_count)
				const paramsInfo = {
					count: params.shops_count,
					id: params.id
				}
				editGoodsCount(paramsInfo)
				 .then(response => { })
				 .catch(() => { })
			},
			doCount(prop){
				// 清空购物车
				delAllGoods(sessionStorage.getItem('username'))
				 .then(response => { })
				 .catch(() => { })
        this.$store.dispatch('setNumber', this.number)
				this.$store.dispatch('setPrice', prop)
				this.$router.push({
					name: 'pay',
					params: { 
						shoppingCarList: this.listQuery
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
      	return mr + '' + tY + tM + tD + tH + mm + mr2
      }
		}
	}
</script>
