import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const showNotification = (message) => {
  toast(message, {
    autoClose: 1000,
    pauseOnHover: true,
    position: "top-center",
  });
};

export default showNotification;

