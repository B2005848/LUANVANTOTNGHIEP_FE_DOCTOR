import { ref } from "vue";

const errorMessage = ref("");
const shiftsListData = ref([]);
const totalPagesData = ref(0);
const itemsPerPageData = ref(10);
const handleGetListShifts = async (page = 1) => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/shifts/getList/?page=${page}`
    );
    if (response.status === 200) {
      const { totalPages, shiftList, itemsPerPage } = response.data;
      totalPagesData.value = totalPages;
      shiftsListData.value = shiftList;
      itemsPerPageData.value = itemsPerPage;
      console.log("Get list shifts success", totalPages, shiftList);
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Get list shifts FAILS";
    console.log(error.response.data.message);
  }
};

export {
  handleGetListShifts,
  errorMessage,
  totalPagesData,
  shiftsListData,
  itemsPerPageData,
};
