import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { monadTestnet } from 'wagmi/chains'
import { http } from 'wagmi'

export const config = getDefaultConfig({
  appName: 'MessageBoard DApp',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get your projectId from https://cloud.walletconnect.com
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http('https://testnet-rpc.monad.xyz'),
  },
  ssr: true,
})

// Contract configuration
export const CONTRACT_ADDRESS = '0x709fe13caaa6f3051dcb390ff12ba444f465aa98' as const

// ABI for getMessage function
export const MESSAGE_BOARD_ABI = [
  {
    inputs: [],
    name: 'getMessage',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'author',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'messageCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'newMessage', type: 'string' }],
    name: 'updateMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

