import "../assets/scss/app.scss";
import Routes from "../routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className={`pro-toast-container`}
        progressClassName={`pro-toast-progress`}
        toastClassName={`pro-toast`}
      />
    </main>
  );
}

export default App;
