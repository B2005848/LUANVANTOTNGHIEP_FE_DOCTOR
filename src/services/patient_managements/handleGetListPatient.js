import { ref } from "vue";

const errorMessage = ref("");
const listPatientsData = ref([]);
const totalPagesData = ref(0);
const itemsPerPageData = ref(10);
const handleGetListPatients = async (page = 1) => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/handle/patient/getlistaccountpatients/?page=${page}`
    );
    if (response.status === 200) {
      const { totalPages, patients, itemsPerPage } = response.data;
      totalPagesData.value = totalPages;
      listPatientsData.value = patients;
      itemsPerPageData.value = itemsPerPage;
      console.log("Get list patients success", totalPages, listDepartments);
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Get list patients FAILS";
    console.log(error.response.data.message);
  }
};

export {
  handleGetListPatients,
  errorMessage,
  totalPagesData,
  listPatientsData,
  itemsPerPageData,
};
