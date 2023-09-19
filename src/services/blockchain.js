import abi from "../abis/src/contracts/candleGenie.sol/CandleGeniePrediction.json";
// import address from "../abis/contractAddress.json";
import { getGlobalState, setGlobalState } from "../store";
import { ethers } from "ethers";

const { ethereum } = window;
const contractAddress = "0xBABDecCE4FEC38315F1681b97540d9b7F3d699C3";
// 0x4ec8Af3f939325EeB5ca468e6ef85fc077cca978
const contractAbi = abi.abi;
let tx;

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
  } catch (error) {
    // reportError(error);
    alert(error.message);
    // reportError(error);
  }
};

const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      await isWallectConnected();
    });

    if (accounts) {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
    } else {
      alert("Please connect wallet.");
    }
  } catch (error) {
    reportError(error);
  }
};
//fetch owner address
const getContractOwner = async () => {
  try {
    const contract = await getEtheriumContract();
    const owner = await contract.owner();

    // console.log(owner)
    return owner;

    return owner.toLowerCase();
  } catch (err) {
    alert(err.message);
  }
};
//fetch all unclaimed reward of user
const getUserParticipatedRounds = async (userAddress) => {
  try {
    const contract = await getEtheriumContract();
    const owner = await contract.owner();
    const userRound = await contract.getUserParticipatedRounds(userAddress);
    const userRoundsNumbers = userRound.map((bigNumber) =>
      bigNumber.toNumber()
    );
    console.log(userRoundsNumbers);
    return userRoundsNumbers;
  } catch (error) {
    reportError(error);
  }
};
const getUserUnclaimedRounds = async (userAddress) => {
  try {
    const contract = await getEtheriumContract();
    const userRounds = await contract.getUserParticipatedRounds(userAddress);
    const unclaimedRounds = [];

    for (const roundEpoch of userRounds) {
      const bet = await contract.Bets(roundEpoch, userAddress);
      const isClaimable = await contract.claimable(roundEpoch, userAddress);
      if (bet.amount > 0 && !bet.claimed && isClaimable) {
        // unclaimedRounds.push({
        //   epoch: roundEpoch.toNumber(),
        //   unclaimedAmount: bet.amount.toNumber(),
        // });
        unclaimedRounds.push(roundEpoch.toNumber());
      }
    }
    console.log(unclaimedRounds);
  } catch (error) {
    reportError(error);
  }
};
const claimRewards = async () => {
  try {
    const contract = await getEtheriumContract();
    const connectedAccount = getGlobalState("connectedAccount");
    const UserUnclaimedRounds = await getUserUnclaimedRounds(connectedAccount);
    console.log(connectedAccount);
    const claim = await contract.Claim(UserUnclaimedRounds, {
      from: connectedAccount,
    });
    // const receipt = await tx.wait();
    // console.log("Transaction Receipt:", receipt);
  } catch (error) {
    reportError(error);
  }
};
//start round owner access
const RoundStart = async () => {
  try {
    const contract = await getEtheriumContract();
    const connectedAccount = getGlobalState("connectedAccount");
    console.log("Starting Round......");
    await contract.RoundStart({ from: connectedAccount });
  } catch (error) {
    reportError(error);
  }
};
//--------------------

const RoundLock = async (price) => {
  try {
    const contract = await getEtheriumContract();
    await contract.RoundLock(price);
  } catch (error) {
    reportError(error);
  }
};

const RoundExecute = async (price) => {
  try {
    const contract = await getEtheriumContract();
    await contract.RoundExecute(price);
  } catch (error) {
    reportError(error);
  }
};

//to fetch live price data
const getPythonPrice = async () => {
  try {
    const apiUrl = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
    const response = await axios.get(apiUrl);
    const livePrice = await response.data.price;
    return livePrice;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const executeCycle = async () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let i = 0;
  await RoundStart();
  console.log("start of round");
  await delay(5000);
  await RoundLock(getPythonPrice());
  console.log("lock of round " + i);
  await delay(5000);
  while (true) {
    await RoundExecute(getPythonPrice());
    console.log("execution of " + i);
    await delay(5000);
    i++;
  }
};

//----------------------------------
const getEtheriumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  } else {
    return getGlobalState("contract");
  }

  // const provider = new ethers.providers.Web3Provider(ethereum);
  // const signer = provider.getSigner();
  // let contract = new ethers.Contract(contractAddress, contractAbi, signer);
  // return contract;
};

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

export {
  connectWallet,
  getUserParticipatedRounds,
  getUserUnclaimedRounds,
  isWallectConnected,
  RoundStart,
  getContractOwner,
  executeCycle,
  claimRewards,
};
