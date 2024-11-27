<template>
  <div>
    <!-- Quản lí nhân viên -->
    <div class="container-fluid mt-3">
      <div class="wapper card p-3">
        <div class="d-flex mt-3">
          <div class="flex-1">
            <h3 class="">DANH SÁCH PHÒNG LÀM VIỆC</h3>
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
                  placeholder="Nhập thông tin phòng cần tìm..."
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
            <button
              @click="handleShowForm"
              type="button"
              title="Tạo phòng làm việc mới"
            >
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
        <!-- list department -->
        <div
          class="mt-5 tw-relative tw-overflow-x-auto tw-shadow-md tw-sm:rounded-lg"
        >
          <table
            class="tw-w-full tw-text-sm tw-text-left tw-rtl:text-right tw-text-gray-800 tw-dark:text-gray-400 tw-border-x tw-border-gray-300 tw-dark:border-gray-700"
          >
            <thead
              class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-200 tw-dark:bg-gray-700 tw-dark:text-gray-400"
            >
              <tr class="tw-text-center">
                <th scope="col" class="tw-px-4 tw-py-2">STT</th>
                <th scope="col" class="tw-px-4 tw-py-2">Mã phòng</th>
                <th scope="col" class="tw-px-4 tw-py-2">Tên phòng</th>
                <th scope="col" class="tw-px-4 tw-py-2">Ngày tạo</th>
                <th scope="col" class="tw-px-4 tw-py-2">Ngày chỉnh sửa</th>
                <th scope="col" class="tw-px-4 tw-py-2">Thông tin chi tiết</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(dep, index) in listDepartmentsData"
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
                <td
                  class="tw-border-x tw-border-gray-300 tw-dark:border-gray-700"
                >
                  {{ dep.department_id }}
                </td>
                <td
                  class="tw-border-x tw-border-gray-300 tw-dark:border-gray-700"
                >
                  {{ dep.department_name }}
                </td>
                <td
                  class="tw-border-x tw-border-gray-300 tw-dark:border-gray-700 px-4 py-2"
                >
                  {{ formatDateTime(dep.created_at) }}
                </td>
                <td
                  class="tw-border-x tw-border-gray-300 tw-dark:border-gray-700 px-4 py-2"
                >
                  {{ formatDateTime(dep.updated_at) }}
                </td>
                <td
                  class="tw-border-x tw-border-gray-300 tw-dark:border-gray-700 px-4 py-2"
                >
                  <router-link
                    :to="{
                      name: 'admin.department_details',
                      params: { id: dep.department_id },
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

    <!-- start form -->
    <div class="form" v-if="showForm">
      <!-- Thêm phòng làm việc mới -->
      <div class="container-fluid mt-3">
        <div class="card p-3">
          <div class="d-flex mb-3" style="justify-content: space-between">
            <div>
              <h3 class="mb-3">THÊM PHÒNG LÀM VIỆC MỚI</h3>
            </div>

            <div>
              <button @click="showForm = false">
                <font-awesome-icon
                  icon="fa-regular fa-circle-xmark"
                  style="color: #e92b2b"
                />
              </button>
            </div>
          </div>
          <form @submit.prevent="handleAddNewDepartment">
            <div class="form-group mb-3">
              <label class="tw-font-bold" for="departmentId"
                >Mã phòng <sup style="color: red">*</sup></label
              >
              <input
                type="text"
                v-model="newDepartment.department_id"
                id="departmentId"
                class="form-control"
                placeholder="Nhập mã phòng"
                required
                title="Nhập mã phòng vào"
              />

              <p
                v-if="showErrorDepId"
                style="color: #e92b2b; font-size: small"
                class="error mt-2"
              >
                Mã phòng đã tồn tại, vui lòng chọn mã phòng khác.
              </p>
            </div>
            <div class="form-group mb-3">
              <label class="tw-font-bold" for="departmentName"
                >Tên phòng <sup style="color: red">*</sup></label
              >
              <input
                type="text"
                v-model="newDepartment.department_name"
                id="departmentName"
                class="form-control"
                placeholder="Nhập tên phòng"
                required
                title="Nhập tên phòng"
              />
              <p
                v-if="showErrorNameDep"
                style="color: #e92b2b; font-size: small"
                class="error mt-2"
              >
                Tên phòng đã tồn tại, vui lòng kiểm tra lại hoặc sử dụng một tên
                khác!
              </p>
            </div>
            <div class="form-group mb-3">
              <label class="tw-font-bold" for="departmentName"
                >Mô tả chức năng:</label
              >

              <textarea
                class="form-control"
                v-model="newDepartment.description"
                placeholder="Mô tả chức năng của phòng"
                id="departmentName"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div class="d-flex mt-5" style="justify-content: center">
              <div>
                <button
                  type="submit"
                  class="btn-add"
                  @click="handleAddNewDepartment"
                >
                  THÊM
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<!----------------------------------------------------------SCRIP SETUP----------------------------------------------->
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { handleGetListDep } from "@/services/department_managements/handleGetListDep";
import { searchDepartments } from "@/services/department_managements/handleSearchDep";
import PaginationComponent from "@/components/Pagination.vue";
import { useRouter } from "vue-router";

