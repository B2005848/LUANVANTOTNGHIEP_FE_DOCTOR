import { ref } from "vue";

// Biến reactive để lưu chi tiết nhân viên và lỗi nếu có
const staffDetail = ref(null); // Lưu thông tin chi tiết nhân viên
const specialtyData = ref(null); // Lưu dữ liệu chuyên môn của nhân viên
const errorMessage = ref(""); // Lưu thông báo lỗi nếu có

const handleGetDetailStaff = async (staff_id) => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/handle/staff/getInformationDetail/${staff_id}`
    );

    if (response.status === 200) {
      // Dữ liệu nhân viên là phần tử đầu tiên trong mảng "data"
      staffDetail.value = response.data.data;

      // Kiểm tra nếu có chuyên môn thì lấy, nếu không thì để là "Không có chuyên môn"
      if (
        response.data.specialty.length > 0 &&
        response.data.specialty.length > 0
      ) {
        specialtyData.value = response.data.specialty;
      } else {
        specialtyData.value = "Không có chuyên môn";
      }

      console.log(
        "Lấy thông tin chi tiết nhân viên thành công",
        staffDetail.value,
        specialtyData.value
      );
    }
  } catch (error) {
    // Xử lý lỗi và lưu thông báo lỗi
    errorMessage.value =
      error.response?.data?.message || "Lấy thông tin nhân viên";
  }
};

const getStaffAvatar = async (avatarId) => {
  try {
    const response = await axios.get(`http://localhost:3000${avatarId}`);
    return response.file; // Hoặc xử lý dữ liệu tùy theo API của bạn
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy hình ảnh:", error);
    return null; // Hoặc một giá trị khác tùy thuộc vào cách bạn muốn xử lý lỗi
  }
};

export {
  handleGetDetailStaff,
  staffDetail,
  specialtyData,
  getStaffAvatar,
  errorMessage,
};
