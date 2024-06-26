export default defineNuxtRouteMiddleware((to, from) => {
  const SupervisoryInfo = localStorage.getItem("SupervisoryInfo");
  const supervisoryInfo = SupervisoryInfo ? JSON.parse(SupervisoryInfo) : {}
  const token = supervisoryInfo.token
  const router = useRouter();

  if (!token && to.path !== "/authorization/login") {
    return navigateTo("/authorization/login");
  }

});
