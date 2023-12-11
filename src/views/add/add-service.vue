<template>
  <div class="root" style="width:80%;margin-left:100px;margin-top:80px">
    <el-row style="font-size:40px;margin-bottom:20px">添加服务:</el-row>
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
      <el-form-item prop="title" label="服务标题" :rules="[{ required: true, message: '请输入服务标题', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.title" />
      </el-form-item>
      <el-form-item prop="info" label="服务介绍" :rules="[{ required: true, message: '请输入服务介绍', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.info" type="textarea" />
      </el-form-item>
      <!-- <el-form-item label="最低价格" prop="lowPrice"
        :rules="[{ required: true, message: '请输入最低价格（数字）', trigger: 'blur' }, { type: 'number', message: '价格必须为数字' }]">
        <el-input v-model.number="dynamicValidateForm.lowPrice" />
      </el-form-item>
      <el-form-item label="最高价格" prop="highPrice"
        :rules="[{ required: true, message: '请输入最高价格（数字）', trigger: 'blur' }, { type: 'number', message: '价格必须为数字' }]">
        <el-input v-model.number="dynamicValidateForm.highPrice" />
      </el-form-item> -->
      <el-form-item label="最低价格" prop="lowPrice" :rules="[{ type:'number',required: true, message: '请输入最低价格，且价格必须为数字', trigger: 'blur' }]">
        <el-input v-model.number="dynamicValidateForm.lowPrice" />
      </el-form-item>
      <el-form-item label="最高价格" prop="highPrice" :rules="[{type:'number', required: true, message: '请输入最高价格，且价格必须为数字', trigger: 'blur' ,whitespace:[{type: 'string', message: '只存在空格', whitespace: true, trigger: ['change','blur']}]}]">
        <el-input v-model.number="dynamicValidateForm.highPrice" />
      </el-form-item>
      <el-form-item label="是否置顶" prop="isOnTop">
        <el-switch v-model="dynamicValidateForm.isOnTop" active-text="是" inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="联系方式" prop="concact">
        <el-input v-model="phone" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadService } from '@/api/service'
import { getAdminInfo, postPhoneAPI } from '@/api/user'

export default {
  data() {
    return {
      dynamicValidateForm: {
        serviceName: '服务名',
        title: '',
        info: '',
        lowPrice: '',
        highPrice: '',
        concact: '',
        isOnTop: 0,
      },
      phone: ''
    }
  },
  mounted() {
    getAdminInfo().then(response => {
      const { phone } = response.data
      this.phone = phone
    })
  },
  methods: {
    removeBook(item) {
      var index = this.dynamicValidateForm.books.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.books.splice(index, 1)
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.$refs.dynamicValidateForm.model)
          if(this.$refs.dynamicValidateForm.model.isOnTop === true) {
            this.$refs.dynamicValidateForm.model.isOnTop = 1
          }else {
            this.$refs.dynamicValidateForm.model.isOnTop = 0
          }
          postPhoneAPI(this.phone)
          uploadService(this.$refs.dynamicValidateForm.model).then(response => {
            this.resetForm()
            alert('提交成功!')
          }).catch(err => {
            console.log(err);
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.dynamicValidateForm = {
        title: '',
        info: '',
        lowPrice: '',
        highPrice: '',
        concact: '',
        isOnTop: 0,
        serviceName: '服务名',
      }
    }
  }

}
</script>

<style lang="scss" scoped></style>
