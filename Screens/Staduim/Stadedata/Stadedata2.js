import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Dimensions} from 'react-native';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import tw from 'twrnc';
import OnboardingAnimate from 'react-native-onboarding-animate';















function Stadedata2({navigation}) {
   


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





<View>


<View style={{display:'flex',flexDirection:'row',height:'50%',justifyContent:'space-around',alignItems:'center'}} >

<AntDesign name="leftcircle" size={getResponsiveFontSize(24)} color="#1556F6" />

<Image
           source={{uri:'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf65bc65fc205ad23/641b4e9c99cb6c0a57d664c6/Disen%CC%83o_sin_ti%CC%81tulo-9.jpg?auto=webp&format=pjpg&width=3840&quality=60'}}
          style={{width:"75%",height:'100%',marginLeft:'0%',borderRadius:getResponsiveFontSize(10)}}
    
      />

<AntDesign name="rightcircle" size={getResponsiveFontSize(24)} color="#1556F6" />

</View>



<Text style={[tw` text-gray-700 text-center mt-3 `,{fontFamily:'PoppinsLight',fontSize:getResponsiveFontSize(20)}]}>Estadio di dragaso</Text>






<View   style={[tw`flex flex-row   justify-around`,{marginTop:'2%'}]}>

  


<Image

source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR_5g9N3J_Itaf31x72Cn5uOL6cf64G-wdxAHIH88CqjJS17Q6zHDHja0069SGb9H_LRI&usqp=CAU'}}
          style={{width:getResponsiveFontSize(50),height:getResponsiveFontSize(50),marginLeft:'0%',borderRadius:getResponsiveFontSize(10),
        borderWidth:getResponsiveFontSize(1.5),borderColor:'#FF2507'
        }}
    
      />

<Image
     
     source={{uri:'https://www.pkfoot.com/wp-content/uploads/r1047326_1296x729_16-9.jpg'}}
          style={{width:getResponsiveFontSize(50),height:getResponsiveFontSize(50),marginLeft:'0%',borderRadius:getResponsiveFontSize(10)}}
    
      />


<Image
          
          source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrczTWOW3qX1M-Sx2-b4jNUnVH6E68r9q3_YA2NtH52KFInUsGmxUw707BQlk6UGaSy6U&usqp=CAU'}}
          style={{width:getResponsiveFontSize(50),height:getResponsiveFontSize(50),marginLeft:'0%',borderRadius:getResponsiveFontSize(10)}}
    
      />


<Image
           
           source={{uri:'https://a1.eestatic.com/cronicaglobal/2023/06/23/culemania/palco/773682742_8121761_1706x960.jpg'}}
          style={{width:getResponsiveFontSize(50),height:getResponsiveFontSize(50),marginLeft:'0%',borderRadius:getResponsiveFontSize(10)}}
    
      />





</View>























</View>



)
}

export default Stadedata2