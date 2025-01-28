import { View, Image, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';


export default function Intro({business}) {

  const router=useRouter();
  const {user}=useUser();

  const OnDelete=()=>{
    Alert.alert('Você deseja apagar este negócio?', 'Tem certeza disso?',[
      {
        text:'Cancelar',
        style:'cancel'
      },
      {
        text:'Deletar',
        style:'destructive',
        onPress:()=>deleteBusiness()
      }
    ])
  }

  const deleteBusiness=async()=>{
    console.log("Negócio Deletado!");
    await deleteDoc(doc(db,'BusinessList', business?.id));
    router.back();
    ToastAndroid.show('Negócio Deletado!',ToastAndroid.LONG)
  }

  if (!business || !business.imageUrl){
    return (
      <View>
        <Text>Informações do negócio não disponiveis</Text>
      </View>
    );
  }
    return(
      <View>
        <View style={{
          position:'absolute',
          zIndex:10,
          display:'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width:'100%',
          padding:20
        }}>
        
        <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        
        <Ionicons name="heart-circle" size={40} color="white" />
        </View>
        <Image source={{uri: business.imageUrl}}
          style={{
            width: '100%',
            height: 340
          }}
        />

      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 20, 
        marginTop:-20, 
        backgroundColor:'#fff', 
        borderTopRightRadius:25,
        borderTopLeftRadius:25
      }}>
        <View style={{ 
          padding: 20, 
          marginTop:-20, 
          backgroundColor:'#fff', 
          borderTopRightRadius:25,
          borderTopLeftRadius:25
        }}>
          <Text style={{
            fontSize:26, 
            fontFamily:'outfit-bold'
            }}>{business.name}
          </Text>
          <Text style={{
            fontSize:16, 
            fontFamily:'outfit-medium'
            }}>{business.address}
          </Text>
        </View>
       {user?.primaryEmailAddress?.emailAddress==business?.userEmail&& <TouchableOpacity onPress={()=>OnDelete()}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>}
        </View>
      </View>
    )
}