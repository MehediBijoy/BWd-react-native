import React, {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {ScrollView} from 'react-native'
import {makeStyles} from '@rneui/themed'

import Modal from '@core/Modal'
import {Table} from '@core/Table'

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
            tierId: `${t('tierOverview.level')} ${index + 1}`,
            description:
              index !== arr.length - 1
                ? ` ${t('tierOverview.from')} ${formatNumber(curr?.amount, {
                    locales: currentLang,
                  })} ${t('tierOverview.upTo')} ${formatNumber(arr[index + 1]?.amount, {
                    locales: currentLang,
                  })}`
                : `${t('tierOverview.from')} ${formatNumber(curr?.amount, {locales: currentLang})}`,
            tierFee: `${
              curr?.rate &&
              formatNumber(curr?.rate, {
                locales: currentLang,
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            } ${currency}`,
          },
        ],
        []
      ),
    [currentLang, data]
  )

  const config = [
    {
      header: 'tierOverview.tier',
      fields: ['tierId'],
      cellStyle: styles.tierItem,
    },
    {
      header: 'tierOverview.amount',
      fields: ['description'],
      cellStyle: styles.tierDescription,
    },
    {
      header: 'tierOverview.fee',
      fields: ['tierFee'],
      cellStyle: styles.tierFee,
    },
  ]

  return (
    <Modal title={t('tierOverview.title')} isOpened={isOpened} onClose={onClose}>
      <ScrollView>
        {<Table containerStyle={styles.container} config={config} data={fees} />}
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
    width: '52%',
    textAlign: 'left',
  },
  tierItem: {
    color: colors.textPrimary,
    width: '20%',
    textAlign: 'left',
  },
  tierFee: {
    color: colors.textPrimary,
    width: '28%',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
}))
