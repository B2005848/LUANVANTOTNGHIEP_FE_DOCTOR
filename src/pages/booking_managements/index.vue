<template>
  <div>
    <!-- Quản lí nhân viên -->
    <div class="mt-3">
      <div class="wapper card p-3">
        <div class="d-flex mt-3">
          <div class="flex-1">
            <h3 class="">DANH SÁCH LỊCH HẸN</h3>
          </div>
          <div class="d-flex">
            <form class="tw-max-w-md tw-mx-auto">
              <div class="tw-relative">
                <div
                  class="tw-absolute tw-inset-y-0 tw-start-0 tw-flex tw-items-center tw-ps-3 tw-pointer-events-none"
                >
                  <svg
                    class="tw-w-4 tw-h-4 tw-text-gray-500 dark:tw-text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  v-model="searchData"
                  id="default-search"
                  size="100"
                  class="tw-block tw-w-full tw-p-4 tw-ps-10 tw-text-sm tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-gray-50 focus:tw-ring-blue-500 focus:tw-border-blue-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                  placeholder="Nhập thông tin cần tìm..."
                  required
                />
                <button
                  @click="handleSearch"
                  type="button"
                  class="tw-text-white tw-absolute tw-end-2.5 tw-bottom-2.5 tw-bg-blue-500 hover:tw-bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300 tw-font-normal tw-rounded-lg tw-text-sm tw-px-4 tw-py-2 dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>

          <div class="flex-1">
            <button type="button" title="Thêm nhân viên mới">
              <font-awesome-icon
                icon=" fa-plus"
                bounce
                size="lg"
                style="color: #74c0fc"
              />
            </button>
          </div>
        </div>

        <!-- --TW CSS -->
        <!-- list emp -->
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
                <th scope="col" class="tw-px-6 tw-py-4">STT</th>
                <th scope="col" class="tw-px-6 tw-py-4">Mã lịch hẹn</th>
                <th scope="col" class="tw-px-6 tw-py-4">Mã bệnh nhân (SĐT)</th>
                <th scope="col" class="tw-px-6 tw-py-4">Bệnh nhân</th>
                <th scope="col" class="tw-px-6 tw-py-4">Bác sĩ tiếp nhận</th>
                <th scope="col" class="tw-px-6 tw-py-4">Ngày hẹn</th>
                <th scope="col" class="tw-px-6 tw-py-4">Lí do khám</th>
                <th scope="col" class="tw-px-6 tw-py-4">Dịch vụ khám</th>
                <th scope="col" class="tw-px-6 tw-py-4">Phòng tiếp nhận</th>
                <th scope="col" class="tw-px-6 tw-py-4">Trạng thái</th>
                <th scope="col" class="tw-px-6 tw-py-4">Ngày tạo lịch hẹn</th>
                <th scope="col" class="tw-px-6 tw-py-4">
                  Ngày cập nhật lịch hẹn
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in listAppointmentsData"
                :key="index"
                class="tw-bg-white tw-text-center tw-border-b tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-hover:bg-gray-50 tw-dark:hover:bg-gray-600"
              >
                <!-- STT -->
                <th
                  scope="row"
                  class="tw-px-6 tw-py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap tw-dark:text-white"
                >
                  {{ (currentPage - 1) * itemsPerPageData + index + 1 }}
                </th>

                <!-- MÃ LỊCH HẸN -->
                <td class="px-6 py-4">{{ data.appointment_id }}</td>

                <!-- MÃ BỆNH NHÂN -->
                <td class="px-6 py-4">
                  <router-link
                    :to="{
                      name: 'admin.patient_details',
                      params: { username: data.patient_id },
                    }"
                  >
                    {{ data.patient_id }}</router-link
                  >
                </td>

                <!-- HỌ TÊN BỆNH NHÂN -->
                <td class="px-6 py-4">
                  {{ data.patient_firstname }} {{ data.patient_lastname }}
                </td>

                <!-- BÁC SĨ TIẾP NHẬN -->
                <td class="px-6 py-4">
                  {{ data.staff_id }} <br />
                  {{ data.doctor_firstname }} {{ data.doctor_lastname }}
                </td>

                <!-- NGÀY HẸN -->
                <td class="px-6 py-4">
                  {{ formatDay(data.appointment_date) }}
                </td>

                <!-- LÍ DO KHÁM -->
                <td class="px-6 py-4">
                  {{ data.reason ? data.reason : "Chờ tư vấn" }}
                </td>

                <!-- DỊCH VỤ KHÁM -->
                <td class="px-6 py-4">{{ data.service_name }}</td>

                <!-- PHÒNG TIẾP NHẬN  -->
                <td class="px-6 py-4">
                  {{ data.department_id }} <br />
                  {{ data.department_name }}
                </td>

                <!-- TRẠNG THÁI ĐẶT HẸN -->
                <td class="px-6 py-4">
                  <span v-if="data.status === 'S'" style="font-weight: bold">
                    <button
                      @click="confirmAppointment(data.appointment_id)"
                      style="
                        background-color: #0000ff;
                        font-size: 12px;
                        padding: 10px;
                        border-radius: 13px;
                        margin-left: 5px;
                      "
                    >
                      Xác nhận
                    </button>
                  </span>
                  <span
                    v-if="data.status === 'CO-F'"
                    style="color: rgb(197, 199, 80)"
                  >
                    Đã xác nhận
                  </span>
                  <span v-if="data.status === 'C-IN'"> Đã đến </span>
                  <span v-if="data.status === 'IN-P'" style="color: #63e6be">
                    Đang thực hiện
                    <font-awesome-icon
                      icon="fa-solid fa-spinner"
                      spin-pulse
                      size="lg"
                    />
                  </span>
                  <span v-if="data.status === 'CO-P'" style="color: #0000ff">
                    Đã hoàn thành
                  </span>

                  <span v-if="data.status === 'CA'" style="color: red">
                    Đã hủy
                  </span>
                  <span v-if="data.status === 'NO-S'" style="color: #4682b4">
                    Không đến
                  </span>
                  <span v-if="data.status === 'RE-S'"> Đã dời lịch </span>
                </td>
                <td class="px-6 py-4">{{ formatDateTime(data.created_at) }}</td>
                <td class="px-6 py-4">{{ formatDateTime(data.updated_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <PaginationComponent
          :pageCount="totalPagesData"
          :currentPage="currentPage"
          @page-change="fetchDataByPage"
        />
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<!----------------------------------------------------------SCRIP SETUP----------------------------------------------->
<script setup>
import { onMounted, ref } from "vue";
import { handleGetListAppointments } from "@/services/appointment_managements/handleGetListAppointment";
import { searchDepartments } from "@/services/department_managements/handleSearchDep";
import PaginationComponent from "@/components/Pagination.vue";
import formatDate from "@/helper/format-datetime";
const formatDateTime = formatDate.formatDateTime;
const formatDay = formatDate.formatDateBirth;
import Swal from "sweetalert2";

const {
  getData,
  listAppointmentsData,
  errorMessage,
  totalPagesData,
  itemsPerPageData,
} = handleGetListAppointments();
const currentPage = ref(1);

const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await getData(page);
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
      fetchDataByPage(1); // Reload the appointments to reflect the update
    } catch (error) {
      Swal.fire("Lỗi!", "Có lỗi xảy ra khi xác nhận lịch hẹn.", "error");
    }
  }
};

// handle search staff
const searchData = ref("");

const handleSearch = async () => {
  if (searchData.value) {
    const resultDataSearch = await searchDepartments(searchData.value);
    console.log(resultDataSearch);
    if (resultDataSearch) {
      listAppointmentsData.value = resultDataSearch.data;
    }
  }
};
onMounted(async () => {
  await fetchDataByPage(1);
});
</script>

<!------------------------------------------------------CSS SCOPED------------------------------------------>
<style scoped>
.wapper .d-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-search {
  background-color: #007bff;
  border-radius: 14px;
}

.d-flex div:nth-child(2) button {
  color: #ffffff;
  font-size: 25px;
  text-align: center;
  align-items: center;
  border: none;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page-item {
  margin: 0 5px;
}

.wapper .d-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-search {
  background-color: #007bff;
  border-radius: 14px;
}

.d-flex div:nth-child(2) button {
  color: #ffffff;
  font-size: 25px;
  text-align: center;
  align-items: center;
  border: none;
}

button {
  cursor: pointer;
}
</style>
