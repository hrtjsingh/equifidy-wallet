'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import CreatePassword from "@/components/onboarding/CreatePassword";
import MainScreen from "@/components/onboarding/mainScreen";
import NetwrokSelection from "@/components/onboarding/NetwrokSelection";
import RecoveryPhrase from "@/components/onboarding/RecoveryPhrase";
import RecoveryWarning from "@/components/onboarding/RecoveryWarning";
import StepIndicator from "@/components/onboarding/Steps";
import ImportWallet from '@/components/onboarding/ImportWallet';

import SecretRecoveryPhrase from "@/components/onboarding/SecretRecoveryPhrase";
import { createEthWallet, createSolWallet } from "../../utils";

export default function OnboradingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedNetwork, setSelectedNetwork] = useState("")
  const [mnemonic, setMnemonic] = useState("")
  const [isImport, setIsImport] = useState(false)
  const router = useRouter();

  const mnemonicHandler = (key: string) => {
    setMnemonic(key)
  }

  const newWalletHandler = () => {
    setCurrentStep(state => state + 1)
  }

  const importWalletHandler = () => {
    setIsImport(true)
    setCurrentStep(state => state + 1)
  }

  const navigator = (naviagteTo: number) => {
    if (naviagteTo === currentStep - 1) {
      setCurrentStep(naviagteTo)
    }
  }

  const networkSelectionHandler = (network: string) => {
    setSelectedNetwork(network)
    setCurrentStep(state => state + 1)
  }

  const nextHandler = () => {
    setCurrentStep(state => state + 1)
  }

  const backHandler = () => {
    setCurrentStep(state => state - 1)
  }

  const passwordHandler = (password: string) => {
    localStorage.setItem("selected-network", selectedNetwork)
    localStorage.setItem("password", password)
    if (selectedNetwork === "solana") {
      createSolWallet(mnemonic, 0, () => { })
    } else if (selectedNetwork === "ethereum") {
      createEthWallet(mnemonic, 0, () => { })
    }
    router.push("/")
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className='flex flex-col justify-center items-center max-w-[600px] w-full'>
        {currentStep === 0 &&
          <MainScreen
            newWalletHandler={newWalletHandler}
            importWalletHandler={importWalletHandler}
          />

        }
        {currentStep === 1 &&
          <NetwrokSelection
            networkSelectionHandler={networkSelectionHandler}
          />
        }
        {currentStep === 2 && <>
          {isImport ? <ImportWallet nextHandler={nextHandler} /> : <RecoveryWarning warningNextHandler={nextHandler} />}
        </>
        }
        {currentStep === 3 &&
          <>
            {isImport ? <SecretRecoveryPhrase /> :
              <RecoveryPhrase
                mnemonicHandler={mnemonicHandler}
                nextHandler={nextHandler}
                backHandler={backHandler}
              />}
          </>
        }
        {currentStep === 4 &&
          <CreatePassword
            passwordHandler={passwordHandler}
          />
        }

        {currentStep > 0 && <div className="mt-10">
          <StepIndicator currentStep={currentStep} navigator={navigator} />
        </div>}
      </div>
    </main>
  );
}
