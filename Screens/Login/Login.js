import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Dimensions} from 'react-native';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import tw from 'twrnc';








function Login({navigation}) {


    const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] =React.useState('');
    const [componentWidth, setComponentWidth] = useState(0);
    const [load, setLoad] = React.useState(0);
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
    
  
  
      const handleLogin = async() => {
       // setEmail("")
        //setPassword("")
        setLoad(0.6)
        // Create the payload
        const data = {
          email: email,
          password: password,
        };
    
        // Send the login data to the server
        fetch('http://192.168.11.100:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(async responseData => {
            // Handle the response from the server
           await AsyncStorage.setItem("token",responseData.token);
          // console.log(String(responseData.user_id))
           await AsyncStorage.setItem("id",String(responseData.user_id));
         navigation.navigate('Home')
           // console.log('Login response:', responseData);

           if(responseData.error){
             setTimeout(()=>{
              setshowalert(true)
            setLoad(0)
            },1500)
           }
           setLoad(0)
           
            
          })
          .catch(error => {
            setLoad(0)
                    console.error('Error:', error);
          });
      };
    
    


      
   useEffect(()=>{
    //checktoken()
 
    },[])
 
    
    checktoken=async()=>{
  const values= await AsyncStorage.getItem("token");
     if(values!=undefined){
       navigation.navigate("Home")
     } 
    }
 
 






   var getusertoken=async(token)=>{
     

    fetch('http://192.168.11.100:8000/api/get-user-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(token),
    })
      .then(response => response.json())
      .then(async responseData => {


        console.log('id of token user', responseData);

      
       
        
      })
      .catch(error => {
      
                console.error('Error:', error);
      });



        }
     




   




return (


<>
 

<View onLayout={onLayout} style={{flex:1,width:'100%',padding:'4.5%',display:'flex',justifyContent:'center',alignItems:'center'}} className="flex-1 ">
<Stack style={{opacity:load,position:'absolute',width:'109%',height:'115%',left:'0%',right:'0%',top:'0%',zIndex:111}} fill center spacing={4}>

<ActivityIndicator size="large" color="purple"/>

</Stack>

<View  style={{position:'relative',marginTop:'8%',zIndex:155,width:"100%",display:'flex',justifyContent:'center',alignItems:'center'}}>
<Image
      source={require('../../assets/logo.png')}
      style={{width:getResponsiveFontSize(55)}}
      resizeMode="contain"
    />

<Text   style={[tw`text-gray-900`,{fontFamily:'PoppinsRegular',fontSize:20}]} >Sign in to your account</Text>
<Text  className=' text-gray-800 '
    style={[tw`text-gray-800`,{fontSize:getResponsiveFontSize(13),fontFamily:'PoppinsRegular',width:'100%',marginTop:'8%'}]}
    >Email address</Text>


<TextInput
    value={email}
    onChangeText={text => setEmail(text)}
    style={[tw`border border-gray-300 text-gray-800   block    rounded-md  pl-4 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`,{width:'100%',fontFamily:'PoppinsRegular',marginTop:'2.5%',padding:'1.75%',
    fontSize:getResponsiveFontSize(14),
   
  }]}
    
      keyboardType="email-address"
    />

<Text  className=' text-gray-800 '
    style={[tw`text-gray-800`,{fontSize:getResponsiveFontSize(13),fontFamily:'PoppinsRegular',width:'100%',marginTop:'5%'}]}
    >Password</Text>


<TextInput
    value={password}
    onChangeText={text => setPassword(text)}
    style={[tw`border border-gray-300 text-gray-800   block    rounded-md  pl-4 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`,{width:'100%',fontFamily:'PoppinsRegular',marginTop:'2.5%',padding:'1.75%',
    fontSize:getResponsiveFontSize(14),

  }]}
  secureTextEntry
     
      placeholderTextColor="#BCBCBC" 
    />

<TouchableOpacity onPress={handleLogin} style={[tw`bg-indigo-600 rounded items-center justify-center`,{width:'100%',padding:'3%',marginTop:'5%'}]} >
      <Text 
         style={[tw`text-white font-bold`,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(15)}]}
      >Login</Text>
    </TouchableOpacity>


    <TouchableOpacity onPress={()=>{navigation.navigate("Signup")}}   style={{width:'100%',padding:'1%',marginTop:'5%',marginBottom:'20%'}} >
      <Text
         style={[tw`text-gray-800  text-center`,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(12)}]}
      >
        Don't have an account? Sign up here
      </Text>
    </TouchableOpacity>  







   
</View>

 
  </View>



</>

)
}

export default Login