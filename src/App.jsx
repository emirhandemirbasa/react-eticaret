import BaseRouter from "./router/BaseRouterConfig";
import './css/app.css'
import { Bounce, ToastContainer } from "react-toastify";
import Basket from "./companents/Basket";
import ScrollToTop from "./companents/ScrollToTop";
import Loading from "./companents/Loading";
import GlobalModal from "./global/GlobalModal";

function App() {

  return (
    <div>
      <Loading />
      <GlobalModal />
      <BaseRouter />
      <ScrollToTop />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Basket />
    </div >
  );
}

export default App;