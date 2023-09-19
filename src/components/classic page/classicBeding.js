import React from "react";
import "./classic.css";
import { GrStatusGood } from "react-icons/gr";
import { CgPlayButtonO } from "react-icons/cg";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import styles from "./classic.module.css";
import network from "../assets/images/network_bnb.png";

export default function ClassicBeding() {
  return (
    <>
      <div className="container">
        <div className="row mt-3 classic_Bedding">
          <div className="col-3">
            <div className={`${styles.betting_card} card`}>
              <div className={`card-header ${styles.betting_card_header}`}>
                <div className="">
                  <span className="me-2">
                    {" "}
                    <CgPlayButtonO
                      color="white"
                      fontSize="22"
                      className={styles.betting_head_icon}
                    />
                    {/* <CgPlayButtonO /> */}
                  </span>
                  <span className={styles.betting_head_title}>Round 12345</span>
                </div>
                <div>
                  <span className={styles.betting_timer}>(02:29)</span>
                </div>
              </div>
              <div className={`card-body blue-bg ${styles.betting_card_body}`}>
                {/* ------------------------ 1 base ------------------------*/}

                {/* <div>
                  <div className={`${styles.betting_up} green-bg`}>
                    <h5 className={`${styles.betting_up_text} pb-0 mb-0`}>
                      UP
                    </h5>
                    <p className={styles.betting_up_subtext}>119 X Payout</p>
                  </div>

                  <div className={styles.betting_body}>
                    <div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6 className={`mb-0 ${styles.betting_body_h6_1}`}>
                            $29,345.890
                          </h6>
                          <h6
                            className={`${styles.betting_body_h6} yellow-text`}
                          >
                            $29,345.890
                          </h6>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={`${styles.betting_body_btn} btn green-bg`}
                          >
                            <span>
                              <AiOutlineArrowUp color="white" fontSize={30} />
                            </span>
                            <span className="h6 fw-bold text-white ms-1">
                              $2.943
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h6 className="text-center text-white mb-0 pb-0">
                          PRIZE POOL
                        </h6>
                        <div className="d-flex">
                          <h2 className="text-center yellow-text ">
                            12.7898 BNB
                          </h2>
                          <div className={`${styles.betting_network_img}`}>
                            <img src={network} alt="img" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.betting_down} red-bg`}>
                    <p className={` mb-0 ${styles.betting_up_subtext}`}>
                      119 X Payout
                    </p>
                    <h5 className={`${styles.betting_up_text} pb-0 mb-0`}>
                      DOWN
                    </h5>
                  </div>
                </div> */}

                {/* ----------------------- 2 timer -------------------------*/}
                {/* <div>
                  <div className="py-5">
                    <h4 className="text-center mb-0 pb-0 text-white">
                      Entry Starts In
                    </h4>
                    <h4 className="text-center mb-0 pb-0 text-white">05:29</h4>
                  </div>
                </div> */}

                {/*------------------------- 3 input -------------------------*/}

                <div>
                  <div className={`${styles.betting_up} black-bg`}>
                    <h5 className={`${styles.betting_up_text} pb-0 mb-0`}>
                      UP
                    </h5>
                    <p className={styles.betting_up_subtext}>119 X Payout</p>
                  </div>

                  <div className={styles.betting_body}>
                    <div>
                      <div className="d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-center">
                          <button
                            className={`${styles.betting_enter_btn} btn green-bg text-white`}
                          >
                            Enter UP
                          </button>
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                          <button
                            className={`${styles.betting_enter_btn} btn red-bg text-white`}
                          >
                            Enter Down
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h6 className="text-center text-white mb-0 pb-0">
                          PRIZE POOL
                        </h6>
                        <div className="d-flex">
                          <h2 className="text-center yellow-text ">
                            12.7898 BNB
                          </h2>
                          <div className={`${styles.betting_network_img}`}>
                            <img src={network} alt="img" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.betting_down} black-bg`}>
                    <p className={` mb-0 ${styles.betting_up_subtext}`}>
                      119 X Payout
                    </p>
                    <h5 className={`${styles.betting_up_text} pb-0 mb-0`}>
                      DOWN
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
