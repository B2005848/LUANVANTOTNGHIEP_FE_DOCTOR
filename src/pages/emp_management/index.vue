<template>
  <div>
    <!-- Quản lí nhân viên -->
    <div class="container-fluid mt-3">
      <div class="wapper card p-3">
        <div class="d-flex mt-3">
          <div class="flex-1">
            <h3 class="">DANH SÁCH NHÂN VIÊN</h3>
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
                  size="50"
                  class="tw-block tw-w-full tw-p-4 tw-ps-10 tw-text-sm tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-gray-50 focus:tw-ring-blue-500 focus:tw-border-blue-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                  placeholder="Nhập thông tin tài khoản cần tìm..."
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
              <router-link :to="{ name: 'admin.add.emp' }">
                <font-awesome-icon
                  icon=" fa-plus"
                  bounce
                  size="lg"
                  style="color: #74c0fc"
              /></router-link>
            </button>
          </div>
        </div>

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
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">STT</th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Mã nhân viên
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Họ và tên
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Quyền truy cập
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">Email</th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  Số CCCD/CMND
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
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(emp, index) in staffListData"
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

                <!-- Mã nhân viên -->
                <td class="tw-px-4 tw-py-2 tw-border-x">{{ emp.staff_id }}</td>

                <!-- Họ và tên -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ emp.first_name }} {{ emp.last_name }}
                </td>

                <!-- Quyền truy cập -->
                <td class="tw-px-4 tw-py-2 tw-border-x">{{ emp.role_name }}</td>

                <!-- Email -->
                <td class="tw-px-4 tw-py-2 tw-border-x">{{ emp.email }}</td>

                <!-- Số CCCD/CMND -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ emp.citizen_id }}
                </td>

                <!-- Trạng thái -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  <span class="text-success" v-if="emp.status === '1'"
                    >Đang hoạt động</span
                  >
                  <span class="text-danger" v-if="emp.status === '0'"
                    >Ngừng hoạt động</span
                  >
                  <span class="text-warning" v-if="emp.status === '2'"
                    >Tạm khóa</span
                  >
                </td>

                <!-- Ngày tạo -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ formatDateTime(emp.created_at) }}
                </td>

                <!-- Ngày chỉnh sửa -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ formatDateTime(emp.updated_at) }}
                </td>

                <!-- Chi tiết -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  <router-link
                    :to="{
                      name: 'admin.emp_details',
                      params: { id: emp.staff_id },
                    }"
                  >
                    <font-awesome-icon
                      icon="fa-eye"
                      size="lg"
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
  handleGetListStaff,
  staffListData,
  errorMessage,
  totalPagesData,
  itemsPerPageData,
} from "@/services/staff_managements/handleGetListStaff";
import { searchStaff } from "@/services/staff_managements/handleSearchStaffAccount";
import PaginationComponent from "@/components/Pagination.vue";
import formatDate from "@/helper/format-datetime";
const formatDateTime = formatDate.formatDateTime;
const formatBirthDat = formatDate.formatDateBirth;
const currentPage = ref(1);

const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await handleGetListStaff(page);
};

// Xử lý tìm kiếm tài khoản nhân viên
const searchData = ref("");
const handleSearch = async () => {
  if (searchData.value) {
    const resultDataSearch = await searchStaff(searchData.value);
    if (resultDataSearch && resultDataSearch.data.length > 0) {
      staffListData.value = resultDataSearch.data;
    } else {
      errorMessage.value = "Không tìm thấy tài khoản nào phù hợp.";
    }
  } else {
    await fetchDataByPage(1);
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
