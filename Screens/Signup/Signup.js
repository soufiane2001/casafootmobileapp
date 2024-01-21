import React, { useEffect } from 'react'
import { StyleSheet, Text, View,TextInput,Button, FlatList ,Image,TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import tw from 'twrnc';
import ModalSelector from 'react-native-modal-selector';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Platform } from 'react-native';





function Signup({navigation}) {

 
    const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] =React.useState('');
    const [nom, setnom] = React.useState('');
    const [prenom, setPrenom] = React.useState('');
    const [showAlert, setshowalert] = React.useState(false);
    const [showAlert2, setshowalert2] = React.useState(false);
    
  const age = [
    { key: '18', label: 18 },
    { key: '19', label: 19 },
    { key: '20', label: 20 },
    { key: '21', label: 21 },
    { key: '22', label: 22 },
    { key: '23', label: 23 },
    { key: '24', label: 24 },
    { key: '25', label: 25 },
    { key: '26', label: 26 },
    { key: '27', label: 27 },
    { key: '28', label: 28 },
    { key: '29', label: 29 },
    { key: '30', label: 30 },
    { key: '31', label: 31 },
    { key: '32', label: 32 },
    { key: '33', label: 33 },
    { key: '34', label: 34 },
    { key: '35', label: 35 },
    { key: '36', label: 36 },
    { key: '37', label: 37 },
    { key: '38', label: 38 },
    { key: '39', label: 39 },
    { key: '40', label: 40 },
    { key: '41', label: 41 },
    { key: '42', label: 42 },
    { key: '43', label: 43 },
    { key: '44', label: 44 },
    { key: '45', label: 45 },
    { key: '46', label: 46 },
    { key: '47', label: 47 },
    { key: '48', label: 48 },
    { key: '49', label: 49 },
    { key: '50', label: 50 },
  ];

  const genre = [
    { key: 'option1', label: 'Homme' },
    { key: 'option2', label: 'Femme' },

  ];
















    const [componentWidth, setComponentWidth] = useState(0);
    
  const [selectedOption, setSelectedOption] = React.useState('');
  const [selectedOption2, setSelectedOption2] = React.useState('');
    const [load, setLoad] = React.useState(0);
    const getResponsiveFontSize = (size) => {
      const standardScreenWidth = 375; 
      const scaleFactor = componentWidth / standardScreenWidth;
      const newSize = size * scaleFactor;
      return newSize;
    };
    
    
    
    
    const handleOptionChange = (option) => {
        setSelectedOption(option.label);
      };
    
      const handleOptionChange2 = (option) => {
        setSelectedOption2(option.label);
      };
    
    
    const onLayout = event => {
        const { width } = event.nativeEvent.layout;
        setComponentWidth(width);
      };
    
  
  
      
      const handleSignup = () => {
        setLoad(0.6)
        // Create the payload
        const data = {
          prenom:prenom,
          email: email,
          password: password,
          nom:nom,
          sex:selectedOption,
          age:selectedOption2,
          blacklist:false,
        };

        setEmail("")
        setPassword("")
        setPrenom("")
        setnom("")
    

     console.log(data);
        // Send the login data to the server
        fetch('http://192.168.11.104:8000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(responseData => {
            // Handle the response from the server
            console.log('Login response:', responseData);
            setLoad(0)
            setshowalert2(true)
          })
          .catch(error => {
            setshowalert(true)
            setLoad(0)
            console.error('Error:', error);
          });
      };
    

   useEffect(()=>{
   checktoken()
   
   },[])

   
   checktoken=async()=>{
 const values= await AsyncStorage.getItem("token");
    if(values!=undefined){
      navigation.navigate("Home")
    }

   }









return (


<>
 

<ScrollView>

<View onLayout={onLayout} style={{width:'100%',padding:'4.5%',paddingTop:'0%',display:'flex',justifyContent:'center',alignItems:'center'}} className="flex-1 ">
<Stack style={{opacity:load,position:'absolute',width:'109%',height:'115%',left:'0%',right:'0%',top:'0%',zIndex:111}} fill center spacing={4}>

<ActivityIndicator size="large" color="purple"/>

</Stack>






<AwesomeAlert
          show={showAlert2}
          showProgress={false}
          title="Congratulation"
          message="Account been created"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Continue"
          confirmButtonColor="#03A703"
         
          onConfirmPressed={() => {
            setshowalert2(false)
          }}
        />

<AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Invalid data"
          message="Invalid data or user have exist account"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Try again"
          confirmButtonColor="#C01804"
         
          onConfirmPressed={() => {
            setshowalert(false)
          }}
        />












<View  style={{position:'relative',marginTop:'2%',zIndex:155,width:"100%",display:'flex',justifyContent:'center',alignItems:'center'}}>
<Image
      source={require('../../assets/logo.png')}
      style={{width:getResponsiveFontSize(35),marginTop:'-7%'}}
      resizeMode="contain"
    />

<Text   style={[tw`text-gray-900`,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(15),marginTop:'-7%'}]} >Create your account</Text>
<Text  className=' text-gray-800 '
    style={[tw`text-gray-800`,{fontSize:getResponsiveFontSize(13),fontFamily:'PoppinsRegular',width:'100%',marginTop:'2%'}]}
    >Nom</Text>


