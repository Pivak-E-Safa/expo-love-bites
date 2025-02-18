import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignInScreen from "./screens/SignInScreen";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import Main from "./src/screens/Main/Main";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import AppContainer from './src/routes'

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "58997111212-97ape976m5m5jvceqctue81b7k16gi4h.apps.googleusercontent.com",
    androidClientId:
      "58997111212-21obk57428qjt1vh1jcml6uen4qq0uno.apps.googleusercontent.com",
  });

  const checkLocaluser = async () => {
    try {
      setLoading(true);
      const userJson = await AsyncStorage.getItem("@user");
      const userData = userJson ? JSON.parse(userJson) : null;
      setUserInfo(userData);
    } catch (e) {
      console.log("Error in checkLocaluser", e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
    // handle rest of the scenarios as well
  }, [response]);

  React.useEffect(() => {
    checkLocaluser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
        await AsyncStorage.setItem("@user", JSON.stringify(user));
      } else {
        console.log("User is not authenticated");
      }
    });
    return () => unsub();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"}></ActivityIndicator>
      </View>
    );
    
  return <AppContainer />;
  // return userInfo ? <Text>Rest of the application</Text> : <Main></Main>;
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

//       {/* <SignInScreen promptAsync={promptAsync}></SignInScreen> */}


// SignOut = await signOut(auth); export from from firebase/auth and firebaseConfig, also set await AsyncStorage.setItem('@user', JSON.stringify(user)); to null
