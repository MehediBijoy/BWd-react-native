import {ScrollView} from 'react-native'
import {Text, Button, makeStyles} from '@rneui/themed'

import ContainContainer from '@core/ContentContainer'

import FAQ from 'screens/auth/FAQ/FAQ'
import {useProfile} from 'hooks/helper'
import MessageBox from 'screens/auth/MessageBox'
import GradientBox from 'screens/auth/GradientBox'

import StepNumber from '../StepNumber'

const RegistrationSuccess = () => {
  const styles = useStyles()
  const {isRefetching, refetch} = useProfile()

  return (
    <ScrollView>
      <ContainContainer>
        <StepNumber current={4} />
        <GradientBox>
          <Text h3 h3Style={styles.textColor}>
            Congratulations
          </Text>
          <MessageBox
            containerStyle={{marginTop: 20}}
            name='user-check'
            type='font-awesome-5'
            message='Successfully registered'
            color={styles.textColor.color}
            size={25}
          />
          <Text style={[styles.paragraph, styles.textColor]}>
            Congratulations! Your KYC status is approved, and you can now start trading on the
            Bretton Woods digital gold platform.
          </Text>
          <Button
            title='Go To Dashboard'
            loading={isRefetching}
            onPress={() => refetch()}
            containerStyle={{maxWidth: 150}}
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
