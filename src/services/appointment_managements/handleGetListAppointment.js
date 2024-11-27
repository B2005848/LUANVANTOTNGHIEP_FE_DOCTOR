import { ref } from "vue";

export const handleGetListAppointments = () => {
  const errorMessage = ref("");
  const listAppointmentsData = ref([]);
  const totalPagesData = ref(0);
  const itemsPerPageData = ref(10);
  const getData = async (page = 1) => {
    try {
      const response = await window.axios.get(
        `http://localhost:3000/api/appointment/getlist?page=${page}`
      );
      if (response.status === 200) {
        const { totalPages, appointmentList, itemsPerPage } = response.data;
        totalPagesData.value = totalPages;
        listAppointmentsData.value = appointmentList;
        itemsPerPageData.value = itemsPerPage;
        console.log(
          "Get list appointments success",
          totalPages,
          appointmentList
        );
      }
    } catch (error) {
      errorMessage.value =
        error.response?.data?.message || "Get list appointments FAILS";
      console.log(error.response.data.message);
    }
  };

  return {
    getData,
    errorMessage,
    totalPagesData,
    listAppointmentsData,
    itemsPerPageData,
  };
};
