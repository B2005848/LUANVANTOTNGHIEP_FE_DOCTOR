<template>
  <div>
    <div
      class="d-flex"
      style="justify-content: flex-start; gap: 20px; margin-bottom: 20px"
    >
      <div class="tw-text-blue-600 tw-font-bold">Tạo hồ sơ ></div>
      <div class="tw-text-gray-600">Kê đơn thuốc ></div>
      <div class="tw-text-gray-600-600">Hoàn thành ></div>
    </div>
    <div class="tw-bg-slate-100 tw-shadow-lg tw-rounded-lg tw-p-8">
      <h2
        class="tw-text-3xl tw-font-bold tw-text-center tw-text-gray-800 tw-mb-6"
      >
        Tạo Hồ Sơ Khám Bệnh
        <font-awesome-icon
          icon="fa-book-medical"
          size="xl"
          style="color: #74c0fc; margin-left: 20px"
        />
      </h2>
      <div
        class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6"
      >
        <!-- Các trường hiện tại -->
        <div class="tw-mb-6">
          <label
            for="patient_id"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Mã Bệnh Nhân</label
          >
          <input
            v-model="patient_id"
            type="text"
            id="patient_id"
            class="tw-w-full form-control tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập mã bệnh nhân"
            disabled
          />
        </div>

        <div class="tw-mb-6">
          <label
            for="doctor_id"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Mã Bác Sĩ</label
          >
          <input
            v-model="doctor_id"
            type="text"
            id="doctor_id"
            class="tw-w-full tw-px-4 tw-py-2 form-control tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập mã bác sĩ"
            disabled
          />
        </div>

        <div class="tw-mb-6">
          <label
            for="appointment_id"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Mã Lịch Hẹn</label
          >
          <input
            v-model="appointment_id"
            type="text"
            id="appointment_id"
            class="tw-w-full tw-px-4 tw-py-2 form-control tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập mã lịch hẹn"
            disabled
          />
        </div>

        <!-- Các trường thông số sức khỏe mới -->
        <div class="tw-mb-6">
          <label
            for="weight"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Cân Nặng (kg)</label
          >
          <input
            v-model="weight"
            type="number"
            id="weight"
            class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập cân nặng"
            required
          />
        </div>

        <div class="tw-mb-6">
          <label
            for="height"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Chiều Cao (cm)</label
          >
          <input
            v-model="height"
            type="number"
            id="height"
            class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập chiều cao"
            required
          />
        </div>

        <div class="tw-mb-6">
          <label
            for="blood_pressure"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Huyết Áp</label
          >
          <input
            v-model="blood_pressure"
            type="text"
            id="blood_pressure"
            class="tw-w-full tw-px-4 tw-py-2 form-control tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập huyết áp XX/XX"
            required
          />
        </div>

        <div class="tw-mb-6">
          <label
            for="heart_rate"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Nhịp Tim</label
          >
          <input
            v-model="heart_rate"
            type="number"
            id="heart_rate"
            class="tw-w-full tw-px-4 tw-py-2 form-control tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập nhịp tim xx"
            required
          />
        </div>

        <div class="tw-mb-6">
          <label
            for="temperature"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Nhiệt Độ (°C)</label
          >
          <input
            v-model="temperature"
            type="number"
            id="temperature"
            class="tw-w-full tw-px-4 tw-py-2 form-control tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập nhiệt độ XX.X"
            required
          />
        </div>

        <div class="tw-mb-6">
          <label
            for="respiratory_rate"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Nhịp Thở</label
          >
          <input
            v-model="respiratory_rate"
            type="number"
            id="respiratory_rate"
            class="tw-w-full tw-px-4 tw-py-2 form-control tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập nhịp thở XX"
            required
          />
        </div>

        <div class="tw-mb-6">
          <label
            for="blood_sugar"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Đường Huyết</label
          >
          <input
            v-model="blood_sugar"
            type="number"
            id="blood_sugar"
            class="tw-w-full tw-px-4 tw-py-2 form-control tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập đường huyết XX"
            required
          />
        </div>

        <div class="tw-mb-6">
          <label
            for="cholesterol"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Cholesterol</label
          >
          <input
            v-model="cholesterol"
            type="number"
            id="cholesterol"
            class="tw-w-full tw-px-4 tw-py-2 form-control tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập cholesterol XX"
            required
          />
        </div>

        <!-- Các trường chẩn đoán, điều trị và lý do khám -->
        <div class="tw-mb-6">
          <label
            for="diagnosis"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Chẩn Đoán</label
          >
          <input
            v-model="diagnosis"
            type="text"
            id="diagnosis"
            class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập chẩn đoán"
            required
          />
        </div>

        <div class="tw-mb-6">
          <label
            for="treatment"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Điều Trị</label
          >
          <input
            v-model="treatment"
            type="text"
            id="treatment"
            class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập phương pháp điều trị"
            required
          />
        </div>

        <div class="tw-mb-6">
          <label
            for="reason"
            class="tw-block tw-font-medium tw-text-lg tw-text-gray-700"
            >Lý Do Khám</label
          >
          <textarea
            v-model="reason"
            id="reason"
            class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:outline-none"
            placeholder="Nhập lý do khám"
            required
          ></textarea>
        </div>
      </div>
    </div>
    <div>
      <button
        @click="createPatientRecord()"
        type="submit"
        class="tw-w-full tw-bg-green-500 tw-text-white tw-py-3 tw-rounded-lg tw-shadow-md hover:tw-bg-blue-600 focus:tw-outline-none"
      >
        TIẾP TỤC KÊ ĐƠN THUỐC
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

