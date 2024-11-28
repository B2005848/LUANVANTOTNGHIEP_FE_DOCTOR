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
        path: "appointment_managements",
        name: "doctor.appointment",
        component: () => import("../pages/appointment_managements/index.vue"),
        meta: {
          title: "CTU CLINIC - Quản lí lịch hẹn",
        },
      },

      {
        path: "create_record/:patient_id/:appointment_id/:doctor_id",
        name: "doctor.create_record",
        component: () =>
          import("../pages/appointment_managements/create_record.vue"),
        meta: {
          title: "CTU CLINIC - TẠO HỒ SƠ KHÁM BỆNH",
        },
      },

      {
        path: "patients_managements/:id",
        name: "doctor.patients",
        component: () => import("../pages/patient_managements/index.vue"),
        meta: {
          title: "CTU CLINIC - Hồ sơ bệnh nhân",
        },
        children: [
          {
            path: "appointment_history",
            name: "doctor.history",
            component: () =>
              import("../pages/patient_managements/history_appointment.vue"),
            meta: {
              title: "CTU CLINIC - LỊCH SỬ KHÁM BỆNH",
            },
          },

          {
            path: "treatment_history",
            name: "admin.patient_detail.treatment_history",
            component: () =>
              import("../pages/patient_managements/treatment_history.vue"),
            meta: {
              title: "CTU CLINIC - QUÁ TRÌNH ĐIỀU TRỊ",
            },
          },
        ],
      },
    ],
  },
];
export default doctor;
