<template>
	<div class="merchant-container">
		<img src="@/icons/img/商家详情/3.png" style="width: 165px; height: 140px;">
		<div class="rightFont">
			<div style="font-size: 18px;">商品名称</div>
			<el-button @click="intoShop">进店</el-button>
			<span class="month-praise">配送：￥6&nbsp;|&nbsp;运送：￥20起&nbsp;|&nbsp;配送34分钟</span>
			<div style="font-size: 18px; margin-top: -32px;">地址：北京朝阳区</div>
			<div style="font-size: 18px; margin-top: -12px;">电话：18255662255</div>
			<div style="font-size: 18px; margin-top: -10px;">商家描述：浪漫环境，只属于你们两个人的店。</div>
		</div>
		<div style="font-size: 18px;">评价</div>
		<div>评价1</div>
		<div>评价2</div>
	</div>
</template>

<script>
	export default {
		name: 'merchant',
		data() {
			return {

			}
		},
		methods: {
			intoShop() {
				this.$emit('closeHandler')
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