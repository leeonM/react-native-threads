import { Alert, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeAreaView from 'react-native-safe-area-view';


const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()

    useEffect(() => {
      const checkLoginStatus = async ()=>{
        try {
            const token = await AsyncStorage.getItem("authToken")

            if (token){
                setTimeout(() => {navigation.replace("Main")},400)
            }
        } catch (error) {
            console.log("error",error)
        }
      }

      checkLoginStatus()
    }, [])
    
    const handleLogin = () => {
        const user = {
            email:email,
            password:password,
        }

        axios.post('http://192.168.0.15:3000/login',user).then((response) => {
        console.log(response);
        const token = response.data.token
        AsyncStorage.setItem("authToken",token)
        navigation.navigate("Home")
      })
      .catch((error) => {
        Alert.alert(
          "Login failed",
          "An error occurred during login"
        );
        console.log("error", error);
      });
    }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white',alignItems:'center'}}>
      <View style={{ marginTop: 50 }}>
        <Image
          style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:17,fontWeight:'bold',marginTop:25}}>Login to Your Account</Text>
        </View>

        <View style={{marginTop:40}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:5,borderColor:'#D0D0D0',borderWidth:1,paddingVertical:5,borderRadius:5}}>
            <MaterialIcons name="email" size={24} color="gray" 
            style={{marginLeft:8}}
             />
            <TextInput placeholder='Enter your email' 
            placeholderTextColor={'gray'}
            style={{color:'grey',marginVertical:10,width:300,fontSize:email?16:16}}
            value={email}
            onChangeText={(text)=>setEmail(text)}
            />
            </View>
        </View>

        <View style={{marginTop:30}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:5,borderColor:'#D0D0D0',borderWidth:1,paddingVertical:5,borderRadius:5}}>
            <AntDesign name="lock" size={24} color="gray" 
            style={{marginLeft:8}}
             />
            <TextInput placeholder='Enter your password' 
            placeholderTextColor={'gray'}
            style={{color:'grey',marginVertical:10,width:300,fontSize:password?16:16}}
            value={password}
            onChangeText={(text)=>setPassword(text)}
            secureTextEntry={true}
            />
            </View>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:12}}>
                <Text>Keep me logged in</Text>
                <Text style={{fontWeight:"500",color:'#007FFF'}}>Forgot Password</Text>
            </View>
        </View>
        <View style={{marginTop:54}} />

        <Pressable style={{width:200,backgroundColor:'black',padding:15,marginTop:40,marginLeft:"auto",marginRight:'auto',borderRadius:6}}>
            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:16,color:'white'}}
            onPress={handleLogin}
            >Login</Text>
        </Pressable>

        <Pressable style={{marginTop:10}}
        onPress={()=>navigation.navigate('Register')}
        >
            <Text style={{textAlign:'center',fontSize:16}}>Don't have an account? Sign up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

