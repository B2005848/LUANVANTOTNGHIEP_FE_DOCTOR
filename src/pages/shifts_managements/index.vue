<template>
  <div>
    <!-- Quản lí ca làm việc tại phòng khám -->
    <div class="container-fluid mt-3">
      <div class="wapper card p-3">
        <div class="d-flex mt-3">
          <div class="flex-1">
            <h3 class="">DANH SÁCH KHUNG GIỜ HOẠT ĐỘNG</h3>
          </div>
        </div>

        <!-- --TW CSS -->
        <!-- list shifts -->
        <!-- list shifts -->
        <div
          v-if="shiftsListData"
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
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">Mã ca</th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Mô tả ca làm việc
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Thời gian bắt đầu
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Thời gian kết thúc
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Ngày tạo
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Ngày chỉnh sửa
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Danh sách nhân viên
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Chỉnh sửa
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(sh, index) in shiftsListData"
                :key="index"
                class="tw-bg-white tw-text-center tw-border-b tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-hover:bg-gray-50 tw-dark:hover:bg-gray-600"
              >
                <!-- STT -->
                <th
                  scope="row"
                  class="tw-px-4 tw-py-2 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap tw-dark:text-white tw-border-x"
                >
                  {{ (currentPage - 1) * itemsPerPageData + index + 1 }}
                </th>

                <!-- Mã ca -->
                <td class="tw-px-4 tw-py-2 tw-border-x">{{ sh.shift_id }}</td>

                <!-- Mô tả ca làm việc -->
                <td class="tw-px-4 tw-py-2 tw-border-x">{{ sh.shift_name }}</td>

                <!-- Thời gian bắt đầu -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ formatTime(sh.start_time) }}
                </td>

                <!-- Thời gian kết thúc -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ formatTime(sh.end_time) }}
                </td>

                <!-- Ngày tạo -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ formatDateTime(sh.created_at) }}
                </td>

                <!-- Ngày chỉnh sửa -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ formatDateTime(sh.updated_at) }}
                </td>

                <!-- Danh sách nhân viên -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  <router-link
                    :to="{
                      name: 'admin.staff_shifts',
                      params: { shift_id: sh.shift_id },
                    }"
                  >
                    <font-awesome-icon
                      icon="fa-eye"
                      size="lg"
                      style="color: #74c0fc"
                    />
                  </router-link>
                </td>

                <!-- Chỉnh sửa -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  <router-link
                    :to="{
                      name: 'admin.shift.modify',
                      params: { shift_id: sh.shift_id },
                    }"
                  >
                    <font-awesome-icon
                      class="ms-3"
                      icon="fa-regular fa-pen-to-square"
                      size="xl"
                      style="color: #74c0fc"
                    />
                  </router-link>
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

<!----------------------------------------------------------SCRIP SETUP----------------------------------------------->
<script setup>
import { onMounted, ref } from "vue";
import {
  handleGetListShifts,
  errorMessage,
  totalPagesData,
  shiftsListData,
  itemsPerPageData,
} from "@/services/shift_managements/handleGetListShits";
import PaginationComponent from "@/components/Pagination.vue";
import formatDate from "@/helper/format-datetime";
const formatDateTime = formatDate.formatDateTime;
const formatTime = formatDate.formatTime;
const currentPage = ref(1);

const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await handleGetListShifts(page);
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
