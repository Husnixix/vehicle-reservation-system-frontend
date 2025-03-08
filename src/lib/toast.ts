import { toast } from "react-hot-toast";

const Toast = {
  success: (message: string) =>
    toast.success(message, {
      style: { background: "green", color: "white" },
    }),

  error: (message: string) =>
    toast.error(message, {
      style: { background: "red", color: "white" },
    }),
};

export default Toast;
