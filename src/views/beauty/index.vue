<template>
  <div class="components-container">
    <code><strong>上传图片一键美颜</strong>
    </code>
    <el-upload
      ref="upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :before-remove="beforeRemove"
      :file-list="fileList"
      :auto-upload="false"
      :limit="limit"
      :data="apiInfo"
      :http-request="handlePost"
      class="upload-demo"
      list-type="picture"
      action=""
    >
      <el-button
        slot="trigger"
        size="small"
        type="primary"
      >选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
      >一键美颜</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >只能上传图片文件，且不超过2mb，文件个数限制为1个</div>
    </el-upload>
    <div style="margin-top:64px">
      <el-collapse-transition>
        <img
          v-if="imgUrl"
          :src="imgUrl"
          width="200px"
          height="200px"
        >
      </el-collapse-transition>
    </div>
    <el-collapse-transition>
      <div
        v-if="showResult"
        class="result-wrapper"
      >
        <div class="text-wrapper">
          <p>美颜效果：</p>
        </div>
        <img
          :src="resultImg"
          width="300px"
          height="230px"
        >
      </div>
    </el-collapse-transition>

  </div>
</template>

<script>
import { beautify } from '@/api/face'

export default {
  data() {
    return {
      fileList: [],
      limit: 1,
      imgUrl: '',
      apiInfo: {
        api_key: '-VwERFhbivDsqAR7DJQuhV7Fn0iOisF_',
        api_secret: '2xpIjYKTxgOtp8gDA9NSKdi1ggWSVeqT'
      },
      showResult: false,
      resultImg: ''
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      this.imgUrl = ''
      this.showResult = false
    },
    handlePreview(file) {
      this.imgUrl = file.url
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handlePost(files) {
      const file = files.file
      const pd = new FormData()
      pd.append('file', file)
      beautify(pd).then((res) => {
        this.showResult = true
        this.resultImg = `data:image/png;base64,${res.data.result}`
      })
    }
  }
}
</script>

<style lang="scss">
.result-wrapper {
  margin-top: 64px;
  .text-wrapper {
    font-size: 18px;
  }
}
</style>

