<template>
	<div class="personalCenter-container">
    <div class="logoClass">
      <img src="../../icons/img/图标.png" style="width: 210px; height: 100px;">
    </div>
		<div class="border-main">
			<div style="margin: -20px auto 30px 0;">个人设置</div>
<<<<<<< HEAD
			<el-form :model="formData" ref="ruleForm" :rules="rules" label-position="left" label-width="25%">
=======
			<el-form :model="formData" ref="ruleForm" label-position="left" label-width="25%">
>>>>>>> 提交后续代码，完善信息
				<el-form-item prop="headPortrait" label="头像">
          <div class="headPortrait-box">
            <label for="my_file" style="display:block; overflow: hidden; width: 50px;">
              <img :src='formData.headPortrait' alt="" v-if="dialogImageUrl" style="width: 50px; height: 50px; border-radius: 6px;position: relative; left: -245px;"/>
              <span v-else style="margin-left: 10px;">+</span>
            </label>
          </div>
          <input type="file" ref="upload" name="avatar" id='my_file' style="display:none;" accept="image/jpg" @change="getImg">
				</el-form-item>
				<el-form-item prop="nickName" label="昵称">
					<el-input v-model="formData.nickName" maxlength="15" @blur="nickNameExit"></el-input>
				</el-form-item>
				<el-form-item prop="birthday" label="生日">
					<el-date-picker v-model="formData.birthday" type="date" style="width: 100%; margin-left: -20px; padding-left: 20px;" :picker-options="pickerOptions"></el-date-picker>
				</el-form-item>
<<<<<<< HEAD
				<!-- <el-form-item prop="shippingAddress" label="收货地址">
					<el-cascader expand-trigger="hover" :options="shippingAddressOptions" v-model="formData.shippingAddress" @change="handleChange" style="width: 100%;"></el-cascader>
				</el-form-item> -->
        <el-form-item prop="detailAddress">
          <el-input type="textarea" v-model="formData.detailAddress" resize="none" min="2" max="4" style="width: 100%; margin-top: -15px;" placeholder="请输入详细地址(街道)"></el-input>
        </el-form-item>
=======
>>>>>>> 提交后续代码，完善信息
			</el-form>
      <div class="loginTip">{{this.loginTip}}</div>
      <div style="font-size: 14px;">
        换绑手机<span style="margin-left: 45px;">{{this.formData.phoneNumber}}</span>
        <div class="changePhoneNumber" @click="changePhoneNumber">更换</div>
        修改密码<span style="margin-left: 45px;">******</span>
        <div class="changePhoneNumber" @click="editPwd">修改</div>
        登录密码<span style="margin-left: 45px;">安全性：&nbsp;<span id="safe">{{this.formData.safety}}</span></span>
      </div>
      <div class="bottomButton" type="primary" style="left: 12%; top: 27px;" @click="doSave">保存</div>
      <div class="bottomButton" style="left: 62%; top: -30px;" @click="doReset">重置</div>
		</div>


    <!--更换手机-->
    <el-dialog title="更换号码" :visible.sync="dialogChange" :close-on-click-modal="false" width="50%">
      <el-form :model="dialogForm" ref="dialogRule" :rules="rules2" label-position="left" label-width="25%">
        <el-row :gutter="0">
          <el-col :span="21">
            <el-form-item prop="changeNumber">
              <el-input v-model="dialogForm.changeNumber" placeholder="请输入新手机号" @blur="pNumberExit">
                <i slot="prefix" class="el-icon-first-mobile" style="position: relative; left: -280px; top: 1px;"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item prop="dynamic">
              <el-input v-model="dialogForm.dynamic" placeholder="动态码">
                <i slot="prefix" class="el-icon-first-iconcode" style="position: relative; left:-280px; top: 11px;"></i>
                <el-button v-if="codeFlag" slot="append" size="mini" style="font-size: 5px; width: 95px;" @click="doGet">获取动态码</el-button>
                <el-button v-else slot="append" size="mini" style="font-size: 5px; width: 95px;">{{this.timeBack}}秒后重发</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="loginTip loginTip2">{{this.loginTip2}}</div>
      <div class="bottomButton" style="background-color: white; border: 1px solid #dcdfe6;" @click="doCacel">取消</div>
      <div class="bottomButton" style="left: 60%; top: -20px;" @click="confirmNumber">确定</div>
    </el-dialog> 
    <!--修改密码-->
    <el-dialog title="修改密码" :visible.sync="dialogEdit" :close-on-click-modal="false" width="50%">
      <el-form :model="dialogFormPwd" ref="dialogRulePwd" :rules="rules3" label-position="left" label-width="20%" style="margin-left: 30px;">
        <el-row :gutter="0">
          <el-col :span="21">
            <el-form-item prop="originalPwd" label="原始密码">
              <el-input v-model="dialogFormPwd.originalPwd" type="password" placeholder="请输入密码">
              </el-input>
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
      <div class="bottomButton" style="left: 60%; top: -20px;" @click="confirmPwd">确定</div>
    </el-dialog> 
		<copyright></copyright>
	</div>
