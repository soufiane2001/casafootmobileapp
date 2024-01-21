import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Dimensions} from 'react-native';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import tw from 'twrnc';
import { Entypo } from '@expo/vector-icons';
import OnboardingAnimate from 'react-native-onboarding-animate';

import Stadedata from './Stadedata/Stadedata';
import Stadedata2 from './Stadedata/Stadedata2';



let scenes = [
  {
    component: Stadedata,
    backgroundColor: 'yellow'
  }, {
    component: Stadedata2,
    backgroundColor: 'orange'
  },
];










function Stadium({navigation}) {
   

  const Staduims = [
    { title: 'Dragao', images:['https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Porto_Est%C3%A1dio_do_Drag%C3%A3o_1.jpg/1200px-Porto_Est%C3%A1dio_do_Drag%C3%A3o_1.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/9b/24/07/estadio-do-dragao.jpg?w=1200&h=1200&s=1',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuJ4CQAFMc9LjzioIg6sI2spGkH_8aiVcM0TAO21ItV-1SGCwRoAXTGxvqg6_cHDxps10&usqp=CAU',
  'https://files.app.fcporto.pt/sources/5c90c1275b9baxXEyzMpfKo1ryKNJ.jpg'
  ] },

  { title: 'Campnou', images:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR_5g9N3J_Itaf31x72Cn5uOL6cf64G-wdxAHIH88CqjJS17Q6zHDHja0069SGb9H_LRI&usqp=CAU',
  'https://www.fcbarcelona.com/photo-resources/2021/08/09/276ad270-e5c6-453d-8d9f-212417ad7cb3/Camp-Nou-3.jpg?width=1200&height=750',
  'https://www.spain.info/.content/imagenes/cabeceras-grandes/cataluna/camp-nou-barcelona-c-fcbarcelona.jpg',
  'https://www.fcbarcelona.com/fcbarcelona/photo/2018/06/05/7dfd1b69-088a-4554-b797-6f8080a6eee1/13-14_wallpaper_camp-nou_001_cat.v1382006897.jpg'
  ] },
   
  ];




  const [index,setindex]=useState(0);

  
  const [indexchoix,setindexchoix]=useState(0);



const right=()=>{
  setindexchoix(0)
  if(index<Staduims.length-1)
  {
    setindex(x=>x+1)
  }
else{
  setindex(0)
}



}


const left=()=>{
  setindexchoix(0)
  if(index>0){
    setindex(x=>x-1)
  }
  else{
    setindex(1)
  }
  
  }




const changeitem=(x)=>{

  setindexchoix(x)
}












    const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
    const [componentWidth, setComponentWidth] = useState(0);
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


<>
 

<View onLayout={onLayout} style={{height:'100%',width:'100%',padding:'0%'}} className="flex-1 ">




<View style={{flex:1,display:'flex',justifyContent:'space-around'}}>

    
   <View  style={[tw`flex flex-row  items-center justify-end`,{width:'100%',marginTop:'0%',paddingHorizontal:'4%'}]}>
    

         <Image
           source={require('../../assets/logo.png')}
          style={{width:getResponsiveFontSize(50),height:getResponsiveFontSize(36),marginLeft:'0%'}}
         resizeMode="contain"
      />
        <Text style={[{fontFamily:'PoppinsRegular',color:'black',marginLeft:'0%',fontSize:getResponsiveFontSize(16)}]}>Casasport</Text>

  </View>




<View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >

<TouchableOpacity onPress={()=>{left()}}>
<AntDesign name="leftcircle" size={getResponsiveFontSize(24)} color="#1556F6" />
</TouchableOpacity>
<Image
           source={{uri:Staduims[index].images[indexchoix]}}
          style={{width:"75%",height:getResponsiveFontSize(250),marginLeft:'0%',borderRadius:getResponsiveFontSize(10)}}
    
      />
<TouchableOpacity onPress={()=>{right()}}>
<AntDesign name="rightcircle" size={getResponsiveFontSize(24)} color="#1556F6" />
</TouchableOpacity>

</View>


<Text style={[tw` text-gray-700 text-center `,{fontFamily:'PoppinsLight',fontSize:getResponsiveFontSize(20)}]}>
  {Staduims[index].title}</Text>






<View   style={[tw`flex flex-row   justify-around`]}>

  


{Staduims[index].images.map((x,key)=>{return(

<TouchableOpacity onPress={()=>{changeitem(key)}}>
<Image

source={{uri:x}}
          style={{width:getResponsiveFontSize(50),height:getResponsiveFontSize(50),marginLeft:'0%',borderRadius:getResponsiveFontSize(10),
        borderWidth:key==indexchoix ? getResponsiveFontSize(1.75) : 0,borderColor:'red'
        }}
    
      />
</TouchableOpacity>


)})}





</View>













<TouchableOpacity onPress={()=>{navigation.navigate("Reservation",{index:(index+1)})}}   style={[tw`bg-blue-600  rounded-2xl items-center justify-center`,{padding:getResponsiveFontSize(10)
,marginLeft:'12.5%',width:'75%'}]} >
      <Text 
         style={[tw`text-white`,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(15)}]}
      >Reserver</Text>
    </TouchableOpacity>








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




  <TouchableOpacity  className="flex flex-row items-center">
  <Image
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

export default Stadium