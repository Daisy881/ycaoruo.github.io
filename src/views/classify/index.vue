<template>
	<div class="product-container">
		<home-top @doSearch="searchList" @setCount="getCount"></home-top>
		<div v-if="goodsFlag" class="noShopsGoods">对不起，该类商品暂无存货！</div>
		<div v-else-if="shopsFlag" class="noShopsGoods">对不起，暂无该类商家！</div>
<<<<<<< HEAD
		<div v-else class="classify-main-box" v-for="(item, index) in this.listQuery" :value="item.value" :key="index">
			<div class="fontClass">
				<img src="@/icons/img/圆.png" style="width: 20px; height: 20px;" />
				<div style="width: 100px; position: relative; top: -33px; left: 50px;">{{item.type}}</div>
			</div>
			<div class="photosClass">
				<ul>
					<li>
						<img :src="item.picAddress" style="width: 300px; height: 350px;" @click="handleDetails(item)"/>
						<div class="saleType" v-if="type === 'two'">{{item.saleType}}折</div>
						<div class="productName" v-if="type === 'two'">{{item.goodsName}}
							<span class="price">￥{{item.price}}</span>
							<span class="doorPrice">￥{{item.originalPrice}}</span>
						</div>
						<div class="productName" v-if="type === 'one'">{{item.shopsName}}
							<span class="rate">评分:{{item.shops_rate}}分</span>
							<span class="rate" style="color: #5B5B5B;">人均:￥{{item.perAverage}}</span>
						</div>
						<img src="@/icons/img/shops/intoShop.png" title="进入店铺" class="imgClass" @click="intoShop(item)" v-if="type === 'one'"/>
						<img src="@/icons/img/goods/shoppingCar.png" title="加入购物车" class="imgClass" @click="intoCar(item)" v-else/>
					</li>
				</ul>
