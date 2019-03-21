<template>
	<div class="shop-container">
		<home-top @setCount="getCount"></home-top>
		<div class="shopping-container">
		<div @click="goHome" class="goHome"><<<返回首页</div>
			<div class="leftFont">
				<div style="font-size: 18px;">{{listObj.shopsName}}</div>
				<el-rate v-model="listObj.shops_rate" disabled show-score text-color="#ff9900" style="margin-left: -20px;" score-template="{value}分"></el-rate>
				<span class="giveMark">人均：￥{{listObj.perAverage}}</span>
				<div style="font-size: 18px; margin-top: -25px;">地址：{{listObj.address}}</div>
				<div style="font-size: 18px;">电话：{{listObj.phoneNumber}}</div>
				<div style="font-size: 18px;">营业时间：{{listObj.openingHours | dateFormat}}</div>
				<div style="font-size: 14px; margin-top: 10px;">{{listObj.WIFI}}</div>
			</div>
			<img :src="listObj.picAddress" style="width: 260px; height: 240px;">
			<div class="sales">
				<span style="font-size: 18px;">优惠促销</span>
				<ul v-for="(item, index) in saleList" :value="item.value" :key="index" style="margin-top: 20px">
					<li>
						<img :src="item.url" style="width: 200px; height: 200px;"/>
						<div class="saleType">{{item.saleType}}折</div>
						<div class="productName productNames">{{item.goodsName}}
							<span class="price prices">￥{{item.price}}</span>
							<span class="doorPrice">￥{{item.originalPrice}}</span>
						</div>
						<img src="@/icons/img/goods/shoppingCar.png" title="加入购物车" class="imgClass imgCarClass" @click="intoCar(item)"/>
					</li>
				</ul>
			</div>
			<div style="float: left; width: 800px;">
				<div class="customerEvaluate">用户评价</div>
				<div v-for="(item, index) in evaluateList" :value="item.value" :key="index" style="margin-bottom: 20px;">
					<div style="margin-bottom: 10px; color: #0080FF; font-size: 18px;">{{item.username}}</div>
						<el-input v-model="item.content" :disabled="true"></el-input>
				</div>
			</div>
		</div>
		<copyright></copyright>
	</div>
</template>

<script>
	import homeTop from '@/views/homeTop/index'
	import copyright from '@/views/copyright/index'
	import { getListById } from '@/api/frame/goods'
	import { getShopsEvaluate } from '@/api/frame/evaluate'
	import { getList, editGoodsCount, addGoods } from '@/api/frame/shoppingCar'
	export default {
		name: 'shop',
		data() {
			return {
				listObj: null,
				count: 1,
				saleList: [],
				evaluateList: []
			}
		},
		components: {
			homeTop,
			copyright
		},
		created() {
			this.listObj = JSON.parse(sessionStorage.getItem('listObj'))
			if (this.listObj.WIFI === 0) {
				this.listObj.WIFI = "本店暂不提供WIFI"
			} else {
				this.listObj.WIFI = "本店提供WIFI"
			}
			this.getList()
		},
		methods: {
			getList() {
				this.listObj.shops_rate = parseInt(this.listObj.shops_rate)
				// 优惠促销
				getListById(this.listObj.id)
				 .then(response => {
				 		this.saleList = response.data
				 }).catch(() => { })

				 // 用户对商家的评价
				 getShopsEvaluate(this.listObj.id)
				  .then(response => {
				  	this.evaluateList = response.data
				  }).catch(() => { })
			},
			goHome() {
				this.$router.push({
					name: 'layout'
				})
			},
			getCount(params) {
				this.count = params
			},
			// 加入购物车
			intoCar(params) { 
				// 获取购物车中的商品
				getList(sessionStorage.getItem('username'))
				 .then(response => {
						this.arr = response.data
						if (this.arr.length === 0) {
							this.addAllGoods(params)
						} else {
							// 判断购物车中的商品和点击的商品是否一样 一样则数量加一 不一样则直接加入
							for (const i in this.arr) { // 购物车中的商品
								this.count = this.arr[i].shops_count
								if(this.arr[i].shops_goodsName === params.goodsName &&
									this.arr[i].shops_Name === params.shopsName &&
									this.arr[i].shops_price === params.price) { // 商品名字 商家名字 价格  一样
									const paramsInfo = {
										count: this.count + 1,
										id: this.arr[i].id
									}
									editGoodsCount(paramsInfo)
									 .then(response => {
									 		this.$message({
									 			message: '加入购物车成功',
									 			type: 'success'
									 		})
									 		this.count = paramsInfo.count
									 })
									 .catch(() => { })
								 		return false
								} else { // 不一样
									if (this.arr[i] === this.arr[this.arr.length-1]) {
										this.addAllGoods(params)
									}
								}
							}
						}
				 }).catch(() => {
				 		return false
				 })
			},
			addAllGoods(params) {
				const goodsInfo = {
					shopName: params.shopsName,
					username: sessionStorage.getItem('username'),
					picAddress: params.picAddress,
					goodsName: params.goodsName,
					price: params.price,
					count: 1
				}
				addGoods(goodsInfo)
				 .then(response => {
				 		this.$message({
				 			message: '加入购物车成功',
				 			type: 'success'
				 		})
				 })
				 .catch(() => { })
			},
		}
	}
</script>

<style scoped>
	li {
		float: left;
		list-style: none;
		padding-bottom: 10px;
		margin: 0 0 20px 40px;
		border: 1px solid #c0c4cc;
	}
</style>