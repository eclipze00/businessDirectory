import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Review from '../../components/BusinessDetail/Review';





export default function BusinessDetail() {

  const {businessid}=useLocalSearchParams();
  const [business, setBusiness]=useState();
  const [loading, setLoading] = useState(false);

    useEffect(()=>{
      GetBusinessDetailById();
    },[])

  /**
   * Usado para buscar o Id do Negócio
   */
  const GetBusinessDetailById=async()=>{
    setLoading(true);
    const docRef = doc(db, 'BusinessList', businessid);
    const docSnap=await getDoc(docRef);
    if (docSnap.exists()){
      console.log ("Document Data:", docSnap.data());
      setBusiness({id:docSnap.id,...docSnap.data()});
      setLoading(false);
    } else{
      console.log("Documento Inexistente");
      setLoading(false);
    }
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
      {loading?
     <ActivityIndicator
     style={{
      marginTop: '70%'
     }}
        size={'large'}
        color={Colors.PRIMARY}
     />:
     <View>      
        {/**Intro*/}
        <Intro business={business} style={{ borderWidth: 1, borderColor: 'red' }}/>
        {/* Action Buttons */}
        <ActionButton business={business} style={{ borderWidth: 1, borderColor: 'blue'}}/>
        {/* Sobre */}
        <About business={business} style={{ borderWidth: 1, borderColor: 'green' }}/>
        {/* Avaliaçoes */}
        <Review business={business}/>
     </View>
    }
    </ScrollView>
  )
}