=======
		<div v-else>
			<div class="classify-main-box">
				<div class="fontClass">
					<img src="@/icons/img/圆.png" style="width: 20px; height: 20px;" />
					<div style="width: 100px; position: relative; top: -33px; left: 50px;">热销</div>
				</div>
				<div class="photosClass">
					<ul v-for="(item, index) in this.listQuery" :value="item.value" :key="index">
						<li>
							<img :src="item.picAddress || item.shops_picAddress" style="width: 250px; height: 300px; border-bottom: 1px solid #c0c4cc;" @click="handleDetails(item)"/>
							<div class="saleType" v-if="item.saleType !== 0 && type === 'two'">{{item.saleType}}折</div>
							<div style="height: 27px;" v-else></div>
							<div class="productName" v-if="type === 'two'">{{item.goodsName}}
								<span class="price">￥{{item.price}}</span>
								<span class="doorPrice" v-if="item.saleType !== 0">￥{{item.originalPrice}}</span>
							</div>
							<div class="productName" v-if="type === 'one'">{{item.shopsName}}
								<span class="rate">评分:{{item.shops_rate}}分</span>
								<span class="rate" style="color: #5B5B5B;">人均:￥{{item.perAverage}}</span>
							</div>
							<img src="@/icons/img/shops/intoShop.png" title="进入店铺" class="imgClass" @click="intoShop(item)" v-if="type === 'one'"/>
							<img src="@/icons/img/goods/shoppingCar.png" title="加入购物车" class="imgClass" @click="intoCar(item)" v-else/>
						</li>
					</ul>
				</div>
			</div>
			<div class="classify-main-box">
				<div class="fontClass">
					<img src="@/icons/img/圆.png" style="width: 20px; height: 20px;" />
					<div style="width: 100px; position: relative; top: -33px; left: 50px;">好评不断</div>
				</div>
				<div class="photosClass">
					<ul v-for="(item, index) in this.listQuery1" :value="item.value" :key="index">
						<li>
							<img :src="item.picAddress || item.shops_picAddress" style="width: 250px; height: 300px; border-bottom: 1px solid #c0c4cc;" @click="handleDetails(item)"/>
							<div class="saleType" v-if="item.saleType !== 0 && type === 'two'">{{item.saleType}}折</div>
							<div style="height: 27px;" v-else></div>
							<div class="productName" v-if="type === 'two'">{{item.goodsName}}
								<span class="price">￥{{item.price}}</span>
								<span class="doorPrice" v-if="item.saleType !== 0">￥{{item.originalPrice}}</span>
							</div>
							<div class="productName" v-if="type === 'one'">{{item.shopsName}}
								<span class="rate">评分:{{item.shops_rate}}分</span>
								<span class="rate" style="color: #5B5B5B;">人均:￥{{item.perAverage}}</span>
							</div>
							<img src="@/icons/img/shops/intoShop.png" title="进入店铺" class="imgClass" @click="intoShop(item)" v-if="type === 'one'"/>
							<img src="@/icons/img/goods/shoppingCar.png" title="加入购物车" class="imgClass" @click="intoCar(item)" v-else/>
						</li>
					</ul>
				</div>
			</div>
			<div class="classify-main-box">
				<div class="fontClass">
					<img src="@/icons/img/圆.png" style="width: 20px; height: 20px;" />
					<div style="width: 100px; position: relative; top: -33px; left: 50px;">精品推荐</div>
				</div>
				<div class="photosClass">
					<ul v-for="(item, index) in this.listQuery2" :value="item.value" :key="index">
						<li>
							<img :src="item.picAddress || item.shops_picAddress" style="width: 250px; height: 300px; border-bottom: 1px solid #c0c4cc;" @click="handleDetails(item)"/>
							<div class="saleType" v-if="item.saleType !== 0 && type === 'two'">{{item.saleType}}折</div>
							<div style="height: 27px;" v-else></div>
							<div class="productName" v-if="type === 'two'">{{item.goodsName}}
								<span class="price">￥{{item.price}}</span>
								<span class="doorPrice" v-if="item.saleType !== 0">￥{{item.originalPrice}}</span>
							</div>
							<div class="productName" v-if="type === 'one'">{{item.shopsName}}
								<span class="rate">评分:{{item.shops_rate}}分</span>
								<span class="rate" style="color: #5B5B5B;">人均:￥{{item.perAverage}}</span>
							</div>
							<img src="@/icons/img/shops/intoShop.png" title="进入店铺" class="imgClass" @click="intoShop(item)" v-if="type === 'one'"/>
							<img src="@/icons/img/goods/shoppingCar.png" title="加入购物车" class="imgClass" @click="intoCar(item)" v-else/>
						</li>
					</ul>
				</div>
>>>>>>> 提交后续代码，完善信息
			</div>
		</div>
		<el-dialog :title="titleName" :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%">
			<merchant v-if="type === 'one'" @closeHandler="closeDialog" :shopsObj="shopsObj"></merchant>
			<product v-if="type === 'two'" @closeHandler="closeDialog" @setGoods="intoCar" :goodsObj="goodsObj"></product>
		</el-dialog>
		<copyright></copyright>
	</div>
</template>

