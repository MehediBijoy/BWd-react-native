import React from 'react'
import {View} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'
import {Text, makeStyles, Button} from '@rneui/themed'

import Modal from '@core/Modal'
import SafeAreaView from '@core/SafeAreaView'

import {useApi} from 'hooks/api'
import CardImage from 'images/survey/Thanks.svg'
import {useProfile} from 'hooks/helper'

type SurveyModalProps = {
  isOpened: boolean
  onClose: () => void
  refetch: () => void
}

const SurveyModal = ({isOpened, onClose, refetch}: SurveyModalProps) => {
  const api = useApi()
  const styles = useStyles()
  const {t} = useTranslation()
  const {profile} = useProfile()

  const {mutate, isLoading} = useMutation({
    mutationFn: api.surveySubmit,
    onSuccess: () => {
      refetch()
      onClose()
    },
  })

  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <Modal title='' onClose={onClose} isOpened={isOpened}>
        <View>
          <View style={styles.imageContainer}>
            <CardImage height={100} />
          </View>

          <Text style={styles.textStyle}> {t('survey.goldCard.surveyModalTitle')}</Text>

          <Button
            loading={isLoading}
            title={t('survey.ok')}
            containerStyle={{marginTop: 20, marginBottom: 20}}
            onPress={() =>
              mutate({
                id: profile?.id as number,
                event: 'debit_card_survey',
                response: {want_to_card: 'Yes'},
              })
            }
          />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 16,
  },
  radioButtonContainer: {
    marginTop: 20,
  },
  radioButton: {
    borderColor: colors.divider,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    height: 40,
  },
  checkbox: {
    color: colors.tertiary,
  },
  checkBoxContainer: {
    justifyContent: 'center',
    padding: 0,
    paddingLeft: 10,
    height: 27,
  },
  title: {
    fontWeight: '600',
  },
}))

export default SurveyModal
