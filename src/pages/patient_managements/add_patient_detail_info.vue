<template>
  <div class="container-fuild">
    <div class="card">
      <div>
        <router-link :to="{ name: 'admin.patients' }"
          ><font-awesome-icon
            icon=" fa-arrow-left"
            style="
              color: #74c0fc;
              font-size: 30px;
              margin-left: 10px;
              margin-top: 10px;
            "
          />Quay về</router-link
        >
      </div>
      <div class="card-header text-center">
        <h3>Thêm bệnh nhân mới</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="addPatient">
          <div style="margin: 0 auto" class="form-group row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="username"
                  >Mã bệnh nhân
                  <span><sup style="color: red">*</sup></span></label
                >
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="inputName"
                  >Họ và tên <span><sup style="color: red">*</sup></span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="inputDate"
                  >Ngày sinh <span><sup style="color: red">*</sup></span></label
                >
                <input
                  type="date"
                  class="form-control"
                  id="inputDate"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="inputGender"
                  >Giới tính <span><sup style="color: red">*</sup></span></label
                ><br />
                <span class="me-5">
                  <input class="me-2" type="radio" name="male" id="1" />
                  <span>Nam</span></span
                >
                <span>
                  <input class="me-2" type="radio" name="fe_male" id="2" />
                  <span>Nữ</span></span
                >
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-3">
                <label for="inputCitizenID"
                  >Số CCCD/CMND
                  <span><sup style="color: red">*</sup></span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="inputCitizenID"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="inputPhone"
                  >Số điện thoại liên lạc
                  <span><sup style="color: red">*</sup></span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="inputPhone"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="inputEmail">Địa chỉ email</label>
                <input type="text" class="form-control" id="inputEmail" />
              </div>
              <div class="mb-3">
                <label for="inputAddress"
                  >Địa chỉ liên hệ
                  <span><sup style="color: red">*</sup></span></label
                >
                <textarea
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div class="btn__submit d-flex">
            <button type="submit">
              <span>THÊM</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  font-weight: bold;
}

.btn__submit {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

button {
  background-color: #4caf50;
  border: none;
  color: aliceblue;
  font-weight: bold;
  padding: 5px 60px 5px 60px;
  border-radius: 10px;
}

button:hover {
  background-color: #3e8e41;
}
</style>
<script setup>
import { useRoute } from "vue-router";
</script>
