<template>
  <div v-if="staffDetail" class="card container-fuild p-3">
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div class="mb-5">
      <!-- control -->
      <div class="me-3">
        <h3 class="tw-text-xl tw-font-medium tw-dark:text-white">
          <router-link :to="{ name: 'admin.emp' }">
            <font-awesome-icon
              class="me-3"
              icon=" fa-arrow-left"
              style="color: #a3aec2"
              size="xl"
          /></router-link>
          Thông tin nhân viên
        </h3>
      </div>
      <!-------------------------------------------------------------------------------------- THÔNG TIN CHUNG -->
      <div class="container-infor-detail mt-5 card p-5">
        <h4 class="text-center">
          THÔNG TIN CHUNG
          <router-link :to="{ name: 'admin.emp' }">
            <font-awesome-icon
              class="ms-3"
              icon="fa-regular fa-pen-to-square"
              size="sm"
              style="color: #74c0fc"
          /></router-link>
        </h4>

        <div class="avatar row">
          <!-- title-col -->
          <div class="col-md-2">
            <p class="tw-dark:text-white tw-ms-5">Ảnh hồ sơ</p>
          </div>

          <div class="col-md-4">
            <div>
              <figure class="tw-max-w-lg">
                <!-- -------------------SRC IMG STAFF-------------------------------- -->
                <img
                  class="tw-h-auto tw-max-w-full tw-rounded-lg"
                  :src="`http://localhost:3000${staffDetail.image_avt}`"
                  alt="Chưa cập nhật"
                  width="150"
                />
              </figure>
            </div>
          </div>
        </div>

        <div class="info-detail row mt-2">
          <!-- col-1 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5">Mã nhân viên</p>
              <p class="tw-dark:text-white tw-ms-5">Họ và tên</p>
              <p class="tw-dark:text-white tw-ms-5">Ngày sinh</p>
              <p class="tw-dark:text-white tw-ms-5">Số CCCD/CMND</p>
              <p class="tw-dark:text-white tw-ms-5">Giới tính</p>
              <p class="tw-dark:text-white tw-ms-5">Địa chỉ liên hệ</p>
              <p class="tw-dark:text-white tw-ms-5">Ngày cấp tài khoản</p>
            </div>
            <div class="col-md-8">
              <!-- Staff id  -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.staff_id }}
              </p>

              <!-- Name -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.first_name }} {{ staffDetail.last_name }}
              </p>

              <!-- Birthday -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ formatBirthDay(staffDetail.birthday) }}
              </p>

              <!-- Citizen ID -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.citizen_id }}
              </p>

              <!-- Gender -->
              <p class="value tw-text-black-500 tw-font-semibold">
                <span v-if="staffDetail.gender == 0"
                  >Nữ
                  <font-awesome-icon
                    icon=" fa-venus"
                    style="color: #b197fc"
                    size="lg"
                /></span>
                <span v-if="staffDetail.gender == 1"
                  >Nam
                  <font-awesome-icon
                    icon=" fa-mars"
                    style="color: #74c0fc"
                    size="lg"
                /></span>
              </p>

              <!-- Contact address -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.address_contact }}
              </p>

              <!-- date hire or join in -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ formatDateTime(staffDetail.created_at) }}
              </p>
            </div>
          </div>
          <!-- col-2 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5">Quyền truy cập</p>
              <p class="tw-dark:text-white tw-ms-5">Số điện thoại</p>
              <p class="tw-dark:text-white tw-ms-5">Dân tộc</p>
              <p class="tw-dark:text-white tw-ms-5">Tôn giáo</p>
              <p class="tw-dark:text-white tw-ms-5">Quốc tịch</p>
              <p class="tw-dark:text-white tw-ms-5">Trạng thái tài khoản</p>
              <p class="tw-dark:text-white tw-ms-5">Ngày sửa đổi</p>
            </div>
            <div class="col-md-8">
              <!-- Role id -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.role_name }}
              </p>

              <!-- number-phone -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.phone_number }}
              </p>

              <!-- Nation: Dân tộc -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.nation || "Chưa cập nhật !" }}
              </p>

              <!-- Religion: Tôn giáo -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.religion || "Chưa cập nhật !" }}
              </p>

              <!-- Nationality: Quốc tịch -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.nationality || "Chưa cập nhật !" }}
              </p>

              <!-- Status account -->
              <p class="value tw-text-black-500 tw-font-semibold">
                <!-- status = 1: Hoạt động -->
                <span
                  class="text-success"
                  v-if="staffDetail.statusAccount === '1'"
                  >Đang hoạt động
                  <font-awesome-icon
                    class="tw-ms-4"
                    icon="fa-solid fa-signal"
                    size="lg"
                    style="color: #63e6be"
                /></span>

                <!-- status = 0: Ngừng hoạt động -->
                <span
                  class="text-danger"
                  v-if="staffDetail.statusAccount === '0'"
                  >Ngừng hoạt động<font-awesome-icon
                    class="tw-ms-4"
                    icon="fa-solid fa-ban"
                    size="lg"
                    style="color: #f41f1f"
                  />
                </span>

                <!-- status = 2: Tạm khóa -->
                <span
                  class="text-warning"
                  v-if="staffDetail.statusAccount === '2'"
                  >Tạm khóa
                  <font-awesome-icon
                    class="tw-ms-4"
                    size="lg"
                    icon="fa-lock"
                    style="color: #ffd43b"
                /></span>
              </p>

              <!-- date modify -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ formatDateTime(staffDetail.updated_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--------------------------------------------------------------------------------------------------WORK INFORMATION: THÔNG TIN CÔNG VIỆC-->
      <!-- Work Information Section -->
      <div class="container-infor-detail mt-3 card p-5">
        <h4 class="text-center">
          THÔNG TIN CÔNG VIỆC
          <router-link :to="{ name: 'admin.emp' }">
            <font-awesome-icon
              class="ms-3"
              icon="fa-regular fa-pen-to-square"
              size="sm"
              style="color: #74c0fc"
            />
          </router-link>
        </h4>

        <div class="info-detail row mt-2">
          <!-- Column 1 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5">Ngày vào làm</p>
              <p class="tw-dark:text-white tw-ms-5">Hợp đồng làm việc</p>
              <p
                v-if="
                  staffDetail.role_id !== 'LT' && staffDetail.role_id !== 'TN'
                "
                class="tw-dark:text-white tw-ms-5"
              >
                Chuyên khoa
              </p>
            </div>
            <div class="col-md-8">
              <!-- Start Date -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ formatBirthDay(staffDetail.created_at) }}
              </p>
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.work_contract }} năm
              </p>
              <!-- Specialty -->
              <p
                v-if="
                  staffDetail.role_id !== 'LT' &&
                  staffDetail.role_id !== 'TN' &&
                  specialtyData
                "
                class="value tw-text-black-500 tw-font-semibold"
              >
                <span
                  v-for="(spec, index) in specialtyData"
                  :key="spec.specialty_id"
                >
                  {{ spec.specialty_name
                  }}<span v-if="index < specialtyData.length - 1">, </span>
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Thông tin ca làm việc -->
        <div class="col-md-12 tw-text-center tw-mt-5">
          <p class="tw-dark:text-white tw-ms-5">Thông tin ca làm việc</p>
          <!-- Hiển thị danh sách ca làm việc -->
          <div
            v-if="shiftStaffList"
            class="tw-relative tw-overflow-x-auto tw-shadow-md tw-sm:rounded-lg"
          >
            <table
              class="tw-w-full tw-text-sm tw-text-left tw-rtl:text-right tw-text-gray-800 tw-dark:text-gray-400"
            >
              <thead
                class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-200 tw-dark:bg-gray-700 tw-dark:text-gray-400"
              >
                <tr class="tw-text-center">
                  <th scope="col" class="tw-px-1 tw-py-1">STT</th>

                  <th scope="col" class="tw-px-4 tw-py-2">Ngày vào ca</th>
                  <th scope="col" class="tw-px-4 tw-py-2">Ca làm việc</th>
                  <th scope="col" class="tw-px-4 tw-py-2">
                    Thời gian làm việc
                  </th>
                  <th scope="col" class="tw-px-6 tw-py-2">Phòng làm việc</th>
                  <th scope="col" class="tw-px-6 tw-py-2">
                    Chuyên khoa làm việc
                  </th>
                  <th scope="col" class="tw-px-4 tw-py-2">Ngày tạo</th>
                  <th scope="col" class="tw-px-4 tw-py-2">Ngày chỉnh sửa</th>
                  <th scope="col" class="tw-px-4 tw-py-2">Tools</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(shift, index) in shiftStaffList"
                  :key="index"
                  class="tw-bg-white tw-text-center tw-border-b tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-hover:bg-gray-50 tw-dark:hover:bg-gray-600"
                >
                  <!-- STT -->
                  <th
                    scope="row"
                    class="tw-px-4 tw-py-2 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap tw-dark:text-white"
                  >
                    {{ index + 1 }}
                  </th>

                  <!-- JOIN IN -->
                  <td class="tw-px-6 tw-2y-3">
                    {{ formatDay(shift.shift_date) }}
                  </td>

                  <!-- SHIFT NAME -->
                  <td class="tw-px-4 tw-py-2">{{ shift.shift_name }}</td>

                  <!-- TIME SHIFT -->
                  <td class="px-4 py-2">
                    {{ formatTime(shift.start_time) }} -
                    {{ formatTime(shift.end_time) }}
                  </td>

                  <!-- WORKED IN DEPARTMENT -->
                  <td class="px-6 py-2">{{ shift.department_name }}</td>

                  <!-- WORKED IN SPECIALTIES -->
                  <td class="px-6 py-2">{{ shift.specialty_name }}</td>

                  <!-- CREATED AT -->
                  <td class="px-4 py-2">
                    {{ formatDateTime(shift.created_at) }}
                  </td>

                  <!-- UPDATED AT -->
                  <td class="px-4 py-2">
                    {{ formatDateTime(shift.updated_at) }}
                  </td>

                  <!-- TOOLS -->
                  <td class="px-6 py-2">
                    <router-link to="#">Cập nhật</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- END CODE DIV CONTAINER -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  handleGetDetailStaff,
  staffDetail,
  specialtyData,
  errorMessage,
} from "@/services/staff_managements/handleGetDetailStaff";
import formatDate from "@/helper/format-datetime";
const formatDateTime = formatDate.formatDateTime;
const formatBirthDay = formatDate.formatDateBirth;
const formatDay = formatDate.formatDateBirth;
const formatTime = formatDate.formatTime;
const route = useRoute();
const staff_id = route.params.id;
const shiftStaffList = ref([]);
// Hàm gọi API để lấy thông tin ca làm việc của nhân viên
const fetchShifts = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/handle/staff/getStaffShifts/${staff_id}`
    );
    if (response.status === 200) {
      console.log(response.data.shiftStaffList);
      shiftStaffList.value = response.data.shiftStaffList; // Lưu dữ liệu trả về vào shiftStaffList
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu ca làm việc:", error);
  }
};
onMounted(async () => {
  handleGetDetailStaff(staff_id);
  fetchShifts();
  console.log(shiftStaffList);
});
</script>

<style scoped>
.value {
  border-bottom: 1px solid rgb(199, 199, 199);
  padding: 5px 0;
  margin-bottom: 10px;
}

.info-detail .col-md-4 p,
.info-detail .col-md-8 p {
  margin-bottom: 10px;
  line-height: 1.5;
}

.info-detail .col-md-4 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-detail .col-md-8 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
