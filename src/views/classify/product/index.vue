<template>
	<div class="product-container">			
		<img src="@/icons/img/商品详情/1.jpg" style="width: 165px; height: 140px;">
		<div class="rightFont">
			<div style="font-size: 18px;">{{goodsObj.goodsName}}</div>
			<el-button @click="addCar(goodsObj)">加入购物车</el-button>
			<span class="month-praise">月售：{{goodsObj.sales_volume}}</span>
			<div style="font-size: 18px; margin-top: -25px;">价格：<span style="color: red;">￥{{goodsObj.price}}</span></div>
			<div style="font-size: 18px;">商品描述：{{goodsObj.goods_description}}</div>
		</div>
		<div style="font-size: 18px;">评价</div>
		<div>{{goodsObj.goods_rate}}</div>
		<div>评价2</div>
	</div>
</template>

<script>
	import { addGoods } from '@/api/frame/shoppingCar'
	import { getGoodsList } from '@/api/frame/goods'
	export default {
		name: 'product',
		props: ["goodsObj"],
		data() {
			return {
				listQuery: []
			}
		},
		methods: {
			// 初始化
			getList() {
				getGoodsList()
				 .then(response => {
				 		this.listQuery = response.data
				 })
			},
			addCar(params) {
				this.$emit('closeHandler')
				// this.getGoods()
				//  console.log(this.arr ,params)
				//  for (const i in this.arr) {
				//  		if (this.arr[i] === params) {
				//  			console.log(11)
				//  		}
				//  }
				const goodsInfo = {
					shopName: params.shopName,
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
			}
		}
	}
</script>

<style scoped>
	.product-container {
		margin-left: 70px;
	}
	.el-button {
		position: relative; 
		left: 400px; 
		top: -35px; 
		width: 90px; 
		padding: 10px 5px;
	}
</style>