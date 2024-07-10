import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = ({ name }) => {
  return (
    <View>
      <Text style={styles.headerStyle}>Welcome to {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    color: 'black',
    fontSize: 20,
    //height: 40,
    borderColor: 'purple',
    borderWidth: 2,
    margin: 15,
  }
});

export default Header