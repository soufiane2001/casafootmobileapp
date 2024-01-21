import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

import tw from 'twrnc';
import { Entypo } from '@expo/vector-icons';
import OnboardingAnimate from 'react-native-onboarding-animate';






function  Notif({navigation}) {


    const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] =React.useState('');
    const [componentWidth, setComponentWidth] = useState(0);
    const [load, setLoad] = React.useState(0);
    const [notification, setNotification] =React.useState([]);
    const [userid, setUserid] =React.useState(1);
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
    
  
  
    
    


      
   useEffect(()=>{
   getnotification()
 
    },[])
 
    

 
 
var getuser=async(id)=>{
  var user={};
  var values="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjExLjEwNDo4MDAwXC9hcGlcL2xvZ2luIiwiaWF0IjoxNzAxODcwODY0LCJleHAiOjE3MDE4NzQ0NjQsIm5iZiI6MTcwMTg3MDg2NCwianRpIjoib3pRQkJEdEtId1YxQ1E5biIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.Dr3IcHIuWENqjXi-TRLlbkbb5aZEGy7etydwocgMSd8"
  await fetch ("http://192.168.11.100:8000/api/users/"+id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${values}`,
        'Content-Type': 'application/json',
      },
    }) .then(response => response.json())
          .then((res) => {  
            //console.log(res.data)
            user= res.data
         })
     .catch((error) => {return false})


return user




}





   var getnotification=async()=>{
     
     var notification=[];

     
     const values= await AsyncStorage.getItem("token"); 
     var   useriddd= await AsyncStorage.getItem("id");
    await fetch ("http://192.168.11.100:8000/api/notifications?id="+useriddd, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${values}`,
          'Content-Type': 'application/json',
        },
      }) .then(response => response.json())
            .then((res) => {  
            
                notification=res.data
          
           })
       .catch((error) => {return false})

notification=await Promise.all(notification.map(async(x)=>{
return {...x,userreact:await getuser(useriddd)}
})
)
  console.log('...........................')
console.log(notification)

setNotification(notification)


await fetch   ("http://192.168.11.100:8000/api/notifications/"+useriddd, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${values}`,
    'Content-Type': 'application/json',
  },
}) .then(response => response.json())
      .then((res) => {  
return true;
      })
      .catch((error) => {
       console.error(error);
                         });



        }
     




   




return (


<>
 

<View onLayout={onLayout} style={{flex:1,width:'100%',padding:'0%',display:'flex',justifyContent:'center',alignItems:'center'}} className="flex-1 ">



<View style={{flex:1,width:'100%',paddingTop:'10%'}}>

<ScrollView>
{notification.length>0 && notification.map((x)=>{
return(
<View style={{padding:'2.5%',display:'flex',flexDirection:'row',alignItems:'center',borderColor:'#DDDCDC',borderBottomWidth:getResponsiveFontSize(1)}}>
 
  <View >

  <Image 
                    source={{ uri: `${x.react_photo}` }}
                   style={[tw` rounded-full `,{backgroundColor:'red',width:getResponsiveFontSize(40),
                    height:getResponsiveFontSize(35)}]}
                    resizeMode='contain'
                    />
  </View>

  <View>
    <Text style={{marginLeft:'3%',padding:'1.5%',fontSize:getResponsiveFontSize(14),fontFamily:'PoppinsLight'}}> {x.content}</Text>
  </View>



</View>
)
})


}

</ScrollView>

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

  <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} className="flex flex-row items-center">
<Entypo name="home" size={getResponsiveFontSize(35)} color="white" />
  </TouchableOpacity>  




  <TouchableOpacity onPress={()=>{navigation.navigate('Notifi')}}   className="flex flex-row items-center">
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

export default Notif