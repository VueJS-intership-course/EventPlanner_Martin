import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const showNotification = (message, timeout = 3500) => {
  toast(message, {
    autoClose: timeout,
    pauseOnHover: true,
    position: "top-center",
  });
};

export default showNotification;

