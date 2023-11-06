import {makeStyles, Text} from '@rneui/themed'
import {View, TouchableOpacity, Image} from 'react-native'
import {useTranslation} from 'react-i18next'

import {usePlatform} from 'hooks/helper'
import EUFlag from 'images/flags/eu-circle-flag.png'
import USFlag from 'images/flags/us-circle-flag.png'

import GradientBox from '../../GradientBox'

const PlatformSelect = () => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {platform, switchPlatform} = usePlatform()

  return (
    <View style={styles.selectContainer}>
      <Text h4 h4Style={{textAlign: 'center'}}>
        {t('common.server-region')}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <GradientBox
          style={[styles.selectBox, styles.active]}
          gradientColors={platform !== 'US' ? ['white', 'white'] : undefined}
        >
          <TouchableOpacity
            style={styles.selectBoxInner}
            activeOpacity={0.8}
            onPress={() => switchPlatform('US')}
          >
            <Text style={[{fontSize: 16}, platform === 'US' && {color: styles.active.color}]}>
              {t('common.usa')}
            </Text>
            <Image source={USFlag} style={{height: 35, width: 35}} />
          </TouchableOpacity>
        </GradientBox>
        <GradientBox
          style={[styles.selectBox, styles.active]}
          gradientColors={platform !== 'EU' ? ['white', 'white'] : undefined}
        >
          <TouchableOpacity
            style={styles.selectBoxInner}
            activeOpacity={0.8}
            onPress={() => switchPlatform('EU')}
          >
            <Text style={[{fontSize: 16}, platform === 'EU' && {color: styles.active.color}]}>
              {t('common.eu')}
            </Text>
            <Image source={EUFlag} style={{height: 35, width: 35}} />
          </TouchableOpacity>
        </GradientBox>
      </View>
    </View>
  )
}

const useStyles = makeStyles(({colors}) => ({
  selectContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 10,

    // shadow for iOS app
    shadowColor: colors.black,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.25,
    // shadow for android
    elevation: 3,
  },
  selectBox: {
    padding: 0,
    width: '47%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
  },
  selectBoxInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  active: {
    color: colors.textReverse,
    borderColor: colors.border,
    borderWidth: 1,
  },
}))

export default PlatformSelect
