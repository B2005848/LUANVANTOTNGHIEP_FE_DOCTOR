<!-- ------------------------------------------CSS----------------------------------->
<style scoped>
* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
  line-height: 1.5cm;
  padding-top: 20px;
  padding-left: 10px;
  background-color: #f0f0f1;
}

a {
  color: #094067;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  color: #5486c4;
}

a:focus {
  color: #5486c4;
}

/* Sidebar.vue hoặc tệp CSS toàn cục */
.active-link {
  color: #5486c4;
  font-weight: bold;
}

.exact-active-link {
  color: #5486c4;
  font-weight: bold;
  background-color: #e0f0ff; /* Thêm nền nếu cần */
}
</style>
<!-- -----------------------------------TEMPLATE------------------------------ -->
<template>
  <ul>
    <!-- ------------------------------------------------ACCOUNT PATIENT MANAGEMENTS--------------------------------- -->
    <li>
      <font-awesome-icon
        icon="fa-solid fa-bed-pulse"
        style="color: #094067"
        size="sm"
        class="me-2"
      />
      <router-link :to="{ name: 'doctor.patients' }"
        >DANH SÁCH BỆNH NHÂN</router-link
      >
    </li>

    <li>
      <font-awesome-icon
        icon="fa-regular fa-bell"
        style="color: #094067"
        size="sm"
        class="me-2"
      />
      <router-link to="">LỊCH HẸN SẮP TỚI</router-link>
    </li>
  </ul>
</template>
