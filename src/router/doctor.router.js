const doctor = [
  // Router for admin login page (separated from admin routes).
  {
    path: "/login",
    name: "doctor.login",
    component: () => import("../layouts/account.login.vue"),
    meta: {
      title: "CTU CLINIC - Bác sĩ đăng nhập",
    },
  },
  // -----------------------------------Router for admin pages
  {
    path: "/doctor",
    name: "doctor.page",
    component: () => import("../layouts/index.vue"),
    meta: {
      title: "CTU CLINIC - Bác sĩ",
    },
    children: [
      {
        path: "patients_managements",
        name: "doctor.patients",
        component: () => import("../pages/patient_managements/index.vue"),
        meta: {
          title: "CTU CLINIC - Quản lí bệnh nhân",
        },
      },
    ],
  },
];
export default doctor;
