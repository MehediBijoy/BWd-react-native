import {useEffect, useMemo} from 'react'
import SplashScreen from 'react-native-splash-screen'

import Splash from 'components/Splash'
import {usePlatform, useProfile} from 'hooks/helper'
import {useLocales} from 'hooks/states'
import {useAuthToken} from 'hooks/api'

import Navigators from './navigators/Navigators'

const SplashWrapper = () => {
  const {hasHydrate} = useLocales()
  const {hasHydrate: isPlatform} = usePlatform()
  const {hasHydrate: isAuthToken, token} = useAuthToken()
  const {profile, isLoading} = useProfile()


  const isSplashScreen = useMemo(() => {
    if (!hasHydrate || !isPlatform || !isAuthToken) return true
    return false
  }, [hasHydrate, isPlatform, isAuthToken])

  const isScreen = useMemo(() => {
    if (!isSplashScreen && !token) return true
    else if (token && isLoading) return false
    return true
  }, [isSplashScreen, token, isLoading])

  // console.log(hasHydrate, isPlatform, isAuthToken, token)
  console.log(isSplashScreen, isScreen, 'this is splash screen')

  return isSplashScreen || isScreen ? <Splash /> : <Navigators />
  // return <Navigators />
}

export default SplashWrapper
