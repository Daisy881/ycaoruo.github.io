<template>
	<div class="allProduct">
		<home-top @doSearch="searchList" @setCount="getCount"></home-top>
		<div @click="goHome" class="goHome"><<<返回首页</div>
		<div class="allPhoto">
			<ul v-for="(item, index) in this.listQuery" :value="item.value" :key="index">
				<li>
					<img :src="item.picAddress || item.shops_picAddress" style="width: 250px; height: 300px; border-bottom: 1px solid #c0c4cc;" @click="doProduct(item)"/>
					<div class="saleType" v-if="item.saleType !== 0">{{item.saleType}}折</div>
					<div style="height: 27px;" v-else></div>
					<div class="productName">{{item.goodsName}}
						<span class="price">￥{{item.price}}</span>
						<span class="doorPrice" v-if="item.saleType !== 0">￥{{item.originalPrice}}</span>
					</div>
					<img src="@/icons/img/goods/shoppingCar.png" title="加入购物车" class="imgClass" @click="intoCar(item)"/>
				</li>
			</ul>
		</div>
		<el-dialog title="goods" :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%">
			<product @closeHandler="closeDialog" @setGoods="intoCar" :goodsObj="goodsObj"></product>
		</el-dialog>
		<copyright></copyright>
	</div>
</template>

<script>
	import { getList, editGoodsCount, addGoods } from '@/api/frame/shoppingCar'
	import { getGoodsList } from '@/api/frame/goods'
	import { getImg } from '@/api/frame/uploadImg'
	import { searchMhu } from '@/api/frame/search'
	import homeTop from '@/views/homeTop/index'
	import copyright from '@/views/copyright/index'
	import product from '@/views/classify/product/index'
	export default {
		name: 'allProduct',
		data() {
			return {
				goodsObj: null,
				listQuery: [],
				type: '',
				count: 1,
				searchThings: '',
				dialogVisible: false
			}
		},
		components: {
			homeTop,
			copyright,
			product
		},
		created() {
			this.getList()
			this.type = this.$route.query.type
			this.searchThings = this.$route.query.things
			if (this.type === 'alls') {
				this.allsSearch(this.searchThings)
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
			getCount(params) {
				this.count = params
			},
			goHome() {
				this.$router.push({
					name: 'layout'
				})
			},
			doProduct(params) {
				this.goodsObj = params
				this.dialogVisible = true
			},
			closeDialog() {
				this.dialogVisible = false
			},
			// 加入购物车
			intoCar(params) { // 获取购物车中的商品
				if (sessionStorage.getItem('username')) {
					getList(sessionStorage.getItem('username'))
					 .then(response => {
							this.arr = response.data
							if (this.arr.length === 0) {
								this.addAllGoods(params)
							} else {
								// 判断购物车中的商品和点击的商品是否一样 一样则数量加一 不一样则直接加入
								for (const i in this.arr) { // 购物车中的商品
									this.count = this.arr[i].shops_count
									if(this.arr[i].shops_goodsName === params.goodsName &&
										this.arr[i].shops_Name === params.shopsName &&
										this.arr[i].shops_price === params.price) { // 商品名字 商家名字 价格  一样
										const paramsInfo = {
											count: this.count + 1,
											id: this.arr[i].id
										}
										editGoodsCount(paramsInfo)
										 .then(response => {
												this.$message({
													message: '加入购物车成功',
													type: 'success'
												})
												this.count = paramsInfo.count
										 })
										 .catch(() => { })
											return false
									} else { // 不一样
										if (this.arr[i] === this.arr[this.arr.length-1]) {
											this.addAllGoods(params)
										}
									}
								}
							}
					 }).catch(() => {
							return false
					 })
				} else {
					this.$message({
						message: '请先登录！',
						type: 'warning'
					})
				}
			},
			addAllGoods(params) {
				const goodsInfo = {
					shopName: params.shopsName,
					username: sessionStorage.getItem('username'),
					picAddress: params.picAddress,
					goodsId: params.id,
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
				 .catch(() => { })
			},
			searchList(params) {
				console.log(params)
				this.listQuery = params
			},
			allsSearch(params) {
				searchMhu(params)
				 .then(response => {
						if (response.data.status === 401) {
							this.$message({
								message: '未找到与搜索内容相关的商品或商家，请重新查询！',
								type: 'warning'
							})
						} else if (response.data.status === 400) {
							this.$message({
								message: '查询失败！',
								type: 'warning'
							})
						} else {
							this.searchList(response.data)
						}
				 }) .catch(() => { })
			}
		}
	}
</script>
<style scoped>
	li {
		float: left;
		list-style: none;
		padding-bottom: 10px;
		margin: 0 0 50px 15px;
		border: 1px solid #c0c4cc;
	}
	.allPhoto {
		height: 4000px;
		margin-top: 60px;
	}
	.goHome {
		left: 40px;
	}
	.saleType {
		top: -305px;
	}
</style>