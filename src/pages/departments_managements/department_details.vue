<template>
  <div>
    <div class="d-flex">
      <button
        @click="handleDelete"
        type="button"
        title="XÓA PHÒNG LÀM VIỆC NÀY"
      >
        <font-awesome-icon
          icon="fa-solid fa-trash-can"
          size="lg"
          style="color: #b30000"
        />
      </button>
    </div>
    <!-- Chi tiết phòng làm việc -->
    <div class="container mt-4">
      <div class="card p-4">
        <div class="d-flex justify-content-between align-items-center">
          <h2>
            Chi Tiết Phòng Làm Việc
            <button
              v-if="!isEditing"
              @click="isEditing = !isEditing"
              type="button"
              title="Chỉnh sửa thông tin phòng làm việc"
            >
              <font-awesome-icon
                class="ms-3"
                icon="fa-regular fa-pen-to-square"
                size="sm"
                style="color: #74c0fc"
              />
            </button>

            <button
              v-if="isEditing"
              @click="isEditing = false"
              type="button"
              title="Hủy"
            >
              <font-awesome-icon
                icon="fa-regular fa-rectangle-xmark"
                size="sm"
                class="ms-3"
                style="color: #ff1414"
              />
            </button>
          </h2>
          <button
            class="btn btn-secondary"
            @click="$router.push({ name: 'admin.departments' })"
          >
            QUAY LẠI DANH SÁCH
          </button>
        </div>

        <!-- Thông tin chi tiết phòng -->
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label fw-bold">Mã Phòng</label>
              <input
                type="text"
                class="form-control"
                :placeholder="departmentId"
                disabled
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label fw-bold">Tên Phòng</label>
              <input
                type="text"
                v-model="infoData.department_name"
                class="form-control"
                :placeholder="departmentDetails.department_name"
                :disabled="!isEditing"
              />
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label class="form-label fw-bold">Mô tả</label>
          <input
            type="text"
            v-model="infoData.description"
            class="form-control"
            :placeholder="departmentDetails.description"
            :disabled="!isEditing"
          />
        </div>

        <div @click="modifyDepartment" class="mt-5 text-center btn-save">
          <button
            v-if="isEditing"
            type="button"
            class="title-btnSave"
            title="Lưu"
          >
            LƯU
          </button>
        </div>
        <hr />
        <!-- Thông tin nhân viên trong phòng -->
        <h3 class="mt-4">Danh Sách Nhân Viên</h3>
        <p>Đây là danh sách nhân viên làm việc tại phòng này</p>
        <!-- -------  TABLE---------------- -->
        <div class="table-responsive mt-3">
          <div
            class="mt-2 tw-relative tw-overflow-x-auto tw-shadow-md tw-sm:rounded-lg"
          >
            <table
              class="tw-w-full tw-text-sm tw-text-left tw-rtl:text-right tw-text-gray-800 tw-dark:text-gray-400"
            >
              <thead
                class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-200 tw-dark:bg-gray-700 tw-dark:text-gray-400"
              >
                <tr class="tw-text-center">
                  <th scope="col" class="tw-px-4 tw-py-2">STT</th>
                  <th scope="col" class="tw-px-4 tw-py-2">MÃ NHÂN VIÊN</th>
                  <th scope="col" class="tw-px-4 tw-py-2">HỌ VÀ TÊN</th>
                  <th scope="col" class="tw-px-4 tw-py-2">CHỨC VỤ</th>
                  <th scope="col" class="tw-px-4 tw-py-2">EMAIL</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(emp, index) in employees"
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
                  <td>
                    <router-link
                      :to="{
                        name: 'admin.emp_details',
                        params: { id: emp.staff_id },
                      }"
                      >{{ emp.staff_id }}</router-link
                    >
                  </td>
                  <td>{{ emp.first_name + " " + emp.last_name }}</td>

                  <td>
                    {{ emp.role_name }}
                  </td>

                  <td>
                    {{ emp.email }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <PaginationComponent
            v-if="employees.length !== 0"
            :pageCount="totalPagesData"
            :currentPage="currentPage"
            @page-change="fetchDataByPage"
          />
          <p v-if="employees.length === 0" class="text-center mt-3 text-muted">
            Không có nhân viên nào trong phòng này.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import PaginationComponent from "@/components/Pagination.vue";
import Swal from "sweetalert2";
const currentPage = ref(1);

const route = useRoute();
const router = useRouter();
const departmentId = route.params.id;

const departmentDetails = ref({});
const employees = ref([]);

// 1. Tải dữ liệu thông tin phòng khám
const fetchDepartmentDetails = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/departments/${departmentId}`
    );
    departmentDetails.value = response.data.data;
    infoData.value.department_name =
      departmentDetails.value.department_name || "";
    infoData.value.description = departmentDetails.value.description || "";
  } catch (error) {
    console.error("Lỗi khi lấy thông tin chi tiết phòng:", error);
  }
};

// 2. Tải dữ liệu nhân viên theo trang
const errorMessage = ref("");
const totalPagesData = ref(0);
const itemsPerPageData = ref(10);
const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await fetchListStaffByDepartmentId(page);
};
const fetchListStaffByDepartmentId = async (page = 1) => {
  currentPage.value = page;
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/departments/liststaff/${departmentId}?page=${page}`
    );
    if (response.status === 200) {
      employees.value = response.data.listStaffByDep || [];
      itemsPerPageData.value = response.data.itemsPerPage;
      totalPagesData.value = response.data.totalPages;
    }
  } catch (error) {
    employees.value = [];
    errorMessage.value =
      error.response?.data?.message || "Get list staff by department ID FAILS";
    console.log(error.response.data.message);
  }
};

