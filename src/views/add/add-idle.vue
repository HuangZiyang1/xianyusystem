<template>
  <div class="root" style="width:80%;margin-left:100px;margin-top:80px">
    <el-row style="font-size:40px;margin-bottom:20px">添加闲置:</el-row>
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="160px" class="demo-dynamic">
      <el-form-item prop="title" label="闲置标题" :rules="[{ required: true, message: '请输入闲置标题', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.title" />
      </el-form-item>
      <el-form-item prop="info" label="闲置套装介绍" :rules="[{ required: true, message: '请输入闲置介绍', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.info" type="textarea" />
      </el-form-item>
      <!-- <el-form-item label="最低价格" prop="lowPrice" :rules="[{ required: true, message: '请输入最低价格', trigger: 'blur' }]">
        <el-input v-model.number="dynamicValidateForm.lowPrice" />
      </el-form-item>
      <el-form-item label="最高价格" prop="highPrice" :rules="[{ required: true, message: '请输入最高价格', trigger: 'blur' }]">
        <el-input v-model.number="dynamicValidateForm.highPrice" />
      </el-form-item> -->
      <el-form-item label="最低价格" prop="lowPrice"
        :rules="[{ type: 'number', required: true, message: '请输入最低价格，且价格必须为数字', trigger: 'blur' }]">
        <el-input v-model.number="dynamicValidateForm.lowPrice" />
      </el-form-item>
      <el-form-item label="最高价格" prop="highPrice"
        :rules="[{ type: 'number', required: true, message: '请输入最高价格，且价格必须为数字', trigger: 'blur', whitespace: [{ type: 'string', message: '只存在空格', whitespace: true, trigger: ['change', 'blur'] }] }]">
        <el-input v-model.number="dynamicValidateForm.highPrice" />
      </el-form-item>
      <el-form-item label="是否置顶" prop="isOnTop">
        <el-switch v-model="dynamicValidateForm.isOnTop" active-text="是" inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="图片上传(最多九张)">
        <el-upload class="upload-demo" ref="upload" action="#" drag accept=".jpg,.jpeg,.png,.bmp"
          :http-request="uploadRequest" multiple :auto-upload="false" :limit="9" :on-change="changeFileLength" list-type="picture">
        </el-upload>
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
import { uploadIdle } from '@/api/idle'
import { getToken } from '@/utils/auth'
import { upLoadFile } from '@/api/uploadFile'
import { getAdminInfo, postPhoneAPI } from '@/api/user'
export default {
  data() {
    return {
      dynamicValidateForm: {
        businessName: '闲置名',
        userId: 1,
        title: '1',
        info: '2',
        lowPrice: 3,
        highPrice: 4,
        urlList: [],
        concact: '',
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
     submitForm(formName) {


      // setTimeout(()=> {
      // 判断表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log('表单校验通过');
          // console.log(this.fileList.length);
      // console.log(this.filesLength);
      if (this.$refs.dynamicValidateForm.model.isOnTop === true) {
            this.$refs.dynamicValidateForm.model.isOnTop = 1
          } else {
            this.$refs.dynamicValidateForm.model.isOnTop = 0
          }

          if (this.filesLength) {
            this.$refs.upload.submit()
          } else {
            this.submitFormWithoutPic()
          }

        } else {
          console.log('error submit!!')
          return false
        }
      })
      // },1000)

    },
    resetForm(formName) {
      this.dynamicValidateForm = {
        businessName: '服务名',
        userId: 1,
        title: '',
        info: '',
        lowPrice: '',
        highPrice: '',
        urlList: [],
        concact: '',
        isOnTop: 0,
      }
      this.fileList = []
      this.filesLength = 0
      this.$refs.upload.clearFiles()
    },
    uploadRequest(options) {
      // let file = options.file
      // let fd = new FormData();
      // fd.append('files', file)
      // console.log(fd);
      console.log('进入上传');
      console.log(this.fileList.length);
      console.log(this.filesLength);
      this.fileList.push(options.file)
      if (this.fileList.length == this.filesLength) {
        // 创建FormData上传
        let fd = new FormData()
        this.fileList.forEach(file => {
          fd.append('files', file)
        })
        upLoadFile(fd).then(response => {
          console.log(response);
          // this.dynamicValidateForm.urlList.push(response.urls)
          // 切割urls
          this.dynamicValidateForm.urlList = response.urls.split(',')
          uploadIdle(this.$refs.dynamicValidateForm.model).then(response => {
            postPhoneAPI(this.phone).then(response => {
              this.resetForm()
              alert('提交成功!')
              this.$refs.upload.clearFiles()
            })
          }).catch(err => {
            console.log(err);
          })
        }).catch(err => {
          console.log(err);
        })
      }

    },
    submitFormWithoutPic() {
      uploadIdle(this.$refs.dynamicValidateForm.model).then(response => {
            postPhoneAPI(this.phone).then(response => {
              this.resetForm()
              alert('提交成功!')
              this.$refs.upload.clearFiles()
            })
          }).catch(err => {
            console.log(err);
          })
    }
  }

}
</script>

<style lang="scss" scoped></style>
