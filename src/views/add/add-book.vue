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
        <el-input v-model="phone" />
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
import { getAdminInfo, postPhoneAPI } from '@/api/user'
export default {
  data() {
    return {
      dynamicValidateForm: {
        books: [{
          bookName: '',
          isbn: '',
          publishingHouse: '1'
        }],
        info: '',
        lowPrice: '',
        highPrice: '',
        urlList: [],
        concact: '',
        title: '',
        isOnTop: 0,
      },
      fileList: [],
      token: getToken(),
      filesLength: 0,
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
        this.filesLength = 0,
        this.$refs.upload.clearFiles()
    },
    uploadRequest(options) {
      // 这个函数在执行文件上传组件el-upload的时候被触发,机制是点击提交后,从文件列表一次装载一个文件(这个是特殊机制,你们考虑wx那边)
      // options打印出来是一个一个文件的,所以一个一个push进去我们的fileList
      this.fileList.push(options.file)
      // filesLength是计算属性,实时计算上述文件列表的真实长度,当装载完了之后触发if里面内容
      if (this.fileList.length == this.filesLength) {
        // 创建formdata并上传
        let fd = new FormData()
        // 把fileList装到formdata实例化对象中
        this.fileList.forEach(file => {
          // 后台要求参数名字为files
          fd.append('files', file)
        })
        // 走网络请求,从后台拿到response,response里面有一系列参数,只要url就行了
        upLoadFile(fd).then(response => {
        console.log(response);
        // 上面上传时,fd实质上是一个数组,就是多个文件调用一次接口上传,后台返回的urls是一个有多个url的字符串
        // 切割urls,并装到urlList数组中
        this.dynamicValidateForm.urlList = response.urls.split(',')
        // 处理其他参数
        if(this.$refs.dynamicValidateForm.model.isOnTop === true) {
            this.$refs.dynamicValidateForm.model.isOnTop = 1
          }else {
            this.$refs.dynamicValidateForm.model.isOnTop = 0
          }
            const model = this.$refs.dynamicValidateForm.model
            // 创建data多此一举的原因是,我的参数名和后台要求的不一样,我不想改我的
            const data = {
              book: model.books,
              info: model.info,
              lowPrice: model.lowPrice,
              highPrice: model.highPrice,
              urlList: model.urlList,
              // 这个contact我没删,反正body多了没关系后台不要
              concact: model.concact,
              title: model.title,
              isOnTop: model.isOnTop
            }
            // 走上传书籍接口
            uploadBooks(data).then(response => {
              // console.log(data);
              // 后台要求同时刷新一次phone
              postPhoneAPI(this.phone).then(response => {
                alert('提交成功!')
                this.$refs.upload.clearFiles()
                this.resetForm()
              })
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
