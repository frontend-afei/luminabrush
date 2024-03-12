export type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant: "default" | "loading" | "error" | "success";
  icon?: string;
  duration?: number;
};

export const useToast = () => {
  const toasts = useState<Toast[]>("toasts", () => []);

  const toast = (toast: Partial<Toast>) => {
    const body = {
      id: new Date().getTime().toString(),
      variant: toast.variant || "default",
      ...toast,
    };

    const index = toasts.value.findIndex((n: Toast) => n.id === body.id);
    if (index === -1) {
      toasts.value.push(body as Toast);
    }

    return body;
  };

  const dismiss = (id: string) => {
    toasts.value = toasts.value.filter((n: Toast) => n.id !== id);
  };

  const update = (id: string, updated: Partial<Toast>) => {
    toasts.value = toasts.value.map((n) =>
      n.id === id
        ? {
            ...n,
            updated,
          }
        : n,
    );
  };

  return {
    state: toasts,
    toast,
    dismiss,
    update,
  };
};
