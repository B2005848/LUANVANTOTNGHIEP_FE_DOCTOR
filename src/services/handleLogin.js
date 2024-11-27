import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authenticate-login";

export const handleLoginService = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  const loginData = ref({
    username: "",
    password: "",
  });

  const errorMessage = ref("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/staff/account/doctorLogin",
        loginData.value
      );
      if (response.status === 200) {
        const {
          accessToken,
          accessTokenExpiry,
          refreshTokenExpiry,
          refreshToken,
        } = response.data;

        // Save status login into store Pinia
        authStore.login(
          loginData.value.username,
          accessToken,
          accessTokenExpiry,
          refreshToken,
          refreshTokenExpiry
        );
        console.log("Login success", loginData.value.username);
        router.push({
          name: "doctor.appointment",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      errorMessage.value =
        error.response?.data?.message || "Đăng nhập thất bại";
    }
  };

  const handleLogout = async () => {
    try {
      // Save status logout into store Pinia
      authStore.logout();

      // navigate to list product page
      router.push({
        name: "doctor.login",
      });
      console.log("sign out success", loginData.value.username);
    } catch (error) {
      errorMessage.value = error.response?.data?.message || "Login failed";
      console.log(error.response.data.message);
    }
  };

  return {
    loginData,
    handleLogin,
    handleLogout,
    errorMessage,
  };
};
