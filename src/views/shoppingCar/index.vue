<template>
	<div class="shoppingCar-container">
		<div class="product-nums" v-for="(item, index) in this.listQuery" :key="index">
			<el-row :gutter="0">
				<el-col :span="19">{{item.shops_Name}}</el-col>
				<el-col :span="5">
					<el-button size="mini" @click="delGoods(item)">删除</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="0">
				<el-col :span="24" style="height: 50px">
					<img src="../../icons/img/商品1.png" class="product-img" />
				</el-col>
			</el-row>
			<div style="width: 300px; height: auto; float: right; position: relative; top: -50px;">
				<el-row :gutter="0">
					<el-col :span="24">
						<span class="">{{item.shops_goodsName}}</span>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :span="9" style="color: red;">￥{{item.shops_price | priceFormat}}</el-col>
					<el-col :span="12">
						<el-input-number size="mini" v-model="item.shops_count" :min="1" @change="calTotalPrice()"></el-input-number>
					</el-col>
				</el-row>
			</div>
		</div>
		<div v-show="this.listQuery.length===0" style="margin: 20px 100px;">对不起，没有任何商品！</div>
		<div style="background-color: #66B0FF; height: 80px;">
			<div class="total-font">合计：</div>
			<div class="total-nums">￥{{this.totalPrice | priceFormat}}</div>
			<div class="calculate-total" @click="doCount">去结算</div>
		</div>
	</div>
</template>

<script>
	import { getList, delGoods } from '@/api/frame/shoppingCar'
	export default {
		name: 'shoppingCar',
		data(){
			return {
    		listQuery: [],
    		totalPrice: 0
			}
		},
		mounted () {
			this.getList()
		},
		methods: {
			//初始化
			getList() {
				getList(sessionStorage.getItem('username'))
				 .then(response => {
				 		this.listQuery = response.data
						this.calTotalPrice()
				 }).catch(() => {
				 		return false
				 })
			},
			delGoods(params) {
				delGoods(params.id)
				 .then(response => {
				 		this.getList()
				 })
			},
			calTotalPrice() {
				this.totalPrice = 0
				for(const i in this.listQuery) {
					this.totalPrice += this.listQuery[i].shops_price * this.listQuery[i].shops_count
				}
			},
			doCount(){
				this.$router.push({
					name: 'pay'
				})
			}
		}
	}
</script>
