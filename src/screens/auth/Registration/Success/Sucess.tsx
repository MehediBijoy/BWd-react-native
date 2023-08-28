import {Text, Button, makeStyles} from '@rneui/themed'

import {useProfile} from 'hooks/helper'
import MessageBox from 'screens/auth/MessageBox'
import GradientBox from 'screens/auth/GradientBox'
import SafeAreaView from 'components/SafeAreaView'
import ContainContainer from 'components/ContentContainer'

const RegistrationSuccess = () => {
  const styles = useStyles()
  const {isRefetching, refetch} = useProfile()

  return (
    <SafeAreaView>
      <ContainContainer>
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
      </ContainContainer>
    </SafeAreaView>
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
