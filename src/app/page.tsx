'use client'

import AddressCards from "@/components/Home/AddressCards";
import Header from "@/components/Home/Header";
import { useEffect, useState } from "react";
import { createEthWallet, createSolWallet, stringDecryptor, stringEncryptor } from "../utils";

export default function Home() {
  const [currentChain, setCurrentChain] = useState("")
  const [walletsList, setWalletsList] = useState<any>([])
  const [index, setIndex] = useState(1)
  const getWallets = () => {
    let wallets = [];
    try {
      let key = "wallet-sol"
      if (currentChain === "ethereum") {
        key = "wallet-eth"
      }
      const storedValue = localStorage.getItem(key) || "[]";
      if (storedValue) {
        wallets = JSON.parse(storedValue);
      }
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
    }
    setIndex(wallets.length + 1)
    setWalletsList(wallets)
  }

  useEffect(() => {
    getWallets()
  }, [currentChain, localStorage.getItem("wallet-eth"), localStorage.getItem("wallet-sol")])

  const chainHandler = (chain: any) => {
    setCurrentChain(chain)
  }
  useEffect(() => {
    if (localStorage.getItem("selected-network")) {
      setCurrentChain(localStorage.getItem("selected-network") || "solana")
    } else {
      setCurrentChain("solana")
    }
  }, [])

  const deleteHandler = (value: string) => {
    const del = walletsList.filter((item: any) => item.publicKey !== value)
    setWalletsList(del)
    let key = "wallet-sol"
    if (currentChain === "ethereum") {
      key = "wallet-eth"
    }
    localStorage.setItem(key, JSON.stringify(del))
  }
  const createNewWallet = () => {
    const mnemonic = localStorage.getItem("key") || ""
    if (mnemonic === "") return
    if (currentChain === "solana") {
      createSolWallet(mnemonic, index, setIndex)
    } else if (currentChain === "ethereum") {
      createEthWallet(mnemonic, index, setIndex)
    }
  }

  return (
    <main className="min-h-screen p-2 flex flex-col items-center w-full">
      <Header chainHandler={chainHandler} currentChain={currentChain} />
      <div className="mt-16 mx-8 max-w-[90%] lg:max-w-[40%] w-full  ">
        <div className="w-full text-right my-6">
          <span className="cursor-pointer text-blue-500 hover:text-blue-600 font-bold" onClick={createNewWallet}>
            + Add new <span className="capitalize">{currentChain}</span> Wallet
          </span>
        </div>
        {walletsList?.map((item: any, i: number) => (
          <AddressCards key={i} item={item.publicKey} secret={item.privateKey} index={i} currentChain={currentChain} deleteHandler={deleteHandler} />
        ))}

      </div>
    </main >
  );
}
