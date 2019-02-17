<template>
	<div class="product-container">			
		<img src="@/icons/img/商品详情/1.jpg" style="width: 165px; height: 140px;">
		<div class="rightFont">
			<div style="font-size: 18px;">商品名称</div>
			<el-button @click="addCar">加入购物车</el-button>
			<span class="month-praise">月售：333&nbsp;&nbsp;&nbsp;&nbsp;赞：19</span>
			<div style="font-size: 18px; margin-top: -25px;">价格：<span style="color: red;">￥23</span></div>
			<div style="font-size: 18px;">商品描述：鸡蛋卷+面+咖啡</div>
		</div>
		<div style="font-size: 18px;">评价</div>
		<div>评价1</div>
		<div>评价2</div>
	</div>
</template>

<script>
	export default {
		name: 'product',
		data() {
			return {

			}
		},
		methods: {
			addCar() {
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