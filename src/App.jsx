import './App.css'
import { useEffect } from "react";
import AppRoutes from "./AppRoutes.jsx";
import Header from "./components/Header/Header.jsx";
import Loading from "./components/Loading/Loading.jsx";
import { useLoading } from "./hooks/useLoading.jsx";
import setLoadingInterceptor from "./interceptors/loadingInterceptor.js";

function App() {

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, [])


  return (
    <>
      <Header />
      <Loading />
      <AppRoutes />
    </>
  );
}

export default App


/**
 * npm i react-router-dom
 * npm i axios
 * npm i react-toastify
 * npm i react-hook-form
 * npm i leaflet react-leaflet
 * npm i @paypal/react-paypal-js
 */