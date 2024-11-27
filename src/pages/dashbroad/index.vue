<template>
  <div class="p-3 card tw-p-6 tw-bg-white tw-shadow-md tw-rounded-lg">
    <div class="title">
      <h3 class="">THỐNG KÊ DOANH THU</h3>
    </div>
    <div class="d-flex">
      <!-- Tổng số doanh thu cho 2 loại dịch vụ đặt lịch và đơn thuốc bệnh nhân -->
      <RevenueTotalBar></RevenueTotalBar>
    </div>
  </div>
</template>

<script setup>
import RevenueTotalBar from "@/components/RevenueTotalBar.vue";
</script>

<style scoped></style>
