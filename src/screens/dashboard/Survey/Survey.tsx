import React from 'react'
import {useTranslation} from 'react-i18next'
import {useMutation} from '@tanstack/react-query'
import {View, ImageBackground} from 'react-native'
import {Text, makeStyles, Button} from '@rneui/themed'

import {useApi} from 'hooks/api'
import {useProfile} from 'hooks/helper'
import DebitCard from 'images/survey/debitCard.svg'

const Survey = ({refetch}: {refetch: () => void}) => {
  const api = useApi()
  const styles = useStyles()
  const {t} = useTranslation()
  const {profile} = useProfile()

  const [survey, setSurvey] = React.useState<boolean>(false)

  const {mutate, isLoading} = useMutation({
    mutationFn: api.surveySubmit,
    onSuccess: refetch,
  })

  return (
    <View>
      <ImageBackground
        style={styles.container}
        imageStyle={styles.imageStyle}
        source={require('./banner.png')}
        resizeMode='cover'
      >
        <View style={styles.insideContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.textStyle}>{t('survey.title')}</Text>
            <View style={styles.buttonContainer}>
              <Button
                size='sm'
                onPress={() => {
                  setSurvey(true)
                  mutate({
                    id: profile?.id as number,
                    event: 'debit_card_survey',
                    response: {want_to_card: 'Yes'},
                  })
                }}
                loading={survey && isLoading}
                color={styles.buttonColors.color}
                title={t('survey.yes')}
                containerStyle={styles.buttonStyle}
                titleStyle={{fontSize: 10}}
              />
              <Button
                size='sm'
                loading={!survey && isLoading}
                title={t('survey.no')}
                color={styles.buttonColors.color}
                containerStyle={styles.buttonStyle}
                titleStyle={{fontSize: 10}}
                onPress={() => {
                  setSurvey(false)
                  mutate({
                    id: profile?.id as number,
                    event: 'debit_card_survey',
                    response: {want_to_card: 'NO'},
                  })
                }}
              />
            </View>
          </View>

          <DebitCard height={60} width={80} />
        </View>
      </ImageBackground>
    </View>
  )
}
export default Survey

const useStyles = makeStyles(({colors}) => ({
  container: {
    marginTop: 20,
    padding: 10,
  },
  imageStyle: {
    borderRadius: 8,
  },
  textStyle: {
    fontSize: 11,
    color: colors.white,
    textAlign: 'center',
  },
  insideContainer: {
    columnGap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'center',
  },
  buttonColors: {
    color: colors.tertiaryLight,
  },
  buttonStyle: {
    width: 70,
    borderRadius: 15,
    maxHeight: 24,
  },
}))
