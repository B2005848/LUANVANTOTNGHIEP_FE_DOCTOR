// stores/auth.js
import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    doctorId: Cookies.get("doctorId") || null,
    accessToken: Cookies.get("accessToken") || null, // Access Token
    refreshToken: Cookies.get("refreshToken") || null, // Refresh Token
    isLogged: Cookies.get("isLogged") || false, // state login
  }),

  actions: {
    //  store
    login(
      doctor_id,
      accessToken,
      accessTokenExpiry,
      refreshToken,
      refreshTokenExpiry
    ) {
      this.doctorId = doctor_id;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.isLogged = true;

      // conver timestamp from server to Date
      // Chuyển đổi timestamp sang Date
      const accessExpiryDate = new Date(accessTokenExpiry * 1000);
      const refreshExpiryDate = new Date(refreshTokenExpiry * 1000);

      // Lưu Access Token và Refresh Token vào cookies
      Cookies.set("accessToken", accessToken, {
        expires: accessExpiryDate,
        secure: true,
      }); // 7 ngày
      Cookies.set("refreshToken", refreshToken, {
        expires: refreshExpiryDate,
        secure: true,
      }); // 7 ngày
      Cookies.set("doctorId", doctor_id, { expires: accessExpiryDate });
      Cookies.set("isLogged", this.isLogged, {
        expires: accessExpiryDate,
        secure: true,
      });
    },

    // Đăng xuất và xóa thông tin
    logout() {
      this.doctorId = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.isLogged = false;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("doctorId");
      Cookies.remove("isLogged");
    },

    // Kiểm tra trạng thái xác thực từ cookies
    // checkAuthentication() {
    //   const accessToken = Cookies.get("accessToken");
    //   const refreshToken = Cookies.get("refreshToken");

    //   if (accessToken && refreshToken) {
    //     this.accessToken = accessToken;
    //     this.refreshToken = refreshToken;
    //     this.isLogged = true;
    //   } else {
    //     this.isLogged = false;
    //   }
    // },

    // ---------------------------Kiểm tra thời hạn của accessToken
    async isAccessTokenExpired() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/staff/account/checkExipredAcessToken",
          {
            accessToken: this.accessToken,
          }
        );

        // Kiểm tra phản hồi từ API
        if (response.status === 200) {
          console.log("Access token is valid");
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error checking access token:", error);
        return true; // Nếu có lỗi, coi như token đã hết hạn
      }
    },

    //------------------------------Kiểm tra thời hạn của refresh token
    async isRefreshTokenExpired() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/staff/account/checkExipredRefreshToken",
          {
            refreshToken: this.refreshToken,
          }
        );

        // Kiểm tra phản hồi từ API
        if (response.status === 200) {
          console.log("Refresh token is valid");
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error checking refresh token:", error);
        return true; // Nếu có lỗi, coi như token đã hết hạn
      }
    },

    // --------------------- Làm mới accessToken khi hết hạn
    async refreshAccessToken() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/staff/account/refreshAccessToken",
          {
            refreshToken: this.refreshToken,
          }
        );

        if (response.status === 200) {
          const { accessToken, accessTokenExpiry } = response.data;

          this.accessToken = accessToken;
          const accessExpiryDate = new Date(accessTokenExpiry * 1000);
          Cookies.set("accessToken", accessToken, {
            expires: accessExpiryDate,
            secure: true,
          });

          console.log("Access token refreshed successfully");
        }
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    },
  },
});
