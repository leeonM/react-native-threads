import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserType } from '../userContext'
import axios from 'axios'

const ThreadsScreen = () => {
  const {userId,setUserId} = useContext(UserType)
  const [content, setContent] = useState("")

  const handlePostSubmit = () =>{
    const postData = {
      userId,
    }

    if (content){
      postData.content = content
    }

    axios.post(`http://192.168.0.15:3000/create-post`,postData)
    .then((response)=>{
      setContent("")
    }).catch((error)=>{
      console.log("Error creating post",error)
    })
  }
  return (
    <SafeAreaView style={{padding:10}}>
       <View style={{flexDirection:'row',alignItems:'center',gap:10,padding:10}}>
       <Image 
       style={{
        width:40,
        height:40,
        borderRadius:20,
        resizeMode:'contain',
       }}
       source={{
        uri:'https://cdn-icons-png.flaticon.com/128/149/149071.png'
       }}
       />

        <Text>Leon1000</Text>
       </View>

       <View style={{flexDirection:'row',marginLeft:10}}>
        <TextInput 
        value={content} 
        placeholderTextColor='black' 
        placeholder='Type your message...'
        onChangeText={(text)=>setContent(text)}
        multiline
         />
       </View>

       <View style={{marginTop:20}} />

       <Button title='Share Post' 

        onPress={handlePostSubmit}
       />


    </SafeAreaView>
  )
}

export default ThreadsScreen

const styles = StyleSheet.create({})