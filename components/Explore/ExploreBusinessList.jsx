import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import ExploreListCard from './ExploreListCard'

export default function ExploreBusinessList({businessList}) {
  return (
    <ScrollView>
      <FlatList
        data={businessList}
        scrollEnabled={false}
        nestedScrollEnabled // Permite rolagem aninhada
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ExploreListCard
            key={index}
            business={item}
          />
        )}
      />
      <View style={{
        height:200
      }}/>
    </ScrollView>
  )
}