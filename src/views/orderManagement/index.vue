<template>
	<div class="orderManagement-container">
    <div class="logoClass">
      <img src="../../icons/img/图标.png" style="width: 210px; height: 100px;">
    </div>
		<el-container style="height: 600px; margin-bottom: 198px;">
			<el-header style="padding: 0px;">
				<div class="searchBox">
					<div class="search">
						<el-input v-model="searchThings" placeholder="请输入商家名或商品名"></el-input>
						<div class="serchButton" style="position: absolute; top: 21px; left: 625px;" @click="doSearch">搜索</div>
					</div>
				</div>
			</el-header>
			<el-container>
				<el-main style="margin: 70px 220px auto 420px;">
					<edit :id='id' :listData='listData'></edit>
				</el-main>
				<div @click="goHome" class="goHome"><<<返回首页</div>
				<el-aside width="200px" style="position: absolute; left: 200px; top: 200px;">
					<div class="catalogue-box">
						<el-row :gutter="0">
							<el-col :span="21">
								<div class="catalog-left" @click="allOrder">全部订单
									<i class="el-icon-caret-right"></i>
								</div>
							</el-col>
							<el-col :span="21">
								<div class="catalog-left" @click="doReceived">已接单&nbsp;&nbsp;&nbsp;&nbsp;
									<i class="el-icon-caret-right"></i>
								</div>
								</el-col>
							<el-col :span="21">
								<div class="catalog-left" @click="noPay">
									待付款&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-caret-right"></i>
								</div>
							</el-col>
							<el-col :span="21">
								<div class="catalog-left" @click="noEvaluate">
									待评价&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-caret-right"></i>
									</el-badge>
								</div>
							</el-col>
							<el-col :span="21">
								<div class="catalog-left" @click="refund">退款/售后
									<i class="el-icon-caret-right"></i>
								</div>
							</el-col>
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
				id: 1,
				searchThings: '',
				listData: []
			}
		},
		components: {
			edit,
			copyright
		},
		created(){
			this.listData = this.$route.params.shoppingCarList
		},
		methods: {
			goHome() {
				this.$router.push({
					name: 'layout'
				})
			},
			doSearch() {
				
			},
			allOrder() {
				this.id = 1
			},
			doReceived() {
				this.id = 2
			},
			noPay() {
				this.id = 3
			},
			noEvaluate() {
				this.id = 4
			},
			refund() {
				this.id = 5
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