<template>
  <div>
    <!-- Quản lí nhân viên -->
    <div class="container-fluid mt-3">
      <div class="wapper card p-3">
        <div class="d-flex mt-3">
          <div class="flex-1">
            <h3 class="">DANH SÁCH DỊCH VỤ</h3>
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
                  placeholder="Nhập thông tin dịch vụ cần tìm..."
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
            <router-link
              :to="{ name: 'admin.addnewservice' }"
              title="Thêm dịch vụ mới"
              ><font-awesome-icon
                icon=" fa-plus"
                bounce
                size="2xl"
                style="color: #74c0fc"
            /></router-link>
          </div>

          <div style="display: flex">
            Loại trạng thái dịch vụ:
            <span class="text-success tw-me-5 tw-ms-3">
              <font-awesome-icon
                class="tw-me-1"
                title="Đang hoạt động"
                icon="fa-circle-check"
                style="
                  --fa-primary-color: #0fffb7;
                  --fa-secondary-color: #2ff9bc;
                "
              />
              Đang hoạt động
            </span>

            <span class="text-danger tw-me-5">
              <font-awesome-icon
                class="tw-me-1"
                title="Ngừng hoạt động"
                icon=" fa-ban"
                style="
                  --fa-primary-color: #dd2c2c;
                  --fa-secondary-color: #dd2c2c;
                "
              />Ngừng cung cấp</span
            >
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
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">STT</th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  MÃ DỊCH VỤ
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  TÊN DỊCH VỤ
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">GIÁ</th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  THỜI GIAN THỰC HIỆN
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  TRẠNG THÁI
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">PHÒNG</th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  CHUYÊN KHOA
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  NGÀY TẠO
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  NGÀY CHỈNH SỬA
                </th>
                <th scope="col" class="tw-px-4 tw-py-2 tw-border-x">
                  CHI TIẾT
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(se, index) in listServicesData"
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

                <!-- Service ID -->
                <td
                  class="tw-px-4 tw-py-2 tw-border-x tw-font-bold text-primary"
                >
                  {{ se.service_id }}
                </td>

                <!-- Service Name -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ se.service_name }}
                </td>

                <!-- Price -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ formatCurrency(se.service_fee) }}
                </td>

                <!-- Duration -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ se.duration }} phút
                </td>

                <!-- Status -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  <span class="text-success" v-if="se.is_active == true">
                    <font-awesome-icon
                      title="Đang hoạt động"
                      icon="fa-circle-check"
                      style="
                        --fa-primary-color: #0fffb7;
                        --fa-secondary-color: #2ff9bc;
                      "
                    />
                  </span>
                  <span class="text-danger" v-if="se.is_active == false">
                    <font-awesome-icon
                      class="tw-me-1"
                      title="Ngừng hoạt động"
                      icon="fa-ban"
                    />
                  </span>
                </td>

                <!-- Department -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ se.department_name }}
                </td>

                <!-- Specialty -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ se.specialty_name }}
                </td>

                <!-- Created At -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ formatDateTime(se.created_at) }}
                </td>

                <!-- Updated At -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  {{ formatDateTime(se.updated_at) }}
                </td>

                <!-- Details -->
                <td class="tw-px-4 tw-py-2 tw-border-x">
                  <router-link
                    :to="{
                      name: 'admin.service.details',
                      params: { id: se.service_id },
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
  </div>
</template>

<!----------------------------------------------------------SCRIP SETUP----------------------------------------------->
<script setup>
import { onMounted, ref } from "vue";
import { handleGetListService } from "@/services/services_managements/handleGetListServices";
import PaginationComponent from "@/components/Pagination.vue";
import { useRouter } from "vue-router";
import formatDate from "@/helper/format-datetime";
import axios from "axios";
import { formatCurrency } from "@/helper/currencyFormatter";

const formatDateTime = formatDate.formatDateTime;
const {
  getData,
  listServicesData,
  errorMessage,
  totalPagesData,
  itemsPerPageData,
} = handleGetListService();
const currentPage = ref(1);

const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await getData(page);
};

// handle search staff
const searchData = ref("");

const handleSearch = async () => {
  if (searchData.value) {
    const resultDataSearch = await axios.get(
      `http://localhost:3000/api/services/search/?search=${searchData.value}`
    );
    console.log(resultDataSearch);
    if (resultDataSearch) {
      listServicesData.value = resultDataSearch.data.data;
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

.form {
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
}

.btn-add {
  color: aliceblue;
  background-color: #73e600;
}

.btn-add:hover {
  color: aliceblue;
  background-color: #6abe15;
}

.btn-add {
  padding: 5px 70px 5px 70px;
  border-radius: 12px;
}
</style>