<script>
	import { getList, editGoodsCount, addGoods } from '@/api/frame/shoppingCar'
	import { getGoodsList } from '@/api/frame/goods'
	import { getShopsList } from '@/api/frame/shops'
	import homeTop from '@/views/homeTop/index'
	import copyright from '@/views/copyright/index'
	import product from './product'
	import merchant from './merchant'
	export default {
		name: 'classify',
		data() {
			return {
				hotData: [],
				exquisiteData: [],
				goodEvaluateData: [],
				dialogVisible: false,
				goodsFlag: false,
				shopsFlag: false,
				type: '',
				id: 0,
				titleName:'',
				listQuery: [],
<<<<<<< HEAD
=======
				listQuery1: [],
				listQuery2: [],
>>>>>>> 提交后续代码，完善信息
				count: 1,
				goodsObj: null,
				shopsObj: null,
				arr: [],
				titleType: ''
			}
		},
		components: {
			homeTop,
			copyright,
			product,
			merchant
		},
		created() {
			this.type = this.$route.query.type
			this.id = this.$route.query.id
			if (this.type === 'one') {
				this.titleName = '商家详情'
				this.getShopsList()
			} else {
				this.titleName = '商品详情'
				this.getGoodsList()
			}
		},
		methods: {
			// 商品初始化
			getGoodsList() {
				getGoodsList()
				 .then(response => {
				 		if (response.status === 400) {
				 			this.$message({
				 				message: '对不起，查询失败！',
				 				type: 'warning'
				 			})
				 		} else {
				 			this.shopsGoodsType(response.data)
				 		}
				 })
				 .catch(() => { })
			},
			// 店铺初始化
			getShopsList() {
				getShopsList()
				 .then(response => {
				 		if (response.status === 400) {
				 			this.$message({
				 				message: '对不起，查询失败！',
				 				type: 'warning'
				 			})
				 		} else {
				 			this.shopsGoodsType(response.data)
				 		}
				 }).catch(() => { })
			},
			// 商品或商家的类型
			shopsGoodsType(params) {
				let arrList = []
		 		for (const i in params) {
<<<<<<< HEAD
		 			if (params[i].belongsGoods === parseInt(this.id) || params[i].shopsType === parseInt(this.id)) {
		 				arrList.push(params[i])
		 			}
		 		}
		 		this.listQuery = arrList
		 		if (this.type === 'one') {
		 			this.listQuery.length===0 ? this.shopsFlag=true : this.shopsFlag=false
		 		} else {
		 			this.listQuery.length===0 ? this.goodsFlag=true : this.goodsFlag=false
		 		}
		 		for(const i in this.listQuery) {
		 			this.listQuery[i].type = this.doType(this.listQuery[i].type)
		 		}
			},
			// 判断中间三个标题的类型
			doType(params) {
				if (params === 1) {
					return '热销'
				} else if (params === 2) {
					return '精品推荐'
				} else {
					return '好评不断'
				}
			},
=======
		 			if (params[i].belongsGoods === parseInt(this.id) || 
		 				params[i].shopsType === parseInt(this.id)) {
		 				arrList.push(params[i])
		 			}
		 		}
		 		if (this.type === 'one') {
		 			arrList.length===0 ? this.shopsFlag=true : this.shopsFlag=false
		 		} else {
		 			arrList.length===0 ? this.goodsFlag=true : this.goodsFlag=false
		 		}
		 		for(const i in arrList) {
		 			if (arrList[i].type === 1) {
		 				this.listQuery.push(arrList[i])
		 			} else if (arrList[i].type === 2) {
		 				this.listQuery1.push(arrList[i])
		 			} else {
		 				this.listQuery2.push(arrList[i])
		 			}
		 		}
			},
>>>>>>> 提交后续代码，完善信息
			getCount(params) {
				this.count = params
			},
			handleDetails(params) {
				this.goodsObj = params
				this.shopsObj = params
				this.dialogVisible = true
			},
			closeDialog() {
				this.dialogVisible = false
			},
			// 进入店铺 将此对象存在sessionStorage中
			intoShop(params) {
				sessionStorage.setItem('listObj', JSON.stringify(params))
				this.$router.push({
					name: 'shop',
					query: {
						type: 'view'
					}
				})
			},
<<<<<<< HEAD
			getGoods() {
				
			},
			// 加入购物车
			intoCar(params) { // 获取购物车中的商品
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
=======
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
					
>>>>>>> 提交后续代码，完善信息
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
<<<<<<< HEAD
				this.listQuery = params
				for(const i in this.listQuery) {
		 			this.listQuery[i].type = this.doType(this.listQuery[i].type)
		 		}
		 		this.shopsGoodsType(this.listQuery)
=======
				this.listQuery = []
				this.listQuery1 = []
				this.listQuery2 = []
				this.shopsGoodsType(params)
>>>>>>> 提交后续代码，完善信息
			}
		}
	}
</script>

<style scoped>
	li {
		float: left;
		list-style: none;
		padding-bottom: 10px;
<<<<<<< HEAD
		margin: 0 0 50px 40px;
		border: 1px solid #c0c4cc;
	}
	.saleType {
		top: -355px;
=======
		margin: 0 0 50px 15px;
		border: 1px solid #c0c4cc;
	}
	.saleType {
		top: -305px;
>>>>>>> 提交后续代码，完善信息
	}
</style>