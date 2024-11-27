import { createRouter, createWebHashHistory } from "vue-router";
import doctor from "./doctor.router";
import { useAuthStore } from "@/stores/authenticate-login";
import PageNotFound from "@/pages/404page_not_found/index.vue";
const routes = [
  ...doctor,
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: PageNotFound,
    meta: {
      title: "404 - Trang không tồn tại",
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  document.title = to.meta?.title ?? "No title page!!!";
  if (to.path.startsWith("/doctor") && !authStore.isLogged) {
    next({ name: "doctor.login" });
  } else {
    next();
  }
});
export default router;
