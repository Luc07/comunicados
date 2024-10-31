import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Toasty = () => {
  return (
    <ToastContainer
      autoClose={5000}
      position="top-right"
      containerId="A"
    ></ToastContainer>
  );
};