// Lấy tham số từ URL
const route = useRoute();
const patient_id = ref(route.params.patient_id || "");
const doctor_id = ref(route.params.doctor_id || "");
const appointment_id = ref(route.params.appointment_id || "");

const diagnosis = ref("");
const treatment = ref("");
const reason = ref("");

const weight = ref("");
const height = ref("");
const blood_pressure = ref("");
const heart_rate = ref("");
const temperature = ref("");
const respiratory_rate = ref("");
const blood_sugar = ref("");
const cholesterol = ref("");

const createPatientRecord = async () => {
  try {
    // Kiểm tra xem các trường dữ liệu có đầy đủ không
    if (
      !patient_id.value ||
      !doctor_id.value ||
      !appointment_id.value ||
      !diagnosis.value ||
      !treatment.value ||
      !reason.value ||
      !weight.value ||
      !height.value ||
      !blood_pressure.value ||
      !heart_rate.value ||
      !temperature.value ||
      !respiratory_rate.value ||
      !blood_sugar.value ||
      !cholesterol.value
    ) {
      // Nếu thiếu trường, hiển thị thông báo lỗi
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng điền đầy đủ thông tin các trường!",
      });
      return; // Dừng việc gửi yêu cầu nếu có trường thiếu
    }
    const response = await axios.post(
      "http://localhost:3000/api/handle/patient/create",
      {
        patient_id: patient_id.value,
        doctor_id: doctor_id.value,
        appointment_id: appointment_id.value,
        diagnosis: diagnosis.value,
        treatment: treatment.value,
        reason: reason.value,
        weight: weight.value,
        height: height.value,
        blood_pressure: blood_pressure.value,
        heart_rate: heart_rate.value,
        temperature: temperature.value,
        respiratory_rate: respiratory_rate.value,
        blood_sugar: blood_sugar.value,
        cholesterol: cholesterol.value,
      }
    );

    // Hiển thị SweetAlert2 thông báo thành công
    if (response.data.status) {
      Swal.fire({
        icon: "success",
        title: "Thành công!",
        text: "Hồ sơ bệnh nhân đã được tạo thành công!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: response.data.message || "Không thể tạo hồ sơ bệnh nhân.",
      });
    }
  } catch (error) {
    // Hiển thị thông báo lỗi khi có lỗi xảy ra
    Swal.fire({
      icon: "error",
      title: "Lỗi!",
      text: "Đã xảy ra lỗi khi tạo hồ sơ bệnh nhân.",
    });
  }
};
</script>

<style scoped>
.tw-bg-slate-100 {
  background-color: #f7fafc;
}

.tw-w-full {
  width: 100%;
}

.tw-text-gray-700 {
  color: #4a5568;
}

.tw-rounded-lg {
  border-radius: 8px;
}

.tw-focus\:ring-2 {
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
}

.tw-focus\:ring-blue-500 {
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
}

.tw-focus\:outline-none {
  outline: none;
}

.tw-shadow-lg {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tw-p-8 {
  padding: 32px;
}

.tw-font-medium {
  font-weight: 500;
}

.tw-text-lg {
  font-size: 18px;
}

.tw-bg-blue-500 {
  background-color: #3b82f6;
}

.tw-text-white {
  color: #fff;
}

.tw-shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tw-hover\:bg-blue-600:hover {
  background-color: #2563eb;
}

.tw-focus\:outline-none:focus {
  outline: none;
}

.tw-grid {
  display: grid;
  gap: 16px;
}

.tw-grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}

.sm\:tw-grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.lg\:tw-grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}
</style>
