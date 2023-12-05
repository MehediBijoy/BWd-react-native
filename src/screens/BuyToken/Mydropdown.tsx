import React, {useState} from 'react'
import {View, Text, TouchableOpacity, FlatList} from 'react-native'

const MyCustomDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const data = [
    {label: 'Option 1', value: 'option1', icon: () => <Text>Icon 1</Text>},
    {label: 'Option 2', value: 'option2', icon: () => <Text>Icon 2</Text>},
    // Add more items as needed
  ]

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const selectItem = item => {
    setSelectedItem(item)
    setShowDropdown(false)
  }

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: 'green',
          padding: 10,
        }}
        onPress={toggleDropdown}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {selectedItem && selectedItem.icon && selectedItem.icon()}
          <Text>{selectedItem ? selectedItem.label : 'Select an option'}</Text>
        </View>
        {/* <C>{showDropdown ? <Text>▲</Text> : <Text>▼</Text>}</C>  */}
      </TouchableOpacity>

      {showDropdown && (
        <View style={{marginTop: 5, borderColor: 'gray', borderWidth: 1}}>
          <FlatList
            data={data}
            keyExtractor={item => item.value}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', padding: 10}}
                onPress={() => selectItem(item)}
              >
                {item.icon && item.icon()}
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  )
}

export default MyCustomDropdown
