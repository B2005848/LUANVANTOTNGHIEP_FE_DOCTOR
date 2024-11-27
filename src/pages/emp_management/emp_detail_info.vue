<template>
  <div v-if="staffDetail" class="card container-fuild p-3">
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <!-- Với trạng thái tài khoản 0: Ngừng hoạt động thì có thể xóa -->
    <div class="d-flex tw-justify-between">
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
      <div style="">
        <button @click="handleDelete">
          Xóa nhân viên này
          <font-awesome-icon
            icon="fa-regular fa-trash-can"
            size="2xl"
            style="color: #fb2848"
          />
        </button>
      </div>
    </div>

    <div class="mb-5">
      <!-------------------------------------------------------------------------------------- THÔNG TIN CHUNG -->
      <div class="container-infor-detail mt-5 card p-5">
        <h4 class="text-center">
          THÔNG TIN CHUNG
          <!-- btn edit -->
          <button
            v-if="!isEditingInfoBasic"
            @click="isEditingInfoBasic = !isEditingInfoBasic"
            type="button"
            title="Chỉnh sửa thông tin cơ bản nhân viên"
          >
            <font-awesome-icon
              class="ms-3"
              icon="fa-regular fa-pen-to-square"
              size="sm"
              style="color: #74c0fc"
            />
          </button>

          <!-- btn cancle -->
          <button
            v-if="isEditingInfoBasic"
            @click="isEditingInfoBasic = false"
            type="button"
            class="text-center title-btn-cancle"
          >
            <font-awesome-icon
              icon="fa-regular fa-rectangle-xmark"
              size="sm"
              class="ms-3"
              style="color: #ff1414"
            />
          </button>
        </h4>

        <div class="avatar row mt-2">
          <!-- title-col -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">Ảnh hồ sơ</p>
            </div>
            <div class="col-md-8">
              <div>
                <!-- Trường hình ảnh ở chế độ edit -->
                <input
                  v-if="isEditingInfoBasic"
                  class="form-control tw-block tw-w-full tw-text-sm tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-cursor-pointer tw-bg-gray-50 dark:tw-text-gray-400 tw-focus:outline-none dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400"
                  id="file_input"
                  @change="handleFileUpload"
                  type="file"
                />
                <figure class="tw-max-w-lg">
                  <!-- -------------------SRC IMG STAFF-------------------------------- -->
                  <img
                    v-if="!isEditingInfoBasic"
                    class="tw-h-auto tw-rounded-lg"
                    :src="`http://localhost:3000${staffDetail.image_avt}`"
                    alt="Chưa cập nhật"
                    width="75"
                  />
                </figure>
              </div>
            </div>
          </div>

          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">Email:</p>
            </div>
            <div class="col-md-8">
              <input
                type="text"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
                :placeholder="staffDetail.email"
                v-model="infoDetailData.email"
                :disabled="!isEditingInfoBasic"
              />
            </div>
          </div>
        </div>

        <div class="info-detail row mt-2">
          <!-- col-1 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">
                Mã nhân viên:
              </p>
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">Họ và tên:</p>
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">Ngày sinh:</p>
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">
                Số CCCD/CMND:
              </p>
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">Giới tính:</p>
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">
                Địa chỉ liên hệ:
              </p>
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">
                Ngày cấp tài khoản:
              </p>
            </div>
            <div class="col-md-8">
              <!-- Staff id  -->
              <input
                type="text"
                :value="staffDetail.staff_id"
                disabled
                class="value form-control ps-3 tw-text-black-500 tw-font-bold"
              />

              <!-- Name -->
              <input
                v-if="!isEditingInfoBasic"
                type="text"
                :placeholder="
                  staffDetail.first_name + ' ' + staffDetail.last_name
                "
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Trường họ và tên ở chế độ edit -->
              <span v-if="isEditingInfoBasic" class="row">
                <!-- Họ và tên đệm -->
                <div class="col-md-6">
                  <input
                    type="text"
                    class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
                    :placeholder="staffDetail.first_name"
                    v-model="infoDetailData.first_name"
                    id="first_name"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <!-- Tên -->
                  <input
                    type="text"
                    v-model="infoDetailData.last_name"
                    class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
                    :placeholder="staffDetail.last_name"
                    id="last_name"
                    required
                  /></div
              ></span>

              <!-- Birthday -->
              <input
                v-if="!isEditingInfoBasic"
                type="text"
                :placeholder="formatBirthDay(staffDetail.birthday)"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Trường ngày sinh ở chế độ edit -->
              <VueDatePicker
                v-if="isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
                locale="vi"
                v-model="infoDetailData.birthday"
                format="dd/MM/yyyy"
                :enable-time-picker="false"
                :placeholder="formatBirthDay(staffDetail.birthday)"
              />
              <!-- Citizen ID -->
              <input
                type="text"
                :placeholder="staffDetail.citizen_id"
                v-model="infoDetailData.citizen_id"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Gender -->
              <span v-if="!isEditingInfoBasic">
                <input
                  v-if="staffDetail.gender == 0"
                  type="text"
                  placeholder="Nữ"
                  :disabled="!isEditingInfoBasic"
                  class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
                />
                <input
                  v-if="staffDetail.gender == 1"
                  type="text"
                  placeholder="Nam"
                  :disabled="!isEditingInfoBasic"
                  class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
                />
              </span>
              <!-- edit gender -->
              <div
                v-if="isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              >
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="female"
                    v-model="infoDetailData.gender"
                    value="0"
                  />
                  <label class="form-check-label" for="female">Nữ</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="male"
                    v-model="infoDetailData.gender"
                    value="1"
                  />
                  <label class="form-check-label" for="male">Nam</label>
                </div>
              </div>

              <!-- Contact address -->
              <input
                type="text"
                :placeholder="staffDetail.address_contact"
                v-model="infoDetailData.address_contact"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- date hire or join in -->
              <input
                type="text"
                :placeholder="formatDateTime(staffDetail.created_at)"
                disabled
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />
            </div>
          </div>
          <!-- col-2 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">
                Quyền truy cập:
              </p>
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">
                Số điện thoại:
              </p>
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">Dân tộc:</p>
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">Tôn giáo:</p>
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">Quốc tịch:</p>
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">Tài khoản:</p>
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">
                Ngày sửa đổi:
              </p>
            </div>
            <div class="col-md-8">
              <!-- Role id -->
              <input
                v-if="!isEditingInfoBasic"
                type="text"
                :value="staffDetail.role_name"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <select
                v-if="isEditingInfoBasic"
                v-model="selectedRole"
                placeholder="s"
                class="form-select value form-control ps-3 tw-text-black-500 tw-font-semibold"
              >
                <option
                  v-for="role in roleList"
                  :key="role.role_id"
                  :value="role.role_id"
                >
                  {{ role.role_name }} - {{ role.description }}
                </option>
              </select>

              <!-- number-phone -->
              <input
                type="text"
                :placeholder="staffDetail.phone_number"
                v-model="infoDetailData.phone_number"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Nation: Dân tộc -->
              <input
                type="text"
                v-model="infoDetailData.nation"
                :placeholder="staffDetail.nation || 'Chưa cập nhật'"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Religion: Tôn giáo -->
              <input
                type="text"
                v-model="infoDetailData.religion"
                :placeholder="staffDetail.religion || 'Chưa cập nhật'"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Nationality: Quốc tịch -->
              <input
                type="text"
                v-model="infoDetailData.nationality"
                :placeholder="staffDetail.nationality || 'Chưa cập nhật'"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Status account -->
              <!-- status = 1: Hoạt động -->
              <span v-if="!isEditingInfoBasic">
                <input
                  v-if="staffDetail.statusAccount === '1'"
                  type="text"
                  value="Đang hoạt động"
                  :disabled="!isEditingInfoBasic"
                  class="value text-success form-control ps-3 tw-text-black-500 tw-font-semibold"
                />
                <!-- status = 0: Ngừng hoạt động -->

                <input
                  v-if="staffDetail.statusAccount === '0'"
                  type="text"
                  value="Ngừng hoạt động"
                  :disabled="!isEditingInfoBasic"
                  class="value text-danger form-control ps-3 tw-text-black-500 tw-font-semibold"
                />
                <!-- status = 2: Tạm khóa -->

                <input
                  v-if="staffDetail.statusAccount === '2'"
                  type="text"
                  value="Tạm khóa"
                  :disabled="!isEditingInfoBasic"
                  class="value text-warning form-control ps-3 tw-text-black-500 tw-font-semibold"
                />
              </span>

              <!-- Edit status account -->
              <select
                class="value form-control ps-3 tw-font-semibold"
                name="listStausAccount"
                v-if="isEditingInfoBasic"
                v-model="infoDetailData.status"
              >
                <option value="1" class="text-success">Đang hoạt động</option>
                <option value="0" class="text-danger">Ngừng hoạt động</option>
                <option value="2" class="text-warning">Tạm khóa</option>
              </select>
              <!-- date modify -->
              <input
                type="text"
                disabled
                :placeholder="formatDateTime(staffDetail.updated_at)"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />
            </div>
          </div>
        </div>

        <div @click="handleSaveInfoBasic" class="mt-5 text-center btn-save">
          <button
            v-if="isEditingInfoBasic"
            type="button"
            class="title-btnSave"
            title="Lưu"
          >
            LƯU
          </button>
        </div>
      </div>
      <!--------------------------------------------------------------------------------------------------WORK INFORMATION: THÔNG TIN CÔNG VIỆC-->

      <!-- Work Information Section -->
      <div class="container-infor-detail mt-3 card p-5">
        <h4 class="text-center">
          THÔNG TIN CÔNG VIỆC
          <!-- btn edit -->
          <button
            v-if="!isEditingInfoWork"
            @click="isEditingInfoWork = !isEditingInfoWork"
            type="button"
            title="Chỉnh sửa thông tin cơ bản nhân viên"
          >
            <font-awesome-icon
              class="ms-3"
              icon="fa-regular fa-pen-to-square"
              size="sm"
              style="color: #74c0fc"
            />
          </button>

          <!-- btn cancle -->
          <button
            v-if="isEditingInfoWork"
            @click="isEditingInfoWork = false"
            type="button"
            class="text-center title-btn-cancle"
          >
            <font-awesome-icon
              icon="fa-regular fa-rectangle-xmark"
              size="sm"
              class="ms-3"
              style="color: #ff1414"
            />
          </button>
        </h4>

        <div class="mt-2">
          <div class="row">
            <!-- Column 1 -->
            <div class="col-md-3">
              <p class="tw-dark:text-white tw-ms-5 tw-font-bold">
                Ngày vào làm:
              </p>
              <p
                v-if="!isEditingInfoWork"
                class="tw-dark:text-white tw-ms-5 tw-font-bold"
              >
                Hợp đồng làm việc(năm):
              </p>
              <p
                v-if="isEditingInfoWork"
                class="tw-dark:text-white tw-ms-5 tw-font-bold"
              >
                Gia hạn hợp đồng(năm):
              </p>
              <p
                v-if="
                  staffDetail.role_id !== 'LT' &&
                  staffDetail.role_id !== 'TN' &&
                  staffDetail.role_id !== 'AD'
                "
                class="tw-dark:text-white tw-ms-5 tw-font-bold"
              >
                Chuyên khoa làm việc:
              </p>
            </div>
            <!-- end col -1 -->
            <!-- Column 2 -->
            <div class="col-md-9">
              <input
                disabled
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
                type="text"
                :placeholder="formatBirthDay(staffDetail.created_at)"
              />

              <!-- Số năm hợp đồng -->
              <input
                :disabled="!isEditingInfoWork"
                v-model="infoDetailWork.workContract"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
                type="number"
                :placeholder="staffDetail.work_contract + ' năm'"
              />

              <!-- Giá trị chuyên khoa -->
              <div
                v-if="
                  staffDetail.role_id !== 'LT' &&
                  staffDetail.role_id !== 'TN' &&
                  staffDetail.role_id !== 'AD' &&
                  isEditingInfoWork
                "
                class="tw-text-black-500 tw-font-semibold checkbox-container"
              >
                <div
                  v-for="spec in availableSpecialties"
                  :key="spec.specialty_id"
                  class="form-check"
                >
                  <input
                    type="checkbox"
                    class="form-check-input small-checkbox"
                    :id="`specialty-${spec.specialty_id}`"
                    :value="spec.specialty_id"
                    v-model="infoDetailWork.specialtyIds"
                  />
                  <label
                    class="form-check-label"
                    :for="`specialty-${spec.specialty_id}`"
                  >
                    {{ spec.specialty_name }}
                  </label>
                </div>
              </div>
              <p
                v-if="
                  staffDetail.role_id !== 'LT' &&
                  staffDetail.role_id !== 'TN' &&
                  staffDetail.role_id !== 'AD' &&
                  !isEditingInfoWork
                "
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
                style="background-color: #e9ecef"
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
            <!-- end col 2 -->
          </div>
        </div>

        <div @click="handleSaveInfoWork" class="mt-5 text-center btn-save">
          <button
            v-if="isEditingInfoWork"
            type="button"
            class="title-btnSave"
            title="Lưu"
          >
            LƯU
          </button>
        </div>
        <hr />
        <!-------------------------------------------------------------------------------------------------------------------------------------------------------------->
        <!-- Thông tin ca làm việc -->
        <div class="col-md-12 tw-text-center tw-mt-5">
          <h5 class="tw-dark:text-white tw-ms-5 tw-mb-5">
            LỊCH LÀM VIỆC
            <span>
              <button type="button" title="Thêm nhân viên mới">
                <router-link
                  :to="{
                    name: 'admin.create_staff_shift',
                    params: { staff_id: staff_id },
                  }"
                >
                  <font-awesome-icon
                    icon=" fa-plus"
                    size="lg"
                    style="color: #74c0fc"
                /></router-link>
              </button>
            </span>
          </h5>

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
                  <th scope="col" class="tw-px-4 tw-py-2">Buổi</th>
                  <th scope="col" class="tw-px-4 tw-py-2">Thời gian</th>
                  <th scope="col" class="tw-px-6 tw-py-2">Phòng làm việc</th>
                  <th scope="col" class="tw-px-6 tw-py-2">Chuyên khoa</th>
                  <th scope="col" class="tw-px-4 tw-py-2">Ngày tạo</th>
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
import { useRoute, useRouter } from "vue-router";
import {
  handleGetDetailStaff,
  staffDetail,
  specialtyData,
  errorMessage,
} from "@/services/staff_managements/handleGetDetailStaff";
import formatDate from "@/helper/format-datetime";
import Swal from "sweetalert2";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";
const formatDateTime = formatDate.formatDateTime;
const formatBirthDay = formatDate.formatDateBirth;
const formatDay = formatDate.formatDateBirth;
const formatTime = formatDate.formatTime;
const route = useRoute();
const router = useRouter();
const staff_id = route.params.id;
// Hàm gọi API để lấy thông tin ca làm việc của nhân viên
const shiftStaffList = ref([]);
const fetchShifts = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/handle/staff/getStaffShifts/${staff_id}`
    );
    if (response.status === 200) {
      console.log(response.data.shiftStaffList);
      shiftStaffList.value = response.data.shiftStaffList; // Lưu dữ liệu trả về vào shiftStaffList
    } else if (response.status === 404) {
      console.log(response.data.message);
      shiftStaffList.value = [];
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu ca làm việc:", error);
  }
};

//Hàm gọi Api để lấy danh sách quyền truy cập để chuẩn bị cho hàm cập nhật thông tin
const roleList = ref([]);
const selectedRole = ref(null);
const fetchRoles = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/roles/");
    if (response.status === 200) {
      console.log(response.data.dataInfo);
      roleList.value = response.data.dataInfo; // Lưu dữ liệu trả về vào roleList
    } else {
      console.log(response.data.message);
      console.log("Không lấy được danh sách quyền truy cập");
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu roles", error);
  }
};

// Xóa nhân viên khi tài khoản ngừng hoạt động
const handleDelete = async () => {
  try {
    const result = await Swal.fire({
      title: "Lưu ý",
      text: "Bạn có chắc chắn xóa nhân viên này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      const response = await axios.delete(
        `http://localhost:3000/api/handle/staff/${staff_id}`
      );

      if (response.status === 200) {
        Swal.fire("Đã xóa thành công", "", "success");
        router.push({
          name: "admin.emp",
        });
      }
    }
  } catch (error) {
    Swal.fire(
      "Lỗi!",
      "Không thể xóa nhân viên này vì còn hạn hợp đồng",
      "error"
    );
    console.error("Lỗi khi xóa nhân viên", error);
  }
};

