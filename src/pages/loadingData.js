import React from 'react';
import Loading from '../components/loadingPage/loading';
import Navbar_header from '../components/landingPage/navbar';
import Footer from '../components/landingPage/footer';
import GoogleChart from "../components/Graph/demoGraph";

export default function LoadingData() {
  return (
   <>
   <Navbar_header/>
   <Loading/>
   <Footer/>
   </>
  )
}
