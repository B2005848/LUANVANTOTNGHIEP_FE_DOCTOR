export const searchPatients = async (searchData) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/handle/patient/search/?search=${searchData}`
    );
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi tìm kiếm:", error);
    return [];
  }
};
