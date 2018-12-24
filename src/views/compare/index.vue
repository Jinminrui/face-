<template>
  <div class="components-container">
    <code><strong>上传两张图片对人脸进行比对</strong>
    </code>
    <el-upload
      ref="upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :before-remove="beforeRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-change="onChange"
      :limit="limit"
      :multiple="true"
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
      >上传并比对</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >只能上传图片文件，且不超过2mb，文件个数限制为2个</div>
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
          <p>相似度为： {{ result.confidence }}</p>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { compare } from '@/api/face'
export default {
  data() {
    return {
      fileList: [],
      limit: 2,
      imgUrl: '',
      apiInfo: {
        api_key: '-VwERFhbivDsqAR7DJQuhV7Fn0iOisF_',
        api_secret: '2xpIjYKTxgOtp8gDA9NSKdi1ggWSVeqT'
      },
      showResult: false,
      result: null
    }
  },
  methods: {
    onChange(file) {
      this.fileList.push(file)
    },
    submitUpload() {
      const pd = new FormData()
      const file1 = this.fileList[0]
      const file2 = this.fileList[1]
      pd.append(`file1`, file1.raw, file1.raw.name)
      pd.append(`file2`, file2.raw, file2.raw.name)
      compare(pd).then(res => {
        this.showResult = true
        this.result = res.data
      })
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
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  }
}
</script>

<style lang="scss">
</style>

