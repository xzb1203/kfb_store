<template>
  <el-dialog v-model="dialogVisible" title="新增服务项目" width="800px" center>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const dialogVisible = ref(false);
const handleConfirm = () => {
  console.log('新增客户');
};
defineExpose({
  dialogVisible,
});
</script>

<style scoped></style>
