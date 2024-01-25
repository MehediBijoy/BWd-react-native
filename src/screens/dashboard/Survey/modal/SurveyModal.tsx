import React from 'react'
import {View} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {useTranslation, Trans} from 'react-i18next'
import {Text, makeStyles, CheckBox, Button} from '@rneui/themed'

import Modal from '@core/Modal'
import SafeAreaView from '@core/SafeAreaView'

import {useApi} from 'hooks/api'
import CardImage from 'images/survey/card.svg'
import useSurvey from 'hooks/states/useSurvey'
import {usePlatform, useProfile, useProfileDetails} from 'hooks/helper'

import {getSurveyQuestions} from './Survey.config'

type SurveyModalProps = {
  isOpened: boolean
  onClose: () => void
}

const SurveyModal = ({isOpened, onClose}: SurveyModalProps) => {
  const api = useApi()
  const styles = useStyles()
  const {t} = useTranslation()
  const {profile} = useProfile()
  const {platform} = usePlatform()
  const {surveyMutate} = useSurvey()
  const {data: userDetails} = useProfileDetails()

  const [checked, isChecked] = React.useState('')

  const surveyQuestions = React.useMemo(() => getSurveyQuestions(t), [t])

  const {mutate, isLoading} = useMutation({
    mutationFn: api.surveySubmit,
    onSuccess: () => {
      surveyMutate(profile?.id as number, platform)
    },
  })

  const handleSubmit = () => {
    mutate({
      id: profile?.id as number,
      event: 'debit_card_survey',
      response: {want_to_card: 'Yes', want_to_spend: checked},
    })
  }

  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <Modal title='' onClose={onClose} isOpened={isOpened}>
        <View>
          <View style={styles.imageContainer}>
            <CardImage height={50} />
          </View>

          <Text style={styles.textStyle}>
            <Trans
              i18nKey='survey.descriptions'
              values={{
                name: `${userDetails?.user_detail?.first_name ?? ''} ${
                  userDetails?.user_detail?.last_name ?? ''
                }`,
                currency: 'USD',
              }}
              components={[
                <Text key={Math.random()} style={[{fontWeight: 'bold'}, styles.textStyle]} />,
                <Text key={Math.random()} style={[{fontWeight: 'bold'}, styles.textStyle]} />,
              ]}
            />
          </Text>

          <View style={styles.radioButtonContainer}>
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
          </View>
          <Button
            loading={isLoading}
            title={t('survey.submit')}
            containerStyle={{marginTop: 20, marginBottom: 20}}
            onPress={handleSubmit}
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
