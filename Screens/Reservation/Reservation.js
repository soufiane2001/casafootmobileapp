import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import tw from 'twrnc';
import { Entypo } from '@expo/vector-icons';
import OnboardingAnimate from 'react-native-onboarding-animate';






















function Reservation({navigation,route}) {
   

    const [daty,setdate] =useState([])   

    const [dates,setdaty] =useState([])   

    const [newup,setNewup] =useState(0)   
    
    
    const [reservationtimes,setreservationtimes] =useState([])   




     const getData=async()=>{
      const values= await AsyncStorage.getItem("token"); 
      

   await fetch ("http://192.168.11.100:8000/api/reservations", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${values}`,
          'Content-Type': 'application/json',
        },
      }) .then(response => response.json())
            .then((res) => {  
            
              res.data.map((x)=>{
                if(x.terrain.id==route.params.index){
                  setreservationtimes([...reservationtimes,x])
                }
              })
              
              
             
           })
       .catch((error) => {return false})





     }




const testReservation=(t,d)=>{

  var disponible=false;

  setreservationtimes(prev=>{

prev.map((x)=>{
  
if(x.day==t && x.time==d ){
  disponible=true
}

})
return prev;
})

return disponible;



}














const reserver=async(d,t)=>{
  const values= await AsyncStorage.getItem("token"); 

  var   id= await AsyncStorage.getItem("id");
  const datas = {
    user_id: id,
    terrain_id:route.params.index,
    time:t,
    day:d,
    accepter:1,
  };
      

  await fetch ("http://192.168.11.100:8000/api/reservations", {
       method: 'POST',
       headers: {
         Authorization: `Bearer ${values}`,
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(datas),
     }) .then(response => response.json())
           .then((res) => {  
           
             return true;
             
            
          })
      .catch((error) => {console.log(error)})




setNewup(prev=>prev+1)





}



















useEffect(()=>{

getData()


  var data=[];



setTimeout(()=>{



  console.log("=============================")
 
  console.log(testReservation("2023-11-25","10"))

  var today = new Date();


  var time=[];


  var year = today.getFullYear();
  var month = (today.getMonth() + 1).toString().padStart(2, '0');
  var day = today.getDate().toString().padStart(2, '0');
  
  
  var formattedDate = year + '-' + month + '-' + day;
  
 // setdate(formattedDate)
  


  var daye=(decrementDateByTwoDays(formattedDate,today.getDay()));




for(var i=0;i<12;i++){

  time=[];
  for(var j=0;j<7;j++){ 
    var small=false;
    const today = new Date();
     
    if (new Date(incrementDays(daye,j))< today) {
     small=true
    }


     time.push({nbm:incrementDays(daye,j),sabled:small,reserver:testReservation(incrementDays(daye,j),(10+i))})
                    }
  
data.push({time:10+i,date:time})

}

console.log(data)

setdaty(prev=>data)
//console.log('ha mara')


},2000)







},[newup])











function decrementDateByTwoDays(inputDate,nb) {
  const date = new Date(inputDate);
  date.setDate(date.getDate() - (nb-1));

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}





function incrementDays(inputDate,nb) {
  const date = new Date(inputDate);
  date.setDate(date.getDate() +nb);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
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
    
  
 
 
 var date=[
  
  {time:10,date:[{nmb:'2023-11-20',reserver:false},{nmb:'2023-11-21',reserver:true},
 {nmb:'2023-11-22',reserver:true},{nmb:'2023-11-23',reserver:false},{nmb:'2023-11-24',reserver:true},
 {nmb:'2023-11-25',reserver:false},{nmb:'2023-11-26',reserver:true}
],},

{time:11,date:[{nmb:'2023-11-20',reserver:true},{nmb:'2023-11-21',reserver:true},
{nmb:'2023-11-22',reserver:false},{nmb:'2023-11-23',reserver:false},{nmb:'2023-11-24',reserver:false},
{nmb:'2023-11-25',reserver:true},{nmb:'2023-11-26',reserver:true}
],},

{time:12,date:[{nmb:'2023-11-20',reserver:true},{nmb:'2023-11-21',reserver:true},
{nmb:'2023-11-22',reserver:true},{nmb:'2023-11-23',reserver:false},{nmb:'2023-11-24',reserver:true},
{nmb:'2023-11-25',reserver:false},{nmb:'2023-11-26',reserver:true}
],},

{time:13,date:[{nmb:'2023-11-20',reserver:true},{nmb:'2023-11-21',reserver:false},
{nmb:'2023-11-22',reserver:false},{nmb:'2023-11-23',reserver:false},{nmb:'2023-11-24',reserver:true},
{nmb:'2023-11-25',reserver:false},{nmb:'2023-11-26',reserver:true}
],},


{time:14,date:[{nmb:'2023-11-20',reserver:true},{nmb:'2023-11-21',reserver:true},
{nmb:'2023-11-22',reserver:true},{nmb:'2023-11-23',reserver:false},{nmb:'2023-11-24',reserver:false},
{nmb:'2023-11-25',reserver:false},{nmb:'2023-11-26',reserver:true}
],},


{time:15,date:[{nmb:'2023-11-20',reserver:true},{nmb:'2023-11-21',reserver:true},
{nmb:'2023-11-22',reserver:true},{nmb:'2023-11-23',reserver:false},{nmb:'2023-11-24',reserver:true},
{nmb:'2023-11-25',reserver:false},{nmb:'2023-11-26',reserver:true}
],},



{time:16,date:[{nmb:'2023-11-20',reserver:true},{nmb:'2023-11-21',reserver:true},
{nmb:'2023-11-22',reserver:true},{nmb:'2023-11-23',reserver:false},{nmb:'2023-11-24',reserver:true},
{nmb:'2023-11-25',reserver:true},{nmb:'2023-11-26',reserver:false}
],},



{time:17,date:[{nmb:'2023-11-20',reserver:true},{nmb:'2023-11-21',reserver:true},
{nmb:'2023-11-22',reserver:true},{nmb:'2023-11-23',reserver:false},{nmb:'2023-11-24',reserver:true},
{nmb:'2023-11-25',reserver:false},{nmb:'2023-11-26',reserver:true}
],},

{time:18,date:[{nmb:'2023-11-20',reserver:true},{nmb:'2023-11-21',reserver:true},
{nmb:'2023-11-22',reserver:true},{nmb:'2023-11-23',reserver:false},{nmb:'2023-11-24',reserver:true},
{nmb:'2023-11-25',reserver:false},{nmb:'2023-11-26',reserver:true}
],},

{time:19,date:[{nmb:'2023-11-20',reserver:true},{nmb:'2023-11-21',reserver:true},
{nmb:'2023-11-22',reserver:true},{nmb:'2023-11-23',reserver:true},{nmb:'2023-11-24',reserver:true},
{nmb:'2023-11-25',reserver:false},{nmb:'2023-11-26',reserver:false}
],},


{time:20,date:[{nmb:'2023-11-20',reserver:true},{nmb:'2023-11-21',reserver:true},
{nmb:'2023-11-22',reserver:false},{nmb:'2023-11-23',reserver:false},{nmb:'2023-11-24',reserver:true},
{nmb:'2023-11-25',reserver:false},{nmb:'2023-11-26',reserver:true}
],},


{time:21,date:[{nmb:'2023-11-20',reserver:true},{nmb:'2023-11-21',reserver:true},
{nmb:'2023-11-22',reserver:false},{nmb:'2023-11-23',reserver:false},{nmb:'2023-11-24',reserver:true},
{nmb:'2023-11-25',reserver:false},{nmb:'2023-11-26',reserver:true}
],},





];





return (


<>
 

<View onLayout={onLayout} style={{height:'100%',width:'100%',padding:'0%'}} >




<View style={{flex:1,display:'flex',justifyContent:'space-around',marginTop:'3%'}}>

    
   <View  style={[tw`flex flex-row  items-center justify-end`,{width:'100%',marginTop:'0%',paddingHorizontal:'4%'}]}>
    

         <Image
           source={require('../../assets/logo.png')}
          style={{width:getResponsiveFontSize(50),height:getResponsiveFontSize(36),marginLeft:'0%'}}
         resizeMode="contain"
      />
        <Text style={[{fontFamily:'PoppinsRegular',color:'black',marginLeft:'0%',fontSize:getResponsiveFontSize(16)}]}>Casasport</Text>

  </View>




<View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginTop:'3%',paddingVertical:getResponsiveFontSize(10),borderBottomColor:'#D1D2D3',borderBottomWidth:1}}>
<Text style={{fontSize:getResponsiveFontSize(15),fontFamily:'PoppinsLight'}}>T/D</Text>
<Text style={{fontSize:getResponsiveFontSize(16),fontFamily:'PoppinsLight'}}>M</Text>
<Text style={{fontSize:getResponsiveFontSize(16),fontFamily:'PoppinsLight'}}>T</Text>
<Text style={{fontSize:getResponsiveFontSize(16),fontFamily:'PoppinsLight'}}>W</Text>
<Text style={{fontSize:getResponsiveFontSize(16),fontFamily:'PoppinsLight'}}>T</Text>
<Text style={{fontSize:getResponsiveFontSize(16),fontFamily:'PoppinsLight'}}>F</Text>
<Text style={{fontSize:getResponsiveFontSize(16),fontFamily:'PoppinsLight'}}>S</Text>
<Text style={{fontSize:getResponsiveFontSize(16),fontFamily:'PoppinsLight'}}>S</Text>
</View>

<ScrollView      contentContainerStyle={{ paddingBottom: getResponsiveFontSize(20) }} >



{dates.length>0 && dates.map((x,key)=>{return(

<View key={key} style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-around',marginTop:'7.5%'}}>
<Text style={{fontSize:getResponsiveFontSize(14),color:'#828282',paddingHorizontal:getResponsiveFontSize(18),borderRadius:150}}>{x.time}</Text>
{x.date.map((y,k)=>{
return(

<TouchableOpacity key={k} disabled={y.reserver ? true : y.sabled} onPress={()=>{reserver(y.nbm,x.time)}}>
<Text style={{fontSize:getResponsiveFontSize(15),color:'white',overflow: 'hidden',backgroundColor:y.reserver?'#FF3232':'#32ABFF',paddingVertical:getResponsiveFontSize(5),paddingHorizontal:getResponsiveFontSize(10),borderRadius:getResponsiveFontSize(5),fontFamily:'PoppinsLight'}}>
{y.reserver ? "R" :"D"}
</Text>
</TouchableOpacity>

)

})

}




</View>



)})}








































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

export default Reservation











