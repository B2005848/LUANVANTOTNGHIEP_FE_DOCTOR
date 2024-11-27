<template>
  <div
    class="tw-container tw-mx-auto tw-p-6 tw-bg-white tw-shadow-md tw-rounded-lg"
  >
    <!-- Tiêu đề -->
    <p class="tw-text-xl tw-font-bold tw-mb-6">
      Thống kê doanh thu theo khoảng thời gian và trạng thái giao dịch
    </p>
    <p class="tw-mb-4">
      Vui lòng chọn khoảng thời gian và trạng thái giao dịch
    </p>

    <!-- Form lọc -->
    <div
      class="tw-grid tw-gap-4 tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-mb-6"
    >
      <!-- <input
        v-model="filters.startDate"
        type="date"
        placeholder="Ngày bắt đầu"
        class="tw-border tw-border-gray-300 tw-p-2 tw-rounded tw-w-full tw-text-black"
      /> -->

      <VueDatePicker
        v-model="filters.startDate"
        locale="vi"
        format="dd/MM/yyyy "
        :enable-time-picker="false"
        placeholder="Ngày bắt đầu"
        text-input
      />

      <!-- <input
        v-model="filters.endDate"
        type="date"
        placeholder="Ngày kết thúc"
        class="tw-border tw-border-gray-300 tw-p-2 tw-rounded tw-w-full tw-text-black"
      /> -->

      <VueDatePicker
        v-model="filters.endDate"
        locale="vi"
        format="dd/MM/yyyy"
        :enable-time-picker="true"
        placeholder="Ngày kết thúc"
        text-input
      />

      <select
        v-model="filters.payment_status"
        class="tw-border tw-border-gray-300 tw-p-2 tw-rounded tw-w-full tw-text-black"
      >
        <option value="">Tất cả trạng thái</option>
        <option value="C">Thành công</option>
        <option value="P">Đang chờ xử lý</option>
        <option value="F">Thất bại</option>
      </select>
    </div>

    <!-- Nút lọc -->
    <div class="tw-text-center">
      <button
        @click="fetchRevenueStatistics"
        class="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded hover:tw-bg-blue-700 tw-mb-6"
      >
        Lọc
      </button>
    </div>

    <!-- Biểu đồ doanh thu -->
    <div v-if="chartData">
      <canvas id="revenueChart" class="tw-mb-6"></canvas>
    </div>

    <!-- Hiển thị thông báo nếu không có dữ liệu -->
    <div v-else class="tw-text-center tw-text-gray-500">
      Không có dữ liệu để hiển thị.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

// Reactive state cho bộ lọc
const filters = ref({
  startDate: "",
  endDate: "",
  payment_status: "",
});

const chart = ref(null);
const chartData = ref(null);
const loading = ref(false); // Trạng thái đang tải

// Hàm fetch dữ liệu doanh thu
const fetchRevenueStatistics = async () => {
  loading.value = true; // Bắt đầu trạng thái tải
  try {
    const { startDate, endDate, payment_status } = filters.value;

    // Kiểm tra giá trị ngày và định dạng lại
    const formattedStartDate = startDate
      ? `${new Date(startDate).toISOString().split("T")[0]} 00:00:00.000`
      : null;

    const formattedEndDate = endDate
      ? `${new Date(endDate).toISOString().split("T")[0]} 23:59:59.999`
      : null;

    // Gửi yêu cầu đến API
    const response = await axios.post(
      `http://localhost:3000/api/statistics/revenue`,
      {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        payment_status: payment_status,
      }
    );

    const data = response.data.data;

    if (data.length > 0) {
      chartData.value = data; // Cập nhật dữ liệu
      await updateChart(data); // Gọi hàm cập nhật biểu đồ
    } else {
      chartData.value = null; // Xóa dữ liệu biểu đồ
      if (chart.value) {
        chart.value.destroy(); // Hủy biểu đồ cũ
      }
    }
  } catch (error) {
    console.error("Error fetching revenue statistics:", error);
  } finally {
    loading.value = false; // Kết thúc trạng thái tải
  }
};

// Hàm cập nhật biểu đồ
const updateChart = async (data) => {
  const labels = data.map(
    (item) =>
      `${item.transaction_day}-${item.transaction_month}-${item.transaction_year}`
  );

  const appointmentRevenue = data.map((item) => item.revenue_appointment);
  const prescriptionRevenue = data.map((item) => item.revenue_prescription);

  if (chart.value) {
    chart.value.destroy(); // Hủy biểu đồ cũ nếu có
  }

  // Đảm bảo DOM đã sẵn sàng
  await nextTick();

  const canvas = document.getElementById("revenueChart");
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  const ctx = canvas.getContext("2d");

  // Tạo biểu đồ mới
  chart.value = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Doanh thu dịch vụ đặt lịch",
          data: appointmentRevenue,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Doanh thu đơn thuốc",
          data: prescriptionRevenue,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Thống kê doanh thu",
        },
      },
    },
  });
};

// Fetch dữ liệu khi component được mount
onMounted(() => {
  fetchRevenueStatistics();
});
</script>
<style scoped>
.tw-container {
  max-width: 100%;
}
</style>