<TextInput
    value={nom}
    onChangeText={text => setnom(text)}
    style={[tw`text-xl border border-gray-300 text-gray-800   block    rounded-md  pl-4 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`,{width:'100%',fontFamily:'PoppinsRegular',marginTop:'2.5%',padding:'1.75%',
    fontSize:getResponsiveFontSize(14),
   
  }]}
    />


<Text  className=' text-gray-800 '
    style={[tw`text-gray-800`,{fontSize:getResponsiveFontSize(13),fontFamily:'PoppinsRegular',width:'100%',marginTop:'4%'}]}
    >Prenom</Text>


<TextInput
    value={prenom}
    onChangeText={text => setPrenom(text)}
    style={[tw`text-xl border border-gray-300 text-gray-800   block    rounded-md  pl-4 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`,{width:'100%',fontFamily:'PoppinsRegular',marginTop:'2.5%',padding:'1.75%',
    fontSize:getResponsiveFontSize(14),
   
  }]}
    />














<Text  className=' text-gray-800 '
    style={[tw`text-gray-800`,{fontSize:getResponsiveFontSize(13),fontFamily:'PoppinsRegular',width:'100%',marginTop:'4%'}]}
    >Email address</Text>


<TextInput
    value={email}
    onChangeText={text => setEmail(text)}
    style={[tw`text-xl border border-gray-300 text-gray-800   block    rounded-md  pl-4 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`,{width:'100%',fontFamily:'PoppinsRegular',marginTop:'2.5%',padding:'1.75%',
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
    style={[tw`text-xl border border-gray-300 text-gray-800   block    rounded-md  pl-4 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`,{width:'100%',fontFamily:'PoppinsRegular',marginTop:'2.5%',padding:'1.75%',
    fontSize:getResponsiveFontSize(14),

  }]}
  secureTextEntry
     
      placeholderTextColor="#BCBCBC" 
    />




<Text  className=' text-gray-800 '
    style={[tw`text-gray-800`,{fontSize:getResponsiveFontSize(13),fontFamily:'PoppinsRegular',width:'100%',marginTop:'5%'}]}
    >genre</Text>



<ModalSelector
        data={genre}
        initValue="Select Genre"
        onChange={handleOptionChange}
        className="border rounded-md border-gray-300"
        style={{width:'100%',padding:'4%',marginTop:"1%"}}
      >
        <TouchableOpacity>
          <Text>{selectedOption || 'Select Option'}</Text>
        </TouchableOpacity>
      </ModalSelector>



      <Text  className=' text-gray-800 '
    style={[tw`text-gray-800`,{fontSize:getResponsiveFontSize(13),fontFamily:'PoppinsRegular',width:'100%',marginTop:'5%'}]}
    >age</Text>



      <ModalSelector
        data={age}
        initValue="Select Genre"
        onChange={handleOptionChange2}
        className="border rounded-md border-gray-300"
        style={{width:'100%',padding:'4%',marginTop:"1%"}}
      >
        <TouchableOpacity>
          <Text>{selectedOption2 || 'Select Option'}</Text>
        </TouchableOpacity>
      </ModalSelector>











<TouchableOpacity onPress={handleSignup} style={[tw`bg-indigo-600 rounded items-center justify-center`,{width:'100%',padding:'3%',marginTop:'5%'}]} >
      <Text 
         style={[tw`text-white font-bold`,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(15)}]}
      >Signup</Text>
    </TouchableOpacity>


    <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}  style={{width:'100%',padding:'1.5%',marginTop:'5%',marginBottom:'20%'}} >
      <Text
         style={[tw`text-gray-800 text-sm text-center`,{fontFamily:'PoppinsRegular',fontSize:getResponsiveFontSize(13)}]}
      >
        Don't have an account? Sign up here
      </Text>
    </TouchableOpacity>  



    


   
</View>

 
  </View>
</ScrollView>


</>

)
}

export default Signup




















function play(){

  setInterval(()=>{      var tt=document.getElementById('crash-bet')
    tt.value=Math.floor((Math.random()*5)+4).toString()
},
  700)




  start= setInterval(()=>{

   var x=document.getElementsByClassName('crash-btn crash-bet__btn crash-bet__btn--play');
   var y=Math.random()*50000;  
   if(y>49740){
   
   
   if(x[0].getAttribute("disabled")==null){

   x[0].click();
 var count=0; 
   var done=setInterval(()=>{
      
   var rbahbutton=document.getElementsByClassName('crash-btn crash-bet__btn crash-bet__btn--stop');
    
   if(rbahbutton[0].getAttribute("disabled")==null){
    
     count++;
     if(count>8){
      //alert("warak mora 15")
     rbahbutton[0].click();
      clearInterval(done);
      //clearInterval(start);
   
      count=0;
                                       }                                  }
 
 
   },100)
 
 
   } 
   
   
    } }
   
   
   ,100) 
   
   
   
   }






  var cote=()=>{
  
  setTimeout(()=>{

    var x=document.getElementsByClassName('crash-btn crash-bet-form__btn crash-bet-form__btn--sum')
   
   var rando=Math.floor(Math.random()*3)+1

   for(var i=0;i<rando;i++){
    x[0].click()
   }

  // clearInterval(cote)
  anuller()


   },500)

  }




var anuller= ()=>{

setTimeout(()=>{ 
  
   var reset=document.getElementsByClassName('crash-btn crash-bet-form__btn crash-bet-form__btn--reset')

  reset[0].click()
   cote()
},1000)

}