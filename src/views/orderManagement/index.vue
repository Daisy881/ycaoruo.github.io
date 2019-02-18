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
					<edit></edit>
				</el-main>
				<div @click="goHome" class="goHome"><<<返回首页</div>
				<el-aside width="200px" style="position: absolute; left: 200px; top: 200px;">
					<div class="catalogue-box">
						<el-row :gutter="0">
							<el-col :span="21"><div class="catalog-left" @click="allOrder">全部订单<i class="el-icon-caret-right"></i></div></el-col>
							<el-col :span="21"><div class="catalog-left" @click="doReceived">已接单&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-caret-right"></i></div></el-col>
							<el-col :span="21"><div class="catalog-left" @click="noPay">待付款&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-caret-right"></i></div></el-col>
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
	import edit from './edit'
	import copyright from '@/views/copyright/index'
	export default {
		name: 'orderManagement',
		data() {
			return {
				id: 0
			}
		},
		components: {
			edit,
			copyright
		},
		mounted() {
			this.id = this.$route.query.id
		},
		methods: {
			goHome() {
				this.$router.push({
					name: 'layout'
				})
			},
			allOrder() {
				this.changeID(1)
			},
			doReceived() {
				this.changeID(2)
			},
			noPay() {
				this.changeID(3)
			},
			noEvaluate() {
				this.changeID(4)
			},
			refund() {
				this.changeID(5)
			},
			// 改变id
			changeID(params) {
				this.$router.push({
					query: {
						id: params
					}
				})
			}
		}
	}
</script>

<style scoped>
	.goHome {
		top: 165px;
		left: 205px;
	}
</style>