<template>
  <div class="root" style="width:80%;margin-left:100px;margin-top:80px">
    <el-row style="font-size:40px;margin-bottom:20px">添加书籍:</el-row>
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
      <el-form-item prop="info" label="书籍套装标题" :rules="[{ required: true, message: '请输入书籍套装标题', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.title" />
      </el-form-item>
      <el-form-item prop="info" label="书籍套装介绍" :rules="[{ required: true, message: '请输入书籍介绍', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.info" type="textarea" />
      </el-form-item>
      <el-form-item label="最低价格" prop="lowPrice" :rules="[{ type:'number',required: true, message: '请输入最低价格，且价格必须为数字', trigger: 'blur' }]">
        <el-input v-model.number="dynamicValidateForm.lowPrice" />
      </el-form-item>
      <el-form-item label="最高价格" prop="highPrice" :rules="[{type:'number', required: true, message: '请输入最高价格，且价格必须为数字', trigger: 'blur' ,whitespace:[{type: 'string', message: '只存在空格', whitespace: true, trigger: ['change','blur']}]}]">
        <el-input v-model.number="dynamicValidateForm.highPrice" />
      </el-form-item>
      <el-form-item label="联系方式" prop="concact">
        <el-input v-model="dynamicValidateForm.concact" placeholder="若不填，则为默认联系方式" />
      </el-form-item>
      <el-form-item label="图片上传" prop="pictures">
        <el-upload class="upload-demo" ref="upload" action="#" :on-preview="handlePreview" :on-remove="handleRemove"
          :file-list="fileList" drag :before-upload="beforeUpload" accept=".jpg,.jpeg,.png,.bmp"
          :http-request="uploadRequest" :auto-upload="false" list-type="picture">
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
      </el-form-item>
      <el-form-item v-for="(book, index) in dynamicValidateForm.books" :key="book.key" :label="'书籍' + (index + 1)"
        :prop="'books.' + index" :rules="{
          type: 'object', required: true, message: '输入不能为空', trigger: 'blur', fields: {
            bookName: { type: 'string', required: true, message: '书籍的标题不能为空' },
            isbn: { type: 'string',len:13, required: true, message: '书籍的ISBN不能为空且必须为13位' }
          }
        }">
        <el-input v-model="book.bookName" placeholder="请输入书籍名称" />
        <el-input v-model="book.isbn" placeholder="请输入书籍ISBN号" />
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
import { uploadBooks } from '@/api/book'
import { getToken } from '@/utils/auth'
import { upLoadFile } from '@/api/uploadFile'
export default {
  data() {
    return {
      dynamicValidateForm: {
        books: [{
          bookName: '1',
          isbn: '1',
          publishingHouse: '1'
        }],
        info: '1',
        lowPrice: 1,
        highPrice: 2,
        urlList: [],
        concact: '',
        title: '书籍标题'
      },
      fileList: [],
      token: getToken(),
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
        publishingHouse: '1'
        // key: Date.now()
      })
    },
    submitForm(formName) {
      this.$refs.upload.submit()
      setTimeout(() => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const model = this.$refs.dynamicValidateForm.model
            const data = {
              book: model.books,
              info: model.info,
              lowPrice: model.lowPrice,
              highPrice: model.highPrice,
              urlList: model.urlList,
              concact: model.concact,
              title: model.title
            }
            uploadBooks(data).then(response => {
              console.log(response);
              console.log(this.$refs.dynamicValidateForm.model)
              alert('提交成功!')
            }).catch(err => {
              console.log(err);
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }, 1000)

    },
    resetForm(formName) {
      this.dynamicValidateForm = {
        books: [{
          bookName: '',
          isbn: ''
        }],
        info: '',
        lowPrice: '',
        highPrice: '',
        urlList: [],
        title: ''
      },
        this.fileList = []
    },
    uploadRequest(options) {
      let file = options.file
      let fd = new FormData();
      fd.append('files', file)
      console.log(fd);
      upLoadFile(fd).then(response => {
        console.log(response);
        this.dynamicValidateForm.urlList.push(response.urls)
      }).catch(err => {
        console.log(err);
      })
    }
  }

}
</script>

<style lang="scss" scoped></style>
