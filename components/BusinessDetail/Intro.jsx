import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Intro({business}) {
  return (
    <View>
      <Image source={{uri:business.imageUrl}}
        style={{
          width: '100%',
          height: 240
        }}
      />
    </View>
  )
}