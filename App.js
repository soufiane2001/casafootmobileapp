import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

import { useDeviceContext, useAppColorScheme } from 'twrnc';
import Routersystem from './Router/Routersystem';

console.disableYellowBox = true; 
export default function App() {
  // 1️⃣  opt OUT of listening to DEVICE color scheme events
  useDeviceContext(tw, { withDeviceColorScheme: false });

  // 2️⃣  use the `useAppColorScheme` hook to get a reference to the current color
  // scheme, with some functions to modify it (triggering re-renders) when you need to
  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  // React.useEffect(() => {
  //   console.log('colorScheme', colorScheme);
  // }, [colorScheme]);

  return (
<Routersystem/>
  );
}