// CẬP NHẬT THÔNG TIN NHÂN VIÊN
const isEditingInfoBasic = ref(false);
// cập nhật ảnh thay đổi
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    infoDetailData.value.image_avt = file;
  }
};
const infoDetailData = ref({
  image_avt: null,
  first_name: "",
  last_name: "",
  birthday: "",
  gender: "",
  citizen_id: "",
  phone_number: "",
  email: "",
  address_contact: "",
  nation: "",
  religion: "",
  nationality: "",
  status: "",
});
const handleSaveInfoBasic = async () => {
  console.log("DỮ LIỆU MẶC ĐỊNH", staffDetail);
  try {
    const result = await Swal.fire({
      title: "Lưu ý",
      text: "Bạn có chắc chắn cập nhật thông tin cho nhân viên này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      // Chuẩn bị dữ liệu cập nhật từ `infoDetailData`
      const updateData = {
        first_name:
          infoDetailData.value.first_name || staffDetail.value.first_name,
        last_name:
          infoDetailData.value.last_name || staffDetail.value.last_name,
        citizen_id:
          infoDetailData.value.citizen_id || staffDetail.value.citizen_id,
        birthday: infoDetailData.value.birthday || staffDetail.value.birthday,
        gender: infoDetailData.value.gender || staffDetail.value.gender,
        email: infoDetailData.value.email || staffDetail.value.email,
        address_contact:
          infoDetailData.value.address_contact ||
          staffDetail.value.address_contact,
        nation: infoDetailData.value.nation || staffDetail.value.nation,
        religion: infoDetailData.value.religion || staffDetail.value.religion,
        nationality:
          infoDetailData.value.nationality || staffDetail.value.nationality,
        status: infoDetailData.value.status || staffDetail.value.statusAccount,
      };

      // Gửi yêu cầu PATCH tới API
      const response = await axios.patch(
        `http://localhost:3000/api/handle/staff/${staff_id}`,
        updateData
      );

      // Tạo formData để cập nhật ảnh
      if (infoDetailData.value.image_avt) {
        const formData = new FormData();
        formData.append("avatar", infoDetailData.value.image_avt);
        formData.append("staffId", staff_id);
        const responseUpdateAvt = await axios.post(
          "http://localhost:3000/api/file/uploadAvtStaff",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (responseUpdateAvt.status === 200) {
          Swal.fire("Thành công!", "Ảnh hồ sơ đã được tải lên.", "success");
        }
      }
      if (response.status === 200) {
        Swal.fire("Đã lưu thông tin thành công", "", "success");
        location.reload();
        isEditingInfoBasic.value = false; // Tắt chế độ chỉnh sửa
      } else {
        Swal.fire("Lỗi", "Không thể cập nhật thông tin nhân viên", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      isEditingInfoBasic.value = false;
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin nhân viên:", error);
    Swal.fire("Lỗi", "Có lỗi xảy ra khi cập nhật thông tin", "error");
  }
};

// CẬP NHẬT THÔNG TIN CÔNG VIỆC NHÂN VIÊN
const isEditingInfoWork = ref(false);
const availableSpecialties = ref([]);

// Fetch các chuyên khoa có sẵn
const fetchAvailableSpecialties = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/specialties/all"
    );
    if (response.status === 200) {
      availableSpecialties.value = response.data.listSpecialties; // Đưa dữ liệu vào biến
    }
  } catch (error) {
    console.error("Lỗi khi tải danh sách chuyên khoa:", error);
  }
};
const infoDetailWork = ref({
  workContract: null,
  specialtyIds: [],
});
const handleSaveInfoWork = async () => {
  console.log("DỮ LIỆU MẶC ĐỊNH", staffDetail);
  try {
    const result = await Swal.fire({
      title: "Lưu ý",
      text: "Bạn có chắc chắn cập nhật thông tin công việc cho nhân viên này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      // Chuẩn bị dữ liệu cập nhật từ `infoDetailData`
      const updateData = {
        workContract:
          infoDetailWork.value.workContract || staffDetail.value.work_contract,
        specialtyIds: infoDetailWork.value.specialtyIds || specialtyData,
      };

      // Gửi yêu cầu PATCH tới API
      const response = await axios.patch(
        `http://localhost:3000/api/handle/staff/updateStaffInfoWork/${staff_id}`,
        updateData
      );

      if (response.status === 200) {
        Swal.fire("Đã lưu thông tin thành công", "", "success");
        location.reload();
        isEditingInfoBasic.value = false; // Tắt chế độ chỉnh sửa
      } else {
        Swal.fire("Lỗi", "Không thể cập nhật thông tin nhân viên", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      isEditingInfoBasic.value = false;
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin công viên nhân viên:", error);
    Swal.fire(
      "Kiểm tra lại",
      `Các chuyên khoa hiện tại mà nhân viên có!`,
      "error"
    );
  }
};
onMounted(async () => {
  handleGetDetailStaff(staff_id);
  fetchShifts();
  fetchRoles();
  fetchAvailableSpecialties();
  selectedRole.value = staffDetail.role_id;
  console.log(shiftStaffList);
});
</script>

<style scoped>
.value {
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

/* Container cho các checkbox với thanh cuộn */
.checkbox-container {
  max-height: 200px; /* Chiều cao tối đa cho vùng chứa */
  overflow-y: auto; /* Cho phép cuộn dọc khi vượt quá chiều cao */
}

/* Kích thước checkbox nhỏ lại */
.small-checkbox {
  transform: scale(0.8); /* Điều chỉnh kích thước checkbox */
  margin-right: 10px; /* Thêm khoảng cách giữa checkbox và nhãn */
}

/* Điều chỉnh khoảng cách giữa các checkbox */
.form-check {
  margin-bottom: 8px; /* Khoảng cách giữa các checkbox */
}
</style>
