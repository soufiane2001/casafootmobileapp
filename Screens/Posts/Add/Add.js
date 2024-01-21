import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { Entypo } from '@expo/vector-icons';



function Add({navigation,route}) {


    const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
    const SERVER_URL = 'https://api.cloudinary.com/v1_1/dzkx1z6lo/upload';
    const [imageUri, setImageUri] = React.useState(null);
    const [image, setImage] = React.useState("https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Photo_Add-RoundedBlack-512.png");
    const [imagesend, setImagesend] =React.useState(null)
    const [componentWidth, setComponentWidth] = useState(0);
    const [text, setText] = React.useState('');



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
    
  
    


      const selectImage =async() => {
  

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
           allowsEditing: true,
           aspect: [4, 3],
           base64: true
         });
    
        if (!result.assets[0].cancelled) {
          setImageUri(result.assets[0].uri);
        }
  
     
             try {
              let base64Img =  `data:image/jpg;base64,${result.assets[0].base64}`;
                   
             //Add your cloud name
            let apiUrl = 'https://api.cloudinary.com/v1_1/dzkx1z6lo/upload';
         
             let data = {
               "file": base64Img,
               "upload_preset": "soufiane",
             }
       
              fetch(apiUrl, {
               body: JSON.stringify(data),
               headers: {
                 'content-type': 'application/json'
               },
               method: 'POST',
             }).then(response => response.json())
             .then(responseJson => {
           
            setImage(responseJson.url)
            setImagesend(responseJson.url)
            console.log(responseJson.url)
             }) 
       
             } catch (error) {
               console.log(error)
             }
       
       
             };
       
       
       
       
        
     
    const go=(t)=>{
      setTimeout(()=>{
      
        navigation.navigate(t)},500)
    
    }



    const handleUpload = () => {
        // Perform your upload logic using selectedFile.uri
       
          console.log( imageUri);
          // Add your upload code here
        
      };
    
    
    
    
      

   














return (


<>
 

<View onLayout={onLayout} style={{width:'100%',padding:'0%',height:"100%"}} >


<LinearGradient
        colors={['#FFFDFD', '#8A8786']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className=''
        style={[tw`bg-slate-700 flex-1`]}
      >


<View style={[tw`flex flex-row justify-center items-center  p-3`,{height:'45%',width:'100%'}]} >

<TouchableOpacity   style={[{marginTop:'-2%',width:getResponsiveFontSize(230),height:getResponsiveFontSize(200),borderRadius:10 }]} onPress={selectImage}>
<Image 
 className="mt-10"
 source={{ uri: image }}
        style={{marginTop:'2%',width:"100%",height:'100%',borderRadius:10 ,resizeMode:'stretch'}}
      />
</TouchableOpacity>
</View>



<View style={{height:'55%',padding:'4%'}}>

<Text style={{fontSize:getResponsiveFontSize(17),fontFamily:'PoppinsMedium'}}>Description</Text>

<TextInput
    value={text}
    onChangeText={text => setText(text)}
    style={[tw`border border-gray-300 text-gray-800   block    rounded-md  pl-4 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`,
    {width:'100%',fontFamily:'PoppinsRegular',marginTop:'6.5%',
    padding:'0.75%',backgroundColor:'#F3F1F1',
    fontSize:getResponsiveFontSize(17),
    maxHeight:getResponsiveFontSize(180)

  }]}
        multiline
    numberOfLines={7}

    />




<TouchableOpacity onPress={()=>{navigation.navigate('Home',{image:imagesend,text:text})}}>
<LinearGradient
        colors={['#B707BC', '#7507BC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[tw`flex flex-row  justify-end   rounded-lg`,{paddingLeft:'4.5%',paddingRight:'4.8%',marginTop:'4%',padding:'1%',marginLeft:'80%',alignSelf:'flex-start'}]}
     
      >
         
            <Text style={{textAlign:'center',fontFamily:'PoppinsMedium',color:'white',fontSize:getResponsiveFontSize(14)}}>Save</Text>
        </LinearGradient>
</TouchableOpacity>












</View>

































        </LinearGradient>


















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
           
            source={require('../../../assets/photo_2023-01-06_02-50-02.jpg')}
          
         />
     
  </TouchableOpacity>



  

  <TouchableOpacity onPress={()=>{navigation.navigate('Staduim')}} className="flex flex-row items-center">
  <Image
     style={[tw`h-9 w-9 rounded-3xl`,,{width:getResponsiveFontSize(35),height:getResponsiveFontSize(35)}]}
            source={require('../../../assets/std.png')}
          
         />
        
  </TouchableOpacity>

  <TouchableOpacity  className="flex flex-row items-center">
<Entypo name="home" size={getResponsiveFontSize(35)} color="white" />
  </TouchableOpacity>  




  <TouchableOpacity  className="flex flex-row items-center">
  <Image
    style={[tw`h-9 w-9 rounded-3xl`,{width:getResponsiveFontSize(35),height:getResponsiveFontSize(35)}]}
            source={require('../../../assets/ntf.png')}
          
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

export default Add

