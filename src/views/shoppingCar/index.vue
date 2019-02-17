<template>
	<div class="shoppingCar-container">
		<div class="product-nums">
			<el-row :gutter="0">
				<el-col :span="19">商家名称</el-col>
				<el-col :span="5">
					<el-button size="mini">删除</el-button>
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
						<span class="">嫩烤火鸡披萨</span>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :span="9" style="color: red;">￥59</el-col>
					<el-col :span="12">
						<el-input-number size="mini" v-model="formData.count" :min="1"></el-input-number>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="product-nums">
			<el-row :gutter="0">
				<el-col :span="19">商家名称</el-col>
				<el-col :span="5">
					<el-button size="mini">删除</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="0">
				<el-col :span="24" style="height: 50px">
					<img src="../../icons/img/商品2.png" class="product-img" />
				</el-col>
			</el-row>
			<div style="width: 300px; height: auto; float: right; position: relative; top: -50px;">
				<el-row :gutter="0">
					<el-col :span="24">
						<span class="">嫩烤火鸡披萨</span>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :span="9" style="color: red;">￥59</el-col>
					<el-col :span="12">
						<el-input-number size="mini" v-model="formData.count" :min="1"></el-input-number>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="product-nums">
			<el-row :gutter="0">
				<el-col :span="19">商家名称</el-col>
				<el-col :span="5">
					<el-button size="mini">删除</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="0">
				<el-col :span="24" style="height: 50px">
				<img src="../../icons/img/商品3.png" class="product-img" />
				</el-col>
			</el-row>
			<div style="width: 300px; height: auto; float: right; position: relative; top: -50px;">
				<el-row :gutter="0">
					<el-col :span="24">
						<span class="">嫩烤火鸡披萨</span>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :span="9" style="color: red;">￥59</el-col>
					<el-col :span="12">
						<el-input-number size="mini" v-model="formData.count" :min="1"></el-input-number>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="product-nums">
			<el-row :gutter="0">
				<el-col :span="19">商家名称</el-col>
				<el-col :span="5">
					<el-button size="mini">删除</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="0">
				<el-col :span="24" style="height: 50px">
				<img src="../../icons/img/商品4.png" class="product-img" />
				</el-col>
			</el-row>
			<div style="width: 300px; height: auto; float: right; position: relative; top: -50px;">
				<el-row :gutter="0">
					<el-col :span="24">
						<span class="">嫩烤火鸡披萨</span>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :span="9" style="color: red;">￥59</el-col>
					<el-col :span="12">
						<el-input-number size="mini" v-model="formData.count" :min="1"></el-input-number>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="product-nums">
			<el-row :gutter="0">
				<el-col :span="19">商家名称</el-col>
				<el-col :span="5">
					<el-button size="mini">删除</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="0">
				<el-col :span="24" style="height: 50px">
				<img src="../../icons/img/商品5.png" class="product-img" />
				</el-col>
			</el-row>
			<div style="width: 300px; height: auto; float: right; position: relative; top: -50px;">
				<el-row :gutter="0">
					<el-col :span="24">
						<span class="">嫩烤火鸡披萨</span>
					</el-col>
				</el-row>
				<el-row :gutter="0">
					<el-col :span="9" style="color: red;">￥59</el-col>
					<el-col :span="12">
						<el-input-number size="mini" v-model="formData.count" :min="1"></el-input-number>
					</el-col>
				</el-row>
			</div>
		</div>
		<div style="background-color: #66B0FF; height: 80px;">
			<span class="total-nums">合计：￥23</span>
			<div class="calculate-total" @click="doCount">去结算</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shoppingCar',
		data(){
			return {
				formData: {
        	count: ''
        }
			}
		},
		methods: {
			doCount(){
				this.$router.push({
					name: 'pay'
				})
			}
		}
	}
</script>
