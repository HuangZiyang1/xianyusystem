<template>
  <div class="root" style="width:80%;margin-left:100px;margin-top:80px">
    <el-row style="font-size:40px;margin-bottom:20px">添加书籍:</el-row>
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
      <el-form-item prop="info" label="书籍套装介绍" :rules="[{ required: true, message: '请输入书籍介绍', trigger: 'blur' }]">
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
      <el-form-item
        v-for="(book, index) in dynamicValidateForm.books"
        :key="book.key"
        :label="'书籍' + (index + 1)"
        :prop="'books.' + index + '.title' && 'books.' + index + '.ISBN'"
        :rules="{
          required: true, message: '输入不能为空', trigger: 'blur'
        }"
      >
        <el-input v-model="book.title" placeholder="请输入书籍名称" />
        <el-input v-model="book.ISBN" placeholder="请输入书籍ISBN号" />
        <el-button @click.prevent="removeBook(book)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增书籍</el-button>
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
        books: [{
          title: '',
          ISBN: ''
        }],
        info: '',
        lowPrice: '',
        highPrice: '',
        pictures: [],
        concact: ''
      },
      bookForm: {
        books: [
          {
            title: '',
            ISBN: ''
            // key:
          }
        ]
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
    addDomain() {
      this.dynamicValidateForm.books.push({
        title: '',
        ISBN: '',
        key: Date.now()
      })
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
        books: [{
          title: '',
          ISBN: ''
        }],
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
