<template>
	<div class="header-container">
		<!-- <div @click="getShadow"> -->
			<div class="top-box">
				<div class="address" @click="chooseAddress">
					<img src="@/icons/img/地理位置.png" style="width: 20px; height: 20px; position: relative; top: 4px;" />{{this.province}}
					<span style="font-size: 12px;">[{{this.city}}&nbsp;{{this.district}}]</span>
				</div>
				<div class="addressDetials" v-if="addressVisible">
					<ul>
	          <li class="addList" v-for="(item, index) in info" @click="getProvinceId(item.name, index)" v-show="showProvince">{{item.name}}</li>
	          <li class="addList" v-for="(item, index) in showCityList" @click="getCityId(item.name, index)" v-show="showCity">{{item.name}}</li>
	          <li class="addList" v-for="(item, index) in showDistrictList" @click="getDistrictId(item.name)" v-show="showDistrict">{{item.name}}</li>
	        </ul>
				</div>
				<div style="position: relative; top: -20px">
					<el-button type="text" size="mini" @click="doUser" v-if="state === 1">{{this.user}}</el-button>
					<el-button type="text" size="mini" @click="doLogin" v-else>登录</el-button>
					<el-button type="text" size="mini" @click="doExit" v-if="state === 1" style="color: black;">退出</el-button>
					<el-button type="text" size="mini" @click="doRegister" v-else>注册</el-button>
					<span class="shoppingCar" @click="handleShoppingCar">我的购物车
						<span class="el-icon-caret-top" v-if="asideVisible"></span>
						<span class="el-icon-caret-bottom" v-if="!asideVisible"></span>
					</span>
				</div>
			</div>
			<div class="searchBox">
				<div class="logoClass">
					<img src="../../icons/img/图标.png" style="width: 210px; height: 100px;">
				</div>
				<div class="search">
					<el-input placeholder="请输入搜索内容"></el-input>
					<div class="serchButton">搜索</div>
				</div>
			</div>
		<!-- </div> -->
		<!--购物车组件-->
		<div @blur="getShadow"><shopping-car v-if="asideVisible"></shopping-car></div>
	</div>
</template>

