<template>
  <div>
    <h3 class="text-center mb-4 tw-mt-4">Thông Tin Lịch Hẹn Khám Bệnh</h3>
    <div
      v-if="appointments.length > 0"
      class="tw-relative tw-shadow-md tw-sm:rounded-lg"
    >
      <table
        class="tw-w-full tw-text-sm tw-text-left tw-text-gray-800 tw-dark:text-gray-400"
      >
        <thead
          class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-200 tw-dark:bg-gray-700 tw-dark:text-gray-400"
        >
          <tr class="tw-text-center">
            <th class="tw-px-d tw-py-2">STT</th>
            <th class="tw-px-d tw-py-2">Mã Lịch Hẹn</th>
            <th class="tw-px-d tw-py-2">Phòng Khám</th>
            <th class="tw-px-d tw-py-2">Dịch Vụ</th>
            <th class="tw-px-d tw-py-2">Ngày Hẹn</th>
            <th class="tw-px-d tw-py-2">Thời Gian</th>
            <th class="tw-px-d tw-py-2">Trạng Thái Lịch Hẹn</th>
            <th class="tw-px-d tw-py-2">Thanh Toán</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(appointment, index) in appointments"
            :key="appointment.appointment_id"
            class="tw-bg-white tw-text-center tw-border-b tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-hover:bg-gray-50 tw-dark:hover:bg-gray-600"
          >
            <td class="tw-px-4 tw-py-2">{{ index + 1 }}</td>
            <td class="tw-px-4 tw-py-2">{{ appointment.appointment_id }}</td>
            <td class="tw-px-4 tw-py-2">{{ appointment.department_name }}</td>
            <td class="tw-px-4 tw-py-2">{{ appointment.service_name }}</td>
            <td class="tw-px-4 tw-py-2">
              {{ formatDay(appointment.appointment_date) }}
            </td>
            <td class="tw-px-4 tw-py-2">
              {{ formatTime(appointment.start_time) }} -
              {{ formatTime(appointment.end_time) }}
            </td>
            <td class="tw-px-4 tw-py-2">
              <span v-if="appointment.status === 'S'" style="font-weight: bold">
                Chờ xác nhận
                <font-awesome-icon
                  icon="fa-regular fa-bell"
                  shake
                  size="lg"
                  style="color: #ffd43b"
                />
                <button
                  @click="confirmAppointment(appointment.appointment_id)"
                  class="tw-ml-2 tw-bg-blue-500 tw-text-white tw-py-1 tw-px-3 tw-rounded tw-hover:bg-blue-700"
                >
                  Xác nhận
                </button>
              </span>
              <span
                v-else-if="appointment.status === 'CO-F'"
                style="color: #d2691e"
              >
                Đã xác nhận
              </span>
              <span v-else-if="appointment.status === 'C-IN'"> Đã đến </span>
              <span
                v-else-if="appointment.status === 'IN-P'"
                style="color: #63e6be"
              >
                Đang thực hiện
                <font-awesome-icon
                  icon="fa-solid fa-spinner"
                  spin-pulse
                  size="lg"
                />
              </span>
              <span
                v-else-if="appointment.status === 'CO-P'"
                style="color: #0000ff"
              >
                Đã hoàn thành
              </span>
              <span v-else-if="appointment.status === 'CA'" style="color: red">
                Đã hủy
              </span>
              <span
                v-else-if="appointment.status === 'NO-S'"
                style="color: #4682b4"
              >
                Không đến
              </span>
              <span v-else-if="appointment.status === 'RE-S'">
                Đã dời lịch
              </span>
            </td>
            <td class="tw-px-4 tw-py-2">
              <span
                v-if="appointment.payment_status === 'C'"
                style="color: #00bfff"
              >
                Đã thanh toán
              </span>
              <span v-if="appointment.payment_status === 'P'">
                Đang xử lí
              </span>

              <span v-if="appointment.payment_status === 'X'">
                Chưa thanh toán
              </span>
              <span v-if="!appointment.payment_status"> Lỗi giao dịch </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center mt-3 text-muted">
      Không có lịch sử khám bệnh
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import formatDate from "@/helper/format-datetime";
import Swal from "sweetalert2";

const formatDateTime = formatDate.formatDateTime;
const formatDay = formatDate.formatDateBirth;
const formatTime = formatDate.formatTime;

const appointments = ref([]);
const route = useRoute();
const username = route.params.id;

const getAppointments = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/appointment/getinformation/" + username
    );
    if (response.data.status) {
      appointments.value = response.data.data;
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  }
};

const confirmAppointment = async (appointmentId) => {
  const result = await Swal.fire({
    title: "Bạn chắc chắn xác nhận lịch hẹn này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Hủy",
  });

  if (result.isConfirmed) {
    try {
      await axios.put(
        "http://localhost:3000/api/appointment/modifyStatus/" + appointmentId,
        { status: "CO-F" }
      );
      Swal.fire("Thành công!", "Lịch hẹn đã được xác nhận.", "success");
      getAppointments(); // Reload the appointments to reflect the update
    } catch (error) {
      Swal.fire("Lỗi!", "Có lỗi xảy ra khi xác nhận lịch hẹn.", "error");
    }
  }
};

onMounted(() => {
  getAppointments();
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
  text-align: center;
}
tr:hover {
  background-color: #f1f1f1;
}
button {
  cursor: pointer;
}
</style>
