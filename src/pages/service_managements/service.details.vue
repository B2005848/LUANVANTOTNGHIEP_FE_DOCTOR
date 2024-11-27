<template>
  <div v-if="serviceDetail">
    <!-- Chi tiết dịch vụ -->
    <div class="container-fluid mt-3">
      <div class="wrapper card p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3>Chi Tiết Dịch Vụ</h3>
          <router-link
            :to="{ name: 'admin.services' }"
            class="btn btn-secondary"
            >Quay lại danh sách</router-link
          >
        </div>

        <!-- Thông tin dịch vụ -->
        <div class="row mb-4" v-if="serviceDetail">
          <!-- service_id -->
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Mã dịch vụ</h5>
            <p>{{ serviceDetail.service_id }}</p>
          </div>

          <!-- service_name -->
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Tên dịch vụ</h5>
            <input
              :placeholder="serviceDetail.service_name"
              v-model="serviceDetailData.service_name"
              class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              :disabled="!editMode"
            />
          </div>
          <!-- Mô tả dịch vụ -->
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Mô tả</h5>
            <input
              :placeholder="serviceDetail.description"
              v-model="serviceDetailData.description"
              class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              :disabled="!editMode"
            />
          </div>
          <!-- service_fee -->
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Giá</h5>
            <input
              :placeholder="formatCurrency(serviceDetail.service_fee)"
              v-model="serviceDetailData.service_fee"
              class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              :disabled="!editMode"
            />
          </div>

          <!-- duration -->
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Thời gian thực hiện</h5>
            <input
              :placeholder="serviceDetail.duration"
              v-model="serviceDetailData.duration"
              class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              :disabled="!editMode"
              type="number"
            />
          </div>

          <!-- status service -->
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Trạng thái</h5>
            <p>
              <span v-if="serviceDetail.is_active" class="text-success">
                Đang hoạt động
              </span>
              <span v-else class="text-danger">Ngừng cung cấp</span>
            </p>
          </div>
          <!-- specialties -->
          <div class="col-md-6 mb-3">
            <h5 v-if="!editMode" class="text-muted">Chuyên khoa</h5>
            <input
              v-if="!editMode"
              :placeholder="serviceDetail.specialty_name"
              class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              disabled
            />

            <h5 v-if="editMode" class="text-muted">Chọn chuyên khoa</h5>
            <select
              v-if="editMode"
              v-model="selectedSpecialty"
              @change="updateDepartment"
              class="form-select"
              id="specialty_id"
              required
            >
              <option
                v-for="specialty in specialties"
                :key="specialty.specialty_id"
                :value="specialty.specialty_id"
              >
                {{ specialty.specialty_name }}
              </option>
            </select>
          </div>

          <!-- department -->
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Phòng làm việc</h5>
            <input
              v-if="!editMode"
              type="text"
              class="form-control"
              disabled
              :placeholder="serviceDetail.department_name"
            />
            <input
              v-if="editMode"
              type="text"
              :value="departmentName"
              class="form-control"
              disabled
            />
          </div>

          <!-- created_at -->
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Ngày tạo:</h5>
            <p>{{ formatDateTime(serviceDetail.created_at) }}</p>
          </div>

          <!-- updated_at -->
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Ngày chỉnh sửa:</h5>
            <p>{{ formatDateTime(serviceDetail.updated_at) }}</p>
          </div>
        </div>

        <!-- Quản lý nút hành động -->
        <div class="d-flex justify-content-end">
          <button
            v-if="!editMode"
            @click="
              editMode = true;
              handleEditMode();
            "
            class="btn btn-primary me-2"
            style="padding: 0px 20px 0px 20px"
          >
            Chỉnh sửa
          </button>

          <button
            v-if="editMode"
            @click="handleEdit"
            class="btn btn-primary me-2"
            style="padding: 0px 20px 0px 20px"
          >
            LƯU
          </button>

          <button
            v-if="editMode"
            @click="editMode = false"
            class="btn me-2"
            style="
              padding: 0px 20px 0px 20px;
              background-color: rgb(107 114 128);
              color: aliceblue;
            "
          >
            HỦY
          </button>
          <button @click="handleDelete" class="btn btn-danger">
            Xóa dịch vụ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import formatDate from "@/helper/format-datetime";
import { formatCurrency } from "@/helper/currencyFormatter";

const formatDateTime = formatDate.formatDateTime;
const router = useRouter();
const route = useRoute();
const serviceDetail = ref(null);

const fetchServiceDetail = async () => {
  try {
    const serviceId = route.params.id;
    const response = await axios.get(
      `http://localhost:3000/api/services/getdetail/${serviceId}`
    );
    serviceDetail.value = response.data.dataInfo;
  } catch (error) {
    console.error(error);
    Swal.fire("Lỗi", "Không thể tải dữ liệu dịch vụ.", "error");
  }
};

