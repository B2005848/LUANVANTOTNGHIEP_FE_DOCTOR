import { ref } from "vue";

export const handleGetListDep = () => {
  const errorMessage = ref("");
  const listDepartmentsData = ref([]);
  const totalPagesData = ref(0);
  const itemsPerPageData = ref(10);
  const getData = async (page = 1) => {
    try {
      const response = await window.axios.get(
        `http://localhost:3000/api/departments/getListForAdmin/?page=${page}`
      );
      if (response.status === 200) {
        const { totalPages, listDepartments, itemsPerPage } = response.data;
        totalPagesData.value = totalPages;
        listDepartmentsData.value = listDepartments;
        itemsPerPageData.value = itemsPerPage;
        console.log(
          "Get list departments success",
          totalPages,
          listDepartments
        );
      }
    } catch (error) {
      errorMessage.value =
        error.response?.data?.message || "Get list departments FAILS";
      console.log(error.response.data.message);
    }
  };

  return {
    getData,
    errorMessage,
    totalPagesData,
    listDepartmentsData,
    itemsPerPageData,
  };
};
