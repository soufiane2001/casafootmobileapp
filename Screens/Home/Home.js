import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Entypo } from '@expo/vector-icons';





function Home({navigation,route}) {


    const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
    const [posts,setpost]=React.useState([])
    const [iduser,setiduser]=React.useState(3)
    const [yposition,setyposition]=React.useState(0)
    const [componentWidth, setComponentWidth] = useState(0);
    const [load, setLoad] = React.useState(0);
    const [addi, setaddi] = React.useState(null);
    const [nextLink, setnextLink] = React.useState("");
    const [first, setFirst] = React.useState(null);
    const [number, setNumber] = React.useState(1);
    const [numbernotif, setNumbernotifi] = React.useState(0);
    const [links, setlinks] = React.useState(["http://192.168.11.100:8000/api/posts?page=1"]);
    const scrollViewRef = React.useRef(null);
    const [params, setParams] = useState(route.params);
    
    const [addpostText, setaddpostText] = useState(null);
    const [addpostpicture, setaddpostpicture] = useState(null);
    const [userauth,setUserauth]=useState();

    // Function to reset route.params to null
    const resetParams = () => {
      navigation.setParams({ params: null });
    }
  


    // Function to reset route.params to null
 





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
          getAllPost()
          if(route.params!=null){
           setaddpostText(route.params.text)
          setaddpostpicture(route.params.image)}
        }, [])
      );
      








     const getAllPost=async()=>{
      var   id= await AsyncStorage.getItem("id");
      var   useriddd= await AsyncStorage.getItem("id");
      setiduser(id)
        const values= await AsyncStorage.getItem("token");
        
        await fetch   ("http://192.168.11.100:8000/api/posts?page=1", {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${values}`,
              'Content-Type': 'application/json',
            },
          }) .then(response => response.json())
                .then((res) => {  
                   setpost(res.data);
                  
                      var data=res.links.next  
                      setnextLink(nextLink=>data)
               })
           .catch((error) => {
            console.error(error);
                              });

/************ */
 
await fetch   ("http://192.168.11.100:8000/api/notifications/"+id, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${values}`,
    'Content-Type': 'application/json',
  },
}) .then(response => response.json())
      .then((res) => {  
setNumbernotifi(res.message)
      })
      .catch((error) => {
       console.error(error);
                         });



//******************* */










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










    const getNextData=async()=>{
      const values= await AsyncStorage.getItem("token");
        if(nextLink!=null){
      
          setNumber(number=>number+1)
          await fetch
              (nextLink, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${values}`,
                  'Content-Type': 'application/json',
                },
              }) .then(response => response.json())
              .then((res) => {  
                const newArray = [...posts, ...res.data];
                setpost(newArray);
               setnextLink(res.links.next)
               var data=res.links.next

               if(data==null){
                     setLoad(0)
                             }
      }).catch((error) => {
                console.error(error);
             
              });
        
        }
      else{
      setLoad(0)
         }
      
   
      
      }






      const handleScroll = (event) => {
        const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollOffset = event.nativeEvent.contentOffset.y;
      
        // Calculate the scroll percentage
        const scrollPercentage = (scrollOffset / (contentHeight - scrollViewHeight)) * 100;
        setyposition(scrollPercentage)
        console.log(yposition)
        // Check if the user has scrolled to 100% of the height
        if (scrollPercentage >= 99) {
          
        setLoad(1)
        getNextData()
        }
      };
      

   





      const addlike =async (idpost,userpost) => {
        const values= await AsyncStorage.getItem("token");
          var   useriddd= await AsyncStorage.getItem("id");
       
        // Create the payload
        const data = {
          user_id:useriddd,
          post_id:idpost
      
        };
      
        // Send the login data to the server
        fetch('http://192.168.11.100:8000/api/likes', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${values}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(responseData => {
         console.log(responseData)
            const updatedItems = posts.map(item => {
              // If the item's id matches the id to update, create a new object with the updated name
              if (item.id === idpost) {
                return { ...item, likes_count:item.likes_count+1,likes_users:[...item.likes_users,{
                          id: responseData.data.id,
                          user: {
                              id:iduser,
                              nom: "bouta",
                              prenom: "soufiane",
                              email: "sbouta@gmail.com",
                              email_verified_at: null,
                              sex: "homme",
                              age: "25",
                              photo: null,
                              blacklist: "false",
                              created_at: "2023-08-22T23:57:37.000000Z",
                              updated_at: "2023-08-22T23:57:37.000000Z"
                          },
                          created_at: "2023-09-15T18:09:50.000000Z",
                          updated_at: "2023-09-15T18:09:50.000000Z"
                }] };
              }
              // Otherwise, return the original item
              return item;
            });
          
            // Set the state with the updated items
           setpost(updatedItems);
          console.log(updatedItems)
            //console.log(responseData);
        
          })
          .catch(error => {
      
            console.error('Error:', error);
          });
      



      
alert(userpost.id)
   const datas = {
          content:`${userauth.prenom} ${userauth.nom}  a aime votre post `,
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
      
      
      
      const removelike =async (idpost,idlike) => {
      
      
      const values= await AsyncStorage.getItem("token");
      var   userid= await AsyncStorage.getItem("id");
        // Send the login data to the server
        fetch('http://192.168.11.100:8000/api/likes/'+idlike, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${values}`,
            'Content-Type': 'application/json',
          },
      
        })
          .then(response => response.json())
          .then(responseData => {
         alert("dsssssss")
            console.log(responseData);
           
          
          })
          
      
      
          const updatedItems = posts.map(item => {
            // If the item's id matches the id to update, create a new object with the updated name
            if (item.id == idpost) {
              const updatedItem = item.likes_users.filter(z => z.id != idlike);
            console.log("*********************") 
            console.log(item.likes_users)
              return { ...item, likes_count:item.likes_count-1,likes_users:updatedItem };
            }
            // Otherwise, return the original item
            return item;
          });
        
          // Set the state with the updated items
        setpost(updatedItems);
      }
      
      



      const sendPost =async () => {
        const values= await AsyncStorage.getItem("token");
        var   userid= await AsyncStorage.getItem("id");
        // Create the payload
        const data = {
          user_id:userid,
          picture:route.params.image,
          description:route.params.text,
          share:0,
          signaler:0,
      
        };
      //console.log(data);
        // Send the login data to the server
        fetch('http://192.168.11.100:8000/api/posts', {
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
            setpost([responseData.data,...posts])
          //console.log("...."+responseData.data.user+"......."+responseData.data.likes_count+"......")
          //showToast()
          //setLoad(0)
        
       
          })
          .catch(error => {
      
            console.error('Error:', error);
          });

          route.params=null
      };
      
      



















