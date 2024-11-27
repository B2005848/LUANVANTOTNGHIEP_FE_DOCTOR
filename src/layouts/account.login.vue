/* ------------------------------------------------------- DESIGN STYLE CSS */
<style scoped>
.back-ground {
  width: 100vw;
  height: 100vh;
  background-image: url(background.svg);
  display: flex;
  flex-direction: column; /* Thay đổi để màn hình nhỏ hiển thị theo cột */
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.box-input {
  position: relative;
}

.flex-1 {
  width: 100%; /* Đảm bảo phần tử chiếm hết chiều rộng màn hình trên thiết bị nhỏ */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px; /* Thêm khoảng cách giữa các phần tử */
}

.btn-login {
  background-color: #00afef;
  color: #fff;
}

#input-pass {
  width: 100%;
  padding-right: 40px;
}

#show-pass {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #7f7f7f;
}

h1 {
  font-size: 24px;
}

/* Thiết bị có màn hình từ 768px trở lên */
@media (min-width: 768px) {
  .back-ground {
    flex-direction: row; /* Màn hình lớn hơn xếp hàng ngang */
    justify-content: space-between;
  }

  .flex-1 {
    width: 45%; /* Giới hạn kích thước các phần tử để chúng không quá lớn */
  }

  h1 {
    font-size: 36px;
  }
}

/* Thiết bị có màn hình từ 1024px trở lên */
@media (min-width: 1024px) {
  h1 {
    font-size: 48px;
  }

  .flex-1 {
    width: 50%; /* Giảm kích thước các phần tử trên màn hình lớn */
  }

  .flex-1:nth-child(1) {
    border-right: 1px #00afef solid;
    height: 50%;
  }

  .form-login {
    padding: 20px;
  }

  .wapper-btn-login {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-login {
    background-color: #00afef;
    color: #fff;
    width: 200px;
  }
  .btn-login:hover {
    background-color: #1f5ca9;
  }
}
</style>

<template>
  <div class="back-ground">
    <div class="flex-1 logo-title">
      <img src="\LogoCTUWithText.png" width="500" alt="" />
    </div>

    <div class="flex-1">
      <div class="form-login">
        <p>
          "Chào mừng bạn đến với khu vực "quản trị viên", vui lòng đăng nhập để
          tiếp tục"
        </p>
        <form @submit.prevent="handleLogin">
          <div class="box-input">
            <input
              v-model="loginData.username"
              type="text"
              class="form-control mb-4"
              name="username"
              placeholder="Tên đăng nhập"
            />
          </div>
          <div class="box-input">
            <input
              v-model="loginData.password"
              :type="passwordFieldType"
              class="form-control mb-4"
              name="password"
              placeholder="Mật khẩu"
            />
            <font-awesome-icon
              :icon="iconPasswd"
              @click="showPass"
              id="show-pass"
            />
          </div>
          <!-- ----------------Element show error when staff login-->
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
          <div class="wapper-btn-login">
            <button class="form-control btn-login" type="submit">
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { handleLoginService } from "@/services/handleLogin";
//------------------------ handle show pass
const passwordFieldType = ref("password");
const iconPasswd = ref("fa-eye");
const showPass = () => {
  if (passwordFieldType.value === "password") {
    passwordFieldType.value = "text";
    iconPasswd.value = ["fa", "fa-eye-slash"];
  } else {
    passwordFieldType.value = "password";
    iconPasswd.value = ["fa", "fa-eye"];
  }
};

// ------------------------------------------------------------------ HANDLE LOGIN-------------------------------------
const { loginData, handleLogin, errorMessage } = handleLoginService();
</script>
