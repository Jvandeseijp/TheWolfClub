import "antd/dist/antd.css";
import "./style.css";

import React, { useState, useEffect } from "react";
import * as s from "./styles/globalStyles";
import Account from "components/Account/Account";
import { useMoralis } from "react-moralis";
import { whitelistMint, whitelist } from "./Utils/wolfClub";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./Utils/contractConfig";
import { ethers } from "ethers";

function App() {
  const { account, Moralis } = useMoralis();
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    if (account) {
      const whitelisted = whitelist.findIndex((element) => {
        if (element.toLowerCase() == account.toLowerCase()) {
          setIsWhitelisted(true);
          console.log(true);
          return true;
        } else {
          console.log(false);
          return false;
        }
      });

      console.log(whitelisted);
    }
  }, [account]);

  useEffect(() => {
    async function fetchTotalSupply() {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://speedy-nodes-nyc.moralis.io/fd883a5568037e2a20cb09de/eth/rinkeby",
      );
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider,
      );

      const supply = await contract.totalSupply();

      console.log("supply");
      setTotalSupply(parseInt(supply["_hex"], 16));
    }
    fetchTotalSupply();

    setInterval(() => {
      fetchTotalSupply();
    }, 3000);
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    setMintAmount(e.target.value);
  };

  const handleMint = async () => {
    whitelistMint(mintAmount, account, Moralis);
  };

  return (
    <s.Screen>
      <html lang="en">
        <body className="home">
          <header id="header">
            <nav className="navbar navbar-expand">
              <div className="container header">
                <a className="navbar-brand" href="#">
                  <img
                    src="https://thewolfclub.io/assets/images/thewolfclub.svg"
                    alt="TheWolfClub"
                  />
                </a>
                <div className="ml-auto"></div>
                <ul className="navbar-nav action">
                  <li className="nav-item ml-3">
                    <a
                      href="https://discord.gg/thewolfclub"
                      target="_blank"
                      rel="noreferrer"
                      className="btn ml-lg-auto btn-material-transparent btn-sm"
                    >
                      <img
                        className="discord-icon pr-2"
                        src="https://thewolfclub.io/assets/images/icon-discord.svg"
                        alt="thewolfclub"
                      />{" "}
                      DISCORD{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
          <section id="hero" className="hero py-5 odd">
            <div className="w-100 py-auto">
              <div className="wrapper">
                <div className="swiper-slide slide-center">
                  <div className="container slide-content row">
                    <div className="container w-100 py-5">
                      <div className="center align-self-center text-center">
                        <h4
                          id="twc-title"
                          className="text-center super effect-static-text pt-4"
                        >
                          WELCOME, FUTURE MEMBER OF
                        </h4>
                        <h2
                          id="twc-title"
                          className="text-center title effect-static-text p-0 m-0"
                        >
                          THE WOLF CLUB
                        </h2>
                        <p className="text-center subtitle p-0 m-0 col-12">
                          Your're exactly on click away from becoming a
                          legendary wolf owner
                        </p>

                        <div className="margin">
                          <h2
                            id="twc-title"
                            className="text-center title effect-static-text p-0 m-0"
                          >
                            {isWhitelisted ? totalSupply + "/ 2881 Minted" : ""}
                          </h2>
                        </div>
                        {!account ? (
                          <Account />
                        ) : (
                          <div className="home-container1">
                            {isWhitelisted ? (
                              <div className="home-container1">
                                <a
                                  id="twc-mint-btn"
                                  className="ml-auto mr-auto my-5 btn btn-material-gradient"
                                  onClick={handleMint}
                                >
                                  {" "}
                                  MINT{" "}
                                </a>
                                <p>
                                  {account.substring(0, 5) +
                                    "..." +
                                    account.substring(38, 42)}
                                </p>
                                <div>
                                  <input
                                    type="number"
                                    value={mintAmount}
                                    onChange={handleChange}
                                    min="1"
                                    max="10"
                                    style={{
                                      width: "200px",
                                      justifyContent: "center",
                                    }}
                                  ></input>
                                </div>
                              </div>
                            ) : (
                              <h2> You are not Whitelisted!</h2>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="odd p-0">
            <section id="footer" className="footer p-0">
              <div className="container">
                <div className="row items footer-widget">
                  <div className="col-12 col-lg-6 p-0">
                    <div className="row">
                      <div className="branding col-12 p-3 text-center text-lg-left item">
                        <div className="brand">
                          <a href="#" className="logo">
                            <img
                              src="https://thewolfclub.io/assets/images/thewolfclub.svg"
                              alt="thewolfclub"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 p-0 d-none d-md-block">
                    <a
                      href="https://discord.gg/thewolfclub"
                      className="float-right mt-4 mr-auto ml-auto ml-lg-0 btn dark-button smooth-anchor"
                    >
                      <img
                        className="discord-icon pr-3"
                        src="https://thewolfclub.io/assets/images/icon-discord.svg"
                        alt="thewolfclub"
                      />{" "}
                      TO OUR DISCORD
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section id="copyright" className="p-3 copyright">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-6 p-3 text-center text-lg-left">
                    <p>
                      Enjoy the ride. We are tracking any intention of piracy.
                    </p>
                  </div>
                  <div className="col-12 col-md-6 p-3 text-center text-lg-right">
                    <p>© 2022 The Wolf Club. All rights reserved</p>
                  </div>
                </div>
              </div>
            </section>
          </footer>
          <script src="https://thewolfclub.io/assets/js/vendor/jquery.min.js"></script>
          <script src="https://thewolfclub.io/assets/js/vendor/bootstrap.min.js"></script>
        </body>
      </html>
    </s.Screen>
  );
}

export default App;
