export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  
  router.afterEach((to, from) => {
    // Check if the route actually changed to avoid duplicate tracking
    if (to.path !== from.path) {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
      }
    }
  });
});
