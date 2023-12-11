<template>
  <div class="root" style="width:80%;margin-left:100px;margin-top:80px">
    <el-row style="font-size:40px;margin-bottom:20px">添加通知:</el-row>
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
      <el-form-item prop="title" label="通知标题" :rules="[{ required: true, message: '请输入通知标题', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.title" />
      </el-form-item>
      <el-form-item prop="content" label="通知内容" :rules="[{ required: true, message: '请输入通知内容', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.content" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadService } from '@/api/notice'
import { getAdminInfo, postPhoneAPI } from '@/api/user'

export default {
  data() {
    return {
      dynamicValidateForm: {
        title: '',
        content: ''
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
        content: ''
      }
    }
  }

}
</script>

<style lang="scss" scoped></style>
