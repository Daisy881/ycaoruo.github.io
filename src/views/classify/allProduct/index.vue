<template>
	<div class="allProduct">
		<home-top @doSearch="searchList"></home-top>
		<div @click="goHome" class="goHome"><<<返回首页</div>
		<div class="allPhoto" style="margin-top: 60px;">
			<ul v-for="(item, index) in this.listQuery" :value="item.value" :key="index">
				<li>
					<img :src="item.url" style="width: 300px; height: 350px;" @click="doProduct(item)"/>
					<div class="productName">{{item.goodsName}}
						<span class="price">￥{{item.price}}</span>
						<span class="doorPrice">￥{{item.originalPrice}}</span>
					</div>
					<img src="@/icons/img/goods/shoppingCar.png" title="加入购物车" class="imgClass" @click="intoCar(item)"/>
				</li>
			</ul>
		</div>
		<el-dialog title="goods" :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%">
			<product @closeHandler="closeDialog" :goodsObj="goodsObj"></product>
		</el-dialog>
		<copyright></copyright>
	</div>
</template>

<script>
	import { addGoods } from '@/api/frame/shoppingCar'
	import { getGoodsList } from '@/api/frame/goods'
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
				searchThings: '',
				imgUrl: [{
					url: require('@/icons/img/goods/1.jpg'),
					value: '1'
				},{
					url: require('@/icons/img/goods/2.jpg'),
					value: '2'
				},{
					url: require('@/icons/img/goods/3.jpg'),
					value: '3'
				},{
					url: require('@/icons/img/goods/4.jpg'),
					value: '4'
				},{
					url: require('@/icons/img/goods/5.jpg'),
					value: '5'
				},{
					url: require('@/icons/img/goods/5.jpg'),
					value: '5'
				},{
					url: require('@/icons/img/goods/5.jpg'),
					value: '5'
				},{
					url: require('@/icons/img/goods/5.jpg'),
					value: '5'
				},{
					url: require('@/icons/img/goods/5.jpg'),
					value: '5'
				},{
					url: require('@/icons/img/goods/5.jpg'),
					value: '5'
				}],
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
			intoCar(params) {
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
			},
			searchList(params) {
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
		margin: 0 0 50px 40px;
		border: 1px solid #c0c4cc;
	}
	.allPhoto {
		height: 2000px;
	}
	.goHome {
		left: 40px;
	}
</style>