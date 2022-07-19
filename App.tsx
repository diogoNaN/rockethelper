import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts } from "expo-font";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { THEME } from "./src/styles/theme";

import Signin from "./src/screens/Signin";
import Home from "./src/screens/Home";

import Loading from "./src/components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      {fontsLoaded ? <Home /> : <Loading />}
    </NativeBaseProvider>
  );
}
