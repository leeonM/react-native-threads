import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const RegisterScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigation = useNavigation()

    const handleRegister = () =>{
        const user = {
            name:name,
            email:email,
            password:password
        }

        axios
      .post("http://192.168.0.15:3000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "you have been registered successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration failed",
          "An error occurred during registration"
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
            <Text style={{fontSize:17,fontWeight:'bold',marginTop:25}}>Register an Account</Text>
        </View>

        <View style={{marginTop:30}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:5,borderColor:'#D0D0D0',borderWidth:1,paddingVertical:5,borderRadius:5}}>
            <MaterialCommunityIcons name="account" size={24} color="gray" 
            style={{marginLeft:8}}
             />
            <TextInput placeholder='Enter your name' 
            placeholderTextColor={'gray'}
            style={{color:'grey',marginVertical:10,width:300,fontSize:email?16:16}}
            value={name}
            onChangeText={(text)=>setName(text)}
            />
            </View>
        </View>

        <View style={{marginTop:20}}>
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

        <View style={{marginTop:20}}>
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

        </View>
        <View style={{marginTop:54}} />

        <Pressable style={{width:200,backgroundColor:'black',padding:15,marginTop:40,marginLeft:"auto",marginRight:'auto',borderRadius:6}}
        onPress={handleRegister}
        >
            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:16,color:'white'}}>Register</Text>
        </Pressable>

        <Pressable style={{marginTop:10}}
        onPress={()=>navigation.navigate('Login')}
        >
            <Text style={{textAlign:'center',fontSize:16}}>Already have an account? Log In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen