import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors';
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';

export default function explore() {

  const [businessList,setBusinessList]=useState([]);
  const [searchQuery, setSearchQuery]=useState('');

  const getBusinessByCategory=async(category)=>{
    setBusinessList([]);
    if (!category || typeof category !== 'string') {
      console.error('Categoria inválida', category);
      return;
    }

    try {
      const q=query(
        collection(db, 'BusinessList'),
        where ('category', '==', category)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=> {
        //console.log(doc.data()); // Console usado para pegar todas as informaçoes do negócio.
        setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
      });
    } catch (error) {
      console.error('Erro ao buscar negócio pela categoria:', error);
    }
  };

  // Function para quando apertar Enter ou finalizar a digitaçao
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const normalizeQuery = searchQuery.trim().toLowerCase();
      console.log('Realizando busca para:', searchQuery);
      getBusinessByCategory(searchQuery.trim());
    }
  };

  return (
    <View style={{
      padding:20
    }}>

      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25
      }}
      >Explore</Text>
      {/* SearchBar */}
      <View style={{
        display:'flex',
        flexDirection: 'row',
        gap:10,
        alignItems:'center',
        backgroundColor:'#fff',
        padding:10,
        marginVertical: 10,
        marginTop: 15,
        borderRadius:8,
        borderWidth:1,
        borderColor:Colors.PRIMARY
      }}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput 
          placeholder='Busque aqui...'
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Atualiza o estado com o texto digitado
          onSubmitEditing={handleSearch} // Chama a busca ao pressionar Enter
          style={{fontFamily:'outfit-regular',fontSize:16}}
        ></TextInput>
      </View>   
      {/* Categorias */}
      <Category
        explore={true}
        onCategorySelect={(category) =>{
          console.log('Categoria Selecionada:', category);
          getBusinessByCategory(category); 
        }}
      />
      {/* Lista de negócios */}
      <ExploreBusinessList businessList={businessList}/>
    </View>
  )
}