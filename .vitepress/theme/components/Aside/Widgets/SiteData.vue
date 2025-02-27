<!-- 侧边栏 - 站点数据 -->
<template>
  <div class="site-data s-card">
    <div class="title">
      <i class="iconfont icon-chart"></i>
      <span class="title-name">站点数据</span>
    </div>
    <div class="all-data">
      <div class="data-item">
        <span class="name">
          <i class="iconfont icon-article"></i>
          文章总数
        </span>
        <span class="num">{{ theme.postData?.length || 0 }} 篇</span>
      </div>
      <div class="data-item">
        <span class="name">
          <i class="iconfont icon-date"></i>
          建站天数
        </span>
        <span class="num">{{ daysFromNow(theme.since) }} 天</span>
      </div>
      <div class="data-item">
        <span class="name">
          <i class="iconfont icon-visibility"></i>
          总访问量
        </span>
        <span class="num" id="busuanzi_value_site_pv">{{ umamiData?.pageviews?.value }}</span>
      </div>
      <div class="data-item">
        <span class="name">
          <i class="iconfont icon-account"></i>
          总访客数
        </span>
        <span class="num" id="busuanzi_value_site_uv">{{ umamiData?.visitors?.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { loadScript } from "@/utils/commonTools";
import { daysFromNow } from "@/utils/helper";

const { theme } = useData();

/* 登录 umami */
const umamiData = ref();
const getUmamiData = async () => {
  const res = await fetch("https://us.umami.is/api/websites/e2f8a363-b49a-49e7-8bcf-e3f11e1b2995/stats?startAt=1740574800000&endAt=4106808823000&unit=hour&timezone=Asia%2FShanghai&compare=false", {
    method: "GET",
    headers: {
      "Authorization": "Basic " + "7GQgpkMyQMZHRhNQUNFSFbVgwgIsUr3tAq2QKqoxBMDiCwyee6rugEvFMo9hyLV3FJmyy1FD3QwG62TOgMujs94F/BZQv6mNAALkqTxdu2NNYtsqdvFNgBhcaOGrzR7UW1croTtRn8/LXyKvbPcGiOxORSA3Y0AELyAwXQtfpLQGi7NCaeTyBPJYz0BLP3CzlkeFuUgZ2RX2owb4oIEn37L0sabdTjh8T8VMGg2+e16BZnqitocJPg4J8ijdqrJ24j1VI5XhsU/0nrGesEdqmI4aYIgIfFTKIDdmrx9p4HAZjn6erj+6E5Om4Je7vlFvgaC7msUP6jAH0xPJn8hqvpXLPkZ6Ocl5xCGF1Q==",
    },
  });
  const data = await res.json();
  umamiData.value = data;
}

onMounted(() => {
  getUmamiData()
  loadScript("https://cloud.umami.is/script.js", {
    key: "e2f8a363-b49a-49e7-8bcf-e3f11e1b2995",
    async: true,
    reload: true,
  });
});
</script>

<style lang="scss" scoped>
.site-data {
  .all-data {
    .data-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.2rem;
      .name {
        display: flex;
        flex-direction: row;
        align-items: center;
        .iconfont {
          margin-right: 8px;
          opacity: 0.6;
          font-size: 18px;
        }
      }
      .num {
        opacity: 0.8;
        font-size: 15px;
      }
      #busuanzi_value_site_pv {
        &::after {
          content: " 次";
        }
      }
      #busuanzi_value_site_uv {
        &::after {
          content: " 人";
        }
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
}
</style>
