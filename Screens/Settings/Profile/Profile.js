import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Entypo } from '@expo/vector-icons';





function Profile({navigation,route}) {


    const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
   



    





    const getResponsiveFontSize = (size) => {
      const standardScreenWidth = 375; 
      const scaleFactor = componentWidth / standardScreenWidth;
      const newSize = size * scaleFactor;
      return newSize;
    };
    
    

    
    
    const onLayout = event => {
        const { width } = event.nativeEvent.layout;
        setComponentWidth(width);
      };
    
  
    

      useFocusEffect(
        React.useCallback(() => {
         
        }, [])
      );
      useEffect(() => {
        (async () => {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          if (status !== 'granted') {
            alert('Permission to send notifications has not been granted!');
          }
        })();
      }, []);








     










                            









      
      

   














      
  
      
      
   
          
      
      




return (


<>
 

<View onLayout={onLayout} style={{width:'100%',padding:'0%',height:"100%"}} >



<View style={[tw`flex-1`,{position:'relative',zIndex:145,padding:'3%'}]}>








    
     
    





</View>



<LinearGradient
        colors={['#B707BC', '#7507BC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className=''
        style={[tw`bg-slate-700 flex flex-row justify-between items-center p-3`,{width:"100%"}]}
      >


  <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={[tw`flex flex-row items-center`,]}>
  <Image
   style={[tw`h-9 w-9 rounded-3xl`,,{width:getResponsiveFontSize(35),height:getResponsiveFontSize(35)}]}
           
            source={require('../../assets/photo_2023-01-06_02-50-02.jpg')}
          
         />
     
  </TouchableOpacity>



  

  <TouchableOpacity onPress={()=>{navigation.navigate('Staduim')}} className="flex flex-row items-center">
  <Image
     style={[tw`h-9 w-9 rounded-3xl`,,{width:getResponsiveFontSize(35),height:getResponsiveFontSize(35)}]}
            source={require('../../assets/std.png')}
          
         />
        
  </TouchableOpacity>

  <TouchableOpacity  className="flex flex-row items-center">
<Entypo name="home" size={getResponsiveFontSize(35)} color="white" />
  </TouchableOpacity>  




  <TouchableOpacity  onPress={()=>{navigation.navigate('Notifi')}}  className="flex flex-row items-center">
  {numbernotif>0 &&
 <Text style={{position:'absolute',backgroundColor:'red',zIndex:44,left:'55%',color:'white',paddingHorizontal:getResponsiveFontSize(5),borderRadius:getResponsiveFontSize(15)}}>{numbernotif}</Text>
 }<Image
    style={[tw`h-9 w-9 rounded-3xl`,{width:getResponsiveFontSize(35),height:getResponsiveFontSize(35)}]}
            source={require('../../assets/ntf.png')}
          
         />
        
  </TouchableOpacity>


  <TouchableOpacity onPress={()=>{AsyncStorage.removeItem('token');navigation.navigate("Login") }} className="flex flex-row items-center">
  <AntDesign name="logout" size={getResponsiveFontSize(27)} color="white" />
  </TouchableOpacity>




</LinearGradient>

  




















  </View>



</>

)
}

export default Profile;





























