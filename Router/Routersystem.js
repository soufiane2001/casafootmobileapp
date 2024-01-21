import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,TextInput,Button, FlatList } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator }from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import {Poppins_100Thin,Poppins_100Thin_Italic,
    Poppins_200ExtraLight,Poppins_200ExtraLight_Italic,
    Poppins_300Light,Poppins_300Light_Italic,
    Poppins_400Regular,Poppins_400Regular_Italic,
    Poppins_500Medium,Poppins_500Medium_Italic,
    Poppins_600SemiBold,Poppins_600SemiBold_Italic,
    Poppins_700Bold,Poppins_700Bold_Italic,Poppins_800ExtraBold
    ,Poppins_800ExtraBold_Italic,Poppins_900Black,Poppins_900Black_Italic,} from '@expo-google-fonts/poppins';
import Login from '../Screens/Login/Login';

import Home from '../Screens/Home/Home';
import Signup from '../Screens/Signup/Signup';

import Add from '../Screens/Posts/Add/Add'
import Post from '../Screens/Posts/Post/Post'

import Stadium from '../Screens/Staduim/Stadium'
import Reservation from '../Screens/Reservation/Reservation';
import Notif from '../Screens/Notif/Notif';
import Settings from '../Screens/Settings/Settings';









 

export default function Routersystem() {

  const Stack = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    PoppinsThin: Poppins_100Thin,
  PoppinsExtraLight: Poppins_200ExtraLight,
  PoppinsLight: Poppins_300Light,
  PoppinsRegular: Poppins_400Regular,
  PoppinsMedium: Poppins_500Medium,
  PoppinsSemiBold: Poppins_600SemiBold,
  PoppinsBold: Poppins_700Bold,
  PoppinsExtraBold: Poppins_800ExtraBold,
  PoppinsBlack: Poppins_900Black,
  });
  if (!fontsLoaded) {
    return null; // ou un indicateur de chargement
  }


  return (



   
<NavigationContainer>
    <Stack.Navigator  initialRouteName='Settings'>

       
        <Stack.Screen name="Login" component={Login} options={{ title: 'login',headerShown:false }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home',headerShown:false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup',headerShown:false }} />
        <Stack.Screen name="Add" component={Add} options={{ title: 'Signup',headerShown:false }} />
        <Stack.Screen name="Post" component={Post} options={{ title: 'Signup',headerShown:false }} />
        <Stack.Screen name="Staduim" component={Stadium} options={{ title: 'Signup',headerShown:false }} />
        <Stack.Screen name="Reservation" component={Reservation} options={{ title: 'Signup',headerShown:false }} />
        <Stack.Screen name="Notifi" component={Notif} options={{ title: 'Signup',headerShown:false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ title: 'Signup',headerShown:false }} />
    </Stack.Navigator>
  </NavigationContainer>



  );
}



