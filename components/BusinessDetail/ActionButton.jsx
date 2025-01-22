import { View, Text, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ActionButton({business}) {

  const actionButtonMenu=[
    {
      id:1,
      name:'Ligue',
      icon:require('./../../assets/images/call.png'),
      url:`tel:${business?.contact}`  // Se certifica que o formato esta correto correto
    },
    {
      id:2,
      name:'Local',
      icon:require('./../../assets/images/pin.png'),
      url:business?.address
      ? `https://www.google.com/maps?q=${encodeURIComponent(business.address)}`: null, // Gera URL de mapa apenas se o endereço existir
    },
    {
      id:3,
      name:'Site',
      icon:require('./../../assets/images/web.png'),
      url:business?.website
    },
    {
      id:4,
      name:'Share',
      icon:require('./../../assets/images/share.png'),
      url:business?.website
    },
  ]

  const OnPressHandle=(item)=>{
    if(item.name=='share')
    {
      return; 
    }
    Linking.openURL(item.url);
  }

  return (
    <View style={{
      backgroundColor:'#fff',
      padding:20
    }}>
      <FlatList
        data={actionButtonMenu}
        horizontal={true}
        contentContainerStyle={{width: '100%', justifyContent:'space-between'}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item})=>(
          <TouchableOpacity style={{ marginBottom: 10}}
            onPress={()=>OnPressHandle(item)}
          >
            <Image 
              source={item?.icon}
              style={{
                width:50,
                height:50,
                resizeMode: 'contain'
              }}
            />
            <Text
              style={{
                fontFamily:'outfit-medium',
                textAlign:'center',
                marginTop:3
              }}            
            >{item.name}</Text>
          </TouchableOpacity>
  )}
      />
    </View>
  )
}