import { ref } from "vue";

const errorMessage = ref("");
const staffShiftListData = ref([]);
const totalPagesData = ref(0);
const itemsPerPageData = ref(10);

const handleGetListStaffWithShift = async (shiftId, page = 1) => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/shifts/getListStaffWithShift/${shiftId}?page=${page}`
    );
    if (response.status === 200) {
      const { totalPages, shiftStaffList, itemsPerPage } = response.data;
      totalPagesData.value = totalPages;
      staffShiftListData.value = shiftStaffList;
      itemsPerPageData.value = itemsPerPage;
      console.log("Get list staff with shift success", totalPages, staffList);
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Get list staff with shift FAILS";
    console.log(error.response?.data?.message || "Unknown error occurred");
  }
};

export {
  handleGetListStaffWithShift,
  errorMessage,
  totalPagesData,
  staffShiftListData,
  itemsPerPageData,
};
