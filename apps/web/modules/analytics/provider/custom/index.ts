import { useAnalytics as useGoogleAnalytics } from "../google";
import { useAnalytics as useClarityAnalytics } from "../clarity";

export const useAnalytics = () => {
  const googleAnalytics = useGoogleAnalytics();
  const clarityAnalytics = useClarityAnalytics();

  const init = () => {
    if (typeof window === "undefined") {
      return;
    }

    // 初始化两个分析服务
    clarityAnalytics.init();
    googleAnalytics.init();
  };

  const trackEvent = (event: string, data?: Record<string, any>) => {
    // 同时向两个服务发送事件数据
    googleAnalytics.trackEvent(event, data);
    clarityAnalytics.trackEvent(event, data);
  };

  return {
    init,
    trackEvent,
  };
};
