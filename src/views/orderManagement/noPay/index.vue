<template>
	<div class="catalogue-main">
		<div class="titleName">待付款</div>
		<div>30分钟倒计时</div>
		<el-row :gutter="0">
			<el-col :span="20">
				<el-row :gutter="0">
					<el-col :span="14">介绍和数量
						<el-col :span="2">图片</el-col>
					</el-col>
					<el-col :span="4">总价：￥80</el-col>
					<el-col :span="3">待付款</el-col>
				</el-row>
			</el-col>
		</el-row>
		<div>对不起，没有需要付款的订单</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped>

</style>