import React, {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {ScrollView, View} from 'react-native'
import {makeStyles, Text} from '@rneui/themed'

import Modal from '@core/Modal'

import {formatNumber} from 'utils'
import {Asset, AssetRates} from 'api/Response'
import {useCurrency, useLocales} from 'hooks/states'
import useAssetRates from 'hooks/helper/useAssetsRates'

type TierOverviewModalProps = {
  isOpened: boolean
  onClose: () => void
  bwgLimit?: Asset
}

type ReduceData = {
  id: number
  min: string
  max: string
} & AssetRates

const TierOverviewModal = ({isOpened, onClose}: TierOverviewModalProps) => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {currency} = useCurrency()
  const {currentLang} = useLocales()
  const {data} = useAssetRates(currency, 'BWG')

  const fees = useMemo(
    () =>
      data?.reduce(
        (acc: ReduceData[], curr: AssetRates, index: number, arr: AssetRates[]) => [
          ...acc,
          {
            ...curr,
            id: index,
            min: formatNumber(curr?.amount, {locales: currentLang}),
            max: formatNumber(arr[index + 1]?.amount, {locales: currentLang}),
          },
        ],
        []
      ),
    [currentLang, data]
  )

  return (
    <Modal title={t('tierOverview.title')} isOpened={isOpened} onClose={onClose}>
      <ScrollView>
        <View style={[styles.container]}>
          <View style={[styles.tableRow, styles.headerRow]}>
            <Text style={styles.tierItem}>{t('tierOverview.tier')}</Text>
            <Text style={styles.tierDescription}>{t('tierOverview.amount')}</Text>
            <Text style={styles.tierFee}>{t('tierOverview.fee')}</Text>
          </View>
          {fees?.map(({id, min, max, rate}, index: number) => (
            <View
              key={id}
              style={[
                styles.tableRow,
                index === fees?.length - 1 ? styles.bottomRow : styles.bodyRow,
              ]}
            >
              <Text style={styles.tierItem}>
                {t('tierOverview.level')} {id + 1}
              </Text>
              <Text style={styles.tierDescription}>
                {id !== fees.length - 1
                  ? ` ${t('tierOverview.from')} ${min} ${t('tierOverview.upTo')} ${max}`
                  : `${t('tierOverview.from')} ${min}`}
              </Text>
              <Text style={styles.tierFee}>
                {rate &&
                  formatNumber(rate, {
                    locales: currentLang,
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}{' '}
                {currency}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Modal>
  )
}

export default TierOverviewModal
const useStyles = makeStyles(({colors}) => ({
  container: {
    backgroundColor: colors.background,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tableRow: {
    padding: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerRow: {
    backgroundColor: colors.bgPaper,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bodyRow: {
    borderBottomWidth: 1,
    borderColor: colors.divider,
  },
  bottomRow: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  tierDescription: {
    color: colors.textPrimary,
    width: '50%',
    textAlign: 'left',
  },
  tierItem: {
    color: colors.textPrimary,
    width: '25%',
    textAlign: 'left',
  },
  tierFee: {
    color: colors.textPrimary,
    width: '25%',
    textAlign: 'right',
  },
}))
