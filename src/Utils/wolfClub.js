import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contractConfig";

export const whitelist = [
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  "0x819A76eD6Eb33A720AD0aD851e31f5c5AC74D35b",
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0x8A146c65FA4355381BF0c69182a7DbccDc9B0CbB",
  "0xce8d90a1A0fd2F93b57A02D8d76b4A36eB3fC254",
  "0xbB269cE520BD391b38A01fc699fBe6Fe3269752E",
  "0x02ECEf057e766cdBE6BF781eADA33CDc3dde3617",
  "0xdf4a143359C11E10278aB74bd3f90Ff3e13a90a3",
  "0x8afbeE650Af24087D9b8652828FA4Fa2D7c2A2ca",
  "0x2f425CA8490397F66C3E9f79F214EF5CC1d2491b",
  "0x42Cc175F637dd6db8044B4c51100E5D62a2F0489",
];

const handleMerkle = (address) => {
  const leaves = whitelist.map((x) => keccak256(x));
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  const root = tree.getRoot().toString("hex");
  console.log(`MerkleTreeRoot: ${root}`);

  const userAddress = address;
  const leaf = keccak256(userAddress);

  const hexProof = tree.getHexProof(leaf);
  console.log(`hexProof: ${hexProof}`);

  return hexProof;
};

const whitelistMint = async (_amount, user, Moralis) => {
  const whitelistPrice = 0.002;
  const proof_ = handleMerkle(user);

  const sendOptions = {
    contractAddress: CONTRACT_ADDRESS,
    functionName: "whitelistMint",
    abi: CONTRACT_ABI,
    msgValue: Moralis.Units.ETH(whitelistPrice * _amount),
    params: {
      _mintAmount: _amount,
      proof: proof_,
    },
  };

  const transaction = await Moralis.executeFunction(sendOptions);
  console.log(transaction.hash);
  // --> "0x39af55979f5b690fdce14eb23f91dfb0357cb1a27f387656e197636e597b5b7c"

  // Wait until the transaction is confirmed
  await transaction.wait();

  console.log("proof arriving in the whitelistmint function");
  console.log(proof_);
};

const publicMint = async (_amount, user, Moralis) => {
  const publicMintPrice = 0.0025;

  const sendOptions = {
    contractAddress: CONTRACT_ADDRESS,
    functionName: "publicMint",
    abi: CONTRACT_ABI,
    msgValue: Moralis.Units.ETH(publicMintPrice * _amount),
    params: {
      _mintAmount: _amount,
    },
  };

  const transaction = await Moralis.executeFunction(sendOptions);
  console.log(transaction.hash);
  // --> "0x39af55979f5b690fdce14eb23f91dfb0357cb1a27f387656e197636e597b5b7c"

  // Wait until the transaction is confirmed
  await transaction.wait();
};

export { whitelistMint, publicMint };