<script>
	import shoppingCar from '@/views/shoppingCar/index'
	export default {
		name: 'homeTop',
		data(){
			return {
				asideVisible: false,
				state: 0,
				user: '',
				addressVisible: false,
				showProvince: false,
				showCity: false,
				showDistrict: false,
				selected: false,
				index: 0,
				index2: 0,
				province: '北京',
				city: '北京',
				district: '朝阳',
				showCityList: [],
				showDistrictList: [],
				info: [
          {id: 1, name: '北京', city: [
            {id: 1, name: '北京市', district: [
              {id: 1, name: '东城区'},
              {id: 2, name: '西城区'},
              {id: 3, name: '崇文区'},
              {id: 4, name: '宣武区'},
              {id: 5, name: '朝阳区'},
              {id: 6, name: '丰台区'},
              {id: 7, name: '石景山区'},
              {id: 8, name: '海淀区'},
              {id: 9, name: '门头沟区'},
              {id: 10, name: '房山区'},
              {id: 11, name: '通州区'},
              {id: 12, name: '顺义区'},
              {id: 13, name: '昌平区'},
              {id: 14, name: '大兴区'},
              {id: 15, name: '怀柔区'},
              {id: 16, name: '平谷区'},
              {id: 17, name: '密云县'},
              {id: 18, name: '延庆县'}
          	]}
	        ]},
	        {id: 2, name: '天津', city: [
            {id: 2, name: '天津市', district: [
              {id: 19, name: '和平区'},
              {id: 20, name: '河东区'},
              {id: 21, name: '河西区'},
              {id: 22, name: '南开区'},
              {id: 23, name: '河北区'},
              {id: 24, name: '红桥区'},
              {id: 25, name: '塘沽区'},
              {id: 26, name: '汉沽区'},
              {id: 27, name: '大港区'},
              {id: 28, name: '东丽区'},
              {id: 29, name: '西青区'},
              {id: 30, name: '津南区'},
              {id: 31, name: '北辰区'},
              {id: 32, name: '武清区'},
              {id: 33, name: '宝坻区'},
              {id: 34, name: '宁河县'},
              {id: 35, name: '静海县'},
              {id: 36, name: '蓟县'}
            ]}
        	]},
        	{id: 3, name: '河北', city: [
            {id: 3, name: '石家庄市', district: [
              {id: 37, name: '长安区'},
              {id: 38, name: '桥东区'},
              {id: 39, name: '桥西区'},
              {id: 40, name: '新华区'},
              {id: 41, name: '井陉矿区'},
              {id: 42, name: '裕华区'},
              {id: 43, name: '井陉县'},
              {id: 44, name: '正定县'},
              {id: 45, name: '栾城县'},
              {id: 46, name: '行唐县'},
              {id: 47, name: '灵寿县'},
              {id: 48, name: '高邑县'},
              {id: 49, name: '深泽县'},
              {id: 50, name: '赞皇县'},
              {id: 51, name: '无极县'},
              {id: 52, name: '平山县'},
              {id: 53, name: '元氏县'},
              {id: 54, name: '赵县'},
              {id: 55, name: '辛集市'},
              {id: 56, name: '藁城市'},
              {id: 57, name: '晋州市'},
              {id: 58, name: '新乐市'},
              {id: 59, name: '鹿泉市'}
            ]},
            {id: 4, name: '唐山市', district: [
              {id: 60, name: '路南区'},
              {id: 61, name: '路北区'},
              {id: 62, name: '古冶区'},
              {id: 63, name: '开平区'},
              {id: 64, name: '丰南区'},
              {id: 65, name: '丰润区'},
              {id: 66, name: '滦县'},
              {id: 67, name: '滦南县'},
              {id: 68, name: '乐亭县'},
              {id: 69, name: '迁西县'},
              {id: 70, name: '玉田县'},
              {id: 71, name: '唐海县'},
              {id: 72, name: '遵化市'},
              {id: 73, name: '迁安市'}
            ]}
          ]}
        ]
			}
		},
		components: {
			shoppingCar
		},
		mounted() {
			if (sessionStorage.getItem('myToken') !== null) { // token不为空 用户已登录
				this.state = 1
				this.user = sessionStorage.getItem('username')
			} else {
				this.state = 0
			}
		},
		methods: {
			getShadow(){
				console.log(11)
				this.asideVisible = false
			},
			doUser() {
				this.$router.push({
					name: 'personalCenter',
					query: {
						type: 'edit'
					}
				})
			},
			doLogin(){
				this.$router.push({
					name: 'login',
					query: {
						type: 'use'
					}
				})
			},
			doRegister(){
				this.$router.push({
					name: 'login',
					query: {
						type: 'add'
					}
				})
			},
			doExit() {
				this.asideVisible = false
				this.$store.dispatch('LogOut')
				this.state = 0
			},
			handleShoppingCar(){
				if (sessionStorage.getItem('myToken')) {
					this.asideVisible = !this.asideVisible
				} else {
					this.$router.push({
						name: 'login',
						query: {
							type: 'use'
						}
					})
				}
			},
			handleSelect(){
				console.log('handleSelect')
			},
			doOrder(){
				this.$router.push({
					name: 'orderManagement'
				})
			},
			doPCenter(){
				this.$router.push({
					name: 'personalCenter'
				})
			},
			chooseAddress() {
				this.addressVisible = true
				this.showProvince = true
				if (this.city === '' || this.district === '') {
					this.showCity = false
					this.showDistrict = false
				} 
			},
			// 获取info对象数组中的city对象数组
			getCityList() {
				for (const i in this.info) {
					this.showCityList = this.info[this.index].city
					return false
				}
			},
			// 获取city对象数组中的district对象数组
			getDistrictList() {
				for (const i in this.showCityList) {
					this.showDistrictList = this.showCityList[this.index2].district
					return false
				}
			},
			getProvinceId(name, index) {
				this.province = name
				this.city = ''
				this.district = ''
				this.showProvince = false
				this.showCity = true
				this.index = index
				this.getCityList()
			},
			getCityId(name, index) {
				this.city = name
				this.district = ''
				this.showCity = false
				this.showDistrict = true
				this.index2 = index
				this.getDistrictList()
			},
			getDistrictId(name) {
				this.district = name
				this.showDistrict = false
				this.showProvince = true
				this.addressVisible = false
			}
		}
	}
</script>

<style scoped>
	
</style>