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
      <el-form-item label="最低价格" prop="lowPrice" :rules="[{ required: true, message: '请输入最低价格', trigger: 'blur' }]">
        <el-input v-model.number="dynamicValidateForm.lowPrice" />
      </el-form-item>
      <el-form-item label="最高价格" prop="highPrice" :rules="[{ required: true, message: '请输入最高价格', trigger: 'blur' }]">
        <el-input v-model.number="dynamicValidateForm.highPrice" />
      </el-form-item>
      <el-form-item label="是否置顶" prop="isOnTop">
        <el-switch v-model="dynamicValidateForm.isOnTop" active-text="是" inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="图片上传(最多九张)">
        <el-upload class="upload-demo"
          ref="upload"
          action="#"
          :file-list="fileList" drag accept=".jpg,.jpeg,.png,.bmp"
          :http-request="uploadRequest"
          :auto-upload="false"
          :limit="9"
          list-type="picture">
        </el-upload>
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
import { uploadIdle } from '@/api/idle'
import { getToken } from '@/utils/auth'
import { upLoadFile } from '@/api/uploadFile'
export default {
  data() {
    return {
      dynamicValidateForm: {
        businessName: '闲置名',
        userId: 1,
        title: '',
        info: '',
        lowPrice: '',
        highPrice: '',
        urlList: [],
        concact: '',
        isOnTop: 0,
      },
      fileList: [],
      token: getToken(),
    }
  },
  methods: {
     submitForm(formName) {
      this.$refs.upload.submit()
      setTimeout(()=> {
        this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.$refs.dynamicValidateForm.model);
          if(this.$refs.dynamicValidateForm.model.isOnTop === true) {
            this.$refs.dynamicValidateForm.model.isOnTop = 1
          }else {
            this.$refs.dynamicValidateForm.model.isOnTop = 0
          }
           uploadIdle(this.$refs.dynamicValidateForm.model).then(response => {
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
      },1000)

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
