import React from 'react'
import {View, ViewStyle} from 'react-native'
import {Icon, ListItem, ListItemProps} from '@rneui/themed'

import {useStyles} from './Accordion.styles'

export type ListData = {
  id: number
  title: string
  description: string | JSX.Element | JSX.Element[]
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
    <View style={[styles.container, containerStyle]}>
      {data.map(({id, title, description}) => (
        <ListItem.Accordion
          key={id}
          topDivider
          disabledStyle={{opacity: 0.5}}
          expandIcon={
            <Icon name='chevron-down' type='material-community' color={styles.expanded.color} />
          }
          content={
            <ListItem.Content>
              <ListItem.Title style={[styles.title, expanded[id] && styles.expanded, titleStyles]}>
                {title}
              </ListItem.Title>
            </ListItem.Content>
          }
          containerStyle={styles.listContainer}
          isExpanded={expanded[id]}
          onPress={() => toggleList(id)}
        >
          <ListItem key={id} topDivider bottomDivider containerStyle={styles.listContainer}>
            <ListItem.Content>
              <ListItem.Subtitle style={[styles.description, descriptionStyles]}>
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
