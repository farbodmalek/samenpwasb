export default defineNuxtRouteMiddleware((to, from) => {
  const SupervisoryInfo = localStorage.getItem("User-data");
  const supervisoryInfo = SupervisoryInfo ? JSON.parse(SupervisoryInfo) : {}
  const token = supervisoryInfo.token
  const router = useRouter();

  if (!token && to.path !== "/authorization/login") {
    return navigateTo("/authorization/login");
  }

});
