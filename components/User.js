import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserType } from '../userContext'
import axios from 'axios'

const User = ({item}) => {
    const [requestSent, setRequestSent] = useState(false)
    const {userId,setUserId} = useContext(UserType)
    const sendFollow = async (currentUserId,selectedUserId) => {
        try {
           const response = await fetch(`http://192.168.0.15:3000/users/follow`,{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({currentUserId,selectedUserId}),
           })

           if (response.ok){
            setRequestSent(true)
           }


        } catch (error) {
            console.log(error)
        }
    }

    const handleUnfollow = async (loggedInUserId,targetUserId) => {
        try {
           const response = await fetch(`http://192.168.0.15:3000/users/unfollow`,{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({loggedInUserId,targetUserId}),
           })

           if (response.ok){
            setRequestSent(false)
            console.log('unfollow successfully')
           }


        } catch (error) {
            console.log(error)
        }
    }

  return (
    <View>
        <View style={{flexDirection:"row",alignItems:'center',gap:10, marginVertical:2}}>
            <Image
            style={{
                width:40,
                height:40,
                borderRadius:20,
                resizeMode:'contain',
            }} 
            source={{
                uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png"
            }}
            />

            <Text style={{fontSize:15,fontWeight:500,flex:1}}>{item?.name}</Text>

            {requestSent || item?.followers.includes(userId) ? (
                <Pressable onPress={()=>handleUnfollow(userId,item._id)} 
            style={{borderColor:"#D0D0D0",backgroundColor:'#000',borderWidth:1,padding:10,marginLeft:10,width:100,borderRadius:7}}>
                <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold',color:"#fff"}}>Following</Text>
            </Pressable>
            ):(
                <Pressable onPress={()=>sendFollow(userId,item._id)} 
            style={{borderColor:"#D0D0D0",borderWidth:1,padding:10,marginLeft:10,width:100,borderRadius:7}}>
                <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold'}}>Follow</Text>
            </Pressable>
            )}

            
        </View>
    </View>
  )
}

export default User

const styles = StyleSheet.create({})