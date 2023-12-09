<template>
  <div class="root" style="width:80%;margin-left:100px;margin-top:80px">
    <el-row style="font-size:40px;margin-bottom:20px">添加广告:</el-row>
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="160px" class="demo-dynamic">
      <el-form-item prop="title" label="广告标题" :rules="[{ required: true, message: '请输入广告标题', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.title" />
      </el-form-item>
      <el-form-item prop="info" label="广告信息" :rules="[{ required: true, message: '请输入广告信息', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.info" />
      </el-form-item>
      <el-form-item prop="endTime" label="截止时间" :rules="[{ required: true, message: '请输入广告截止时间', trigger: 'blur' }]">
        <el-date-picker v-model="dynamicValidateForm.endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd-HH:mm:ss"  placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="图片上传(最多一张)" prop="endTime" :rules="[{required: true, message: '请上传图片'}]">
        <el-upload class="upload-demo"
        ref="upload"
        action="#"
          drag
          accept=".jpg,.jpeg,.png,.bmp"
          :auto-upload="false"
          :limit="1"
          :on-change="changeFileLength"
          :http-request="uploadRequest" list-type="picture">
          <div slot="tip" class="el-upload__tip">图片推荐尺寸长宽比为3：1</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadAd } from '@/api/ad'
import { getToken } from '@/utils/auth'
import { upLoadFile } from '@/api/uploadFile'
export default {
  data() {
    return {
      dynamicValidateForm: {
        title: '',
        info: '',
        status: '0',
        link: 'www.baidu.com',
        url: '',
        seq: '1',
        endTime: ''
      },
      fileList: [],
      filesLength: 0,
      token: getToken(),
      fileinfo: {
        virtualPath: ""
      },
    }
  },
  methods: {
    changeFileLength(file, fileList) {
      console.log(fileList);
      this.filesLength = fileList.length
    },
    submitForm(formName) {
      // this.$refs.upload.submit()
      // setTimeout(() => {
        this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
          if (this.dynamicValidateForm.url === '') {
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
      // },1000)

    },
    resetForm(formName) {
      this.dynamicValidateForm = {
        title: '',
        info: '',
        status: '0',
        link: 'www.baidu.com',
        url: '',
        seq: '1',
        endTime: ''
      },
      this.fileList = [],
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
        this.dynamicValidateForm.url = response.urls
        let endTime = this.$refs.dynamicValidateForm.model.endTime
          endTime =  endTime.replace(/(\d{4}-\d{2}-\d{2})-(\d{2}:\d{2}:\d{2})/, '$1 $2')
          const dataObj = this.$refs.dynamicValidateForm.model
          dataObj.endTime = endTime
          uploadAd(dataObj).then(response => {
            console.log(dataObj);
            console.log(response);
            this.resetForm()
            this.$refs.upload.clearFiles()
            alert('提交成功!')
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
