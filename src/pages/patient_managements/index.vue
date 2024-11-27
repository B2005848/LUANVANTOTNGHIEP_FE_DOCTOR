<style scoped>
.avt {
  border-radius: 50%;
}

a {
  text-decoration: none;
  color: #000;
}

.btn-router-control {
  flex: 1;
  text-align: center;
  margin: 5px;
}

.router-control {
  display: block;
  padding: 5px 0;
  background-color: #007bff;
  color: #fff;
  border-radius: 8px;
  transition: background-color 0.3s;
  font-weight: bold;
  text-decoration: none;
}

.router-control:hover,
.router-control:focus {
  background-color: #0056b3;
  color: #fff;
}
</style>
<template>
  <div class="container-fuild mt-3">
    <div v-if="data" class="card">
      <div class="d-flex m-2" style="justify-content: end"></div>
      <div style="justify-content: space-around" class="d-flex">
        <div class="flex-1 mt-3">
          <img
            v-if="data.image_url"
            class="avt"
            :src="data.image_url"
            alt=""
            width="200"
          />
          <p>
            <img
              :src="`http://localhost:3000${data.image_avt}`"
              alt="Chưa cập nhật ảnh đại diện"
              width="200"
            />
          </p>
          <div class="text-center mt-3">
            <p>
              <span style="font-weight: bold">Họ và tên:</span>
              {{ data.first_name }} {{ data.last_name }}
            </p>
            <p>
              <span style="font-weight: bold">Mã bệnh nhân:</span>
              {{ data.patient_id }}
            </p>
            <p v-if="data.citizen_id">
              <span style="font-weight: bold">CCCD/CMND:</span>
              {{ data.citizen_id }}
            </p>
            <p v-if="!data.citizen_id">CCCD/CMND: Chưa cập nhật</p>
          </div>
        </div>
        <div class="flex-1 pt-3">
          <h3 class="text-center mb-5">Thông tin cá nhân</h3>
          <div class="d-flex">
            <div class="flex-1 me-5">
              <p style="font-weight: bold">Email:</p>
              <p style="font-weight: bold">Số điện thoại:</p>
              <p style="font-weight: bold">Địa chỉ:</p>
              <p style="font-weight: bold">Ngày sinh:</p>
              <p style="font-weight: bold">Giới tính:</p>
              <p style="font-weight: bold">Nghề nghiệp:</p>
              <p style="font-weight: bold">Trạng thái tài khoản:</p>
              <p style="font-weight: bold">Ngày tạo:</p>
              <p style="font-weight: bold">Ngày cập nhật:</p>
            </div>
            <div class="flex-1">
              <p v-if="data.email">{{ data.email }}</p>
              <p v-if="!data.email">Chưa cập nhật!</p>

              <p v-if="data.phone_number">{{ data.phone_number }}</p>
              <p v-if="!data.phone_number">Chưa cập nhật!</p>

              <p v-if="data.address_contact">{{ data.address_contact }}</p>
              <p v-if="!data.address_contact">Chưa cập nhật!</p>

              <p v-if="data.birthday">
                {{ formatDay(data.birthday) }}
              </p>
              <p v-if="!data.birthday">Chưa cập nhật</p>

              <p v-if="data.gender == 1">
                Nam
                <font-awesome-icon
                  icon="fa-solid fa-mars-stroke"
                  size="lg"
                  style="color: #74c0fc"
                />
              </p>
              <p v-if="data.gender == 0">
                Nữ
                <font-awesome-icon
                  :icon="['fas', 'venus']"
                  size="lg"
                  style="color: #b197fc"
                />
              </p>
              <p v-if="!data.gender">Chưa cập nhật!</p>

              <p v-if="data.major">{{ data.major }}</p>
              <p v-if="!data.major">Chưa cập nhật!</p>

              <p v-if="data.statusAccount == 1" class="text-success">
                Đang hoạt động
                <font-awesome-icon
                  icon="fa-circle-check"
                  beat
                  style="
                    --fa-primary-color: #0fffb7;
                    --fa-secondary-color: #2ff9bc;
                  "
                />
              </p>
              <p v-if="data.statusAccount == 2" class="text-warning">
                Tạm khóa
                <font-awesome-icon
                  icon="fa-user-lock"
                  style="
                    --fa-primary-color: #4b511f;
                    --fa-secondary-color: #c1dd31;
                  "
                />
              </p>
              <p v-if="data.statusAccount == 3" class="text-danger">
                Ngừng hoạt động
                <font-awesome-icon
                  icon=" fa-ban"
                  style="
                    --fa-primary-color: #dd2c2c;
                    --fa-secondary-color: #dd2c2c;
                  "
                />
              </p>

              <!-- date created -->
              <p>{{ formatDateTime(data.created_at) }}</p>

              <!-- date updated -->
              <p>{{ formatDateTime(data.updated_at) }}</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <!-- ----------------------QUÁ TRÌNH ĐIỀU TRỊ------------------------------ -->
      <div style="margin: 5px">
        <div
          class="d-flex p-2"
          style="
            justify-content: space-around;
            background-color: #00afef;
            flex-direction: row;
          "
        >
          <div class="btn-router-control">
            <router-link
              :to="{ name: 'admin.patient_detail.treatment_history' }"
              class="router-control"
              ><h3 class="text-center">QUÁ TRÌNH ĐIỀU TRỊ</h3></router-link
            >
          </div>
          <div class="btn-router-control">
            <router-link :to="{ name: 'doctor.history' }" class="router-control"
              ><h3 class="text-center">LỊCH SỬ KHÁM BỆNH</h3></router-link
            >
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import formatDate from "@/helper/format-datetime";
const formatDateTime = formatDate.formatDateTime;
const formatDay = formatDate.formatDateBirth;
const route = useRoute();
const username = route.params.id;

const data = ref(null);
const getData = async () => {
  const res = await window.axios.get(
    "http://localhost:3000/api/handle/patient/getinfo/" + username
  );
  data.value = res.data.dataInfo;
  console.log(data.value);
};

onMounted(() => {
  getData();
});
</script>
