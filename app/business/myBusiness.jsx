import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ExploreListCard from '../../components/Explore/ExploreListCard';
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function myBusiness() {

  const {user}=useUser();

  const [businessList, setBusinessList]=useState([]);
  const [loading, setLoading]=useState(false);
  const navigation=useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerShown:true,
      headerTitle:'My Business',
      headerStyle: {
        backgroundColor:Colors.PRIMARY
      }
    })
    user&&GetUserBusiness()
  }, [user])

  // Usado para pegar a lista de negocios por email do usuario

  const GetUserBusiness=async()=>{
    setLoading(true);
    setBusinessList([]);
    const q=query(collection(db, 'BusinessList')
    , where('userEmail', '==',user?.primaryEmailAddress?.emailAddress));

    const querySnapshot=await getDocs(q);

    querySnapshot.forEach((doc)=>{
      console.log(doc.data());
      setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
    })
    setLoading(false)
  }
  return (
    <View style={{
      padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>My Business</Text>

      <FlatList
        data={businessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({item, index})=>(
          <ExploreListCard 
            business={item}
            key={index}
          />
        )}
      />

    </View>
  )
}