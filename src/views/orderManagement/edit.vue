<template>
	<div class="catalogue-main">
		<div class="titleName">{{this.titleName}}</div>
		<div class="noOrder" v-if="noOrder">对不起，没有任何订单</div>
		<div v-else style="height: 500px;">
			<el-scrollbar style="height: 100%">
				<el-row :gutter="0" v-for="(item, index) in listQuery" :value="item.value" :key="index">
					<el-col :span="20">
						<el-row :gutter="0">
							<el-col :span="2">{{item.picAddress}}</el-col>
							<el-col :span="12">{{item.goodsName}}, {{item.count}}</el-col>
							<el-col :span="5">总价：￥{{(item.allPrice * item.count) | priceFormat}}</el-col>
							<el-col :span="3">
								<span :class="{'stateClass': stateFlag}" @click="goTo(item)">{{item.state}}</span>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-scrollbar>
		</div>
		<el-dialog title="评价" :visible.sync="dialogVisible" width="30%" center>
			<el-row :gutter="0">
				<el-col :span="8">{{this.evaluateList.picAddress}}</el-col>
				<el-col :span="11">{{this.evaluateList.goodsName}}</el-col>
				<el-col :span="5">￥{{this.evaluateList.allPrice}}</el-col>
				<el-col :span="24" style="margin-top: 10px;">
					<el-input v-model="input" placeholder="评价内容"></el-input>
				</el-col>
				<div v-if="inputFlag" style="color: red; font-size: 10px;">请输入评价内容</div>
			</el-row>
			<span slot="footer">
		    <el-button type="primary" @click="confirm">确 定</el-button>
		    <el-button @click="cancel">取消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
  import Cookies from 'js-cookie'
  import { getList } from '@/api/frame/user'
	import { getIdByShopsName } from '@/api/frame/shops'
	import { getOrderList, addOrder, editOrder } from '@/api/frame/order'
	import { addEvaluate } from '@/api/frame/evaluate'

	export default {
		data() {
			return {
				type: '',
				titleName: '全部订单',
				noOrder: false,
				inputFlag: false,
				listQuery: [],
				modArr: [],
				stateFlag: false,
				evaluateList: {},
				dialogVisible: false,
				input: '',
				userId: 0,
				shopsId: 0
			}
		},
		props: ['id','listData'],
		mounted() {
			this.type = this.$route.query.type
			if (!this.type) {
				this.addPay()
			}
			this.getList()
			this.getUserId()
		},
		// 监听id的变化
		watch: {
			'id': 'fatchData'
		},
		created() {
			this.fatchData()
		},
		methods: {
			// id发生变化时调用方法
			fatchData() {
				this.getTitleName(this.id)
			},
			// 初始化
			getList() {
				const username = sessionStorage.getItem('username')
				getOrderList(username)
				 .then(response => {
				 		this.modArr = response.data
						if (response.data.length === 0) {
							this.noOrder = true
						} else {
							this.noOrder = false
							this.listQuery = response.data
							for (const i in response.data) {
			 					this.listQuery[i].state = this.doOrder(this.listQuery[i].state)
				 			}
						}
				 }).catch(()=> { })
			},
			// 增加待付款订单
			addPay(){
				for (const i in this.listData) {
				  const orderInfo = {
				  	goodsId: this.listData[i].goods_id,
				  	username: this.listData[i].shops_userName,
				  	picAddress: this.listData[i].shops_picAddress,
				  	goodsName: this.listData[i].shops_goodsName,
				  	count: this.listData[i].shops_count,
				  	allPrice: this.listData[i].shops_price,
				  	state: 2,
				  	shopsName: this.listData[i].shops_Name,
				  	orderNumber: Cookies.get('number')
				  }
					addOrder(orderInfo)
					 .then(response => {
					 		if (response.data.status === 400) {
					 			this.$message({
					 				message: '请检查网络设置后重试！',
					 				type: 'warning'
					 			})
					 		}
					 })
					 .catch(() => { })
				}
			},
			getUserId() {
				getList(sessionStorage.getItem('username'))
				  .then(response => {
				  	for (const i in response.data) {
						  this.userId = response.data[i].id
				  	}
				  }).catch(() => { })
			},
			getShopsId() {
				getIdByShopsName(this.evaluateList.shopsName)
				  .then(response => {
				  	for (const i in response.data) {
						  this.shopsId = response.data[i].id
				  	}
				  }).catch(() => { })
			},
			// 判断订单状态
			doOrder(state) {
				if (state === 0) {
					return '已完成'
				} else if (state === 1) {
					return '已接单'
				} else if (state === 2) {
					return '去付款'
				} else if (state === 3) {
					return '去评价'
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
			getTitleName(id) {
				if (id === 1) {
					this.titleName = '全部订单'
					this.stateFlag = false
					if (this.modArr.length === 0) {
						this.noOrder = true
					} else {
						this.noOrder = false
						this.listQuery = this.modArr
					}
				} else if (id === 2) {
					this.titleName = '已接单'
					this.getOrderState('已接单')
				} else if (id === 3) {
					this.titleName = '待付款'
					this.getOrderState('去付款')
				} else if (id === 4) {
					this.titleName = '待评价'
					this.getOrderState('去评价')
				} else if (id === 5) {
					this.titleName = '退款/售后'
					this.getOrderState('已退款', '已发起退款', '退款成功')
				}
			},
			// 将对应的状态订单显示页面
			getOrderState(params, params2, params3) {
				let arr = []
				for (const i in this.modArr) {
					if (this.modArr[i].state === params || this.modArr[i].state === params2 || 
						this.modArr[i].state === params3) {
						arr.push(this.modArr[i])
					}
					if (params === '去评价' || params === '去付款') {
						this.stateFlag = true
					} else {
						this.stateFlag = false
					}
				}
				arr.length < 1 ? this.noOrder = true : this.noOrder = false
				this.listQuery = arr
			},
			// 去付款和去评价
			goTo(prop) {
				if (prop.state === '去付款') {
					this.$router.push({
						name: 'pay'
					})
					this.$store.dispatch('setPrice', prop.allPrice * prop.count)
				} else if (prop.state === '去评价') {
					this.dialogVisible = true
					this.evaluateList = prop
					this.getShopsId()
				} 
			},
			// 确定 修改订单状态 并将评价加入到评价表中
			confirm() {
			  if (this.input) {
			  	this.inputFlag = false
			  	const orderInfo = {
			  		state: 0,
			  		id: this.evaluateList.id
			  	}
					editOrder(orderInfo) 
					 .then(response => { 
					 	if (response.data.status === 200) {
					 		const evaluateInfo = {
				  			userId: this.userId,
				  			shopsId: this.shopsId,
				  			goodsId: this.evaluateList.goods_id,
				  			content: this.input
						  }
					 		addEvaluate(evaluateInfo)
						  .then(response => {
						  	if(response.data.status === 200) {
						  		this.$message({
							  		message: '评价成功！',
							  		type: 'success'
							  	})
							  	this.getList()
						  	} else {
						  		this.$message({
						  			message: '评价失败，请稍后再试！',
						  			type: 'warning'
						  		})
						  	}
						  }).catch(() => { })
					 	} else {
					 		this.$message({
					 			message: '请检查网络设置后重试！',
					 			type: 'warning'
					 		})
					 	}
					 	this.dialogVisible = false
					 })
					 .catch(() => { })
					} else {
						this.inputFlag = true
				}
			},
			cancel() {
				this.dialogVisible = false
			}
		}
	}
</script>

<style scoped lang="scss">
	.stateClass {
    width:65px;
    padding: 3px;
    border-radius: 5px;
    background-color: #66B0FF;
    position: absolute;
    right: 30px;
    top: -3px;

    &:hover {
    	cursor: pointer;
    }
	}
</style>