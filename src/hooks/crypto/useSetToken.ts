import {getContractInfo, ContractType} from 'constants/wallet.config'

import useClient from './useClient'

const useSetToken = (token: ContractType = 'BWG') => {
  const {walletClient} = useClient()
  return () => walletClient.watchAsset({type: 'ERC20', options: getContractInfo(token)})
}

export default useSetToken
