import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated,Text,TouchableOpacity,Image,Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
export default function App() {
 
  const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
  const [componentWidth, setComponentWidth] = useState(0)
  const [numbernotif, setNumbernotifi] = React.useState(0);


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
  







  return (
    <View onLayout={onLayout} style={{flex:1}}>
      

 <View style={{flex:1,paddingVertical:'45%'}}>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',padding:'5%',height:'30%',borderBottomWidth:1,borderColor:'#E3E3E3'}}>
        <Entypo name="calendar" size={getResponsiveFontSize(30)} color="#AD0589" />
          <Text style={[{fontFamily:'PoppinsRegular',marginLeft:'5%',color:'black',fontSize:getResponsiveFontSize(16)}]}>Reservation</Text>
        </View>

        <View style={{display:'flex',flexDirection:'row',alignItems:'center',padding:'5%',height:'30%',borderBottomWidth:1,borderColor:'#E3E3E3'}}>
        <FontAwesome name="user" size={getResponsiveFontSize(30)} color="#AD0589" />
          <Text style={[{fontFamily:'PoppinsRegular',marginLeft:'5%',color:'black',fontSize:getResponsiveFontSize(16)}]} >Information personnel</Text>
        </View>


        <View style={{display:'flex',flexDirection:'row',alignItems:'center',padding:'5%',height:'30%',borderBottomWidth:1,borderColor:'#E3E3E3'}}>
        <MaterialIcons name="support-agent" size={getResponsiveFontSize(30)}  color="#AD0589" />
          <Text style={[{fontFamily:'PoppinsRegular',marginLeft:'5%',color:'black',fontSize:getResponsiveFontSize(16)}]}>Support</Text>
        </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    position: 'absolute',
  },
});
