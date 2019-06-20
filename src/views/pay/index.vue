<template>
	<div class="pay-container">
    <div class="logoClass">
      <img src="../../icons/img/图标.png" style="width: 210px; height: 100px;">
    </div>
		<div class="border-main">
			<div style="text-align: center; margin-bottom: 20px;">
				<div class="payTime">支付剩余时间：{{this.startTime}}</div>
				<div style="font-size: 24px;">￥{{price}}</div>
				<div class="merchant-order">订单号：{{this.number}}</div>
			</div>
      <div v-if="receAddressFlag" @click="handleAddress" class="address-font" style="color: red;">请填写收货地址</div>
      <div v-else @click="handleAddress" class="address-font">
        收货地址：<span>{{this.receAddress.cname}}&nbsp;&nbsp;{{this.receAddress.cPhone}}</span>
        <div style="margin-left: 80px;">
          <span v-if="this.receAddress.defaultAddress === 1" style="padding: 2px;color: red; background-color: #FFF0AC;">默认</span>
          {{this.receAddress.shippingAddress}}{{this.receAddress.detailAddress}}
        </div>
      </div>
			<div class="payWay" @click="doBankCard">银行卡支付
				<img src="@/icons/img/勾选.png" class="chooseImg" v-if="id === 1"/>
				<img src="@/icons/img/未勾选.png" class="chooseImg" v-else/>
			</div>
			<div class="payWay" @click="doWechatPay">微信支付
				<img src="@/icons/img/勾选.png" class="chooseImg chooseImgs" v-if="id === 2"/>
				<img src="@/icons/img/未勾选.png" class="chooseImg chooseImgs" v-else/>
			</div>
			<div class="payWay" @click="doAlipay">支付宝支付
				<img src="@/icons/img/勾选.png" class="chooseImg" v-if="id === 3"/>
				<img src="@/icons/img/未勾选.png" class="chooseImg" v-else/>
			</div>
			<div class="payWay" @click="doQQPay">QQ钱包&nbsp;&nbsp;
				<img src="@/icons/img/勾选.png" class="chooseImg chooseImgs" v-if="id === 4"/>
				<img src="@/icons/img/未勾选.png" class="chooseImg chooseImgs" v-else/>
			</div>
			<div class="payButton" @click="doPay">支付</div>
		</div> 
    <!--订单失效-->
		<el-dialog title="提示" :visible.sync="dialogVisible" :closeOnClickModal="false" :showClose="false" width="30%" center>
			<span style="margin-left: 90px;">支付时间已失效，请重新下单支付！</span>
			<span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="confirm">确 定</el-button>
		  </span>
		</el-dialog>
    <!--收货地址填写-->
    <el-dialog title="收货地址" :visible.sync="addressFlag" :closeOnClickModal="false" width="38%" center>
      <div class="address-class" v-for="(item, index) in allAddress" :value="item.value" :key="index">
        <!-- <div v-if="editFlag"> -->
          <div>
            <span>{{item.cname}}</span>
            <span>{{item.cPhone}}</span>
          </div>
          <div>
            <span v-if="item.defaultAddress" style="padding: 2px;color: red; background-color: #FFF0AC;">默认</span>
            <span>{{item.shippingAddress}}&nbsp;{{item.detailAddress}}</span>
          </div>
        <!-- </div> -->
        <div class="edit-box">
          <span @click="doUpdate(item)">编辑</span>
          <span @click="doDel(item)">删除</span>
        </div>
      </div>
      <!--修改单个地址-->
      <div v-if="editFlag" class="address-class">
        <el-form :model="formDataSingle" ref="ruleFormSingle" :rules="rules" label-position="left" label-width="25%">
          <el-form-item prop="cname" label="收货人姓名">
            <el-input v-model="formDataSingle.cname" resize="none" style="width: 100%; margin-top: -15px;" placeholder="请输入收货人姓名"></el-input>
          </el-form-item>
          <el-form-item prop="cPhone" label="收货人电话">
            <el-input v-model="formDataSingle.cPhone" resize="none" style="width: 100%; margin-top: -15px;" placeholder="请输入收货人电话"></el-input>
          </el-form-item>
          <el-form-item prop="shippingAddress" label="收货地址">
            <area-select type="all" :level="2" v-model="formDataSingle.shippingAddress" :data="pcaa" :placeholders="placeholders" icon="el-icon-caret-bottom"></area-select>
          </el-form-item>
          <el-form-item prop="detailAddress">
            <el-input type="textarea" v-model="formDataSingle.detailAddress" resize="none" min="2" max="4" style="width: 100%; margin-top: -15px;" placeholder="请输入详细地址(街道)"></el-input>
          </el-form-item>
          <el-form-item prop="defaultAddress" label="默认">
            <el-switch v-model="formDataSingle.defaultAddress" active-color="#13ce66" inactive-color="#D0D0D0" @change="handleDefault"></el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveSingle">保存</el-button>
          <el-button @click="cancleSingle">取消</el-button>
        </span>
      </div>
      <!--添加地址-->
      <el-form :model="formData" ref="ruleForm" :rules="rules" label-position="left" label-width="25%" class="address-class">
        <el-form-item prop="cname" label="收货人姓名">
          <el-input v-model="formData.cname" resize="none" style="width: 100%; margin-top: -15px;" placeholder="请输入收货人姓名"></el-input>
        </el-form-item>
        <el-form-item prop="cPhone" label="收货人电话">
          <el-input v-model="formData.cPhone" resize="none" style="width: 100%; margin-top: -15px;" placeholder="请输入收货人电话"></el-input>
        </el-form-item>
        <el-form-item prop="shippingAddress" label="收货地址">
          <area-select type="all" :level="2" v-model="formData.shippingAddress" :data="pcaa" :placeholders="placeholders" icon="el-icon-caret-bottom"></area-select>
        </el-form-item>
        <el-form-item prop="detailAddress">
          <el-input type="textarea" v-model="formData.detailAddress" resize="none" min="2" max="4" style="width: 100%; margin-top: -15px;" placeholder="请输入详细地址(街道)"></el-input>
        </el-form-item>
        <el-form-item prop="defaultAddress" label="默认">
          <el-switch v-model="formData.defaultAddress" active-color="#13ce66" inactive-color="#D0D0D0" @change="handleDefault"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancle">取消</el-button>
      </span>
    </el-dialog>
		<copyright></copyright>
	</div>
