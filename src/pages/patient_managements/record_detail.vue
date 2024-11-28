<template>
  <div
    class="tw-max-w-3xl tw-mx-auto tw-p-6 tw-bg-white tw-rounded-lg tw-shadow-lg"
  >
    <!-- Loader khi đang tải -->
    <div v-if="loading" class="tw-flex tw-justify-center tw-my-10">
      <div
        class="tw-spinner tw-border-t-4 tw-border-t-blue-500 tw-border-solid tw-border-gray-200 tw-border-8 tw-rounded-full tw-w-16 tw-h-16"
      ></div>
    </div>

    <!-- Thông báo lỗi nếu có -->
    <div v-if="error" class="tw-text-red-500 tw-text-center tw-mt-4">
      <p>{{ error }}</p>
    </div>

    <!-- Hiển thị chi tiết hồ sơ bệnh án -->
    <div v-if="record" class="tw-space-y-6">
      <h2 class="tw-text-3xl tw-font-semibold tw-text-center tw-text-blue-600">
        Chi tiết thông tin khám bệnh
      </h2>

      <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-6">
        <div class="tw-bg-gray-100 tw-p-4 tw-rounded-lg tw-shadow-md">
          <h3 class="tw-font-semibold tw-text-lg tw-text-gray-700">
            Thông Tin Bệnh Nhân
          </h3>
          <ul class="tw-space-y-4 tw-mt-4">
            <li>
              <strong class="tw-font-medium">ID Hồ sơ:</strong>
              {{ record.record_id }}
            </li>
            <li>
              <strong class="tw-font-medium">Ngày tạo:</strong>
              {{ formatDate(record.created_at) }}
            </li>
            <li>
              <strong class="tw-font-medium">Chuẩn đoán:</strong>
              {{ record.diagnosis }}
            </li>
            <li>
              <strong class="tw-font-medium">Điều trị:</strong>
              {{ record.treatment }}
            </li>
            <li>
              <strong class="tw-font-medium">Lý do:</strong> {{ record.reason }}
            </li>
          </ul>
        </div>

        <div class="tw-bg-gray-100 tw-p-4 tw-rounded-lg tw-shadow-md">
          <h3 class="tw-font-semibold tw-text-lg tw-text-gray-700">
            Chỉ số sức khỏe
          </h3>
          <ul class="tw-space-y-4 tw-mt-4">
            <li>
              <strong class="tw-font-medium">Nhịp tim:</strong>
              {{ record.heart_rate }} bpm
            </li>
            <li>
              <strong class="tw-font-medium">Cân nặng:</strong>
              {{ record.weight }} kg
            </li>
            <li>
              <strong class="tw-font-medium">Chiều cao:</strong>
              {{ record.height }} cm
            </li>
            <li>
              <strong class="tw-font-medium">Huyết áp:</strong>
              {{ record.blood_pressure }}
            </li>
            <li>
              <strong class="tw-font-medium">Nhiệt độ:</strong>
              {{ record.temperature }} °C
            </li>
            <li>
              <strong class="tw-font-medium">Tần số hô hấp:</strong>
              {{ record.respiratory_rate }} breaths/min
            </li>
            <li>
              <strong class="tw-font-medium">Đường huyết:</strong>
              {{ record.blood_sugar }} mg/dL
            </li>
            <li>
              <strong class="tw-font-medium">Cholesterol:</strong>
              {{ record.cholesterol }} mg/dL
            </li>
          </ul>
        </div>
      </div>

      <!-- Ghi chú -->
      <div
        v-if="record.notes"
        class="tw-bg-gray-100 tw-p-6 tw-rounded-lg tw-shadow-md tw-mt-6"
      >
        <h3 class="tw-font-semibold tw-text-lg tw-text-gray-700">Ghi Chú</h3>
        <p class="tw-text-gray-600 tw-mt-4">{{ record.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const record = ref(null); // Dữ liệu chi tiết hồ sơ bệnh án
const loading = ref(true); // Trạng thái đang tải
const error = ref(null); // Thông báo lỗi nếu có
const route = useRoute(); // Lấy tham số từ URL
const record_id = route.params.record_id; // Lấy record_id từ URL

// Hàm gọi API để lấy chi tiết hồ sơ bệnh án
const fetchRecordDetail = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/handle/patient/get/record/${record_id}/records`
    );
    if (response.status === 200) {
      record.value = response.data.data[0]; // Lấy phần tử đầu tiên từ mảng data
    } else {
      error.value = response.data.message || "Có lỗi khi tải dữ liệu";
    }
  } catch (err) {
    error.value = "Không thể kết nối đến server";
  } finally {
    loading.value = false;
  }
};

// Hàm format ngày tháng
const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Lấy recordId từ tham số URL
onMounted(() => {
  fetchRecordDetail();
});
</script>

<style scoped>
/* Kiểu dáng cho giao diện */
.tw-text-blue-600 {
  color: #3182ce;
}

.tw-bg-gray-100 {
  background-color: #f7fafc;
}

.tw-bg-white {
  background-color: white;
}

.tw-shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tw-rounded-lg {
  border-radius: 0.5rem;
}

.tw-space-y-6 {
  margin-bottom: 1.5rem;
}

.tw-space-y-4 {
  margin-bottom: 1rem;
}

.tw-mt-4 {
  margin-top: 1rem;
}

.tw-p-6 {
  padding: 1.5rem;
}

.tw-p-4 {
  padding: 1rem;
}

.tw-max-w-3xl {
  max-width: 48rem;
}

.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.tw-text-center {
  text-align: center;
}

.tw-font-semibold {
  font-weight: 600;
}

.tw-text-lg {
  font-size: 1.125rem;
}

.tw-text-gray-700 {
  color: #4a5568;
}

.tw-text-gray-600 {
  color: #718096;
}

.tw-font-medium {
  font-weight: 500;
}

.tw-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 640px) {
  .tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
