<template>
  <div class="project">
    <Banner type="page" title="效率工具" desc="开发生产力" footer="你有这么高速运转的机械进入中国，就看看下面的内容吧" image="/images/common/tools.png">
    </Banner>
    <!-- 友链数据 -->
    <LinkList :listData="linkData" :useFriendsLink="true" />
  </div>
</template>

<script setup>
import Banner from "@/components/Banner.vue";
import linkData from "@/assets/linkDataTools.mjs";
</script>

<style lang="scss" scoped>
.project {
  .banner-page {
    .to-github {
      height: 40px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50px;
      color: #fff;
      background-color: var(--main-dark-opacity);
      backdrop-filter: blur(20px);
      transition:
        color 0.3s,
        background-color 0.3s;

      .iconfont {
        margin-right: 8px;
        transition: color 0.3s;
      }

      &:hover {
        color: var(--main-card-background);
        background-color: var(--main-color);

        .iconfont {
          color: var(--main-card-background) !important;
        }
      }
    }
  }
}
</style>
