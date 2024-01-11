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
      fields: ['tierId'],
      cellStyle: styles.tierItem,
    },
    {
      fields: ['description'],
      cellStyle: styles.tierDescription,
    },
    {
      fields: ['tierFee'],
      cellStyle: styles.tierFee,
    },
  ]

  return (
    <Modal title={t('tierOverview.title')} isOpened={isOpened} onClose={onClose}>
      <ScrollView>
        {<Table config={config} data={fees} localKeyPrefix={'tierOverview.table'} />}
      </ScrollView>
    </Modal>
  )
}

export default TierOverviewModal
const useStyles = makeStyles(({colors}) => ({
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
