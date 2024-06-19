import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'

export default function home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>

        { /* Header */}
          <Header></Header>

        { /* Slider */}
          <Slider/>
        
        { /* Category */}

          <Category></Category>

        { /* Polular Business List */}

        <PopularBusiness></PopularBusiness>

        <View style={{
          height:100
        }}>

        </View>

    </ScrollView>
  )
}