import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';

export default function BusinessListByCategory() {

  const navigation=useNavigation();

  //para pegar o nome da categoria
  const {category}=useLocalSearchParams();

  const [businessList, setBusinessList]=useState([]);
  const [loading, setLoading]=useState(false);

  useEffect(()=>{
    navigation.setOptions({
      headerShown:true,
      headerTitle:category
    })
    getBusinessList()
  },[]);

  /*
    usado para pegar a businessList por categoria
  */
  const getBusinessList=async()=>{
    setLoading(true)
    const q=query(collection(db, 'BusinessList'), where("category",'==',category));
    const querySnapshot=await getDocs(q);

    querySnapshot.forEach((doc)=>{
      console.log(doc.data())
      setBusinessList(prev=>[...prev,doc.data()])
    })
    setLoading(false);
  }

  return (
    <View>
      {businessList?.length>0&&loading==false?
      <FlatList
        data={businessList}
        refreshing={loading}
        onRefresh={getBusinessList}
        renderItem={({item,index})=>(
          <BusinessListCard
            business={item}
            key={index}
          />
        )}
      />:
      loading?<ActivityIndicator style={{
        marginTop:'60%'
      }}
      size={'large'} 
      color={Colors.PRIMARY}/>:
      <Text style={{
        fontSize: 25,
        fontFamily: 'outfit-bold',
        color:Colors.GRAY,
        textAlign:'center',
        marginTop:'50%'
      }}>
        Nenhum local encontrado.
      </Text>}
    </View>
  )
}