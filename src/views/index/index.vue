<template>
  <div class="index">
    <el-card w:mb="20px">
      <template #header>
        <span class="kl-card-title">快捷菜单</span>
      </template>
      <div w:flex="~" w:justify="between">
        <div v-for="item in shortcutList" class="index-item">
          <tisp-svg :name="item.icon" size="40px"></tisp-svg>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </el-card>
    <el-card>
      <template #header>
        <span class="kl-card-title">视频教学</span>
      </template>
      <el-row :gutter="20">
        <el-col v-for="item in videoList" :span="4" class="mb-20px">
          <img :src="item.videoCover" w:mb="10px" w:rounded="5px" />
          <div>
            <p w:text="truncate space-nowrap">{{ item.videoTitle }}</p>
            <p w:text="truncate space-nowrap">{{ item.videoIntroduction }}</p>
          </div>
        </el-col>
      </el-row>
      <div v-loading="loading" w:flex="~" w:justify="end" w:mt="10px">
        <el-pagination
          v-model:currentPage="paging.pageNum"
          v-model:page-size="paging.pageSize"
          layout="total,sizes, prev, pager, next"
          background
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';
import TispSvg from '@/base-ui/tisp-svg';
import videoApi from '@/api/modules/video';
import type { videoListType } from './type';

const shortcutList = [
  { name: '创建工单', icon: 'icon_dingdan', url: '' },
  { name: '工单查询', icon: 'icon_gongdanchaxun', url: '' },
  { name: '新建商品', icon: 'icon_addshop', url: '' },
  { name: '批量导入', icon: 'icon_daoru', url: '' },
  { name: '线下采购', icon: 'icon_caigou', url: '' },
  { name: '添加收支', icon: 'icon_addshouzhi', url: '' },
  { name: '新建客户', icon: 'icon_addperson', url: '' },
  { name: '统一收款', icon: 'icon_shoukuan', url: '' },
  { name: '线下零售', icon: 'icon_lingshou', url: '' },
  { name: '销售单查询', icon: 'icon_xiaoshoudan', url: '' },
];
const videoList = ref<videoListType[]>([]);
const total = ref(0);
const loading = ref(true);
const paging = reactive({
  pageNum: 1,
  pageSize: 10,
});
const handleSizeChange = (val: number) => {
  paging.pageSize = val;
  handlePostWithPagingList();
};
const handleCurrentChange = (val: number) => {
  paging.pageNum = val;
  handlePostWithPagingList();
};
const handlePostWithPagingList = () => {
  loading.value = true;
  const data = {
    pageNum: paging.pageNum,
    pageSize: paging.pageSize,
    videoStatus: 1,
  };
  useRequest(videoApi.postWithPagingList(data), {
    onSuccess: (res) => {
      videoList.value = res.data.datas.map((item: any) => ({
        ...item,
        videoCover: `${import.meta.env.VITE_PICTRUE_URL}video_cover/${item.videoCover}`,
      }));
      total.value = res.data.total;
      loading.value = false;
      console.log(res, '视频列表');
    },
    onError: () => {
      videoList.value = [];
      total.value = 0;
      loading.value = false;
    },
  });
};

onMounted(() => {
  handlePostWithPagingList();
});
</script>

<style scoped lang="scss">
.index {
  .index-item {
    width: calc(100% / 10 - 10px);
    background: #f5f8fd;
    border-radius: 5px;
    height: 95px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: #bfcbe0;
    }
  }
}
</style>
