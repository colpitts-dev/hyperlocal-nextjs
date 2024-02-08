import { MetaMaskInpageProvider } from '@metamask/providers'
export { default as Web3Provider, useWeb3 } from './web3'

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}
