import { StyleSheet, Text, View ,ScrollView, Image} from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { UserType } from '../userContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import "core-js/stable/atob";
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'


const Homescreen = () => {
  const {userId,setUserId} = useContext(UserType)
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchId = async () =>{
      const token = await AsyncStorage.getItem("authToken")
      const decodedToken = jwtDecode(token)
      const id = decodedToken.userId
      setUserId(id)
    }
    fetchId()
  }, [])

  // useEffect(() => {
  //   const getUsers = async ()=>{
  //     axios.get(`http://192.168.0.15:3000/user/${userId}`).then((response)=>{
  //     setUsers(response.data)
  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  //   }
  //   getUsers()
  // }, [userId])

  useEffect(() => {
    fetchPosts()
  }, [posts])

  // useFocusEffect(
  //   useCallback(() => {
  //       fetchPosts()
  //     },[]))

  const fetchPosts = async () =>{
    try {
      axios.get(`http://192.168.0.15:3000/get-posts`).then((response)=>{
      setPosts(response.data)
    }).catch((error)=>{
      console.log(error)
    })
    } catch (error) {
      console.log("Error fetching posts",error)
    }
  }
  
  const handleLike = async(postId)=>{
    try {
      const response = await axios.put(`http://192.168.0.15:3000/post/${postId}/${userId}/like`)

      const updatedPost = response.data;

      const updatedPosts = posts?.map((post)=> posts?._id === updatedPost._id ? updatedPost : post )

      setPosts(updatedPosts)
    } catch (error) {
      console.log("Error liking post",error)
    }
  }

  const handleUnlike = async (postId)=> {
    try {
      const response = await axios.put(`http://192.168.0.15:3000/post/${postId}/${userId}/unlike`)

      const updatedPost = response.data;

      const updatedPosts = posts?.map((post)=> posts?._id === updatedPost._id ? updatedPost : post )

      setPosts(updatedPosts)
    } catch (error) {
      console.log("Error liking post",error)
    }
  }

  return (
    <ScrollView style={{marginTop:50,flex:1,backgroundColor:'white'}}>
      <View style={{alignItems:'center',marginTop:20}}>
      <Image 
       style={{
        width:60,
        height:40,
        resizeMode:'contain',
       }}
       source={{
        uri:'https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png'
       }}
       />
      </View>

      <View style={{marginTop:20}}>
        {posts.map((post)=>(
          <View key={post._id}
          style={{padding:15,borderColor:'#D0D0D0',borderTopWidth:1,flexDirection:'row',gap:10,marginVertical:10}}
          >
            <View>
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
            </View>

            <View>
            <Text style={{fontSize:15,fontWeight:'bold',marginBottom:4}}>{post?.user.name}</Text>
               <Text>{post?.content}</Text>

               <View style={{flexDirection:'row',alignItems:'center',gap:10,marginTop:15}}>
               
               {post?.likes?.includes(userId) ? (
                <AntDesign name="heart" size={18} color="red" 

                onPress={()=>handleUnlike(post?._id)}
                />
               ): (
                <AntDesign name="hearto" size={18} color="black" 
                onPress={()=>handleLike(post?._id)}
                />
               )}

               <FontAwesome name="comment-o" size={18} color="black" />

               <AntDesign name="sharealt" size={18} color="black" />
               </View>

               <Text style={{marginTop:7,color:'gray'}}>{post?.likes?.length} likes {post?.replies?.length} replies</Text>
              </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Homescreen

const styles = StyleSheet.create({})