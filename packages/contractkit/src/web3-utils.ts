import Web3 from 'web3'

import { RPCSubprovider, Web3ProviderEngine } from '@0x/subproviders'

import { CeloProvider } from '../src/transaction-utils'

export class Web3Utils {
  // This web3 has no signing ability.
  static async getWeb3(protocol: string, ipAddress: string, port: number): Promise<Web3> {
    return new Web3(`${protocol}://${ipAddress}:${port}`)
  }

  // This web3 has signing ability.
  static async getWeb3WithSigningAbility(
    protocol: string,
    ipAddress: string,
    port: number,
    privateKey: string
  ): Promise<Web3> {
    return Web3Utils.getWeb3WithSigningAbility2(`${protocol}://${ipAddress}:${port}`, privateKey)
  }

  // This web3 has signing ability.
  static async getWeb3WithSigningAbility2(nodeUrl: string, privateKey: string): Promise<Web3> {
    const rpcProvider = new RPCSubprovider(nodeUrl)
    const celoProvider = new CeloProvider(privateKey)

    // Create a Web3 Provider Engine
    const providerEngine = new Web3ProviderEngine()
    // Compose our Providers, order matters
    // Celo provider provides signing
    providerEngine.addProvider(celoProvider)
    // Use an RPC provider to route all other requests
    providerEngine.addProvider(rpcProvider)
    providerEngine.start()
    const web3 = new Web3(providerEngine)
    return web3
  }
}
