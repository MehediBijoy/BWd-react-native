import React from 'react'
import {ListItem, ListItemProps} from '@rneui/themed'
import {View, StyleSheet, ViewStyle} from 'react-native'

import {useStyles} from './Accordion.styles'

export type ListData = {
  id: number
  title: string
  description: string | JSX.Element
}

export type AccordionProps = {
  titleStyles?: ListItemProps
  descriptionStyles?: ListItemProps
  containerStyle?: ViewStyle
  data: ListData[]
}

const Accordion = ({data, titleStyles, descriptionStyles, containerStyle}: AccordionProps) => {
  const styles = useStyles()
  const [expanded, setExpanded] = React.useState<{[key: number]: boolean}>({})

  const toggleList = (id: number) => {
    if (expanded[id]) {
      setExpanded({[id]: false})
    } else {
      setExpanded({[id]: true})
    }
  }
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      {data.map(({id, title, description}) => (
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
          onPress={() => toggleList(id)}
        >
          <ListItem key={id} topDivider bottomDivider>
            <ListItem.Content>
              <ListItem.Subtitle
                style={StyleSheet.flatten([styles.description, descriptionStyles])}
              >
                {description}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
      ))}
    </View>
  )
}

export default Accordion
