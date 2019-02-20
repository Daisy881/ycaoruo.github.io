<template>
	<div class="product-container">
		<home-top></home-top>
		<div class="classify-main-box" v-for="(item, index) in this.listQuery" :value="item.value" :key="index">
			<div class="fontClass">
				<img src="@/icons/img/圆.png" style="width: 20px; height: 20px;" />
				<div style="width: 100px; position: relative; top: -33px; left: 50px;">{{item.type}}</div>
			</div>
			<div class="photosClass">
				<ul>
					<li>
						<img :src="item.url" style="width: 300px; height: 350px;" @click="handleDetails(item)"/>
						<div class="productName" v-if="type === 'two'">{{item.goodsName}}
							<span class="price">￥{{item.price}}</span>
							<span class="doorPrice">￥{{item.originalPrice}}</span>
						</div>
						<div class="productName" v-if="type === 'one'">{{item.shopsName}}
							<span class="rate">评分:{{item.shops_rate}}分</span>
							<span class="rate" style="color: #5B5B5B;">人均:￥{{item.perAverage}}</span>
						</div>
						<img src="@/icons/img/商家详情/进入店铺.png" title="进入店铺" class="imgClass" @click="intoShop(item)" v-if="type === 'one'"/>
						<img src="@/icons/img/商品详情/购物车.png" title="加入购物车" class="imgClass" @click="intoCar(item)" v-else/>
					</li>
				</ul>
			</div>
		</div>
		<el-dialog :title="titleName" :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%">
			<merchant v-if="type === 'one'" @closeHandler="closeDialog" :shopsObj="shopsObj"></merchant>
			<product v-if="type === 'two'" @closeHandler="closeDialog" :goodsObj="goodsObj"></product>
		</el-dialog>
		<copyright></copyright>
	</div>
</template>

<script>
	import { getList, addGoods } from '@/api/frame/shoppingCar'
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
				type: '',
				id: '',
				titleName:'',
				listQuery: [],
				goodsObj: null,
				shopsObj: null,
				arr: [],
				titleType: '',
				imgUrl1: [{
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
				imgUrl2: [{
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
				imgUrl3: [{
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
				}]
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
			this.getGoods()
		},
		methods: {
			// 商品初始化
			getGoodsList() {
				getGoodsList()
				 .then(response => {
				 		this.listQuery = response.data
				 		for(const i in this.listQuery) {
				 			this.listQuery[i].type = this.doType(this.listQuery[i].type)
				 		}
				 })
			},
			// 店铺初始化
			getShopsList() {
				getShopsList()
				 .then(response => {
				 		this.listQuery = response.data
				 		for(const i in this.listQuery) {
				 			this.listQuery[i].type = this.doType(this.listQuery[i].type)
				 		}
				 })
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
					name: 'shop'
				})
			},
			getGoods() {
				// 获取购物车中的商品
				getList(sessionStorage.getItem('username'))
				 .then(response => {
						this.arr = response.data
				 }).catch(() => { 
				 		return false
				 })
			},
			// 加入购物车
			intoCar(params) {
				this.$nextTick(function() {
					console.log(this.arr,11)
				})
				this.getGoods()
				const goodsInfo = {
					shopName: params.shopName,
					username: sessionStorage.getItem('username'),
					picAddress: params.picAddress,
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
			}
		}
	}
</script>

<style scoped>
	li {
		float: left;
		list-style: none;
		padding-bottom: 10px;
		margin: 0 0 50px 40px;
		border: 1px solid #c0c4cc;
	}
</style>