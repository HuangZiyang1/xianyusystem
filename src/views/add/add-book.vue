<template>
  <div class="root" style="width:80%;margin-left:100px;margin-top:80px">
    <el-row style="font-size:40px;margin-bottom:20px">添加书籍:</el-row>
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="160px" class="demo-dynamic">
      <el-form-item prop="title" label="书籍套装标题" :rules="[{ required: true, message: '请输入书籍套装标题', trigger: 'blur' }]">
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
      <el-form-item label="是否置顶" prop="isOnTop">
        <el-switch v-model="dynamicValidateForm.isOnTop" active-text="是" inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="联系方式" prop="concact">
        <el-input v-model="dynamicValidateForm.concact" placeholder="若不填，则为默认联系方式" />
      </el-form-item>
      <el-form-item label="图片上传(最多9张)" :prop="'books.0'" :rules="[{required: true, message: '请上传图片'}]">
        <el-upload class="upload-demo" ref="upload" action="#" :limit='9'
           drag accept=".jpg,.jpeg,.png,.bmp" multiple :on-change="changeFileLength"
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
          isbn: '1234567890000',
          publishingHouse: '1'
        }],
        info: '0',
        lowPrice: 1,
        highPrice: 2,
        urlList: [],
        concact: '',
        title: '666',
        isOnTop: 0,
      },
      fileList: [],
      token: getToken(),
      filesLength: 0
    }
  },
  methods: {
    changeFileLength(file, fileList) {
      console.log(fileList);
      this.filesLength = fileList.length
    },
    removeBook(item) {
      if (this.dynamicValidateForm.books.length === 1) {
        this.$message({
          message: '至少上传一本书籍!',
          type: 'info'
        })
        return
      }
      var index = this.dynamicValidateForm.books.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.books.splice(index, 1)
      }
    },
    addDomain() {
      if (this.dynamicValidateForm.books.length < 20) {
        this.dynamicValidateForm.books.push({
        title: '',
        ISBN: '',
        publishingHouse: '1'
      })
      }else {
        this.$message({
          message: '一次性上传书籍过多!',
          type: 'info'
        })
      }

    },
    submitForm(formName) {
      // if (this.dynamicValidateForm.urlList[0] === '') {
      //   this.$message({
      //     message: '没有上传图片',
      //     type: 'info'
      //   })
      //   return
      // }
      // 校验一下状态
      // const flag =

      // console.log(flag);
      // setTimeout(() => {
        // console.log('666');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.upload.submit()
            // console.log('777');
            console.log(this.dynamicValidateForm.urlList);
            if (this.dynamicValidateForm.urlList.length === 0) {
              if (this.filesLength === 0) {
                this.$message({
          message: '没有上传图片',
          type: 'info'
        })
        return
              }

      }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      // }, 1000)
    },
    resetForm(formName) {
      this.dynamicValidateForm = {
        books: [{
          bookName: '',
          isbn: '',
          publishingHouse: '1'
        }],
        info: '',
        lowPrice: '',
        highPrice: '',
        urlList: [],
        title: '',
        isOnTop: 0
      },
        this.fileList = []
        this.filesLength = 0
    },
    uploadRequest(options) {
      // let file = options.file
      // let fd = new FormData();
      // fd.append('files', file)
      // console.log(fd);

      this.fileList.push(options.file)
      console.log(this.fileList);
      console.log('888');
      if (this.fileList.length == this.filesLength) {
        // 创建formdata并上传
        let fd = new FormData()
        this.fileList.forEach(file => {
          fd.append('files', file)
        })
        upLoadFile(fd).then(response => {
        console.log(response);
        // this.dynamicValidateForm.urlList.push(response.urls)
        // 切割urls
        this.dynamicValidateForm.urlList = response.urls.split(',')
        if(this.$refs.dynamicValidateForm.model.isOnTop === true) {
            this.$refs.dynamicValidateForm.model.isOnTop = 1
          }else {
            this.$refs.dynamicValidateForm.model.isOnTop = 0
          }
            const model = this.$refs.dynamicValidateForm.model
            const data = {
              book: model.books,
              info: model.info,
              lowPrice: model.lowPrice,
              highPrice: model.highPrice,
              urlList: model.urlList,
              concact: model.concact,
              title: model.title,
              isOnTop: model.isOnTop
            }
            uploadBooks(data).then(response => {
              // console.log(data);
              alert('提交成功!')
              this.$refs.upload.clearFiles()
              this.resetForm()
            }).catch(err => {
              console.log(err);
            })
      }).catch(err => {
        console.log(err);
      })
      }

    }
  }

}
</script>

<style lang="scss" scoped></style>
