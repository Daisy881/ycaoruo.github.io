<template>
	<div class="catalogue-main">
		<div class="titleName">{{this.titleName}}</div>
		<el-row :gutter="0" v-for="(item, index) in listQuery" :value="item.value" :key="index">
			<el-col :span="20">
				<el-row :gutter="0">
					<el-col :span="2">{{item.picAddress}}</el-col>
					<el-col :span="12">{{item.goodsName}}, {{item.count}}</el-col>
					<el-col :span="5">总价：￥{{item.allPrice | priceFormat}}</el-col>
					<el-col :span="3">{{item.state}}</el-col>
				</el-row>
			</el-col>
		</el-row>
		<div class="noOrder" v-if="this.noOrder">对不起，没有任何订单</div>
	</div>
</template>

<script>
	import { getList } from '@/api/frame/order'

	export default {
		data() {
			return {
				id: 0,
				titleName: '全部订单',
				noOrder: false,
				listQuery: [],
				modArr: []
			}
		},
		mounted() {
			this.getList()
		},
		// 监听路由中id的变化
		watch: {
			'$route': 'fatchData'
		},
		created() {
			this.fatchData()
		},
		methods: {
			// id发生变化时调用方法
			fatchData() {
				this.id = this.$route.query.id
				this.getTitleName()
			},
			// 初始化
			getList() {
				const username = sessionStorage.getItem('username')
				getList(username)
				 .then(response => {
				 		this.modArr = response.data
						this.listQuery = response.data
			 			for (const i in response.data) {
		 					this.listQuery[i].state = this.doOrder(this.listQuery[i].state)
			 			}
				 })
			},
			// 判断订单状态
			doOrder(state) {
				if (state === 0) {
					return '已完成'
				} else if (state === 1) {
					return '已接单'
				} else if (state === 2) {
					return '待付款'
				} else if (state === 3) {
					return '待评价'
				} else if (state === 4) {
					return '评价完成'
				} else if (state === 5) {
					return '已退款'
				} else if (state === 6) {
					return '已发起退款'
				} else if (state === 7) {
					return '退款成功'
				}
			},
			// 编辑页 根据id的变化改变titleName 每类型有相对应的订单及其状态
			getTitleName() {
				if (this.id === 1) {
					this.titleName = '全部订单'
					this.listQuery = this.modArr
				} else if (this.id === 2) {
					this.titleName = '已接单'
					this.getOrderState('已接单')
				} else if (this.id === 3) {
					this.titleName = '待付款'
					this.getOrderState('待付款')
				} else if (this.id === 4) {
					this.titleName = '待评价'
					this.getOrderState('待评价', '评价完成')
				} else if (this.id === 5) {
					this.titleName = '退款/售后'
					this.getOrderState('已退款', '已发起退款', '退款成功')
				}
			},
			// 将对应的状态订单显示页面
			getOrderState(params, params2, params3) {
				let arr = []
				for (const i in this.modArr) {
					if (this.modArr[i].state === params || this.modArr[i].state === params2 || this.modArr[i].state === params3) {
						arr.push(this.modArr[i])
					}
					if (arr.length < 1) {
						this.noOrder = true
					} else {
						this.noOrder = false
					}
				}
				this.listQuery = arr
			}
		}
	}
</script>

<style scoped>
</style>