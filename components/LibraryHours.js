import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from '/Users/hirochen/BrandaFront/components/About.js'
import ItemDetail  from '/Users/hirochen/BrandaFront/components/ItemDetail.js';

import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import React from "react";
import { useState } from "react";
import { useEffect } from 'react';
import { Checkbox } from 'react-native-paper';
import moment from "moment";
import { FlatList } from 'react-native';



export default function LibraryHours() {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    async function fetchData() {
      fetch("http://brandaserver.herokuapp.com/getinfo/libraryHours/week")
        .then((response) => response.json( ))
        .then((json) => {
          setHours(json);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchData();
  },[]);

  const renderListDate = ({item}) => (
    <View style={styles}>
      <View style={styles.Date}>
        <Text style={{fontWeight:"bold",fontSize:20,color:"blue"}}>{item.day}, {item.date}</Text>
      </View>
      <View style={styles.done}>
        <FlatList
          data={item.hours}
          renderItem={renderListContent}
          keyExtractor={item => item.location}
        />  
      </View>
    </View>
  );

  const renderListContent = ({item}) => (
    <View>
      <View style = {{flexDirection:"column",margin:1, padding:2}}>
        <View>
          <Text>{item.location}</Text>
        </View>
        <View style = {{flex:1, alignItems:"flex-end"}}>
          <Text>{item.times.hours == null ? "closed" : item.times.hours[0].from+" ~ "+item.times.hours[0].to}</Text>
        </View>
      </View>     
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hours}
        renderItem={renderListDate}
        keyExtractor={item => item.date}
      />
    </View>
  );

  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 8,
      flexDirection: 'column-reverse',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 1,
      marginHorizontal: 1,
      
    },
    Date: {
        size: 10,
        paddingLeft: 0,
        width: 350,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    done:{
        size: 10,
        paddingLeft: 0,
        width: 1000,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
  });
