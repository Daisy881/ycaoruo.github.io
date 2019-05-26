<template>
	<div class="product-container">			
		<img :src="goodsObj.picAddress" style="width: 165px; height: 140px;">
		<div class="rightFont">
			<div style="font-size: 20px; font-weight: bolder;">{{goodsObj.goodsName}}</div>
			<el-button @click="addCar(goodsObj)">加入购物车</el-button>
<<<<<<< HEAD
			<span class="month-praise">月售：{{goodsObj.sales_volume}}</span>
=======
			<span class="month-praise">月售：{{goodsObj.sale_volume}}</span>
>>>>>>> 提交后续代码，完善信息
			<div style="font-size: 18px; margin-top: -25px;">价格：<span style="color: red;">￥{{goodsObj.price}}</span></div>
			<div style="font-size: 18px;">商品描述：{{goodsObj.goods_description}}</div>
		</div>
		<div style="font-size: 18px; margin-bottom: 10px;">评价</div>
		<div v-for="(item, index) in evaluateList" :value="item.value" :key="index" style="margin-bottom: 20px;">
			<div style="margin-bottom: 10px; color: #0080FF; font-size: 14px;">{{item.username}}</div>
				<el-input v-model="item.content" :disabled="true"></el-input>
		</div>
	</div>
</template>

<script>
	import { addGoods } from '@/api/frame/shoppingCar'
	import { getGoodsEvaluate } from '@/api/frame/evaluate'
	import { getIdByShopsName } from '@/api/frame/shops'
	export default {
		name: 'product',
		props: ['goodsObj'],
		data() {
			return {
				evaluateList: [],
				shopsId: 0
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			// 初始化
			getList() {
				 getIdByShopsName(this.goodsObj.shopsName)
				 .then(response => {
					 	for(const i in response.data) {
				 			this.shopsId = response.data[i].id
					 	}
						const paramsId = {
							shopsId: this.shopsId,
							goodsId: this.goodsObj.id
						}
						// 用户对商品的评价
						getGoodsEvaluate(paramsId)
						 .then(response => {
						 		this.evaluateList = response.data
						 })
				 }).catch(() => { })
			},
			addCar(params) {
				this.$emit('setGoods', this.goodsObj)
				this.$emit('closeHandler')
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