<template>
	<div class="login-container">
		<div class="logoClass">
      <img src="../../icons/img/图标.png" style="width: 210px; height: 100px;">
    </div>
    <div style="height: 700px; margin-bottom: 93px;">
			<div class="login-picture">
				<img src="@/icons/img/登录图1.png"/>
				<img src="@/icons/img/登录图2.gif" style="border-radius: 110px;" />
			</div>
			<div style="height: 500px;">
				<div class="login-main">
					<el-tabs v-model="activeNum" type="border-card" v-if="type === 'use'">
						<el-tab-pane name="账号登录" value="0"></el-tab-pane>
						<el-tab-pane label="普通方式登录" name="first" style="position: relative; left: 20px;">
							<div class="loginTip">{{this.loginTip}}</div>
							<el-form :model="formData1" ref="ruleForm" :rules="rules" label-position="left" label-width="80px">
								<el-row :gutter="0">
									<el-col :span="22">
										<el-form-item label="账户" prop="username">
											<el-input v-model="formData1.username" placeholder="手机号/用户名">
												<i slot="prefix" class="el-icon-first-user"></i>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="22">
										<el-form-item label="密 码" prop="password">
											<el-input type="password" v-model="formData1.password" placeholder="密码">
												<i slot="prefix" class="el-icon-first-password"></i>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="22">
										<el-row :gutter="0">
											<el-col :span="18">
												<el-form-item label="验证码" prop="verificationCode">
													<el-input type="verificationCode" v-model="formData1.verificationCode" placeholder="验证码" @keyup.enter.native="loginButton">
														<i slot="prefix" class="el-icon-first-iconcode"></i>
													</el-input>
												</el-form-item>
											</el-col>
											<el-col :span="5">
												<div class="verificationCodeClass" @click="handleCode">{{this.vNumber}}</div>
											</el-col>
										</el-row>
									</el-col>
								</el-row>
							</el-form>
						</el-tab-pane>
						<el-tab-pane label="手机动态码登录" name="two" style="position: relative; left: 20px;">
							<el-form :model="formData2" ref="ruleForm2" :rules="rules2" label-position="left" label-width="80px">
								<el-row :gutter="0">
									<el-col :span="22" style="margin-top: 20px;">
										<el-form-item label="账户" prop="phoneNumber">
											<el-input v-model="formData2.phoneNumber" placeholder="手机号">
												<i slot="prefix" class="el-icon-first-mobile"></i>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="22">
										<el-form-item label="动态码" prop="dynamicCode">
											<el-input v-model="formData2.dynamicCode" placeholder="动态码" @keyup.enter.native="loginButton">
												<i slot="prefix" class="el-icon-first-iconcode"></i>
												<el-button v-if="codeFlag" slot="append" size="mini" style="font-size: 5px; width: 95px;" @click="getCode">获取动态码</el-button>
												<el-button v-else slot="append" size="mini" style="font-size: 5px; width: 95px;">{{this.timeBack}}秒后重发</el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
							<div class="loginTip loginTip2">{{this.loginTip2}}</div>
							<div class="loginTip codeTip">{{this.codeTip}}</div>
						</el-tab-pane>
						<div class="forgetPassword" @click="forgetPassword">忘记密码</div>
						<div class="loginButton" @click="loginButton">登录</div>
						<div style="margin: 20px;">还没有账号？<span class="freeRegistration" @click="freeRegistration">免费注册</span></div>
					</el-tabs>
					<el-tabs v-model="activeNum2" type="border-card" style="height: 520px;" v-if="type === 'add'">
						<el-tab-pane name="first2" label="注册" style="position: relative; left: 20px;">
							<el-form :model="formData3" ref="ruleForm3" :rules="rules3" label-position="left" label-width="80px">
								<el-row :gutter="0">
									<el-col :span="22">
										<el-form-item label="手机号" prop="rePhoneNum">
											<el-input v-model="formData3.rePhoneNum" placeholder="手机号">
												<i slot="prefix" class="el-icon-first-mobile"></i>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="20">
										<div class="getCode" @click="getCode" v-if="codeFlag">免费获取短信动态码</div>
										<div class="getCode" v-else>{{this.timeBack}}秒后重发</div>
									</el-col>
									<el-col :span="22">
										<el-form-item label="动态码" prop="reDynamicCode">
											<el-input v-model="formData3.reDynamicCode" placeholder="动态码">
												<i slot="prefix" class="el-icon-first-iconcode"></i>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="22">
										<el-form-item label="创建密码" prop="createPassword">
											<el-input type="password" v-model="formData3.createPassword" placeholder="创建密码">
												<i slot="prefix" class="el-icon-first-password"></i>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="22">
										<el-form-item label="确认密码" prop="confirmPassword">
											<el-input type="password" v-model="formData3.confirmPassword" placeholder="确认密码" @keyup.enter.native="registerButton">
												<i slot="prefix" class="el-icon-first-password"></i>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</el-form>
							<div class="loginTip loginTip3">{{this.loginTip3}}</div>
							<div class="loginTip codeTip1">{{this.codeTip1}}</div>
							<div class="loginButton loginButton-register" @click="registerButton">同意以下协议并注册</div>
							<div class="protocol" @click="dialogVisible = true">《言草若网用户协议》</div>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
		<!--协议-->
		<el-dialog title="协议" :visible.sync="dialogVisible" width="40%" :close-on-click-modal="false">
			<el-input v-model="protocol" type="textarea" resize="none" :rows="15" :readonly="true"></el-input>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="dialogVisible = false">确定</el-button>
		  </span>
		</el-dialog>
    <!--忘记密码-->
    <el-dialog title="修改密码" :visible.sync="dialogEdit" :close-on-click-modal="false" width="50%">
      <el-form :model="dialogFormPwd" ref="dialogForgetPwd" :rules="dialogRule" label-position="left" label-width="20%" style="margin-left: 30px;">
        <el-row :gutter="0">
          <el-col :span="21">
            <el-form-item prop="verifyAccount" label="验证账号">
              <el-input v-model="dialogFormPwd.verifyAccount" placeholder="请输入账号" @blur="phoneNumberExit">
              </el-input>
              <div class="loginTip" style="height: 0; left: 0; top: -12px;">{{this.accountTip}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item prop="newPwd" label="新密码">
              <el-input v-model="dialogFormPwd.newPwd" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item prop="confirmPassword" label="确认密码">
              <el-input v-model="dialogFormPwd.confirmPassword" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="bottomButton" style="left: 22%; background-color: white; border: 1px solid #dcdfe6;" @click="doCacel">取消</div>
      <div class="bottomButton" style="left: 60%; top: -20px;" @click="doConfirmPwd">确定</div>
    </el-dialog> 
		<copyright style="margin-bottom: 0px;"></copyright>
	</div>
</template>

<script>
	import { loginByUsername, loginByNumber } from '@/api/frame/login'
	import { sendCode } from '@/api/frame/code'
	import { addUser, editPwd } from '@/api/frame/user'
	import axios from 'axios'
	import copyright from '@/views/copyright/index'

	export default {
		name: 'login',
		data() {
      let validateVerification = (rule, value, callback) => {
      	if (value === '') {
      		callback(new Error('请输入验证码'))
      	} else {
      		if (this.formData1.verificationCode !== this.vNumber) {
      			callback(new Error('验证码不正确'))
      		} else {
      			callback()
      		}
      	}
      }
			let validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入动态码'))
        } else {
          if (!(/^\d{6}\b/).test(value)) {
            callback(new Error('请输入正确的动态码'))
          } else {
            callback()
          }
        }
      }
			let confirmPwd = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'))
				} else {
					if (value !== this.formData3.createPassword) {
						callback(new Error('两次输入密码不一致'))
					}
					callback()
				}
			}
			let diaConfirmPwd = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'))
				} else {
					if (value !== this.dialogFormPwd.newPwd) {
						callback(new Error('两次输入密码不一致'))
					}
					callback()
				}
			}
			return {
				type: '',
				activeNum: 'first',
				activeNum2: 'first2',
				loginTip: '',
				loginTip2: '',
				loginTip3: '',
				accountTip: '',
				codeFlag: true,
				codeMsg: '',
				code: 0,
				codeTip: '',
				codeTip1: '',
				dialogVisible: false,
				dialogEdit: false,
				verificationCodeTip: false,
				vNumber: '',
				timeBack: '',
				timer: null,
				protocol: '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的协议，协议内容如下所示：很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多很多内容。',
				formData1: {
					username: '',
					password: '',
					verificationCode: ''
				},
				formData2: {
					phoneNumber: '',
					dynamicCode: ''
				},
				formData3: {
					rePhoneNum: '',
					reDynamicCode: '',
					createPassword: '',
					confirmPassword: ''
				},
				dialogFormPwd: {
					verifyAccount: '',
					newPwd: '',
					confirmPassword: ''
				},
				rules:{
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					verificationCode: [{
						required: true,
						validator: validateVerification,
						trigger: 'blur'
					}]
				},
				rules2: {
					dynamicCode: [{
						required: false,
						validator: validateCode,
						trigger: 'blur'
					}]
				},
				rules3: {
					reDynamicCode: [{
						required: true,
						validator: validateCode,
						trigger: 'blur'
					}],
					createPassword: [{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					}],
					confirmPassword: [{
						required: true,
						validator: confirmPwd,
						trigger: 'blur'
					}]
				},
				dialogRule: {
					newPwd: [{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					}],
					confirmPassword: [{
						required: true,
						validator: diaConfirmPwd,
						trigger: 'blur'
					}]
				}
			}
		},
		components: {
			copyright
		},
		mounted() {
			this.type = this.$route.query.type
			this.generatedCode()
		},
		watch: {
			'$route': 'fetchData'
		},
		created() {
			this.fetchData()
		},
		methods: {
      fetchData() {
      	if (this.type !== 'add') {
      		this.type = 'add'
      	} else {
      		this.type = 'use'
      	}
      },
      // 获取手机动态码 60秒倒计时 并发送手机短信验证码
      getCode(){
      	if (this.type === 'use') {
      		if (this.formData2.phoneNumber === '') {
		      		this.loginTip2 = '账户不能为空'
		      	} else if (!(/^1(3|4|5|7|8)\d{9}$/).test(this.formData2.phoneNumber)) {
		      		this.loginTip2 = '请输入正确的手机号'
		      	} else {
		    			let phoneNumber = this.formData2.phoneNumber
							loginByNumber(phoneNumber)
							 .then(response => {
								if (response.data.status === 400) {
									this.loginTip2 = '不存在此账户，请重新输入'
								} else {
									this.loginTip2 = ''
									this.changeTime()
								}
							}).catch(() => {})
		    		}
      	} else {
      		if (this.formData3.rePhoneNum === '') {
	      		this.loginTip3 = '账户不能为空'
	      	} else if (!(/^1(3|4|5|7|8)\d{9}$/).test(this.formData3.rePhoneNum)) {
	      		this.loginTip3 = '请输入正确格式的手机号'
	      	} else {
	    			let phoneNumber = this.formData3.rePhoneNum
						loginByNumber(phoneNumber)
						 .then(response => {
							if (response.data.status === 400) {
								this.loginTip3 = ''
								this.changeTime()
							} else {
								this.loginTip3 = '已存在此账户，请直接登录'
							}
						}).catch(() => {})
	    		}
      	}
	      	
      },
      // 60秒倒计时并发送短信
      changeTime() {
      	const num = 60
      	if (!this.timer) {
      		this.timeBack = num
      		this.codeFlag = false
	      	this.timer = setInterval(() => {
	      		if (this.timeBack > 0 && this.timeBack <= num) {
	      			this.timeBack --
	      		} else {
	      			this.codeFlag = true
	      			clearInterval(this.timer)
	      			this.timer = null
	      		}
	      	}, 1000)
      	}
      	this.code = Math.floor(Math.random() * 999999)
      	if (this.type === 'use') {
      		let params = {
      			phoneNumber: this.formData2.phoneNumber,
      			code: this.code
      		}
      		this.sendCode(params)
      	} else {
      		let params = {
      			phoneNumber: this.formData3.rePhoneNum,
      			code: this.code
      		}
      		this.sendCode(params)
      	}
      },
      // 发送短信验证码
      sendCode(params) {
        sendCode(params)
    		 .then(response => {
    		 		this.codeMsg = response.data.msg
    		 }).catch(() => { }) 
      },
      // 生成随机四位由数字和英文组成的验证码
      generatedCode() {
      	const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      	let code = ''
      	for (let i = 0; i < 4; i++) {
      		let index = Math.floor(Math.random() * 62)
      		code += random[index]
      	}
      	this.vNumber = code
      },
      // 图片刷新
      handleCode() {
      	this.generatedCode()
      },
      // 忘记密码
      forgetPassword() {
      	this.dialogEdit = true
      },
      // 判断账号是否存在
      phoneNumberExit() {
      },
      doCacel() {
      	this.$refs.dialogForgetPwd.resetFields()
      	this.dialogEdit = false
      },
      // 点击确定保存修改后的密码
      doConfirmPwd() {
      	if (this.dialogFormPwd.verifyAccount === '') {
      		this.accountTip = '账户不能为空'
      	} else if (!(/^1(3|4|5|7|8)\d{9}$/).test(this.dialogFormPwd.verifyAccount)) {
    			this.accountTip = '请输入正确格式的手机号'
    		} else {
    			loginByNumber(this.dialogFormPwd.verifyAccount)
					 .then(response => {
						if (response.data.status === 400) {
							this.accountTip = '不存在此账户，请重新输入'
						} else {
							this.accountTip = ''
							this.$refs.dialogForgetPwd.validate(valid => {
			          if (valid) {
			            let uInfo = {
			            	password: this.dialogFormPwd.confirmPassword,
			            	phoneNumber: this.dialogFormPwd.verifyAccount
			            }
			            editPwd(uInfo)
			             .then(response => {
			             		if (response.data.status === 200) {
			            			this.dialogEdit = false
			             			this.$message({
			             				message: '修改密码成功',
			             				type: 'success'
			             			})
			             		} else {
			             			this.$message({
			             				message: '修改密码失败，请重试',
			             				type: 'warning'
			             			})
			             		}
			             })
			          } else {
			            return false
			          }
			        })
						}
					}).catch(() => {})
    		}
      },
      freeRegistration() {
      	this.$router.push({
					query: {
						type: 'add'
					}
				})
      },
      loginButton() {
      	if (this.activeNum === 'first') {
      		this.$refs.ruleForm.validate(valid => {
						if (valid) {
							const userInfo = {
								username: this.formData1.username,
								phoneNumber: this.formData1.username,
								password: this.formData1.password
							}
							loginByUsername(userInfo)
							 .then(response => {
								if (response.data.status === 200) {
									sessionStorage.setItem('myToken', response.data.token)
									this.$store.dispatch('Login', response.data)
									this.$router.push({
										name: 'layout'
									})
								} else if (response.data.status === 400) {
									this.loginTip = '账号或密码错误, 请重新输入'
									this.generatedCode()
								}
							}).catch(() => { })
						} else {
							this.generatedCode()
						}
					})
      	} else {
      		if (this.formData2.phoneNumber === '') {
	      		this.loginTip2 = '账户不能为空'
	      	} else if (!(/^1(3|4|5|7|8)\d{9}$/).test(this.formData2.phoneNumber)) {
	      		this.loginTip2 = '请输入正确的手机号'
	      	} else {
	      		loginByNumber(this.formData2.phoneNumber)
	      		.then(response => {
		      			if (response.data.status === 200) {
		      				this.loginTip2 = ''
									this.$refs.ruleForm2.validate(valid => {
										if (valid) {
											if (parseInt(this.formData2.dynamicCode) === this.code) { // 验证码正确
												this.codeTip = ''
												sessionStorage.setItem('myToken', response.data.token)
												this.$store.dispatch('Login', response.data)
												this.$router.push({
													name: 'layout'
												})
											} else {
												this.codeTip = '验证码不正确'
											}
										}
									})
		      			} else {
		      				this.$message({
		      					'message': '不存在此账户，请重新输入',
		      					'type': 'warning'
		      				})
		      			}
	      		})
						
	    		}
      	}
      },
			registerButton() {
				this.$refs.ruleForm3.validate(valid => {
					if (valid) {
						if (this.code === parseInt(this.formData3.reDynamicCode)) { // 验证码正确
							this.codeTip1 = ''
							const newUserInfo = {
								username: this.formData3.rePhoneNum,
								phoneNumber: this.formData3.rePhoneNum,
							  password: this.formData3.createPassword
							}
							addUser(newUserInfo)
							 .then(response => {
							 		if (response.status === 200) {
							 			this.$router.push({
											query: {
												type: 'use'
											}
										})
							 		} else {
							 			this.$message({
							 				message: '注册失败，请重新注册！',
							 				type: 'warning'
							 			})
							 		}
							 })
						} else {
							this.codeTip1 = '验证码不正确'
						}
					} else {
						return false
					}
				})
			}
		}
	}
</script>

<style scoped>
	i {
		padding-top: 12px;
		padding-left: 5px;
	}
	.verificationCodeClass {
		background: url(../../icons/img/backPic.png) no-repeat -8px;
	}
</style>