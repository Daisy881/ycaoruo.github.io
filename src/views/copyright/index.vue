<template>
<<<<<<< HEAD
	<div>
		<div class="copyright">
			<el-breadcrumb separator="|">
				<div class="breadcrumbClass">
					<el-breadcrumb-item><span @click="aboutUs">关于我们</span></el-breadcrumb-item>
					<el-breadcrumb-item>经营公示</el-breadcrumb-item>
					<el-breadcrumb-item>联系我们</el-breadcrumb-item>
					<el-breadcrumb-item>法律条款</el-breadcrumb-item>
				</div>
			</el-breadcrumb>
			<div class="copyright-bottom">Copyright2018 Yancaoruo 粤ICP备4569183643号-1 | 当前版本V1.0</div>
		</div>
=======
	<div class="copyright">
		<el-breadcrumb separator="|">
			<div class="breadcrumbClass">
				<el-breadcrumb-item><span @click="aboutUs">关于我们</span></el-breadcrumb-item>
				<el-breadcrumb-item>经营公示</el-breadcrumb-item>
				<el-breadcrumb-item>联系我们</el-breadcrumb-item>
				<el-breadcrumb-item>法律条款</el-breadcrumb-item>
			</div>
		</el-breadcrumb>
		<div class="copyright-bottom">Copyright2018 Yancaoruo 粤ICP备4569183643号-1 | 当前版本V1.0</div>
>>>>>>> 提交后续代码，完善信息
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods: {
			aboutUs() {
				this.$router.push({
					name: 'test'
				})
			}
		}
	}
</script>