const serviceDetailData = ref({
  service_name: "",
  description: "",
  service_fee: "",
  duration: "",
  department_id: "",
  specialty_id: "",
});

const editMode = ref(false);
// Khi bật chế độ chỉnh sửa, sao chép dữ liệu cũ vào form
const handleEditMode = () => {
  serviceDetailData.value = {
    service_name: serviceDetail.value.service_name,
    description: serviceDetail.value.description,
    service_fee: serviceDetail.value.service_fee,
    duration: serviceDetail.value.duration,
    department_id: serviceDetail.value.department_id,
    specialty_id: serviceDetail.value.specialty_id,
  };
};

const handleEdit = async () => {
  const result = await Swal.fire({
    title: "Chú ý!",
    text: "Bạn có chắn chăn muốn cập nhật thông tin cho dịch vụ này không?",
    showCancelButton: true,
    cancelButtonText: "HỦY",
    confirmButtonText: "LƯU",
  });
  if (result.isConfirmed) {
    try {
      // Kiểm tra dữ liệu đã được điền đầy đủ chưa
      if (
        !serviceDetailData.value.service_name ||
        !serviceDetailData.value.description
      ) {
        Swal.fire("Lỗi", "Vui lòng điền thông tin cần cập nhật.", "error");
        return;
      }

      // Lấy ID dịch vụ từ route
      const serviceId = route.params.id;

      // Gửi yêu cầu PATCH để cập nhật thông tin dịch vụ
      const response = await axios.patch(
        `http://localhost:3000/api/services/update/${serviceId}`,
        serviceDetailData.value
      );

      if (response.status === 200) {
        Swal.fire("Thành công", "Dịch vụ đã được cập nhật.", "success");
        serviceDetail.value = {
          ...serviceDetail.value,
          ...serviceDetailData.value,
        }; // Cập nhật dữ liệu sau khi sửa
        editMode.value = false; // Tắt chế độ chỉnh sửa
        window.location.reload();
      } else {
        Swal.fire("Lỗi", "Cập nhật dịch vụ không thành công.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Lỗi", "Đã xảy ra lỗi khi cập nhật dịch vụ.", "error");
    }
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    editMode.value = false;
  }
};

const handleDelete = async () => {
  const result = await Swal.fire({
    title: "Xác nhận xóa",
    text: "Bạn có chắc chắn muốn xóa dịch vụ này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  });
  const serviceId = route.params.id;

  if (result.isConfirmed) {
    try {
      await axios.delete(
        `http://localhost:3000/api/services/delete/${serviceId}`
      );
      Swal.fire("Thành công", "Dịch vụ đã được xóa.", "success");
      router.push({ name: "admin.services" });
    } catch (error) {
      console.error(error);
      Swal.fire("Lỗi", "Không thể xóa dịch vụ.", "error");
    }
  }
};
const departments = ref([]); // List of departments
const specialties = ref([]); // List of specialties
const selectedSpecialty = ref(null); // Selected specialty
const departmentName = ref(""); // Department name corresponding to the specialty

const fetchingDataSpecialties = async () => {
  try {
    // Fetch specialties
    const specialtyResponse = await axios.get(
      "http://localhost:3000/api/specialties/all"
    );
    specialties.value = specialtyResponse.data.listSpecialties;

    // Fetch all departments (this will be updated later based on the selected specialty)
    const departmentResponse = await axios.get(
      "http://localhost:3000/api/departments/getAllDepartments"
    );
    departments.value = departmentResponse.data.listDepartments;
  } catch (error) {
    console.error("Error fetching specialties or departments:", error);
  }
};

// Update department when a specialty is selected
const updateDepartment = async () => {
  try {
    // Fetch department based on the selected specialty
    const response = await axios.get(
      `http://localhost:3000/api/departments/specialty/${selectedSpecialty.value}`
    );

    // Check if a department is returned
    if (response.data && response.data.data) {
      const department = response.data.data; // Get the department object
      departmentName.value = department.department_name; // Update the department name
      serviceDetailData.value.department_id = department.department_id; // Set department_id in the form
      serviceDetailData.value.specialty_id = selectedSpecialty.value;
    } else {
      departmentName.value = "Phòng ban không xác định"; // No department found
      newService.value.department_id = ""; // Clear department_id if no department found
    }
  } catch (error) {
    console.error("Error fetching department:", error);
    Swal.fire("Lỗi!", "Không thể tải thông tin phòng ban.", "error");
  }
};
onMounted(() => {
  fetchServiceDetail();
  fetchingDataSpecialties();
});
</script>

<style scoped>
.text-primary {
  font-weight: bold;
  color: #007bff;
}
.text-muted {
  color: #6c757d;
}
.text-justify {
  text-align: justify;
}
</style>
