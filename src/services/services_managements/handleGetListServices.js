import { ref } from "vue";

export const handleGetListService = () => {
  const errorMessage = ref("");
  const listServicesData = ref([]);
  const totalPagesData = ref(0);
  const itemsPerPageData = ref(10);
  const getData = async (page = 1) => {
    try {
      const response = await window.axios.get(
        `http://localhost:3000/api/services/getlistservices/list/?page=${page}`
      );
      if (response.status === 200) {
        const { totalPages, listServices, itemsPerPage } = response.data;
        totalPagesData.value = totalPages;
        listServicesData.value = listServices;
        itemsPerPageData.value = itemsPerPage;
        console.log("Get list services success", totalPages, listServices);
      }
    } catch (error) {
      errorMessage.value =
        error.response?.data?.message || "Get list Services FAILS";
      console.log(error.response.data.message);
    }
  };

  return {
    getData,
    errorMessage,
    totalPagesData,
    listServicesData,
    itemsPerPageData,
  };
};
