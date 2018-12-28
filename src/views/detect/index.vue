<template>
  <div class="components-container">
    <code><strong>上传图片对人脸进行检测</strong>
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
        v-waves
        slot="trigger"
        size="small"
        type="primary"
      >选取文件</el-button>
      <el-button
        v-waves
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
      >上传并检测</el-button>
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
        <el-collapse>
          <el-collapse-item
            title="性别判断"
            name="1"
          >
            <div ref="gender">性别：{{ result.gender }}</div>
          </el-collapse-item>
          <el-collapse-item
            title="年龄预测"
            name="2"
          >
            <div ref="age">年龄估计：{{ result.age }}</div>
          </el-collapse-item>
          <el-collapse-item
            title="颜值评分"
            name="3"
          >
            <div ref="beauty">
              作为男生颜值：{{ result.maleBeauty }}
            </div>
            <div ref="beauty">
              作为女生颜值：{{ result.femaleBeauty }}
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="表情判断"
            name="4"
          >
            <div
              v-for="(value, key) in result.emotions"
              :key="key"
            >
              <span>{{ key }} : {{ value }}%</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { detect } from '@/api/face'
import waves from '@/directive/waves'

export default {
  directives: { waves },
  data() {
    return {
      fileList: [],
      limit: 1,
      imgUrl: '',
      apiInfo: {
        api_key: '-VwERFhbivDsqAR7DJQuhV7Fn0iOisF_',
        api_secret: '2xpIjYKTxgOtp8gDA9NSKdi1ggWSVeqT'
      },
      listLoading: false,
      faceAttributes: {},
      showResult: false,
      result: {
        gender: '',
        age: '',
        maleBeauty: '',
        femaleBeauty: '',
        emotions: ''
      }
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
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handlePost(files) {
      const file = files.file
      const pd = new FormData()
      pd.append('file', file)
      detect(pd).then((res) => {
        if (res.data.faces.length !== 0) {
          this.showResult = true
          this.faceAttributes = res.data.faces[0].attributes
          this.result.gender = this.faceAttributes.gender.value
          this.result.age = this.faceAttributes.age.value
          this.result.maleBeauty = this.faceAttributes.beauty.male_score
          this.result.femaleBeauty = this.faceAttributes.beauty.female_score
          this.result.emotions = this.faceAttributes.emotion
        } else {
          this.fileList = []
          this.imgUrl = ''
          this.$notify({
            title: '提示',
            message: '未检测到人脸，请重新上传',
            duration: 3600
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.components-container {
  .result-wrapper {
    margin: 36px 0;
  }
}
</style>

