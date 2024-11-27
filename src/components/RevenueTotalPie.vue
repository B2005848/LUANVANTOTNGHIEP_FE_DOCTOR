<template>
  <div
    class="tw-container tw-mx-auto tw-p-6 tw-bg-white tw-shadow-md tw-rounded-lg"
  >
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
      <input
        v-model="filters.startDate"
        type="date"
        placeholder="Ngày bắt đầu"
        class="tw-border tw-border-gray-300 tw-p-2 tw-rounded tw-w-full tw-text-black"
      />
      <input
        v-model="filters.endDate"
        type="date"
        placeholder="Ngày kết thúc"
        class="tw-border tw-border-gray-300 tw-p-2 tw-rounded tw-w-full tw-text-black"
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

    <button
      @click="fetchRevenueStatistics"
      class="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded hover:tw-bg-blue-700 tw-mb-6"
    >
      Lọc
    </button>

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
import { ref, onMounted } from "vue";
import axios from "axios";
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

// Hàm fetch dữ liệu doanh thu
const fetchRevenueStatistics = async () => {
  try {
    const { startDate, endDate, payment_status } = filters.value;

    // Gửi yêu cầu đến API
    const response = await axios.get(
      `http://localhost:3000/api/statistics/revenue`,
      {
        params: { startDate, endDate, payment_status },
      }
    );

    const data = response.data.data;

    if (data.length > 0) {
      // Cập nhật dữ liệu biểu đồ
      updateChart(data);
    } else {
      chartData.value = null;
      if (chart.value) {
        chart.value.destroy();
      }
    }
  } catch (error) {
    console.error("Error fetching revenue statistics:", error);
  }
};

// Hàm cập nhật biểu đồ
const updateChart = (data) => {
  const labels = ["Doanh thu dịch vụ đặt lịch", "Doanh thu đơn thuốc"];

  // Tính tổng doanh thu
  const totalAppointmentRevenue = data.reduce(
    (sum, item) => sum + item.revenue_appointment,
    0
  );
  const totalPrescriptionRevenue = data.reduce(
    (sum, item) => sum + item.revenue_prescription,
    0
  );

  const revenues = [totalAppointmentRevenue, totalPrescriptionRevenue];

  if (chart.value) {
    chart.value.destroy();
  }

  // Cập nhật dữ liệu biểu đồ
  chartData.value = {
    labels,
    datasets: [
      {
        data: revenues,
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const ctx = document.getElementById("revenueChart").getContext("2d");
  chart.value = new Chart(ctx, {
    type: "pie", // Đổi type từ bar thành pie
    data: chartData.value,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Thống kê doanh thu (Biểu đồ tròn)",
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
