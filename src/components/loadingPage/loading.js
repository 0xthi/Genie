// src/App.js
import React from "react";
import "./loading.css";
// import * as LottiePlayer from "@lottiefiles/lottie-player";
import Lottie from "react-lottie";
import underConstruction from "../assets/images/underDevelopment.json";

export default function Loading() {
  const lottieAnimation = {
    loop: true,
    autoplay: true,
    animationData: underConstruction,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      id: "career-lottie-id",
      className: "career-lottie-id",
    },
  };
  return (
    <>
    <div className="container-fluid ">
    <div className="loading_page text-center">
      <h1 className="loadingFont">Integration in progress...</h1>
        <Lottie options={lottieAnimation} />
      </div>

    </div>
    </>
  );
}
