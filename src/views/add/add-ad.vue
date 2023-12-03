<template>
  <div class="root" style="width:80%;margin-left:100px;margin-top:80px">
    <el-row style="font-size:40px;margin-bottom:20px">添加广告:</el-row>
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="120px" class="demo-dynamic">
      <el-form-item prop="title" label="广告标题" :rules="[{ required: true, message: '请输入广告标题', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.title" />
      </el-form-item>
      <el-form-item prop="info" label="广告信息" :rules="[{ required: true, message: '请输入广告信息', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.info" />
      </el-form-item>
      <el-form-item prop="link" label="广告跳转链接" :rules="[{ required: true, message: '请输入广告跳转链接', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.link" />
      </el-form-item>
      <el-form-item prop="url" label="广告图片地址" :rules="[{ required: true, message: '请输入广告图片地址', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.url" />
      </el-form-item>
      <el-form-item prop="endTime" label="截止时间" :rules="[{ required: true, message: '请输入广告截止时间', trigger: 'blur' }]">
        <el-date-picker v-model="dynamicValidateForm.endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd-HH:mm:ss"  placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="图片上传">
        <el-upload class="upload-demo" action="#" :on-preview="handlePreview" :on-remove="handleRemove"
          :file-list="fileList" drag :before-upload="beforeUpload" accept=".jpg,.jpeg,.png,.bmp"
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
        imgId: '1',
        title: '1',
        info: '1',
        status: '0',
        link: '1',
        url: '1',
        seq: '1',
        endTime: ''
      },
      fileList: [],
      token: getToken(),
      fileinfo: {
        virtualPath: ""
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let endTime = this.$refs.dynamicValidateForm.model.endTime
          endTime =  endTime.replace(/(\d{4}-\d{2}-\d{2})-(\d{2}:\d{2}:\d{2})/, '$1 $2')
          const dataObj = this.$refs.dynamicValidateForm.model
          dataObj.endTime = endTime
          uploadAd(dataObj).then(response => {
            console.log(response);
            alert('提交成功!')
          })


        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.dynamicValidateForm = {
        imgId: '',
        title: '',
        info: '',
        status: '0',
        link: '',
        url: '',
        seq: '',
        endTime: ''
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    beforeUpload(file) {

    },
    onChange(file, fileList) {
      console.log('onchange');
      console.log(file)
      this.fileList = fileList;
      console.log(fileList, "fileList")
    },
    handleSuccess(response, file, fileList) {
      // alert("上传成功")
      console.log("存储路径:" + response.virtualPath)
      console.log("文件名:" + response.fileName)
      alert(response.fileName)
      this.fileinfo.virtualPath = response.virtualPath;
      this.uploadPic(file)
    },
    uploadRequest(options) {
      let file = options.file
      let fd = new FormData();
      fd.append('files', file)
      console.log(fd);
      upLoadFile(fd).then(response => {
        console.log(response);
        this.dynamicValidateForm.url = response.urls
      }).catch(err => {
        console.log(err);
      })
    }
  }

}
</script>

<style lang="scss" scoped></style>
