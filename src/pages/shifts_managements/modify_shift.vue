<template>
  <div>
    <!-- Form chỉnh sửa ca làm việc -->
    <div class="container-fluid mt-3">
      <div class="wapper card p-3">
        <div class="d-flex mt-3">
          <div class="flex-1">
            <h3>CHỈNH SỬA GIỜ HOẠT ĐỘNG</h3>
          </div>
        </div>

        <!-- Form -->
        <div class="mt-3">
          <form @submit.prevent="updateShift">
            <div class="form-group mb-3">
              <label
                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                for="shift_name"
                >Mô tả ca làm việc</label
              >
              <input
                type="text"
                id="shift_name"
                v-model="shiftData.shift_name"
                class="form-control"
                required
              />
            </div>

            <div class="form-group mb-3">
              <label
                for="time"
                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                >Chọn thời gian bắt đầu:</label
              >
              <div class="tw-relative">
                <div
                  class="tw-absolute tw-inset-y-0 tw-end-0 tw-top-0 tw-flex tw-items-center tw-pe-3.5 tw-pointer-events-none"
                >
                  <svg
                    class="tw-w-4 tw-h-4 tw-text-gray-500 dark:tw-text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  v-model="shiftData.start_time"
                  type="time"
                  id="time"
                  class="tw-bg-gray-50 tw-border tw-leading-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:tw-focus:ring-blue-500 dark:tw-focus:border-blue-500"
                  value="00:00"
                  required
                />
              </div>
            </div>

            <div class="form-group mb-3">
              <label
                for="time"
                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                >Chọn thời gian kết thúc:</label
              >
              <div class="tw-relative">
                <div
                  class="tw-absolute tw-inset-y-0 tw-end-0 tw-top-0 tw-flex tw-items-center tw-pe-3.5 tw-pointer-events-none"
                >
                  <svg
                    class="tw-w-4 tw-h-4 tw-text-gray-500 dark:tw-text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  v-model="shiftData.end_time"
                  type="time"
                  id="time"
                  class="tw-bg-gray-50 tw-border tw-leading-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:tw-focus:ring-blue-500 dark:tw-focus:border-blue-500"
                  value="00:00"
                  required
                />
              </div>
            </div>

            <div class="form-group mb-3 row">
              <div style="background-color: lightgrey" class="col-md-6">
                <router-link :to="{ name: 'admin.shifts' }" class="btn">
                  HỦY
                </router-link>
              </div>

              <div class="col-md-6">
                <button type="submit" class="btn btn-primary">CẬP NHẬT</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Swal from "sweetalert2";
// Lưu trữ dữ liệu của ca làm việc
const shiftData = ref({
  shift_name: "",
  start_time: "",
  end_time: "",
});

// Lấy shift_id từ params trong route
const route = useRoute();
const shift_id = route.params.shift_id; // Giả sử bạn đang dùng route.params để lấy shift_id

// Sử dụng router để điều hướng sau khi cập nhật thành công
const router = useRouter();

// Hàm lấy thông tin ca làm việc hiện tại để hiển thị trong form
const fetchShiftData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/shifts/${shift_id}`
    );
    if (response.status === 200) {
      shiftData.value = response.data.data; // Gán dữ liệu ca làm việc vào form
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu ca làm việc:", error);
    alert("Có lỗi xảy ra khi tải dữ liệu ca làm việc.");
  }
};

// Hàm cập nhật thông tin ca làm việc
const updateShift = async () => {
  try {
    Swal.fire({
      title: "Chú ý",
      showCancelButton: true,
      cancelButtonText: "HỦY",
      confirmButtonText: "LƯU",
      text: "Bạn có chắc chắn cập nhật thông tin cho ca làm việc này",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Chuẩn bị cập nhật dữ liệu ca làm việc.....", shiftData);
        Swal.fire();
        const response = await axios.patch(
          `http://localhost:3000/api/shifts/${shift_id}`,
          shiftData.value
        );
        if (response.status === 200) {
          Swal.fire({
            title: "Đã lưu",
            text: "Đã cập nhật thành công.",
            icon: "success",
          });
          router.push({ name: "admin.shifts" }); // Chuyển hướng về trang danh sách ca làm việc
        }
      }
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật ca làm việc:", error);
    Swal.fire("Lỗi Server", "Vui lòng thử lại sau", "error");
  }
};

// Lấy thông tin ca làm việc khi component được tải
onMounted(() => {
  fetchShiftData();
});
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}

.form-control {
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.5rem;
}

.btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
}

.wapper .d-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
