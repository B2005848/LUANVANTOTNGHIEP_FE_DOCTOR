<template>
  <div class="tw-p-6 tw-bg-gray-100">
    <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">
      Thông tin quá trình điều trị tại phòng khám của bệnh nhân
    </h2>
    <p>Click chuột vào bảng ghi bất kì để xem thông tin chi tiết</p>
    <!-- Kiểm tra nếu đang tải hoặc có lỗi -->
    <div v-if="loading" class="tw-flex tw-justify-center">
      <div
        class="tw-spinner tw-border-t-4 tw-border-t-blue-500 tw-border-solid tw-border-gray-200 tw-border-8 tw-rounded-full tw-w-16 tw-h-16"
      ></div>
    </div>

    <div v-if="error" class="tw-text-red-500 tw-text-center tw-mt-4">
      <p>{{ error }}</p>
    </div>

    <!-- Hiển thị bảng hồ sơ bệnh án -->
    <table
      v-if="records.length"
      class="tw-min-w-full tw-bg-white tw-border tw-border-gray-300 tw-shadow-md"
    >
      <thead class="tw-bg-gray-50">
        <tr>
          <th
            class="tw-px-6 tw-py-3 tw-text-left tw-font-medium tw-text-gray-600"
          >
            Record ID
          </th>
          <th
            class="tw-px-6 tw-py-3 tw-text-left tw-font-medium tw-text-gray-600"
          >
            Ngày tạo
          </th>
          <th
            class="tw-px-6 tw-py-3 tw-text-left tw-font-medium tw-text-gray-600"
          >
            Chuẩn đoán
          </th>
          <th
            class="tw-px-6 tw-py-3 tw-text-left tw-font-medium tw-text-gray-600"
          >
            Điều trị
          </th>
          <th
            class="tw-px-6 tw-py-3 tw-text-left tw-font-medium tw-text-gray-600"
          >
            Nhịp tim
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in records"
          :key="item.record_id"
          @click="goToRecordDetail(item.record_id)"
          class="tw-cursor-pointer hover:tw-bg-gray-100"
        >
          <td class="tw-px-6 tw-py-4 tw-text-gray-800">{{ item.record_id }}</td>
          <td class="tw-px-6 tw-py-4 tw-text-gray-800">
            {{ formatDate.formatDateTime(item.created_at) }}
          </td>
          <td class="tw-px-6 tw-py-4 tw-text-gray-800">{{ item.diagnosis }}</td>
          <td class="tw-px-6 tw-py-4 tw-text-gray-800">{{ item.treatment }}</td>
          <td class="tw-px-6 tw-py-4 tw-text-gray-800">
            {{ item.heart_rate }} bpm
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import formatDate from "@/helper/format-datetime";

const records = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();

const fetchPatientRecords = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/handle/patient/get/0981899709/records"
    );
    const data = await response.json();
    if (response.ok) {
      records.value = data.data;
    } else {
      error.value = data.message || "Có lỗi khi tải dữ liệu";
    }
  } catch (err) {
    error.value = "Không thể kết nối đến server";
  } finally {
    loading.value = false;
  }
};

const goToRecordDetail = (recordId) => {};

onMounted(() => {
  fetchPatientRecords();
});
</script>

<style scoped>
/* Thêm các kiểu riêng nếu cần */
</style>
