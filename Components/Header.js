import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const Header = ({ name }) => {
  const { width, height } = Dimensions.get('window');
  return (
    <View>
      <Text style={styles.headerStyle}>Welcome to {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    color: 'purple',
    fontSize: 20,
    //height: 40,
    borderColor: 'purple',
    borderWidth: 2,
    margin: 15,
    padding: 5,
  }
});

export default Header