return (


<>
 

<View onLayout={onLayout} style={{width:'100%',padding:'0%',height:"100%"}} >



<View style={[tw`flex-1`,{position:'relative',zIndex:145,padding:'3%'}]}>

<View  style={[tw`flex flex-row  items-center justify-start`,{width:'100%',marginTop:'-6.5%',height:'20%'}]}>
       <Image
      source={require('../../assets/logo.png')}
      style={{width:getResponsiveFontSize(50),height:getResponsiveFontSize(36),marginLeft:'58%'}}
      resizeMode="contain"
    />
    <Text style={[{fontFamily:'PoppinsRegular',color:'black',marginLeft:'0%',fontSize:getResponsiveFontSize(16)}]}>Casasport</Text>
    </View>










    <View style={[tw`border-slate-200 bg-slate-50 border rounded-xl`,{padding:'1%',marginTop:'-5%',paddingTop:'4%',paddingLeft:'7%',...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation:3,
      },
    }),}]}  >
            
            <View  style={tw`flex flex-row`}>
            <Image 
                  resizeMode="contain"
          style={[tw`rounded-full`,{width:getResponsiveFontSize(40),height:getResponsiveFontSize(40),marginLeft:'0%'}]}
            source={{uri:`${userauth && userauth.photo}`}}
                 />
                 
                 <TouchableOpacity  onPress={()=>{navigation.navigate("Add")}}>
                    {route.params !=null  ?  (<Text style={[tw`text-gray-500 mt-2 ml-3`,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(14)}]} >
                    {route.params.text.length>35 ? route.params.text.substring(0,35)+"..." : route.params.text } 
                  </Text> ):(

                  <Text style={[tw`text-gray-500 mt-2 ml-3`,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(14)}]}>
                      Write something here... 
                      
                        </Text>
                        
                  )
                      
                      
                      }
                   


