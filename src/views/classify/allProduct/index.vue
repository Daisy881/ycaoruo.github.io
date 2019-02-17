<template>
	<div>
		<home-top></home-top>
		<div class="allPhoto">
			<ul v-for="(item, index) in imgUrl" :value="item.value" :key="index">
				<li>
					<img :src="item.url" style="width: 300px; height: 350px;" @click="doProduct"/>
					<div class="productName">商品名称<span class="price">￥20</span></div>
					<img src="@/icons/img/商品详情/购物车.png" title="加入购物车" class="imgClass" @click="intoCar"/>
				</li>
			</ul>
		</div>
		<el-dialog title="商品详情" :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%">
			<product @closeHandler="closeDialog"></product>
		</el-dialog>
		<copyright></copyright>
	</div>
</template>

<script>
	import homeTop from '@/views/homeTop/index'
	import copyright from '@/views/copyright/index'
	import product from '@/views/classify/product/index'
	export default {
		name: 'allProduct',
		data() {
			return {
				imgUrl: [{
					url: require('@/icons/img/商品详情/1.jpg'),
					value: '1'
				},{
					url: require('@/icons/img/商品详情/2.jpg'),
					value: '2'
				},{
					url: require('@/icons/img/商品详情/3.jpg'),
					value: '3'
				},{
					url: require('@/icons/img/商品详情/4.jpg'),
					value: '4'
				},{
					url: require('@/icons/img/商品详情/5.jpg'),
					value: '5'
				},{
					url: require('@/icons/img/商品详情/5.jpg'),
					value: '5'
				},{
					url: require('@/icons/img/商品详情/5.jpg'),
					value: '5'
				},{
					url: require('@/icons/img/商品详情/5.jpg'),
					value: '5'
				},{
					url: require('@/icons/img/商品详情/5.jpg'),
					value: '5'
				},{
					url: require('@/icons/img/商品详情/5.jpg'),
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
		methods: {
			doProduct() {
				this.dialogVisible = true
			},
			closeDialog() {
				this.dialogVisible = false
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
	.allPhoto {
		height: 2000px;
	}
</style>