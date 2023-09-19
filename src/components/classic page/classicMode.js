import React, { useEffect, useState } from "react";
import "./classic.css";
import * as blockchain from "../../services/blockchain";
import logo from "../assets/images/LogoDark.png";
import {
  FaChartBar,
  FaCopyright,
  FaTelegramPlane,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import ClassicBeding from "./classicBeding";
import ClasicChart from "./clasicChart";
import { truncate, useGlobalState } from "../../store";

export default function ClassicMode() {
  const [showClassicBeding, setshowClassicBeding] = useState(true);
  // const [clientAccount, setclientAccount] = useState(null);

  // const [ownerAccount, setOwnerAccount] = useState();
  const [ownerAddress, setOwnerAddress] = useState(null);

  const [ownerAccount, setOwnerAccount] = useState(null);

  const [startButtonText, setStartButtonText] = useState("Start");

  const toggleComponents = () => {
    setshowClassicBeding(!showClassicBeding);
  };

  const [connectedAccount] = useGlobalState("connectedAccount");
  // setclientAccount(connectedAccount);
  console.log(connectedAccount);
  // console.log(clientAccount);

  // const [ownerAddress] = useGlobalState("ownerAddress");

  useEffect(() => {
    async function fetchData() {
      try {
        await blockchain.isWallectConnected();
        const ownerAddress = await blockchain.getContractOwner();
        setOwnerAddress(ownerAddress.toLowerCase());
        // setOwnerAccount(ownerAddress);
        console.log(ownerAddress);
      } catch (error) {
        console.log("Error:", error);
      }
    }

    fetchData();
  }, []);

  const handleStartToggle = () => {
    if (startButtonText === "Start") {
      // Perform start actions
      setStartButtonText("Pause");
    } else if (startButtonText === "Pause") {
      // Perform pause actions
      setStartButtonText("Resume");
    } else if (startButtonText === "Resume") {
      // Perform resume actions
      setStartButtonText("Pause");
    }
  };

  return (
    <>
      <div className="container-fluid classicBackground">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <img src={logo} className="classicLogo" alt="img" />
            </div>

            {/* {!connectedAccount ? (
              <div className="col-lg-4"></div>
            ) : (
              <div className="col-lg-4 text-end mt-4">
                <button className="ms-3 classicButton">start</button>
                <button className="ms-3 classicButton">Extract Fund</button>
                <button className="ms-3 classicButton">Inject Fund</button>
              </div>
            )} */}

            {!connectedAccount ? (
              <div className="col-lg-4"></div>
            ) : (
              <div className="col-lg-4 text-end mt-4">
                {connectedAccount === ownerAddress ? (
                  <>
                    <button
                      className="ms-3 classicButton"
                      onClick={handleStartToggle}
                    >
                      {startButtonText}
                    </button>
                    {/* <button className="ms-3 classicButton">start</button> */}
                    <button className="ms-3 classicButton">Extract Fund</button>
                    <button className="ms-3 classicButton">Inject Fund</button>
                  </>
                ) : (
                  <button className="ms-3 classicButton">Claim</button>
                )}
              </div>
            )}

            <div className="col-lg-4 text-end mt-4 ">
              <button className="ms-3 classicButton">classic</button>
              <button
                className="ms-3 classicButton"
                // onClick={blockchain.getContractOwner}
              >
                Network
              </button>
              {!connectedAccount ? (
                <button
                  className="ms-3 classicButton1"
                  onClick={blockchain.connectWallet}
                >
                  Connect
                </button>
              ) : (
                <button className="ms-3 classicButton1">
                  {truncate(connectedAccount, 3, 3, 10)}
                </button>
              )}
            </div>

            <div className="row  classicRow d-flex text-white p-3">
              <div className="col-lg-4 col-md-4 ps-4 ">
                <button
                  className="classic_mode_button_1 "
                  onClick={toggleComponents}
                >
                  <FaChartBar color="white" size="20px" /> chart
                </button>
              </div>

              <div className="col-lg-4 col-md-4 text-center"> market</div>

              <div className="col-lg-4 col-md-4 text-end">
                <FaUser color="white" size="20px" className="mb-2 me-1" />{" "}
                Dashboard
              </div>
            </div>

            {showClassicBeding ? <ClassicBeding /> : <ClasicChart />}
            {/* <ClassicBeding/> <ClasicChart/> */}

            <div className="row text-white mt-3 mb-3 classicFooter">
              <div className="col-lg-5 mb-3">
                <h5 className="classicfooter_text">candle Genie</h5>
                <p className="classicfooter_P">
                  Grow you assets while playing fun games. Powered by blockchain
                  technology.
                </p>
                <div className="classicfooter_icons">
                  <FaTelegramPlane color="white" size="25px" />
                  <FaTwitter color="white" size="25px" className="ms-4" />
                  <FaYoutube color="white" size="25px" className="ms-4" />
                </div>
                <div className="d-flex classicfooter_copywrite ">
                  <FaCopyright
                    color="white"
                    size="15px"
                    className="mt-2 me-1"
                  />
                  -2023_<p>Candle Genie - All Rights Reserved</p>
                </div>
              </div>
              <div className="col-lg-7 "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
