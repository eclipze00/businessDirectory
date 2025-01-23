import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDoc, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import PopularBusinessCard from './PopularBusinessCard'

export default function PopularBusiness() {

  const [businessList, setBusinessList]=useState([]);

  useEffect(()=>{
    GetBusinessList();
  },[]);

  const GetBusinessList=async()=>{
    try {
      const q=query(collection(db, 'BusinessList'), limit(10));
      const querySnapshot = await getDocs(q);

      const business = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBusinessList(business);
    } catch (error) {
      console.error('Erro ao buscar a lista de negócios:', error);
    }
  };

  return (
    <View>
      <View style={{
        padding:20,
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        marginTop: 10
      }}>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit-bold'
      }}>
        Popular Business
      </Text>

      <Text style={{
        color:Colors.PRIMARY,
        fontFamily:'outfit-medium'
      }}>
        View All
      </Text>

      </View>

      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id} // Define um unico ID para cada Item
        renderItem={({item})=>(
          <PopularBusinessCard
            business={item}/>
        )}
      />

    </View>
  )
}