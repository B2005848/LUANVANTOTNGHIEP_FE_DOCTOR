<style scoped>
* {
  margin: 0;
}

.d-flex {
  background-color: #ffffff;
  border: #212f3c 1px solid;
  border-right: none;
  border-left: none;
  padding: 30px 25px 30px 25px;
  height: 30px;
  margin: 0;
}

.d-flex:nth-child(1),
.d-flex:nth-child(2) {
  justify-content: center;
  align-items: center;
}

p {
  color: #ffffff;
  font-size: 15px;
  margin-left: 15px;
}
</style>
<template>
  <div class="d-flex justify-content-between">
    <div>
      <img src="/LogoCTUWithText.png" width="150" alt="" />
    </div>

    <div class="dropdown">
      <div
        class="btn"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <font-awesome-icon
          style="color: #34495e; font-size: 20px"
          icon="fa-bars-staggered"
        />
      </div>

      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Tài khoản</a></li>
        <li>
          <button @click="handleLogout" class="dropdown-item" href="#">
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { handleLoginService } from "@/services/handleLogin";
const { handleLogout } = handleLoginService();
</script>
