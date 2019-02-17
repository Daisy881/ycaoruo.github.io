<template>
	<div class="orderManagement-container">
    <div class="logoClass">
      <img src="../../icons/img/图标.png" style="width: 210px; height: 100px;">
    </div>
		<el-container style="height: 600px; margin-bottom: 209px;">
			<el-header style="padding: 0px;">
				<div class="searchBox">
					<div class="search">
						<el-input placeholder="搜索商家或地点"></el-input>
						<div class="serchButton" style="position: absolute; top: 21px; left: 625px;">搜索</div>
						<div style="font-size: 10px; ">如：<span style="color: #66B0FF;">肯德基&nbsp;&nbsp;&nbsp;&nbsp;北京</span></div>
					</div>
				</div>
			</el-header>
			<el-container>
				<el-main style="margin: 70px 220px auto 420px;">
					<all-order v-if="id === '0'"></all-order>
					<no-pay v-else-if="id === '1'"></no-pay>
					<no-use v-else-if="id === '2'"></no-use>
					<no-evaluate v-else-if="id === '3'"></no-evaluate>
					<refund v-else></refund>
				</el-main>
				<el-aside width="200px" style="position: absolute; left: 200px; top: 200px;">
					<div class="catalogue-box">
						<el-row :gutter="0">
							<el-col :span="21"><div class="catalog-left" @click="allOrder">全部订单<i class="el-icon-caret-right"></i></div></el-col>
							<el-col :span="21"><div class="catalog-left" @click="noPay">待付款&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-caret-right"></i></div></el-col>
							<el-col :span="21"><div class="catalog-left" @click="noUse">待使用&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-caret-right"></i></div></el-col>
							<el-col :span="21"><div class="catalog-left" @click="noEvaluate">待评价&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-caret-right"></i></div></el-col>
							<el-col :span="21"><div class="catalog-left" @click="refund">退款/售后<i class="el-icon-caret-right"></i></div></el-col>
						</el-row>
					</div>
				</el-aside>
			</el-container>
		</el-container>
		<!--版权-->
		<copyright></copyright>
	</div>
</template>

<script>
	import allOrder from '@/views/allOrder/index'
	import noPay from '@/views/orderManagement/noPay/index'
	import noUse from '@/views/orderManagement/noUse/index'
	import noEvaluate from '@/views/orderManagement/noEvaluate/index'
	import refund from '@/views/orderManagement/refund/index'
	import copyright from '@/views/copyright/index'
	export default {
		name: 'orderManagement',
		data() {
			return {
				id: '0'
			}
		},
		components: {
			allOrder,
			noPay,
			noUse,
			noEvaluate,
			refund,
			copyright
		},
		mounted() {
			this.type = this.$route.query.type
			this.id = this.$route.query.id
		},
		methods: {
			allOrder() {
				this.id = '0'
			},
			noPay() {
				this.id = '1'
			},
			noUse() {
				this.id = '2'
			},
			noEvaluate() {
				this.id = '3'
			},
			refund() {
				this.id = '4'
			}
		}
	}
</script>

<style scoped>

</style>