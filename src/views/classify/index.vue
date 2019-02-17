<template>
	<div class="product-container">
		<home-top></home-top>
		<div class="classify-main-box">
			<div class="fontClass">
				<img src="@/icons/img/圆.png" style="width: 20px; height: 20px;" />
				<div style="width: 100px; position: relative; top: -33px; left: 50px;">热销</div>
			</div>
			<div class="photosClass">
				<ul v-for="(item, index) in imgUrl1" :value="item.value" :key="index">
					<li>
						<img :src="item.url" style="width: 300px; height: 350px;" @click="handleDetails"/>
						<div class="productName">商品名称
							<span class="price">￥20</span>
							<span class="doorPrice">￥35</span>
						</div>
						<img src="@/icons/img/商家详情/进入店铺.png" title="进入店铺" class="imgClass" @click="intoShop" v-if="type === 'one'"/>
						<img src="@/icons/img/商品详情/购物车.png" title="加入购物车" class="imgClass" @click="intoCar" v-else/>
					</li>
				</ul>
			</div>
			<div class="fontClass">
				<img src="@/icons/img/圆.png" style="width: 20px; height: 20px;" />
				<div style="width: 100px; position: relative; top: -33px; left: 50px;">精品推荐</div>
			</div>
			<div class="photosClass">
				<ul v-for="(item, index) in imgUrl2" :value="item.value" :key="index">
					<li>
						<img :src="item.url" style="width: 300px; height: 350px;" @click="handleDetails"/>
						<div class="productName">商品名称
							<span class="price">￥20</span>
							<span class="doorPrice">￥35</span>
						</div>
						<img src="@/icons/img/商家详情/进入店铺.png" title="进入店铺" class="imgClass" @click="intoShop" v-if="type === 'one'"/>
						<img src="@/icons/img/商品详情/购物车.png" title="加入购物车" class="imgClass" @click="intoCar" v-else/>
					</li>
				</ul>
			</div>
			<div class="fontClass">
				<img src="@/icons/img/圆.png" style="width: 20px; height: 20px;" />
				<div style="width: 100px; position: relative; top: -33px; left: 50px;">好评不断</div>
			</div>
			<div class="photosClass">
				<ul v-for="(item, index) in imgUrl3" :value="item.value" :key="index">
					<li>
						<img :src="item.url" style="width: 300px; height: 350px;" @click="handleDetails"/>
						<div class="productName">商品名称
							<span class="price">￥20</span>
							<span class="doorPrice">￥35</span>
						</div>
						<img src="@/icons/img/商家详情/进入店铺.png" title="进入店铺" class="imgClass" @click="intoShop" v-if="type === 'one'"/>
						<img src="@/icons/img/商品详情/购物车.png" title="加入购物车" class="imgClass" @click="intoCar" v-else/>
					</li>
				</ul>
			</div>
		</div>
		<el-dialog :title="titleName" :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%">
			<merchant v-if="type === 'one'" @closeHandler="closeDialog"></merchant>
			<product v-if="type === 'two'" @closeHandler="closeDialog"></product>
		</el-dialog>
		<copyright></copyright>
	</div>
</template>

<script>
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
		mounted() {
			this.type = this.$route.query.type
			this.id = this.$route.query.id
			if (this.type === 'one') {
				this.titleName = '商家详情'
			} else if (this.type === 'two') {
				this.titleName = '商品详情'
			}
		},
		methods: {
			handleDetails() {
				this.dialogVisible = true
			},
			closeDialog() {
				this.dialogVisible = false
			},
			intoShop() {
				console.log("进入店铺")
				this.$router.push({
					name: 'shop'
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
		margin: 0 0 50px 40px;
		border: 1px solid #c0c4cc;
	}
</style>