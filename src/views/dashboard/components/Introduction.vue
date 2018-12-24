<template>
  <div class="introduction-wrapper">
    <el-row>
      <el-col
        :xs="24"
        :sm="24"
        :lg="6"
        class="img-wrapper"
      >
        <img
          src="@/assets/1.jpg"
          height="300px"
          width="300px"
        >
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="16"
        class="introduction-wrapper"
      >
        <p class="text">旷视(Face++)成立于2011年，是一家以机器视觉技术研发与产品化为核心的人工智能独角兽企业，
        致力于为行业型用户和个人型用户提供全方位的智能解决方案和智能数据服务。
        2012年，旷视以“Face++”为名推出了世界首个人脸识别云服务平台，
        如今 Face++ 的总调用量超过200亿次，成为人脸识别领域最具有影响力的品牌。
        作为一家深耕计算机视觉的人工智能公司，旷视科技致力于通过深度学习与感知融合技术，
        让人的“身份”与“行为”数据可以被各类物联网设备实时获取并融入行业，
        并为行业提供金融信用数据、地产出入管理数据、智慧城市社会综治数据服务。</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.introduction-wrapper {
  background: white;
  .introduction-wrapper {
    font-size: 16px;
    line-height: 40px;
    .text {
      text-indent: 2em;
      margin: 40px;
    }
  }
}
</style>

