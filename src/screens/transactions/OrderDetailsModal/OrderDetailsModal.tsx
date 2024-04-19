import React from 'react'
import RNFetchBlob, {RNFetchBlobConfig} from 'rn-fetch-blob'
import {useTranslation} from 'react-i18next'
import {Text, makeStyles, Button} from '@rneui/themed'
import {
  View,
  Linking,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native'

import Modal from '@core/Modal'
import CopyButton from '@core/CopyButton'
import StatusBadge from '@core/StatusBadge'

import {useAuthToken} from 'hooks/api'
import {useLocales} from 'hooks/states'
import {usePlatform} from 'hooks/helper'
import {chain} from 'constants/wallet.config'
import {Payment, Transfer} from 'api/Response'
import DownloadIcon from 'images/icons/PDF.svg'
import {formatDate, formatNumber, shortAddress} from 'utils'

export type OrderDetailsModalProps = {
  isOpened: boolean
  data: Payment<Transfer>
  onClose: () => void
  showTost?: () => void
}

const OrderDetailsModal = ({data, isOpened, onClose}: OrderDetailsModalProps) => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {currentLang} = useLocales()
  const {platform, API_URL} = usePlatform()
  const token = useAuthToken(state => state.token)

  const [ispdfDownload, setIspdfDownload] = React.useState(false)

  const onExplorerClicked = (txHash: string) => {
    Linking.openURL(chain.blockExplorers?.default.url + '/tx/' + txHash)
  }

  // const printHTML = async () => {
  //   bankDetails &&
  //     (await RNPrint.print({
  //       html: html({
  //         paymentData: data,
  //         bankDetails: bankDetails,
  //         currency: data.paid_amount_currency as AllCurrencyType,
  //         t,
  //       }),
  //       jobName: `${formatDate(data.created_at, 'YYYY_MM_DD')}_brettonwoods_digital_${data.id}`,
  //     }))
  // }

  // this is previous implementations
  // const downloadPdf = async () => {
  //   try {
  //     setIspdfDownload(true)
  //     const response =
  //       token &&
  //       (await RNFetchBlob.fetch(
  //         'GET',
  //         `${API_URL}/payments/${data.id}/bank_invoice?region=${platform.toLowerCase()}`,
  //         {
  //           'Content-Type': 'application/json',
  //           Authorization: token,
  //           lang: currentLang,
  //           responseType: 'blob',
  //         }
  //       ))

  //     if (!response) {
  //       throw new Error('Something went wrong!')
  //     }

  //     const fileName = `${formatDate(data.created_at, 'YYYY_MM_DD')}_brettonwoods_digital_${
  //       data.id
  //     }.pdf`

  //     await RNFetchBlob.fs.writeFile(
  //       `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`,
  //       response.data,
  //       'base64'
  //     )
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     onClose()
  //     setIspdfDownload(false)
  //     showTost()
  //   }
  // }

  // Grant permission in Android
  const getDownloadPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'File Download Permission',
          message: 'Your permission is required to save Files to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) return true
    } catch (err) {
      return null
    }
  }

  const downloadFile = async (filename: string) => {
    const {fs} = RNFetchBlob
    const cacheDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir

    let imagePath = `${cacheDir}/${filename}`

    try {
      // Delete if exists file
      const exists = await fs.exists(imagePath)
      if (exists && Platform.OS === 'android') {
        const newImagePath = imagePath.split('.pdf')[0]
        imagePath = `${newImagePath}_${Math.floor(Math.random() * 100) + 1}.pdf`
      }

      const configOptions: RNFetchBlobConfig = Platform.select({
        ios: {
          fileCache: true,
          path: imagePath,
          appendExt: filename.split('.').pop(),
          title: 'Pdf download',
        },
        android: {
          fileCache: true,
          path: imagePath,
          appendExt: filename.split('.').pop(),
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: imagePath,
            description: 'File',
          },
        },
      }) as RNFetchBlobConfig

      const response =
        token &&
        (await RNFetchBlob.config(configOptions).fetch(
          'GET',
          `${API_URL}/payments/${data.id}/bank_invoice?region=${platform.toLowerCase()}`,
          {
            'Content-Type': 'application/json',
            Authorization: token,
            lang: currentLang,
            responseType: 'blob',
          }
        ))

      return response
    } catch (error) {
      return null
    } finally {
      setIspdfDownload(false)
    }
  }

  const handleDownload = async () => {
    try {
      setIspdfDownload(true)
      const fileName = `${formatDate(data.created_at, 'YYYY_MM_DD')}_brettonwoods_digital_${
        data.id
      }.pdf`

      if (Platform.OS === 'android') {
        getDownloadPermissionAndroid().then(() => downloadFile(fileName))
      } else {
        downloadFile(fileName).then(async filePath => {
          // filePath && RNFetchBlob.ios.previewDocument(filePath.data)
          filePath && RNFetchBlob.ios.previewDocument(filePath.data)
          // filePath &&
          //   (await RNFetchBlob.fs.writeFile(
          //     `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`,
          //     filePath.data,
          //     'utf8'
          //   ))
        })
      }
    } catch (error) {
      /* empty */
    } finally {
      /* empty */
    }
  }

  return (
    <Modal title={t('trade.modal.title.orders')} isOpened={isOpened} onClose={onClose}>
      <ScrollView>
        <View style={{marginBottom: 30}}>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.date')}</Text>
            <Text>{formatDate(data.created_at)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              {t('trade.table.headers.order') + ' ' + t('trade.table.headers.id')}
            </Text>
            <Text>#{data?.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.tradePair')}</Text>
            <Text style={[styles.labelRight]}>{data.trade_pair}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.paid')}</Text>
            <Text style={styles.labelRight}>
              {formatNumber(data.paid_amount_number, {locales: currentLang})}{' '}
              {data.paid_amount_currency}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.received')} </Text>
            <Text style={styles.labelRight}>
              {formatNumber(data.received_amount_number, {locales: currentLang})}{' '}
              {data.received_amount_currency}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.paymentType')} </Text>
            <Text style={[styles.labelRight]}>{data.payment_type}</Text>
          </View>

          {data.transfer && data.transfer.tx_hash && (
            <View style={styles.row}>
              <Text style={styles.label}>{t('trade.table.headers.blockExplorer')} </Text>
              <TouchableOpacity activeOpacity={0.8}>
                <Text
                  style={styles.explorer}
                  onPress={() => onExplorerClicked(data.transfer.tx_hash)}
                >
                  {t('trade.table.headers.viewInExplorer')}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {data.transfer && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>{t('trade.table.headers.sender')}</Text>
                <Text style={[styles.labelRight]}>
                  {data.transfer.sender ? shortAddress(data.transfer.sender, 7) : '-'}
                </Text>
                {data.transfer.sender && (
                  <View style={{alignItems: 'flex-end'}}>
                    <CopyButton toCopy={data.transfer.sender} />
                  </View>
                )}
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>{t('trade.table.headers.recipient')}</Text>

                <Text style={[styles.labelRight]}>
                  {data.transfer.recipient ? shortAddress(data.transfer.recipient, 7) : '-'}
                </Text>
                {data.transfer.recipient && (
                  <View style={{alignItems: 'flex-end'}}>
                    <CopyButton toCopy={data.transfer.recipient} />
                  </View>
                )}
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>{t('trade.table.headers.txHash')}</Text>
                <Text style={[styles.labelRight]}>
                  {data.transfer.tx_hash ? shortAddress(data.transfer.tx_hash, 7) : '-'}
                </Text>
                {data.transfer.tx_hash && (
                  <View style={{alignItems: 'flex-end'}}>
                    <CopyButton toCopy={data.transfer.tx_hash} />
                  </View>
                )}
              </View>
            </>
          )}

          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.paymentStatus')}</Text>
            <Text style={[styles.labelRight]}>
              <StatusBadge
                status={data.status ?? 'accepted'}
                label={t(`trade.orderStatuses.${data.status}`)}
              />
            </Text>
          </View>

          {data.status && data.status_reason && (
            <View style={styles.row}>
              <Text style={styles.label}>{t('trade.table.headers.paymentStatusReason')}</Text>
              <Text style={[styles.labelRight]}>{data.status_reason}</Text>
            </View>
          )}

          {data.transfer && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>{t('trade.table.headers.transferStatus')}</Text>
                <Text style={[styles.labelRight]}>
                  <StatusBadge
                    status={data.transfer.status ? data.transfer.status : 'accepted'}
                    label={
                      data.transfer.status ? t(`trade.orderStatuses.${data.transfer.status}`) : '-'
                    }
                  />
                </Text>
              </View>

              {data.transfer.status && data.transfer.status_reason && (
                <View style={styles.row}>
                  <Text style={styles.label}>{t('trade.table.headers.paymentStatusReason')}</Text>
                  <Text style={[styles.labelRight]}>{data.transfer.status_reason}</Text>
                </View>
              )}
            </>
          )}

          {data.payment_type === 'bank_transfer' && (
            <Button
              icon={<DownloadIcon height={20} width={20} />}
              title={t('bankTransfer.paymentInfo.btn')}
              titleStyle={{marginLeft: 10}}
              color='#7C7C7B'
              containerStyle={{marginTop: 25}}
              loading={ispdfDownload}
              onPress={() => {
                onClose()
                handleDownload()
              }}
            />
          )}
        </View>
      </ScrollView>
    </Modal>
  )
}

export default OrderDetailsModal

const useStyles = makeStyles(({colors}) => ({
  row: {
    gap: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: '35%',
    textAlign: 'left',
    fontWeight: '700',
    color: colors.textPrimary,
  },
  labelRight: {
    width: '50%',
    textAlign: 'left',
    color: colors.textPrimary,
  },
  explorer: {
    color: colors.tertiary,
  },
}))
