import {Address, Chain} from 'viem'
import {bsc, bscTestnet} from 'viem/chains'
import type {IProviderMetadata} from '@walletconnect/modal-react-native'

import {CHAIN} from 'config/environments'

export const projectId = '4b754960edefc26d7af94780e98c7089'
export const chain = [bsc, bscTestnet].find(item => item.id === CHAIN) as Chain

export const providerMetadata: IProviderMetadata = {
  name: 'Bretton woods gold',
  description: 'Bretton woods gold platform',
  url: 'https://walletconnect.com/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'rnwalletconnectmodalexpo://',
  },
}

export const sessionParams = {
  namespaces: {
    eip155: {
      methods: [
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
        'wallet_watchAsset',
        'wallet_switchEthereumChain',
        'wallet_addEthereumChain',
        'eth_sendTransaction',
      ],
      chains: [`eip155:${CHAIN}`],
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {},
    },
  },
}

// if we need another token just include here
// and work everywhere is the project
export const contractInfo = {
  BWG: {
    symbol: 'BWG',
    decimals: 18,
    image: 'https://i.ibb.co/rMTrTYz/token.png',
    devAddress: '0x9480c22ffdefb6d42923da54b731744229f61cfe' as Address,
    mainnetAddress: '0xda47Ba3A9F1DCb61C057Efe1e5d6b6654241c3Dd' as Address,
  },
  USDT: {
    symbol: 'USDT',
    decimals: 18,
    image: 'https://icons8.com/icon/DEDR1BLPBScO/tether',
    devAddress: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd' as Address,
    mainnetAddress: '0x55d398326f99059ff775485246999027b3197955' as Address,
  },
  USDC: {
    symbol: 'USDC',
    decimals: 18,
    image: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029',
    devAddress: '0x64544969ed7ebf5f083679233325356ebe738930' as Address,
    mainnetAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d' as Address,
  },
}

export type ContractType = keyof typeof contractInfo
export type ContractInfoReturns = {
  symbol: string
  decimals: number
  image: string
  address: Address
}

export const getContractInfo = (type: ContractType): ContractInfoReturns => {
  const info = contractInfo[type]
  return {
    ...info,
    address: CHAIN === 56 ? info.mainnetAddress : info.devAddress,
  }
}

export const abi = [
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'allowance',
    stateMutability: 'view',
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'spender',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
  },
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [
      {
        name: 'account',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'decimals',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
  },
  {
    type: 'function',
    name: 'name',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
  },
  {
    type: 'function',
    name: 'symbol',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
  },
  {
    type: 'function',
    name: 'totalSupply',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  {
    type: 'function',
    name: 'transfer',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'recipient',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
  },
  {
    type: 'function',
    name: 'transferFrom',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'sender',
        type: 'address',
      },
      {
        name: 'recipient',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
  },
] as const
