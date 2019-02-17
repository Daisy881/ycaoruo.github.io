<template>
	<div class="shop-container">
		<home-top></home-top>
		<div class="shopping-container">
		<div @click="goHome" class="goHome"><<<返回首页</div>
			<div class="leftFont">
				<div style="font-size: 18px;">店铺名称</div>
				<el-rate v-model="rateValue" disabled show-score text-color="#ff9900" style="margin-left: -20px;" score-template="{value}分"></el-rate>
				<span class="giveMark">人均：￥19</span>
				<div style="font-size: 18px; margin-top: -25px;">地址：北京市朝阳区</div>
				<div style="font-size: 18px;">电话：010-88489254</div>
				<div style="font-size: 18px;">营业时间</div>
				<div style="font-size: 14px; margin-top: 10px;">提供WIFI</div>
			</div>
			<img src="@/icons/img/商品详情/1.jpg" style="width: 260px; height: 240px;">
			<div class="sales">
				<span style="font-size: 18px;">优惠促销</span>
				<ul v-for="(item, index) in imgUrl" :value="item.value" :key="index" style="margin-top: 20px">
					<li>
						<img :src="item.url" style="width: 200px; height: 200px;" @click="handleDetails"/>
						<div class="productName productNames">商品名称
							<span class="price prices">￥20</span>
							<span class="doorPrice">￥35</span>
						</div>
						<img src="@/icons/img/商品详情/购物车.png" title="加入购物车" class="imgClass imgCarClass" @click="intoCar"/>
					</li>
				</ul>
			</div>
			<div style="float: left; width: 800px;">
				<div class="customerEvaluate">用户评价</div>
				<el-form :model="formData">
					<el-form-item label="用户1" prop="customer1">
						<el-input v-model="formData.customer1" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="用户2" prop="customer2">
						<el-input v-model="formData.customer2" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="用户3" prop="customer3">
						<el-input v-model="formData.customer3" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="用户4" prop="customer4">
						<el-input v-model="formData.customer4" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="用户5" prop="customer5">
						<el-input v-model="formData.customer5" :disabled="true"></el-input>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<copyright></copyright>
	</div>
</template>

<script>
	import homeTop from '@/views/homeTop/index'
	import copyright from '@/views/copyright/index'
	export default {
		name: 'shop',
		data() {
			return {
				rateValue: 3.4,
				imgUrl: [{
					url:  require('@/icons/img/商品详情/1.jpg'),
        	value: '1'
				},{
					url:  require('@/icons/img/商品详情/2.jpg'),
        	value: '2'
				},{
					url:  require('@/icons/img/商品详情/3.jpg'),
        	value: '3'
				},{
					url:  require('@/icons/img/商品详情/4.jpg'),
        	value: '4'
				},{
					url:  require('@/icons/img/商品详情/5.jpg'),
        	value: '5'
				}],
				formData: {
					customer1: '11111111111',
					customer2: '22222222',
					customer3: '333333',
					customer4: '444444444',
					customer5: '55555555'
				}
			}
		},
		components: {
			homeTop,
			copyright
		},
		methods: {
			handleDetails() {
				this.dialogVisible = true
			},
			goHome() {
				this.$router.push({
					name: 'layout'
				})
			},
			intoCar() {
				console.log("加入购物车")
			}
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