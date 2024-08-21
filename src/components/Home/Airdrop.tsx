import Link from 'next/link'
import React from 'react'


const Airdrop = ({ currentChain }: any) => {
    return (
        <Link className='md:absolute right-28 text-blue-700 hover:text-blue-800' href={currentChain === "solana" ? "https://faucet.solana.com/" : " https://faucets.chain.link/sepolia"} rel="noopener noreferrer" target="_blank">
            Add <span className='capitalize'>{currentChain}</span> to wallet for Devnet
        </Link>

    )
}

export default Airdrop