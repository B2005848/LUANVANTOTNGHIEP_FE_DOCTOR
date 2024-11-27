import { comment } from "postcss";

const admin = [
  // Router for admin login page (separated from admin routes).
  {
    path: "/login",
    name: "admin.login",
    component: () => import("../layouts/account.login.vue"),
    meta: {
      title: "CTU CLINIC - Bác sĩ đăng nhập",
    },
  },
  // -----------------------------------Router for admin pages
  {
    path: "/admin",
    name: "admin.page",
    component: () => import("../layouts/index.vue"),
    meta: {
      title: "CTU CLINIC - Bác sĩ",
    },
    children: [
      {
        path: "patients_managements",
        name: "admin.patients",
        component: () => import("../pages/patient_managements/index.vue"),
        meta: {
          title: "CTU CLINIC - Quản lí bệnh nhân",
        },
      },

      // Nội dung đoạn chat theo id
      {
        path: "chatcontent/:id",
        name: "admin.chat",
        component: () => import("../pages/request_managements/chatcontent.vue"),
        meta: {
          title: "CTU CLINIC - Nhắn tin hỗ trợ ",
        },
      },
    ],
  },
];
export default admin;
