<template>
  <div class="root" style="width:80%;margin-left:100px;margin-top:80px">
    <el-row style="font-size:40px;margin-bottom:20px">添加闲置:图片，</el-row>
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
      <el-form-item prop="title" label="闲置标题" :rules="[{ required: true, message: '请输入闲置标题', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.title" />
      </el-form-item>
      <el-form-item prop="info" label="闲置套装介绍" :rules="[{ required: true, message: '请输入闲置介绍', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.info" type="textarea" />
      </el-form-item>
      <el-form-item label="最低价格" prop="lowPrice" :rules="[{ required: true, message: '请输入最低价格', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.lowPrice" />
      </el-form-item>
      <el-form-item label="最高价格" prop="highPrice" :rules="[{ required: true, message: '请输入最高价格', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.highPrice" />
      </el-form-item>
      <el-form-item label="联系方式" prop="concact">
        <el-input v-model="dynamicValidateForm.concact" placeholder="若不填，则为默认联系方式" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        title: '',
        info: '',
        lowPrice: '',
        highPrice: '',
        pictures: [],
        concact: ''
      }
    }
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
          alert('submit!')
          console.log(this.$refs.dynamicValidateForm.model)
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
        pictures: []
      }
    }
  }

}
</script>

<style lang="scss" scoped></style>
