import React from 'react'
import {View} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {useTranslation, Trans} from 'react-i18next'
import {Text, makeStyles, Button} from '@rneui/themed'

import Modal from '@core/Modal'

import {useApi} from 'hooks/api'
import CardImage from 'images/survey/card.svg'
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

  const handleSubmit = () => {
    mutate({
      id: profile?.id as number,
      event: 'debit_card_survey',
      response: {want_to_card: 'Yes'},
    })
  }

  return (
    <Modal title='' onClose={onClose} isOpened={isOpened}>
      <View>
        <View style={styles.imageContainer}>
          <CardImage height={50} />
        </View>

        <Text style={styles.textStyle}>
          <Trans
            i18nKey='survey.descriptions'
            values={{
              currency: 'USD',
            }}
            components={[
              <Text key={Math.random()} style={[{fontWeight: 'bold'}, styles.textStyle]} />,
              <Text key={Math.random()} style={[{fontWeight: 'bold'}, styles.textStyle]} />,
            ]}
          />
        </Text>

        {/* This is survey modal */}
        {/* <View style={styles.radioButtonContainer}>
            {surveyQuestions.map(item => (
              <View key={item.label} style={styles.radioButton}>
                <CheckBox
                  size={20}
                  checkedColor={styles.checkbox.color}
                  textStyle={styles.title}
                  containerStyle={styles.checkBoxContainer}
                  title={item.label}
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={item.value === checked}
                  onPress={() => isChecked(item.value)}
                />
              </View>
            ))}
          </View> */}
        <Button
          loading={isLoading}
          title={t('survey.submit')}
          containerStyle={{marginTop: 20, marginBottom: 20}}
          onPress={handleSubmit}
        />
      </View>
    </Modal>
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
