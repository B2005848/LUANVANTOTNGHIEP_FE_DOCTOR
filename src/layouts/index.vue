<template>
  <div class="layout-container">
    <div>
      <Navbar></Navbar>
    </div>
    <div class="d-flex content-wrapper">
      <div class="sidebar">
        <Sidebar></Sidebar>
      </div>

      <div class="main-content">
        <router-view class="fade-in"></router-view>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@import "@/assets/css/animation__page.css";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.d-flex {
  display: flex;
  flex-direction: row;
}

.content-wrapper {
  flex-grow: 1;
  height: 100%;
}

.sidebar {
  background-color: #f0f0f1;
  width: 300px;
  height: 100%;
  overflow-y: auto;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
</style>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>
