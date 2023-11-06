import {ScrollView} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, Button, makeStyles} from '@rneui/themed'

import ContainContainer from '@core/ContentContainer'

import FAQ from 'screens/auth/FAQ/FAQ'
import {useProfile} from 'hooks/helper'
import MessageBox from 'screens/auth/MessageBox'
import GradientBox from 'screens/auth/GradientBox'

import StepNumber from '../StepNumber'

const RegistrationSuccess = () => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {isRefetching, refetch} = useProfile()

  return (
    <ScrollView>
      <ContainContainer>
        <StepNumber current={4} />
        <GradientBox>
          <Text h3 h3Style={styles.textColor}>
            {t('register.kycSuccess.title')}
          </Text>
          <MessageBox
            containerStyle={{marginTop: 20}}
            name='user-check'
            type='font-awesome-5'
            message={t('register.kycSuccess.subTitle')}
            color={styles.textColor.color}
            size={25}
          />
          <Text style={[styles.paragraph, styles.textColor]}>{t('register.kycSuccess.text')}</Text>
          <Button
            title={t('register.kycSuccess.button')}
            loading={isRefetching}
            onPress={() => refetch()}
          />
        </GradientBox>
        <FAQ />
      </ContainContainer>
    </ScrollView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  textColor: {
    color: colors.textReverse,
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 20,
  },
}))

export default RegistrationSuccess
