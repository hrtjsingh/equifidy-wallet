import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl"
import { Wallet, HDNodeWallet, ethers } from "ethers";

import { Connection, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// const SOL_TO_LAMPORTS = 1_000_000_000;

function solToLamports(solAmount: number) {
  return solAmount * LAMPORTS_PER_SOL;
}

function hexToUint8Array(hex: string) {
  if (hex.length % 2 !== 0) {
    throw new Error('Invalid hex string');
  }
  const arrayBuffer = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    arrayBuffer[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return arrayBuffer;
}

export const stringEncryptor = (mn: string) => {
  const salt = process.env.NEXT_PUBLIC_SALT_STRING;
  if (!salt) return ""
  const saltedString = `${salt}${mn}`;
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(saltedString);
  const hexString = Array.from(uint8Array)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
  return hexString;
}

export const stringDecryptor = (hexString?: string) => {
  const salt = process.env.NEXT_PUBLIC_SALT_STRING;

  if (!hexString || !salt) return "";

  const uint8Array = new Uint8Array(
    hexString.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
  );

  const decoder = new TextDecoder();
  const decodedString = decoder.decode(uint8Array);

  if (decodedString.startsWith(salt)) {
    const originalMnemonic = decodedString.slice(salt.length);
    return originalMnemonic;
  } else {
    throw new Error('Invalid encrypted string or salt mismatch');
  }
};


export const createSolWallet = async (mnemonic: string, index: number, callback: any) => {

  const seed = await mnemonicToSeed(stringDecryptor(mnemonic));
  const path = `m/44'/501'/${index}'/0'`;
  //@ts-ignore
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keypair = Keypair.fromSecretKey(secret);
  const prevWallets = JSON.parse(localStorage.getItem('wallet-sol') || "[]")
  callback(index + 1)
  const hexString = Array.from(keypair.secretKey)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
  localStorage.setItem("wallet-sol", JSON.stringify([...prevWallets, { "publicKey": keypair.publicKey, "privateKey": hexString }]))
  localStorage.setItem("has-wallet", "true")
}

export const createEthWallet = async (mnemonic: string, index: number, callback: any) => {
  const seed = await mnemonicToSeed(stringDecryptor(mnemonic));
  const derivationPath = `m/44'/60'/${index}'/0'`;
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(derivationPath);
  const privateKey = child.privateKey;
  const wallet = new Wallet(privateKey);
  const prevWallets = JSON.parse(localStorage.getItem('wallet-eth') || "[]")
  callback(index + 1)
  localStorage.setItem("wallet-eth", JSON.stringify([...prevWallets, { "publicKey": wallet.address, "privateKey": wallet.signingKey.privateKey }]))
  localStorage.setItem("has-wallet", "true")
}

export const getEthBalance = async (address: string) => {
  const url: string = process.env.NEXT_PUBLIC_API_ETH_API || ""
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    id: 1,
    jsonrpc: "2.0",
    params: [address, "latest"],
    method: "eth_getBalance"
  });
  if (url === "") return
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export const getSolBalance = async (address: string) => {
  const url: string = process.env.NEXT_PUBLIC_API_SOL_API || ""
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "getBalance",
    params: [address],
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


export const convertPriceToUsd = async (currentChain: string) => {
  const url: string = process.env.NEXT_PUBLIC_API_COINGECO_API || ""
  const params = {
    ids: currentChain,
    vs_currencies: "usd",
  };

  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${url}?${queryString}`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch Token price");
    }

    const data = await response.json();
    const PriceInUsd = data[currentChain].usd;
    return PriceInUsd;
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return null;
  }
};


export const sendSol = async (fromKeypair: string, toPublicKey: string, amount: number) => {
  try {
    const from = Keypair.fromSecretKey(new Uint8Array(hexToUint8Array(fromKeypair)));
    const to = new PublicKey(toPublicKey);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: solToLamports(amount),
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
    const res = await signature
    return { "success": true, "signature": res };

  } catch (error) {
    console.error('Transaction failed:', error);
    return { "success": false, "error": error };
  }
}



export const sendEth = async (
  fromPrivateKey: string,
  toAddress: string,
  amountInEther: number
) => {
  const providerUrl = process.env.NEXT_PUBLIC_API_ETH_API
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(fromPrivateKey, provider);

  const amountInWei = ethers.parseEther(amountInEther.toString());

  const tx = {
    to: toAddress,
    value: amountInWei,
  };
  try {
    const txResponse = await wallet.sendTransaction(tx);

    const receipt: any = await txResponse.wait();

    const res = await receipt?.transactionHash;
    return { "success": true, "signature": res };
  } catch (error) {
    console.error('Transaction failed:', error);
    return { "success": false, "error": error };
  }
}


export const copyHandler = (text: string, callback: any) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      callback(true)
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  setTimeout(() => { callback(false) }, 2000)
}

export function maskString(inputString: string, showFirstDigits = 4, showLastDigits = 4) {
  if (inputString.length <= showFirstDigits + showLastDigits) {
    return inputString;
  }
  const firstPart = inputString.slice(0, showFirstDigits);
  const maskedPart = inputString.slice(showFirstDigits, -showLastDigits).replace(/./g, '*');
  const lastPart = inputString.slice(-showLastDigits);

  return firstPart + maskedPart + lastPart;
}

