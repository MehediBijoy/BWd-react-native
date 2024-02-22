import {Text, makeStyles} from '@rneui/themed'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'

import Modal from '@core/Modal'
import SafeAreaView from '@core/SafeAreaView'

import {getCountries} from './Country.config'

type CountryModalProps = {
  isOpened: boolean
  onClose: () => void
}

const CountryModal = ({isOpened, onClose}: CountryModalProps) => {
  const {t} = useTranslation()
  const styles = useStyles()
  return (
    <SafeAreaView>
      <Modal title='' isOpened={isOpened} onClose={onClose}>
        <Text style={styles.title}>{t('survey.goldCard.countryModalTitle')}</Text>
        <View style={styles.container}>
          {getCountries.map(({icon: Icon, name}) => (
            <View key={name} style={styles.item}>
              <Icon height={25} width={25} />
              <Text>{name}</Text>
            </View>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  title: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flexBasis: 150,
    flexGrow: 1,
    borderRadius: 4,
    flexDirection: 'row',
    columnGap: 10,
    rowGap: 10,
    marginVertical: 7,
  },
}))

export default CountryModal