</TouchableOpacity>
                      
                 
            </View>

    

     {route.params !=null && (route.params.image!=null && ( <Image 
                   source={{uri:route.params.image }}
                   style={{marginTop:'2%',marginBottom:'2%',width:"100%",height:getResponsiveFontSize(200),resizeMode:'contain'}}
                    />
                    ))}
      



 

         <View    style={[tw`rounded-md`]} >
          

       
          
          <TouchableOpacity style={{marginLeft:'72.5%',marginTop:'4%'}} onPress={()=>{sendPost()}}  >
           <LinearGradient
        colors={['#B707BC', '#7507BC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[tw`w-20 flex flex-row  justify-end pr-5 pl-2 pb-1 rounded-md`,{marginTop:'-11%',marginBottom:'4%',padding:'3%',alignSelf:'flex-start'}]}
    
     >
         
            <Text style={[tw` text-white text-center `,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(12)}]} >Publier</Text>

    </LinearGradient>   
    </TouchableOpacity>    
          </View> 
    
        
        </View> 








{







<ScrollView ref={scrollViewRef}  onScroll={handleScroll}>






{posts.length>0 && posts.map((x)=>{return(

<View style={[tw` border-slate-200 border bg-slate-50 rounded-2xl`,{maxHeight: 605,marginTop:'5.5%',padding:'0%',paddingTop:'4%',paddingHorizontal:'3.74%',

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
 <View style={tw`flex flex-row justify-between `} >

    <View style={tw`flex flex-row`}> 
           <Image 
                   source={{ uri: `${x.user.photo}` }}
                   style={tw`w-10 h-10 rounded-full mb-8`}
            
                    />
          <View>
              <Text  style={[tw`ml-3 text-slate-800`,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(14)}]} className=''>{x.user.nom+" "+x.user.prenom}</Text>
              <Text  style={[tw`ml-3  text-gray-500`,{fontFamily:'PoppinsRegular',marginTop:'-3%',fontSize:getResponsiveFontSize(12)}]} className=''>{x.created_at.substring(0,10)+" "+x.created_at.substring(11,16)}</Text>
          </View>

    </View>

     <Text  style={[tw`text-gray-400 text-2xl  mb-10`,{fontSize:getResponsiveFontSize(25),fontFamily:'PoppinsRegular', transform: [{ rotate: '90deg' }],}]} >...</Text>

 </View>

 <Text  className=""  style={[tw`text-sm text-slate-700`,{fontFamily:'PoppinsRegular',marginTop:'-3%',fontSize:getResponsiveFontSize(15)}]}>{x.description}</Text>
 {x.picture!=null &&
 <Image 
 
          source={{ uri: `${x.picture}` }}
        style={[tw`rounded-2xl `,{width: '100%',marginTop:'4.5%',minHeight:getResponsiveFontSize(210),backgroundColor:'#F2F6FF',resizeMode:'contain'}]}
      />
}
<View  style={[tw`flex flex-row justify-between p-3`,{marginTop:'1.5%'}]}>
  
  <TouchableOpacity  onPress={()=>{
    var exist=false;
    var existlike=0;

    x.likes_users.map((y)=>{
    
      if(y.user.id==iduser){
        exist=y.id
      
     
      } 
    })

    if(exist==false){
      addlike(x.id,x.user)
    }
    else{
      removelike(x.id,exist)
    }



    }} 
    
    
    
    style={[tw`flex flex-row items-center`,{marginLeft:'0%'}]}  >
 
 
 
  <Image
    
            source={require('../../assets/likee.jpeg')}
            style={{resizeMode:'stretch' ,width:getResponsiveFontSize(30),marginRight:'7%',height:getResponsiveFontSize(30)}}
         />
         <Text style={[tw`text-gray-600`,{fontSize:getResponsiveFontSize(15),marginLeft:'0%',fontFamily:'PoppinsRegular'}]}>{x.likes_count}</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>{navigation.navigate("Post",{idpost:x.id})}}   style={[tw`flex flex-row items-center`,{marginLeft:'2.5%'}]}>
  <Image
      
            source={require('../../assets/commente.png')}
            style={{resizeMode:'stretch' ,width:getResponsiveFontSize(30),height:getResponsiveFontSize(30),marginRight:'7%'}}
          
         />
         <Text  style={[tw`text-gray-600`,{fontSize:getResponsiveFontSize(15),marginLeft:'0%',fontFamily:'PoppinsRegular'}]}>{x.commente.length}</Text>
  </TouchableOpacity>

  <View   style={[tw`flex flex-row items-center`,{marginLeft:'0%'}]}>
  <Image
   style={{resizeMode:'stretch' ,width:getResponsiveFontSize(30),height:getResponsiveFontSize(30),marginRight:'1%'}}
            source={require('../../assets/share.png')}
          
         />
         <Text style={[tw`text-gray-600`,{fontSize:getResponsiveFontSize(15),fontFamily:'PoppinsRegular'}]} >{x.share}</Text>
  </View>
</View>

</View>

)})}


<Stack style={{opacity:load,marginTop:"5%"}} fill center spacing={4}>

<ActivityIndicator size="large" color="purple"/>

</Stack>













    </ScrollView>







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

export default Home





