</template>

<script>
  import { getList, editList } from '@/api/frame/user'
  import { loginByNumber } from '@/api/frame/login'
  import { saveHeadPortrait, saveToSql } from '@/api/frame/uploadImg'
	import copyright from '@/views/copyright/index'
	export default {
		name: 'personalCenter',
		data() {
      let validateAddress = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择地址'))
        } else {
         callback()
        }
      }
      let validatePwd = (rule, value, callback) => {
        if (value === '' || value.trim() === '') {
          callback(new Error('请输入原始密码'))
        } else {
          if (value !== this.formData.password) {
            callback(new Error('密码错误'))
          } else {
            callback()
          }
        }
      }
      let validateComfirmPwd = (rule, value, callback) => {
        if (value === '' || value.trim() === '') {
          callback(new Error('请确认密码'))
        } else {
          if (value !== this.dialogFormPwd.newPwd) {
            callback(new Error('两次输入密码不相同'))
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
			return {
				dialogImageUrl: '',
        dialogChange: false,
        dialogEdit: false,
        loginTip: '',
        loginTip2: '',
        codeFlag: true,
        timeBack: '',
        timer: null,
        userId: 0,
				formData: {
          id: 0,
					headPortrait: '',
					nickName: '',
					birthday: '',
<<<<<<< HEAD
					// shippingAddress: [],
					detailAddress: '',
=======
>>>>>>> 提交后续代码，完善信息
          safety: '',
          password: '',
          phoneNumber: ''
				},
        dialogForm: {
          changeNumber: '',
          dynamic: ''
        },
        dialogFormPwd: {
          originalPwd: '',
          newPwd: '',
          confirmPassword: ''
        },
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now()
					}
				},
<<<<<<< HEAD
        // shippingAddressOptions: [],
				shippingAddressOptions: [],
				rules: {
          detailAddress: [{
            min: 5,
            message: '长度不得少于6个字符',
            trigger: 'blur'
          }],
          shippingAddress: [{
            validator: validateAddress,
            trigger: 'blur'
          }]
				},
=======
>>>>>>> 提交后续代码，完善信息
        rules2: {
          dynamic: [{
            validator: validateCode,
            trigger: 'blur'
          }]
        },
        rules3: {
          originalPwd: [{
            required: true,
            validator: validatePwd,
            trigger: 'blur'
          }],
          newPwd: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          }],
          confirmPassword: [{
            required: true,
            validator: validateComfirmPwd,
            trigger: 'blur'
          }]
        }
			}
		},
		components: {
			copyright
		},
    created() {
      this.getList()
    },
    // 监听密码的变化
    watch: {
      'formData.password': function(value){
        this.isSafety()
      }
    },
		methods: {
      //判断safety
      isSafety() {
        let ref = document.getElementById('safe')
        if (this.formData.password.length < 12 && 
          ((/^[0-9]+$/).test(this.formData.password) || (/^[A-Za-z]+$/).test(this.formData.password))) { // 全部为数字或英文
          this.formData.safety = '弱'
          ref.style.color = 'red'
        } else if (this.formData.password.length < 12 && (/\d+/).test(this.formData.password) && (/[a-zA-Z]+/).test(this.formData.password)) { // 小于12位的数字和英文组合
          this.formData.safety = '中'
          ref.style.color = 'blue'
        } else { // 大于12位的数字和英文
          this.formData.safety = '强'
          ref.style.color = 'green'
        }
      },
      // 初始化获取用户信息
      getList() {
        getList(sessionStorage.getItem('username'))
         .then(response => {
<<<<<<< HEAD
          // for(const i in response.data) {
=======
>>>>>>> 提交后续代码，完善信息
            this.formData = response.data[0]
            if (this.formData.headPortrait) {
              this.dialogImageUrl = this.formData.headPortrait
            } else {
              this.dialogImageUrl = ''
            }
            this.isSafety()
<<<<<<< HEAD
          // }
=======
>>>>>>> 提交后续代码，完善信息
        }).catch(() => { })
      },
      // 判断nickName是否唯一
      nickNameExit() {
        if (this.formData.nickName === '') {
          this.loginTip = '昵称不能为空'
        } else {
          getList(this.formData.nickName)
           .then(response => {
            if (response.data.length > 0) {
              this.loginTip = '昵称已存在,请重新输入'
            } else {
              this.loginTip = ''
            }
          }).catch(() => {})
        }
      },
      getImg(event) {
        if (event) {
          let img = event.target.files[0]
          let size = img.size
          if (size > 3145728) {
            this.$message({
              message: '请选择3M以内的图片！',
              type: 'warning'
            })
            return false
          }
          let form = new FormData()
          form.append('avatar', img, this.avatar_name)
          saveHeadPortrait(form)  // 存入本地
           .then(response => {
             if (response.data.status !== 400) {
              this.formData.headPortrait = response.data
             } else {
              this.$message({
                message: '请检查网络设置后重试',
                type: 'warning'
              })
             }
           })
           .catch((error) => {
            return false
           })
        }
      },
			handleChange() {

			},
      // 保存修改
      doSave() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid && this.loginTip === '') {
            this.$confirm('确认保存？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.userId = this.formData.id
              const userInfo = {
                username: this.formData.nickName,
                nickName: this.formData.nickName,
                birthday: this.formData.birthday,
<<<<<<< HEAD
                // shippingAddress: this.formData.shippingAddress,
                detailAddress: this.formData.detailAddress,
=======
>>>>>>> 提交后续代码，完善信息
                phoneNumber: this.formData.phoneNumber,
                password: this.formData.password,
                userId: this.userId
              }
              // 保存头像存入数据库
              saveToSql(this.userId) 
               .then(response => {
                  if (response.data.status !== 200) {
                    this.$message({
                      message: '头像保存失败，请检查网络设置后重试',
                      type: 'warning'
                    })
                    return false
                  }
               }).catch(() => {
                return false
               })
              // 其他信息存入数据库
              editList(userInfo)
               .then(response => {
                  if (response.status === 200) {
                    sessionStorage.setItem('username', this.formData.nickName)
                    sessionStorage.setItem('phoneNumber', this.formData.phoneNumber)
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    })
                  } else {
                    this.$message({
                      message: '修改失败, 请重新输入',
                      type: 'warning'
                    })
                  }
               }).catch(() => { })
            }).catch(() => { })
          } else {
            return false
          }
        })
      },
      doReset() {
        this.$refs.ruleForm.resetFields()
        this.loginTip = ''
      },
      changePhoneNumber() {
        this.dialogChange = true
      },
      editPwd(){
        this.dialogEdit = true
      },
      // 判断手机号是否存在
      pNumberExit() {
        this.loginTip2 ===''
        if (this.dialogForm.changeNumber === '' || this.dialogForm.changeNumber.trim() === '') {
          this.loginTip2 = '请输入新的手机号'
        } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.dialogForm.changeNumber)) {
          this.loginTip2 = '请输入正确的手机号'
        } else {
          if (this.dialogForm.changeNumber !== this.formData.phoneNumber) { 
            // 判断是否存在输入的手机号
            let phoneNumber = this.dialogForm.changeNumber 
            loginByNumber(phoneNumber)
             .then(response => {
              if (response.data.status === 200) {
                this.loginTip2 = '此号码已被注册，请重新输入'
              } else {
                this.loginTip2 = ''
              }
             })
          } else {
            this.loginTip2 = '手机号重复，请重新输入'
          }
        }
      },
      // 获取动态码 倒计时60秒
      doGet() {
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
      },
      doCacel() {
        this.dialogChange = false
        this.dialogEdit = false
      },
      // 修改手机号保存
      confirmNumber(){
        if (this.loginTip2 === '') {
          this.$refs.dialogRule.validate(valid => {
            if (valid) {
              this.dialogChange = false
              this.formData.phoneNumber = this.dialogForm.changeNumber
              this.$refs.dialogRule.resetFields()
            } else {
              return false
            }
          })
        }
      },
      // 修改密码保存
      confirmPwd() {
        this.$refs.dialogRulePwd.validate(valid => {
          if (valid) {
            this.dialogEdit = false
            this.formData.password = this.dialogFormPwd.confirmPassword
          } else {
            return false
          }
        })
      }
		}
	}
</script>

<style scoped>
  .logoClass {
    left: -215px;
  }
  .loginTip {
    left: 115px;
    top: -144px;
  }
  .loginTip2 {
    top: -85px;
    left: 150px;
  }
	.el-upload {
		display: none !important;
	}
  img {
  	margin-left: 245px;
  }
  i {
  	padding-left: 0px;
  	margin-left: 285px;
  }
  .el-form-item__content .el-input-group, .el-form-item__label, .el-tag .el-icon-close .el-input-group__append:hover {
    cursor: pointer !important;
  }
</style>