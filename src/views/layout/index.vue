<template>
	<div class="out-container">
		<home-top></home-top>
		<div class="title">
			<el-menu :default-active="menu" class="el-menu-demo" mode="horizontal" background-color="#66B0FF" 	text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item index="1">首页</el-menu-item>
				<el-submenu index="2">
					<template slot="title">商品</template>
					<el-menu-item index="2-1" @click="allProduct">全部商品</el-menu-item>
					<el-submenu index="2-2">
						<template slot="title">商家分类</template>
						<el-menu-item index="2-2-1" @click="doGroupPurchase">团购店</el-menu-item>
						<el-menu-item index="2-2-2" @click="doFastFood">快餐店</el-menu-item>
						<el-menu-item index="2-2-3" @click="doHotPot">火锅店</el-menu-item>
					</el-submenu>
					<el-submenu index="2-3">
						<template slot="title">商品分类</template>
						<el-menu-item index="2-3-1" @click="doBeverage">饮品</el-menu-item>
						<el-menu-item index="2-3-2" @click="doSnack">小吃</el-menu-item>
						<el-menu-item index="2-3-3" @click="doCake">蛋糕</el-menu-item>
						<el-menu-item index="2-3-4" @click="doWesternFood">西餐</el-menu-item>
						<el-menu-item index="2-3-5" @click="doChafingdish">火锅</el-menu-item>
						<el-menu-item index="2-3-6" @click="doBarbecue">烧烤</el-menu-item>
						<el-menu-item index="2-3-7" @click="doSoup">汤类</el-menu-item>
						<el-menu-item index="2-3-8" @click="doNoodle">面食</el-menu-item>
						<el-menu-item index="2-3-9" @click="doLocalDish">地方菜</el-menu-item>
						<el-menu-item index="2-3-10" @click="doCuisine">日韩料理</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-menu-item index="3" @click="doOrder">订单管理</el-menu-item>
				<el-menu-item index="4" @click="doPCenter">个人设置</el-menu-item>
			</el-menu>
		</div>
		<!--轮播图-->
		<el-carousel :interval="3000" type="card" style="margin-top: 25px;">
			<el-carousel-item v-for="(item, index) in carouselList" :value="item.value" :key="index"> 
				<img :src="item.src" style="height: 300px; width: 800px;" />
			</el-carousel-item>
		</el-carousel>
		<!--广告图-->
		<div style="margin-top: 27px;">
			<el-row :gutter="0">
				<el-col :span="6">
					<img src="@/icons/img/广告1.png"/>
				</el-col>
				<el-col :span="6">
					<img src="@/icons/img/广告2.png"/>
				</el-col>
				<el-col :span="6">
					<img src="@/icons/img/广告3.png"/>
				</el-col>
				<el-col :span="6">
					<img src="@/icons/img/广告4.png"/>
				</el-col>
			</el-row>
		</div>
		<!--版权-->
		<copyright></copyright>
	</div> 
</template>

<script>
	import homeTop from '@/views/homeTop/index'
	import copyright from '@/views/copyright/index'

	export default {
		name: 'layout',
		data(){
			return {
				type: '',
				menu: '1',
				carouselList: [{
        	src: require('@/icons/img/轮播1.png'),
        	value: '1'
        },{
        	src: require('@/icons/img/轮播2.png'),
        	value: '2'
        },{
        	src: require('@/icons/img/轮播3.png'),
        	value: '3'
        },{
        	src: require('@/icons/img/轮播4.png'),
        	value: '4'
        }]
			}	
		},
		components: {
			homeTop,
			copyright
		},
		mounted() {
			this.type = this.$route.query.type
		},
		methods: {
			allProduct() {
				this.$router.push({
					name: 'allProduct'
				})
			},
			doGroupPurchase(){
				this.$router.push({
					name: 'classify',
					query: {
						type: 'one',
						id: 1
					}
				})
			},
			doFastFood(){
				this.$router.push({
					name: 'classify',
					query: {
						type: 'one',
						id: 2
					}
				})
			},
			doHotPot(){
				this.$router.push({
					name: 'classify',
					query: {
						type: 'one',
						id: 3
					}
				})
			},
			doBeverage() {
				this.$router.push({
					name: 'classify',
					query: {
						type: 'two',
						id: 1
					}
				})
			},
			doSnack() {
				this.$router.push({
					name: 'classify',
					query: {
						type: 'two',
						id: 2
					}
				})
			},
			doCake() {
				this.$router.push({
					name: 'classify',
					query: {
						type: 'two',
						id: 3
					}
				})
			},
			doWesternFood() {
				this.$router.push({
					name: 'classify',
					query: {
						type: 'two',
						id: 4
					}
				})
			},
			doChafingdish() {
				this.$router.push({
					name: 'classify',
					query: {
						type: 'two',
						id: 5
					}
				})
			},
			doBarbecue() {
				this.$router.push({
					name: 'classify',
					query: {
						type: 'two',
						id: 6
					}
				})
			},
			doSoup() {
				this.$router.push({
					name: 'classify',
					query: {
						type: 'two',
						id: 7
					}
				})
			},
			doNoodle() {
				this.$router.push({
					name: 'classify',
					query: {
						type: 'two',
						id: 8
					}
				})
			},
			doLocalDish() {
				this.$router.push({
					name: 'classify',
					query: {
						type: 'two',
						id: 9
					}
				})
			},
			doCuisine() {
				this.$router.push({
					name: 'classify',
					query: {
						type: 'two',
						id: 10
					}
				})
			},
			doOrder() {
				this.$router.push({
					name: 'orderManagement',
					query: {
						id: 1
					}
				})
			},
			doPCenter() {
				this.$router.push('personalCenter')
			}
		}
	}
</script>

<style scoped>
	.title {
		margin: 10px 0;
	}
</style>