</template>

<script>
  import { pcaa } from "area-data"
  import { 
    getAddress, 
    getAddressById,
    addAddress, 
    editAddress,
    editDefault, 
    delAddress, 
    getDictionary, 
    addDictionary 
  } from '@/api/frame/address'
	import copyright from '@/views/copyright/index'
  import Cookies from 'js-cookie'
	export default {
		name: 'pay',
		data() {
      let validatePhone = (rule, value, callback) => {
        if (value === '' || value.trim() === '') {
          callback(new Error('请输入收货人手机号'))
        } else {
          if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
            callback(new Error('请输入正确的手机号'))
          } else {
            callback()
          }
        }
      }
			return {
				id: 1,
        startTime: '',
        lockSeconds: 1200,
				number: '',
        dialogVisible: false,
        editFlag: false,
        receAddressFlag: true,
        allArr: [],
        listQuery: [],
        allAddress: [],
        receAddress: {},
        addressFlag: false,
        pcaa: pcaa,
        placeholders: ["选择省", "选择市", "选择区"],
        formDataSingle: {
          cname: '',
          cPhone: '',
          shippingAddress: [],
          detailAddress: '',
          defaultAddress: false
        },
        formData: {
          cname: '',
          cPhone: '',
          shippingAddress: [],
          detailAddress: '',
          defaultAddress: false
        },
        rules: {
          cname: [{
            required: false,
            message: '请输入',
            trigger: 'blur'
          }],
          cPhone:[{
            required: false,
            validator: validatePhone,
            trigger: 'blur'
          }],
          shippingAddress: [{
            required: false,
            message: '请选择',
            trigger: 'change'
          }],
          detailAddress: [{
            min: 5,
            message: '长度不得少于6个字符',
            trigger: 'blur'
          }]
        }
			}
		},
		components: {
			copyright
		},
		mounted(){
      this.getList()
      this.number = Cookies.get('number')
      this.getTime()
      this.listQuery = this.$route.params.shoppingCarList
		},
    computed: {
      price() {
        return Cookies.get('price')
      },
    },
		methods: {
      // 页面初始填写收货地址
      getList() {
        getAddress(sessionStorage.getItem('username'))
         .then(response => {
          if (response.data.length > 0) {
            this.receAddressFlag = false
            for(const i in response.data) {
              if (response.data[i].defaultAddress === 1) {
                this.receAddress = response.data[i]
                getDictionary(response.data[i].shippingAddress)
                .then(response => {
                  this.receAddress.shippingAddress = response.data[0].aValue
                }).catch(() => { })
                return false
              } else {
                this.receAddress = response.data[0]
                getDictionary(response.data[0].shippingAddress)
                .then(response => {
                  this.receAddress.shippingAddress = response.data[0].aValue
                }).catch(() => { })
              }
            }
          } else {
            this.receAddressFlag = true
          }
         }).catch(() => {
          return false
         })
      },
      // 弹框初始化
      getAllAddress() {
        getAddress(sessionStorage.getItem('username'))
         .then(response => {
          if (response.data.length > 0) {
            this.allAddress = response.data
            for(const i in response.data) {
              getDictionary(response.data[i].shippingAddress)
              .then(response => {
                this.allAddress[i].shippingAddress = response.data[0].aValue
              }).catch(() => { })
            }
          }
         }).catch(() => {
          return false
         })
      },
      handleAddress(){
        this.addressFlag = true
        this.getAllAddress()
      },
      // 修改地址
      doUpdate(params) {
        this.editFlag = true
        getAddressById(params.id)
        .then(response => {
          this.formDataSingle = response.data[0]
          let shippingAddress = []
          shippingAddress.push(response.data[0].shippingAddress.slice(0, 6))
          shippingAddress.push(response.data[0].shippingAddress.slice(6, 12))
          shippingAddress.push(response.data[0].shippingAddress.slice(12, 18))
          this.formDataSingle.shippingAddress = shippingAddress
          shippingAddress = []
        })
      },
      saveSingle() {
        let shippingAddress = Object.keys(this.formDataSingle.shippingAddress[0])[0] + 
              Object.keys(this.formDataSingle.shippingAddress[1])[0] + 
              Object.keys(this.formDataSingle.shippingAddress[2])[0]
        let addressSingleInfo = {
          cname: this.formDataSingle.cname,
          cPhone: this.formDataSingle.cPhone,
          shippingAddress: shippingAddress,
          detailAddress: this.formDataSingle.detailAddress,
          defaultAddress: this.getDefault(this.formDataSingle.defaultAddress),
          id: this.formDataSingle.id
        }
        editAddress(addressSingleInfo)
         .then(response => {
          if (response.data.status === 200) {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.getAllAddress()
            this.getList()
            this.formDataSingle = {}
            this.editFlag = false
          } else {
            this.$message({
              message: '修改失败！',
              type: 'warning'
            })
          }
         })
      },
      cancleSingle() {
        this.editFlag = false
      },
      // 判断是否已经有默认地址 有则将之前的默认地址状态改为0 没有则直接设置为1
      handleDefault() {
        if (this.formData.defaultAddress || this.formDataSingle.defaultAddress) {
          getAddress(sessionStorage.getItem('username'))
          .then(response => {
            if (response.data.length > 0) {
              for(const i in response.data) {
                if (response.data[i].defaultAddress === 1) {
                  let defaultInfo = {
                    defaultAddress: 0,
                    id: response.data[i].id
                  }
                  editDefault(defaultInfo)
                  .then(response => {
                    if (response.data.status === 400) {
                      this.$message({
                        message: '请稍后再试！',
                        type: 'warning'
                      })
                    }
                  }).catch(() => { })
                }
              }
            }
          })
        }
      },
      // 删除
      doDel(params) {
        delAddress(params.id)
         .then(response => {
          if (response.data.status === 200) {
            this.$confirm('确认删除？', '确认信息', {
              distinguishCancelAndClose: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            })
            .then(() => {
              this.$message({
                message: '删除收货地址成功！',
                type: 'success'
              })
              this.getList()
              this.getAllAddress()
            }).catch(() => {
              return false
            })
          } else {
            this.$message({
              message: '删除失败，请检查网络设置后重试！',
              type: 'warning'
            })
          }
         })
      },
      // 保存 增加地址
      save() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            // 将地区的key和value加入dictionary表中
            let dictionaryInfo = {
              key: Object.keys(this.formData.shippingAddress[0])[0] + Object.keys(this.formData.shippingAddress[1])[0]+ Object.keys(this.formData.shippingAddress[2])[0],
              value: Object.values(this.formData.shippingAddress[0])[0] + Object.values(this.formData.shippingAddress[1])[0] + Object.values(this.formData.shippingAddress[2])[0]
            }
            getAddress(dictionaryInfo.key)
            .then(response => {
              if (response.data) {
                addDictionary(dictionaryInfo)
                 .then(response => {
                    if(response.data.status === 400) {
                      this.$message({
                        message: '加入字典码表有错',
                        type: 'warning'
                      })
                    }
                 }).catch(() => { })
              }
            })
            .catch(() => { })   
            // 将收货地址加入address_info表中
            let addressInfo = {
              username: sessionStorage.getItem('username'),
              cname: this.formData.cname,
              cPhone: this.formData.cPhone,
              shippingAddress: dictionaryInfo.key,
              detailAddress: this.formData.detailAddress,
              defaultAddress: this.getDefault(this.formData.defaultAddress)
            }
            addAddress(addressInfo)
             .then(response => {
              if(response.data.status === 200) {
                this.$message({
                  message: '增加地址成功',
                  type: 'success'
                })
                getDictionary(addressInfo.shippingAddress)
                .then(response => {
                  addressInfo.shippingAddress = response.data[0].aValue
                  this.allAddress.push(addressInfo) // 将新增加的收货地址push到上面的地址栏中
                  if (!this.receAddress) {
                    this.receAddress = addressInfo
                  }
                  this.getList()
                  this.getAllAddress()
                  this.formData = {}
                  this.formData.shippingAddress = ['选择省', '选择市', '选择区']
                }).catch(() => { })
              } else {
                this.$message({
                  message: '增加地址失败',
                  type: 'warning'
                })
              }
             })
          }
        })
      },
      cancle() {
        this.addressFlag = false
      },
      getDefault(params) {
        if (params) {
          return 1
        } else {
          return 0
        }
      },
      // 读取cookies
      getTime() {
        // cookies存在
        if(Cookies.get('endTime')) {
          // 当前时间戳
          let nowTime = new Date()
          let d = new Date(nowTime)
          let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
          // 结束时间与当前时间差值（秒）
          this.lockSeconds = Cookies.get('endTime') - this.timeToSec(time)
          if (this.lockSeconds <= 0) { // 结束时间与当前时间差值小于0 时间结束
            this.dialogVisible = true
            Cookies.set('endTime', '')
          } else { // 时间未结束
            this.continueTime(this.lockSeconds)
          }
        } else {
          this.continueTime(this.lockSeconds)
        }
      },
      // 倒计时
      continueTime(lockSeconds) {
        //1.获取当前系统时间戳
        let nowTime = new Date()
        let d = new Date(nowTime)
        let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
        //2.获取 lockSeconds 后的系统时间
        time = lockSeconds + this.timeToSec(time)
        //3.用cookie保存到期时间
        Cookies.set('endTime', time)
        // 使用结束时间与当前时间的差值作为倒计时
        this.startTime = this.secToTime(lockSeconds) 
        // 根据lockSeconds倒计时
        let timer = window.setInterval(() => {
          if (lockSeconds > 0) {
            lockSeconds --
            this.startTime = this.secToTime(lockSeconds)
          } else {
            this.dialogVisible = true
            window.clearInterval(timer)
            Cookies.set('endTime', '')
          }
        }, 1000)
      },
      // 将时间转为秒
      timeToSec(time) {
        let hour = time.split(':')[0]
        let min = time.split(':')[1]
        let sec = time.split(':')[2]
        return parseInt(hour * 3600) + parseInt(min * 60) + parseInt(sec)
      },
      // 将秒转为 分:秒
      secToTime(time) {
        let t = ''
        if (time >= 0) {
          let min = Math.floor(time/60) % 60
          let sec = time % 60
          if (min < 10) {
            t = '0'
          }
          t += min + '分'
          if (sec < 10) {
            t += '0'
          }
          t += sec + '秒'
        }
        return t
      },
			doBankCard() {
				this.id = 1
			},
			doWechatPay() {
				this.id = 2
			},
			doAlipay() {
				this.id = 3
			},
			doQQPay() {
				this.id = 4
			},
			doPay() {
        if (this.receAddress !== '') {
          this.$message({
            message: '支付成功，商家已接单！',
            type: 'success'
          })
          this.$router.push({
            name: 'orderManagement',
            params: { 
              shoppingCarList: this.listQuery
            }
          })
        }
			},
      // 订单超时
      confirm() {
      	this.dialogVisible = false
      	this.$router.push({
      		name: 'orderManagement',
          params: { shoppingCarList: this.listQuery }
      	})
      }
		}
	}
</script>

<style scoped>

</style>