// 3. Hàm chỉnh sửa thông tin phòng khám
const isEditing = ref(false);
const infoData = ref({
  department_name: "",
  description: "",
});
const modifyDepartment = async () => {
  try {
    const result = await Swal.fire({
      title: "Lưu ý",
      text: "Bạn có chắc chắn cập nhật thông tin phòng làm việc này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      const updateData = {
        department_name:
          infoData.value.department_name ||
          departmentDetails.value.department_name,
        description:
          infoData.value.description || departmentDetails.value.description,
      };

      const response = await axios.patch(
        `http://localhost:3000/api/departments/modify/${departmentId}`,
        updateData
      );

      if (response.status === 200) {
        Swal.fire("Đã lưu thông tin thành công", "", "success");
        location.reload();
        isEditing.value = false;
      } else {
        Swal.fire(
          "Lỗi",
          "Không thể cập nhật thông tin phòng làm việc",
          "error"
        );
      }
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin phòng làm việc:", error);
    Swal.fire("Lỗi", "Có lỗi xảy ra khi cập nhật thông tin", "error");
  }
};

// 4. Xóa phòng làm việc này
const handleDelete = async () => {
  try {
    const result = await Swal.fire({
      title: "Lưu ý",
      text: "Bạn có chắc chắn xóa phòng làm việc này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      const response = await axios.delete(
        `http://localhost:3000/api/departments/delete/${departmentId}`
      );

      if (response.status === 200) {
        Swal.fire("Đã xóa thành công", "", "success");
        router.push({
          name: "admin.departments",
        });
      } else {
        Swal.fire(
          "Lỗi",
          "Không thể xóa phòng làm việc này vì đã có bệnh nhân khám ở đây",
          "error"
        );
      }
    }
  } catch (error) {
    console.error("Lỗi khi xóa phòng làm việc:", error);
    Swal.fire("Lỗi", "Có lỗi xảy ra khi xóa", "error");
  }
};

onMounted(() => {
  fetchDepartmentDetails();
  fetchListStaffByDepartmentId();
});
</script>

<style scoped>
.container {
  width: 100%;
}
.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.table {
  margin-top: 20px;
}
.table th {
  text-align: center;
}
.table td {
  text-align: center;
  vertical-align: middle;
}

.btn-save {
  margin: 0 auto;
  background-color: rgb(0, 255, 102);
  width: 70%;
  border-radius: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-save:hover {
  background-color: rgb(153, 239, 187);
  transform: scale(1.05);
}

.title-btnSave {
  color: #fff;
  font-weight: bold;
  padding: 5px 0px 5px 0px;
}
</style>
