<template>
  <div class="stack-wrapper">
    <el-row
      :gutter="20"
      class="stack"
    >
      <el-col
        :xs="24"
        :sm="24"
        :lg="12"
      >
        <div class="text">
          <h3>技术栈</h3>
          <div class="progress-item">
            <span>Vue全家桶</span>
            <el-progress :percentage="37" />
          </div>
          <div class="progress-item">
            <span>SpringBoot</span>
            <el-progress :percentage="23" />
          </div>
          <div class="progress-item">
            <span>Element-UI</span>
            <el-progress :percentage="10" />
          </div>
          <div class="progress-item">
            <span>Face++</span>
            <el-progress :percentage="25" />
          </div>
          <div class="progress-item">
            <span>Css</span>
            <el-progress :percentage="5" />
          </div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="12"
      >
        <pie-chart style="margin:16px" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from './PieChart'
export default {
  components: {
    PieChart
  }
}
</script>

<style lang="scss" scoped>
.stack-wrapper {
  background: white;
  margin-bottom: 40px;
  .stack {
    .text {
      margin: 32px;
      .progress-item {
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>

