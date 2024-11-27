import { ref } from "vue";
import { useAuthStore } from "@/stores/authenticate-login";
const errorMessage = ref("");
const staffListData = ref([]);
const totalPagesData = ref(0);
const itemsPerPageData = ref(10);
const handleGetListStaff = async (page = 1) => {
  const authStore = useAuthStore();
  const expiredAccessToken = await authStore.isAccessTokenExpired();
  const expiredRefreshToken = await authStore.isRefreshTokenExpired();

  // Nếu Access Token hết hạn
  if (!expiredAccessToken) {
    console.log(
      "Checking expired of refresh token to create access token......."
    );
    if (!expiredRefreshToken) {
      console.log(
        "Access Token and Refresh Token has been expired. Please log in again."
      );
      return; // Không tiếp tục nếu cả hai token đều hết hạn
    } else {
      // Nếu chỉ Access Token hết hạn, làm mới Access Token
      await authStore.refreshAccessToken();
      console.log("Đã tạo thành công");
    }
  }
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/handle/staff/getListAccount/?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`, // Thêm Access Token vào header
        },
      }
    );
    if (response.status === 200) {
      const { totalPages, staffList, itemsPerPage } = response.data;
      totalPagesData.value = totalPages;
      staffListData.value = staffList;
      itemsPerPageData.value = itemsPerPage;
      console.log("Get list staff success", totalPages, staffList);
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Get list staff FAILS";
    console.log(error.response.data.message);
  }
};

export {
  handleGetListStaff,
  errorMessage,
  totalPagesData,
  staffListData,
  itemsPerPageData,
};
