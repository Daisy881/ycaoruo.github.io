<template>
	<div class="personalCenter-container">
    <div class="logoClass">
      <img src="../../icons/img/图标.png" style="width: 210px; height: 100px;">
    </div>
		<div class="border-main">
			<div style="margin: -20px auto 30px 0;">个人设置</div>
			<el-form :model="formData" ref="ruleForm" :rules="rules" label-position="left" label-width="25%">
				<el-form-item prop="headPortrait" label="头像">
					<el-upload v-model="formData.headPortrait" action="https://jsonplaceholder.typicode.com/posts/" :on-success="handleSuccess" :show-file-list="false" :before-upload="handleBeforeUpload">
						<img v-if="dialogImageUrl" :src="dialogImageUrl" alt="" class="avatar" style="margin-bottom: -13px;">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item prop="nickName" label="昵称">
					<el-input v-model="formData.nickName" maxlength="15" @blur="nickNameExit"></el-input>
				</el-form-item>
				<el-form-item prop="birthday" label="生日">
					<el-date-picker v-model="formData.birthday" type="date" style="width: 100%; margin-left: -20px; padding-left: 20px;" :picker-options="pickerOptions"></el-date-picker>
				</el-form-item>
				<!-- <el-form-item prop="shippingAddress" label="收货地址">
					<el-cascader expand-trigger="hover" :options="shippingAddressOptions" v-model="formData.shippingAddress" @change="handleChange" style="width: 100%;"></el-cascader>
				</el-form-item> -->
        <el-form-item prop="detailAddress">
          <el-input type="textarea" v-model="formData.detailAddress" resize="none" min="2" max="4" style="width: 100%; margin-top: -15px;" placeholder="请输入详细地址(街道)"></el-input>
        </el-form-item>
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
  import { getList, editList } from '@/api/frame/user.js'
  import { loginByNumber } from '@/api/frame/login.js'
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
				formData: {
					headPortrait: '',
					nickName: '',
					birthday: '',
					// shippingAddress: [],
					detailAddress: '',
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
        // shippingAddressOptions: [],
				shippingAddressOptions: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
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
    mounted() {
      this.getList()
    },
    // 监听密码的变化
    watch: {
      'formData.password': function(value){
        this.safety
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
          for(const i in response.data) {
            this.formData = response.data[i]
            // console.log(this.formData.headPortrait,55)
            // if (this.formData.headPortrait) {
              // this.dialogImageUrl = this.formData.headPortrait
            // } else {
            //   this.dialogImageUrl = ''
            // }
            this.isSafety()
          }
        }).catch(() => { })
      },
      // 判断nickName是否唯一
      nickNameExit() {
        if (this.formData.nickName === '' || this.formData.nickName.replace(/\s/g,"") === '') {
          this.loginTip = '昵称不能为空'
        } else {
          let username = this.formData.nickName
          getList(username)
           .then(response => {
            if (response.data.length > 1) {
              this.loginTip = '昵称已存在,请重新输入'
            } else {
              this.loginTip = ''
            }
          }).catch(() => {})
        }
      },
			handleSuccess(res, file) {
				this.dialogImageUrl = URL.createObjectURL(file.raw)
        console.log(this.dialogImageUrl, 22)
        // const reader = new FileReader()
        // reader.readAsDataURL(file)
        // reader.onload = () => {
        //   const _base64 = reader.result
        //   console.log(_base64)
        // }
			},
      // 图片上传前 判断格式 将缓存地址转为base64位
			handleBeforeUpload(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const _base64 = reader.result
          this.dialogImageUrl1 = this.convertBase64ToBlob(_base64)
          console.log(this.dialogImageUrl1, 11)
        }
				const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
			},
      // 将base64编码格式的图片转为blob对象
      convertBase64ToBlob (base64){
        var base64Arr = base64.split(',')
        var imgtype = ''
        var base64String = ''
        if(base64Arr.length > 1){
          //如果是图片base64，去掉头信息
          base64String = base64Arr[1];
          imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':') + 1, base64Arr[0].indexOf(';'))
        }
        // 将base64解码
        var bytes = atob(base64String)
        //var bytes = base64
        var bytesCode = new ArrayBuffer(bytes.length)
         // 转换为类型化数组
        var byteArray = new Uint8Array(bytesCode)
        // 将base64转换为ascii码
        for (var i = 0; i < bytes.length; i++) {
            byteArray[i] = bytes.charCodeAt(i)
        }
        // 生成Blob对象（文件对象）
        return new Blob( [bytesCode] , {type : imgtype})
      },
			handleChange() {

			},
      // 保存修改
      doSave() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认保存？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (!this.dialogImageUrl) {
                this.formData.headPortrait = ''
              } else {
                this.formData.headPortrait = this.dialogImageUrl
              }
              const userInfo = {
                headPortrait: this.formData.headPortrait,
                username: sessionStorage.getItem('username'),
                nickName: this.formData.nickName,
                birthday: this.formData.birthday,
                // shippingAddress: this.formData.shippingAddress,
                detailAddress: this.formData.detailAddress,
                password: this.formData.password,
                phoneNumber: this.formData.phoneNumber
              }
              editList(userInfo)
               .then(response => {
                  if (response.data.status === 200) {
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
               })
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