<template>
  <div>
    <!-- Quản lý nhân viên -->
    <div class="container-fluid mt-3">
      <div class="wapper card p-3">
        <div class="d-flex mt-3">
          <div class="flex-1">
            <h3 class="text-xl font-semibold">
              DANH SÁCH NHÂN VIÊN THEO CA LÀM VIỆC
            </h3>
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
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  v-model="searchData"
                  id="default-search"
                  size="100"
                  class="tw-block tw-w-full tw-p-4 tw-ps-10 tw-text-sm tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-gray-50 focus:tw-ring-blue-500 focus:tw-border-blue-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                  placeholder="Nhập thông tin ca làm việc cần tìm..."
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
        </div>

        <!-- list emp -->
        <div
          v-if="staffShiftListData"
          class="mt-5 tw-relative tw-overflow-x-auto tw-shadow-md tw-sm:rounded-lg"
        >
          <table
            class="tw-w-full tw-text-sm tw-text-left tw-rtl:text-right tw-text-gray-800 tw-dark:text-gray-400"
          >
            <thead
              class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-200 tw-dark:bg-gray-700 tw-dark:text-gray-400"
            >
              <tr class="tw-text-center">
                <th scope="col" class="tw-px-1 tw-py-1">STT</th>
                <th scope="col" class="tw-px-2 tw-py-2">Mã nhân viên</th>
                <th scope="col" class="tw-px-6 tw-py-2">Họ và tên</th>
                <th scope="col" class="tw-px-2 tw-py-2">Vai trò</th>
                <th scope="col" class="tw-px-4 tw-py-2">Ngày vào ca</th>
                <th scope="col" class="tw-px-4 tw-py-2">Ngày làm</th>
                <th scope="col" class="tw-px-4 tw-py-2">Ca làm việc</th>
                <th scope="col" class="tw-px-4 tw-py-2">Thời gian làm việc</th>
                <th scope="col" class="tw-px-6 tw-py-2">Phòng làm việc</th>
                <th scope="col" class="tw-px-6 tw-py-2">
                  Chuyên khoa làm việc
                </th>
                <th scope="col" class="tw-px-4 tw-py-2">Ngày tạo</th>
                <th scope="col" class="tw-px-4 tw-py-2">Ngày chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in staffShiftListData"
                :key="index"
                class="tw-bg-white tw-text-center tw-border-b tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-hover:bg-gray-50 tw-dark:hover:bg-gray-600"
              >
                <!-- STT -->
                <th
                  scope="row"
                  class="tw-px-4 tw-py-2 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap tw-dark:text-white"
                >
                  {{ (currentPage - 1) * itemsPerPageData + index + 1 }}
                </th>

                <!-- STAFF_ID -->
                <td class="px-2 py-2">
                  <router-link
                    :to="{
                      name: 'admin.emp_details',
                      params: { id: data.staff_id },
                    }"
                    >{{ data.staff_id }}</router-link
                  >
                </td>

                <!-- NAME_STAFF -->
                <td class="px-6 py-2">
                  {{ data.first_name }} {{ data.last_name }}
                </td>

                <!-- ROLE -->
                <td class="px-6 py-2">{{ data.role_name }}</td>

                <!-- JOIN IN -->
                <td class="tw-px-6 tw-2y-3">
                  {{ formatDay(data.join_in) }}
                </td>

                <td class="tw-px-4 tw-2y-2">
                  <span
                    v-if="data.shift_id == 'NT-S' || data.shift_id == 'NT-C'"
                    >Thứ 2 đến Thứ 7</span
                  >
                  <span
                    v-if="data.shift_id == 'CN-S' || data.shift_id == 'CN-C'"
                    >Chủ nhật</span
                  >
                </td>

                <!-- SHIFT NAME -->
                <td class="px-6 py-2">{{ data.shift_name }}</td>

                <!-- TIME SHIFT -->
                <td class="px-4 py-2">
                  {{ formatTime(data.start_time) }} -
                  {{ formatTime(data.end_time) }}
                </td>

                <!-- WORKED IN DEPARTMENT -->
                <td class="px-6 py-2">
                  {{ data.department_id }} <br />
                  {{ data.department_name }}
                </td>

                <!-- WORKED IN SPECIALTIES -->
                <td class="px-6 py-2">
                  {{ data.specialty_id }} <br />
                  {{ data.specialty_name }}
                </td>

                <!-- CREATED AT -->
                <td class="px-4 py-2">
                  {{ formatDateTime(data.created_at) }}
                </td>

                <!-- UPDATED AT -->
                <td class="px-4 py-2">
                  {{ formatDateTime(data.updated_at) }}
                </td>
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

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  handleGetListStaffWithShift,
  errorMessage,
  totalPagesData,
  staffShiftListData,
  itemsPerPageData,
} from "@/services/shift_managements/handleGetListStaffByShiftId";
import { searchDepartments } from "@/services/department_managements/handleSearchDep";
import PaginationComponent from "@/components/Pagination.vue";
import formatDate from "@/helper/format-datetime";

const route = useRoute();
const shift_id = route.params.shift_id;
const formatDateTime = formatDate.formatDateTime;
const formatDay = formatDate.formatDateBirth;
const formatTime = formatDate.formatTime;
const currentPage = ref(1);

const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await handleGetListStaffWithShift(shift_id, page);
};

// handle search staff
const searchData = ref("");

const handleSearch = async () => {
  if (searchData.value) {
    const resultDataSearch = await searchDepartments(searchData.value);
    console.log(resultDataSearch);
    if (resultDataSearch) {
      listDepartmentsData.value = resultDataSearch.data;
    }
  }
};

onMounted(async () => {
  await fetchDataByPage(1);
});
</script>

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

.page-link {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  cursor: pointer;
}

.page-link:hover {
  background-color: #007bff;
  color: white;
}
</style>
