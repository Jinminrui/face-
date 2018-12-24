<template>
  <div class="dashboard-container">
    <panel-group />
    <el-row :gutter="32">
      <el-col
        :xs="24"
        :sm="24"
        :lg="12"
      >
        <div class="chart-wrapper">
          <h3>生物识别领域未来五年符合增长率（%）</h3>
          <bar-chart1 />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="12"
      >
        <div class="chart-wrapper">
          <h3>全球生物识别市场规模（亿美元）</h3>
          <bar-chart2 />
        </div>
      </el-col>
    </el-row>
    <stack />
    <introduction />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import Introduction from './components/Introduction'
import BarChart1 from './components/BarChart1'
import BarChart2 from './components/BarChart2'
import Stack from './components/Stack'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    Introduction,
    BarChart1,
    BarChart2,
    Stack
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .stack {
    background: #fff;
  }
}
</style>
