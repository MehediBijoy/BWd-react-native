import React from 'react'
import {ListItem, ListItemProps} from '@rneui/themed'
import {View, StyleSheet, ViewStyle} from 'react-native'

import {useStyles} from './Accordion.styles'

export type ListData = {
  id: number
  title: string
  subtitle: string | JSX.Element
}

export type AccordionProps = {
  titleStyles?: ListItemProps
  subTitleStyles?: ListItemProps
  containerStyle?: ViewStyle
  data: ListData[]
}

const Accordion = ({data, titleStyles, subTitleStyles, containerStyle}: AccordionProps) => {
  const styles = useStyles()
  const [expanded, setExpanded] = React.useState<{[key: number]: boolean}>({})

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {data.map(({id, title, subtitle}) => (
        <ListItem.Accordion
          key={id}
          topDivider
          disabledStyle={{opacity: 0.5}}
          content={
            <>
              <ListItem.Content>
                <ListItem.Title style={StyleSheet.flatten([styles.title, titleStyles])}>
                  {title}
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded[id]}
          onPress={() => {
            if (expanded[id]) {
              setExpanded({[id]: false})
            } else {
              setExpanded({[id]: true})
            }
          }}
        >
          <ListItem key={id} topDivider bottomDivider>
            <ListItem.Content>
              <ListItem.Subtitle style={StyleSheet.flatten([styles.subTitle, subTitleStyles])}>
                {subtitle}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      ))}
    </View>
  )
}

export default Accordion
