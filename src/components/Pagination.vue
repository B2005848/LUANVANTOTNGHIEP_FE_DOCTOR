<template>
  <div class="pagination">
    <paginate
      :page-count="pageCount"
      :click-handler="onPageChange"
      :prev-text="'Trước'"
      :next-text="'Sau'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
    />
  </div>
</template>

<script setup>
import Paginate from "vuejs-paginate-next"; // Import paginate

// Props từ component cha
const props = defineProps({
  pageCount: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

// Sự kiện phát ra khi thay đổi trang
const emit = defineEmits(["page-change"]);

// Hàm xử lý khi người dùng chọn trang mới
const onPageChange = (page) => {
  emit("page-change", page); // Phát ra sự kiện và gửi trang mới về component cha
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  z-index: 1;
}

.page-item {
  margin: 0 5px;
}

.page-link {
  padding: 8px 12px;
  border: 1px solid #007bff; /* Viền màu xanh dương */
  background-color: #e0f7fa; /* Màu nền nhạt (xanh dương nhạt) */
  color: #007bff; /* Màu chữ xanh dương */
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.page-link:hover {
  background-color: #007bff; /* Màu nền khi hover (xanh dương đậm) */
  color: white; /* Chữ trắng khi hover */
}

.page-item.active .page-link {
  background-color: #007bff; /* Màu nền khi trang hiện tại */
  color: white; /* Chữ trắng khi trang hiện tại */
  font-weight: bold;
  border-color: #007bff;
}

.page-link:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}
</style>
