import {getContractInfo, ContractInfo} from 'constants/wallet.config'

import useClient from './useClient'

const useSetToken = (token: ContractInfo = 'BWG') => {
  const {walletClient} = useClient()
  return () => walletClient.watchAsset({type: 'ERC20', options: getContractInfo(token)})
}

export default useSetToken
