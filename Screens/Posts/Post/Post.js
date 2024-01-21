import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Entypo } from '@expo/vector-icons';





function Home({navigation,route}) {

     const [post, setPost] =React.useState(null);
    const [email, setEmail] = React.useState('');
    const [componentWidth, setComponentWidth] = useState(0);
    const [userauth,setUserauth]=useState();
    
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
      
    





        const getData=async()=>{

          const values= await AsyncStorage.getItem("token"); 
          var   useriddd= await AsyncStorage.getItem("id");
            await fetch   ("http://192.168.11.100:8000/api/posts/"+route.params.idpost, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${values}`,
                  'Content-Type': 'application/json',
                },
              }) .then(response => response.json())
              .then((res) => {  
          console.log(res.data.id)
        setPost(res.data)
              })
              .catch((error) => {
                console.error(error);
              });
              await fetch   ("http://192.168.11.100:8000/api/users/"+useriddd, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${values}`,
                  'Content-Type': 'application/json',
                },
              }) .then(response => response.json())
              .then((res) => {  
      setUserauth(res.data)
              })
              .catch((error) => {
                console.error(error);
              });



             








            
        
        }
        




      useEffect(()=>{
        getData()
      },[])
      
      

   





























      const Save=async(idpost,userpost)=>{
  
        if(email.length>0){
        const values= await AsyncStorage.getItem("token"); 
        var   useriddd= await AsyncStorage.getItem("id");
        const data = {
          user_id: useriddd,
          post_id:idpost,
          description:email
        };
      
        // Send the login data to the server
        fetch('http://192.168.11.100:8000/api/comments', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${values}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(responseData => {
            // Handle the response from the server
            console.log('Login response:', responseData);
            setEmail('')
            getData()
           if(responseData.error){
          console.log("error")
           }
      
           
            
          })
          .catch(error => {
       
                    console.error('Error:', error);
          });
      

          const datas = {
            content:`${userauth.prenom} ${userauth.nom}  a commente votre post par " ${email} "  `,
            user_id_post:userpost.id,
            user_id_react:useriddd,
            post_id:idpost,
            react_photo:userauth.photo
          };
            var   userid= await AsyncStorage.getItem("id");
              // Send the login data to the server
              fetch('http://192.168.11.100:8000/api/notifications', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${values}`,
                  'Content-Type': 'application/json',
                },
              body:JSON.stringify(datas),
              })
                .then(response => response.json())
                .then(responseData => {
                  console.log(responseData);              
                })





      
      
      
        }
      
      
      }








































return (


<>
 

<View onLayout={onLayout} style={{width:'100%',padding:'0%',height:"100%"}} >



<View style={[tw`flex-1`,{position:'relative',zIndex:145,padding:'3%'}]}>










{post!=null &&

<View style={[tw` border-slate-200 border bg-slate-50 rounded-2xl`,{height:"98%",marginTop:'5.5%',padding:'1%',paddingTop:'4%',paddingHorizontal:'3.74%',

...Platform.select({
    ios: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    android: {
      elevation:3,
    },})


}]} >
 <View style={[tw`flex flex-row justify-between `]} >

    <View style={tw`flex flex-row`}> 
           <Image 
                    source={require('../../../assets/logo.png')}
                   style={tw`w-10 h-10 rounded-full mb-8`}
            
                    />
          <View>
              <Text  style={[tw`ml-3 text-slate-800`,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(14)}]} className=''>{post.user.nom+" "+post.user.prenom}</Text>
              <Text  style={[tw`ml-3  text-gray-500`,{fontFamily:'PoppinsRegular',marginTop:'-3%',fontSize:getResponsiveFontSize(12)}]} className=''>2 hours agos</Text>
          </View>

    </View>

     <Text  style={[tw`text-gray-400 text-2xl  mb-10`,{fontSize:getResponsiveFontSize(25),fontFamily:'PoppinsRegular', transform: [{ rotate: '90deg' }],}]} >...</Text>

 </View>

 <Text  className=""  style={[tw`text-sm text-slate-700`,{fontFamily:'PoppinsRegular',marginTop:'-7%',fontSize:getResponsiveFontSize(13)}]}>{post.description}</Text>

 {post.picture!=null &&
 <Image 
 
 source={{ uri: `${post.picture}` }}
        style={[tw`rounded-2xl `,{width: '100%',marginTop:'1.5%',height:'45%',backgroundColor:'#F2F6FF',resizeMode:'contain'}]}
      />
 }









<View style={{marginTop:'2%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',borderColor:"#ECEAEA",paddingVertical:'1%',borderTopWidth:1,borderStyle:'solid'}}>



<TextInput
    value={email}
    multiline={true}
    onChangeText={text => setEmail(text)}
    style={[tw`border border-gray-300 text-gray-800   block    rounded-md  pl-4 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`,{width:'70%',fontFamily:'PoppinsRegular',marginTop:'2.5%',padding:'0.75%',
    fontSize:getResponsiveFontSize(14),
   
  }]}
    
      keyboardType="email-address"
    />


<TouchableOpacity onPress={()=>{Save(post.id,post.user)}}  style={[tw`bg-indigo-600 rounded items-center justify-center`,{marginTop:'2%',padding:'2%'}]} >
      <Text 
         style={[tw`text-white font-bold`,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(11)}]}
      >Envoyer</Text>
    </TouchableOpacity>





</View>



<ScrollView style={{marginTop:'3%',paddingHorizontal:'2%'}}>








{post!=null  && post.commente.slice().reverse().map((x)=>

<View style={[tw` border-slate-200 border bg-slate-50 rounded-2xl`,{marginTop:'3%',padding:'0%',paddingVertical:'2%',paddingHorizontal:'3.74%',

...Platform.select({
    ios: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    android: {
      elevation:3,
    },})


}]} >

<View style={[tw`flex flex-row justify-between `]} >

    <View style={tw`flex flex-row`}> 
           <Image 
                    source={{ uri: `${x.user.photo}` }}
                   style={[tw` rounded-full mb-8`,{width:getResponsiveFontSize(30),
                    height:getResponsiveFontSize(31)}]}
            
                    />
          <View>
              <Text  style={[tw`ml-3 text-slate-800`,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(10.5)}]} className=''>{x.user.nom+" "+x.user.prenom}</Text>
              <Text  style={[tw`ml-3  text-gray-500`,{fontFamily:'PoppinsRegular',marginTop:'-3%',fontSize:getResponsiveFontSize(9)}]} className=''>8 hours agos</Text>
          </View>

    </View>
    </View>
<Text   style={[tw`ml-5 text-gray-700`,{fontSize:getResponsiveFontSize(12),marginTop:'-11%',paddingHorizontal:getResponsiveFontSize(13),fontFamily:'PoppinsRegular'}]}>
{x.description}
    </Text>

</View>



                  ) }



  

























</ScrollView>










</View>




                   }





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

export default Home