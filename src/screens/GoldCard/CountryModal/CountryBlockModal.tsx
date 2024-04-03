import {Button, Text, makeStyles} from '@rneui/themed'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useMutation} from '@tanstack/react-query'

import Modal from '@core/Modal'
import SafeAreaView from '@core/SafeAreaView'

import BlockSvg from 'images/goldcard/Block.svg'
import {useApi} from 'hooks/api'

type CountryModalProps = {
  id: number
  name: string
  isOpened: boolean
  onClose: () => void
}

const CountryBlockModal = ({isOpened, id, name, onClose}: CountryModalProps) => {
  const {t} = useTranslation()
  const styles = useStyles()
  const api = useApi()

  const {mutate, isLoading} = useMutation({
    mutationFn: api.surveySubmit,
    onSuccess: () => {
      onClose()
    },
  })
  return (
    <SafeAreaView>
      <Modal title='' isOpened={isOpened} onClose={onClose}>
        <View style={{alignItems: 'center'}}>
          <BlockSvg width={200} height={100} />
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={styles.title}>
            {t('goldCard.country', {
              name: `${name}`,
            })}
          </Text>

          <Button
            title={'Ok'}
            loading={isLoading}
            containerStyle={{marginTop: 20}}
            onPress={() => {
              mutate({
                id,
                event: 'exclude_country_user',
                response: {
                  want_to_card: 'Yes',
                },
              })
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  title: {
    color: colors.black,
    fontWeight: 'bold',
  },
}))

export default CountryBlockModal
