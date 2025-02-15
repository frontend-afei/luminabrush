export const useAnalytics = () => {
  const init = () => {
    if (typeof window === "undefined") {
      return;
    }

    const runtimeConfig = useRuntimeConfig();
    const clarityAnalyticsId =
      runtimeConfig.public.analytics.clarityAnalyticsId;

    useHead({
      script: [
        {
          key: "clarity-analytics",
          children: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityAnalyticsId}");
          `,
        },
      ],
    });
  };

  const trackEvent = (event: string, data?: Record<string, any>) => {
    if (window.clarity) {
      window.clarity("event", event, data);
    } else {
      // eslint-disable-next-line no-console
      console.info("Clarity not initialized", event, data);
    }
  };

  return {
    init,
    trackEvent,
  };
};

// 为 Clarity 添加类型声明
declare global {
  interface Window {
    clarity: (command: string, ...args: any[]) => void;
  }
}
