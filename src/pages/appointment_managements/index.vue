<template>
  <div>
    <!-- Quản lí lịch hẹn -->
    <div class="container-fluid mt-3">
      <div class="wapper card p-3">
        <div class="d-flex mt-3">
          <div class="flex-1">
            <h3 class="">DANH SÁCH LỊCH HẸN</h3>
          </div>
        </div>
        <!-- --TW CSS -->
        <!-- list appointments -->
        <div
          class="mt-5 tw-relative tw-overflow-x-auto tw-shadow-md tw-sm:rounded-lg"
        >
          <table
            class="tw-w-full tw-text-sm tw-text-left tw-rtl:text-right tw-text-gray-800 tw-dark:text-gray-400"
          >
            <thead
              class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-200 tw-dark:bg-gray-700 tw-dark:text-gray-400"
            >
              <tr class="tw-text-center">
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">STT</th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Mã bệnh nhân
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Họ và tên
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Ngày hẹn
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Lí do khám
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Dịch vụ khám
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Trạng thái
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Ngày tạo
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Ngày chỉnh sửa
                </th>

                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  TẠO HỒ SƠ
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(appointment, index) in appointmentList"
                :key="index"
                class="tw-bg-white tw-text-center tw-border-b tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-hover:bg-gray-50 tw-dark:hover:bg-gray-600"
              >
                <!-- STT -->
                <th
                  scope="row"
                  class="tw-px-4 tw-py-2 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap tw-dark:text-white tw-border-x"
                >
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </th>

                <!-- Patient ID -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  <router-link
                    :to="{
                      name: 'doctor.patients',
                      params: { id: appointment.patient_id },
                    }"
                  >
                    {{ appointment.patient_id }}
                  </router-link>
                </td>

                <!-- Full Name -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ appointment.patient_firstname }}
                  {{ appointment.patient_lastname }}
                </td>

                <!-- Appointment Date -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ formatDateTime(appointment.appointment_date) }}
                </td>

                <!-- Reason -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  <span v-if="appointment.reason">
                    {{ appointment.reason }}</span
                  >

                  <span v-if="!appointment.reason"> Chờ tư vấn</span>
                </td>

                <!-- Services -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ appointment.service_name }}
                </td>
                <!-- Status -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  <span
                    v-if="appointment.status === 'C-IN'"
                    class="text-success"
                  >
                    Đang chờ khám
                  </span>
                </td>

                <!-- Created At -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ formatDateTime(appointment.created_at) }}
                </td>

                <!-- Updated At -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ formatDateTime(appointment.updated_at) }}
                </td>

                <td class="tw-px-4 tw-py-2 tw-border-x">
                  <router-link
                    :to="{
                      name: 'doctor.create_record',
                      params: {
                        patient_id: appointment.patient_id,
                        appointment_id: appointment.appointment_id,
                        doctor_id: appointment.staff_id,
                      },
                    }"
                  >
                    TẠO
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <PaginationComponent
          :pageCount="totalPages"
          :currentPage="currentPage"
          @page-change="fetchDataByPage"
        />
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import PaginationComponent from "@/components/Pagination.vue";
import formatDate from "@/helper/format-datetime";

const formatDateTime = formatDate.formatDateTime;

const currentPage = ref(1);
const totalPages = ref(1);
const appointmentList = ref([]);
const itemsPerPage = ref(1);
const fetchDataByPage = async (page = 1) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/appointment/status-payment-staff?page=${page}&staff_id=Doctor01`
    );
    const data = response.data;
    appointmentList.value = data.appointmentList;
    totalPages.value = data.totalPages;
    itemsPerPage.value = data.itemsPerPage;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchDataByPage(currentPage.value);
});
</script>

<style scoped>
/* Your existing styles */
</style>
