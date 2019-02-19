<template>
	<div class="merchant-container">
		<img src="@/icons/img/商家详情/3.png" style="width: 165px; height: 140px;">
		<div class="rightFont">
			<div style="font-size: 18px;">{{shopsObj.shopsName}}</div>
			<el-button @click="intoShop(shopsObj)">进店</el-button>
			<span class="month-praise">配送：￥{{shopsObj.carriage}}&nbsp;|&nbsp;运送：￥{{shopsObj.dispatching_start}}起&nbsp;|&nbsp;配送{{shopsObj.dispatching_time}}分钟</span>
			<div style="font-size: 18px; margin-top: -32px;">地址：{{shopsObj.address}}</div>
			<div style="font-size: 18px; margin-top: -12px;">电话：{{shopsObj.phoneNumber}}</div>
			<div style="font-size: 18px; margin-top: -10px;">商家描述：{{shopsObj.shop_description}}</div>
		</div>
		<div style="font-size: 18px;">评价</div>
		<div>评价1</div>
		<div>评价2</div>
	</div>
</template>

<script>
	export default {
		name: 'merchant',
		props: ["shopsObj"],
		data() {
			return {

			}
		},
		methods: {
			// 进入店铺
			intoShop(params) {
				this.$emit('closeHandler')
				sessionStorage.setItem('listObj', JSON.stringify(params))
				this.$router.push({
					name: 'shop'
				})
			}
		}
	}
</script>

<style scoped>
	.merchant-container {
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