import formatDate from "@/helper/format-datetime";
import Swal from "sweetalert2";
import axios from "axios";
const router = useRouter();

const formatDateTime = formatDate.formatDateTime;
const {
  getData,
  listDepartmentsData,
  errorMessage,
  totalPagesData,
  itemsPerPageData,
} = handleGetListDep();
const currentPage = ref(1);

const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await getData(page);
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

// -------------------------------HANDLE ADD NEW DEPARTMENT----------------------------
// Hiển thị form
const showForm = ref(false);

const handleShowForm = async () => {
  showForm.value = true;
};

const newDepartment = ref({
  department_id: "",
  department_name: "",
  description: "",
});

// Biến lưu giá trị của input
const showErrorNameDep = ref(false); // Hiển thị lỗi nếu tên phòng không hợp lệ
const showErrorDepId = ref(false); // Hiển thị lỗi nếu id phòng không hợp lệ
watch(
  () => newDepartment.value.department_name, // Theo dõi giá trị nhập vào
  async (newName) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/departments/check-name",
        {
          department_name: newName,
        }
      );

      if (response.status === 200) {
        showErrorNameDep.value = false; // Tên hợp lệ
      } else {
        showErrorNameDep.value = true; // Tên không hợp lệ
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi kiểm tra tên phòng:", error);
      showErrorNameDep.value = true; // Mặc định lỗi nếu server gặp vấn đề
    }
  }
);

watch(
  () => newDepartment.value.department_id, // Theo dõi giá trị nhập vào
  async (newId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/departments/check-id",
        {
          department_id: newId,
        }
      );

      if (response.status === 200) {
        showErrorDepId.value = false; // Tên hợp lệ
      } else {
        showErrorDepId.value = true; // Tên không hợp lệ
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi kiểm tra ID phòng:", error);
      showErrorDepId.value = true; // Mặc định lỗi nếu server gặp vấn đề
    }
  }
);

const handleAddNewDepartment = async () => {
  if (showErrorNameDep.value) {
    Swal.fire({
      title: "Lỗi!",
      text: "Tên phòng đã tồn tại, vui lòng sử dụng tên khác.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  if (showErrorDepId.value) {
    Swal.fire({
      title: "Lỗi!",
      text: "Mã phòng đã tồn tại, vui lòng sử dụng mã khác.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }
  try {
    Swal.fire({
      title: "Lưu ý",
      text: "Bạn có muốn thêm phòng làm việc này không?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "HỦY",
      confirmButtonText: "THÊM",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Đang thêm phong làm việc mới......");
        const newDepartmentData = JSON.parse(
          JSON.stringify(newDepartment.value)
        );

        const response = await axios.post(
          "http://localhost:3000/api/departments/create",
          newDepartmentData
        );
        if (response.status === 200) {
          Swal.fire("Thành công!", "Ca làm việc đã được thêm.", "success");
          window.location.reload();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        router.push({
          name: "admin.departments",
        });
      }
    });
  } catch (error) {
    Swal.fire({
      title: "Lỗi!",
      text: "Lỗi server, hoặc thông tin phòng làm việc đã tồn tại",
      icon: "error",
      confirmButtonText: "OK",
    });
    router.push({
      name: "admin.emp_details",
      params: { id: staff_id },
    });
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
