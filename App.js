import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from '/Users/hirochen/BrandaFront/components/About.js'
import ItemDetail  from '/Users/hirochen/BrandaFront/components/ItemDetail.js'
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import React from "react";
import {useState} from "react";
import { useEffect } from 'react';
import { Checkbox } from 'react-native';
import moment from "moment";
import todo from '/Users/hirochen/BrandaFront/todo.json';
import * as Clipboard from "expo-clipboard";
import { FlatList } from 'react-native';
//import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, ImageBackground} from “React-native”;

const Root = createNativeStackNavigator();

export default function App(){
  return(
    Home()
  )
}

function Home(){
  return(
  <NavigationContainer>
      
      <Root.Navigator>
      <Root.Screen
        name = "Home"
        component={HomeScreen}
        //component={TodoList}
        options=  {({navigation}) =>({
            headerRight: () => (
              <TouchableOpacity style={styles.AboutButton}
                onPress={() => navigation.navigate('About', {name:'About'})}>
                <Text style={{letterSpacing: 3}}> About  
                
                <AntDesign name="infocirlce" size={18} color="black"  />
                </Text>
              </TouchableOpacity>
            ),
          })
          }
      />
      <Root.Screen name ="About" component={About}/>
      </Root.Navigator>
  </NavigationContainer>
  );
}



const HomeScreen = ({navigation}) => {
  const [num, setNum] = useState(0);
  const todoJson = require("./todo.json").todo;
  const [todoData, setTodoData] = useState([]);
  const [used, setUsed] = useState(false);
  const finished = todoData.filter(todo => todo.done === false);
  const [marked,setMarked] = useState(false);
  

  useEffect(() => {
    setTodoData(todoJson)
  }, []);

  function markItemDone(index){
    let todoCopy = todoData;
    todoCopy[index].done = !todoCopy[index].done;
    setTodoData(todoCopy);
    setUsed(!used);
  }

  const renderItem = ({ item }) => (
    <View style = {styles.item}>
      <Checkbox
      status={item.done? "checked" : "unchecked"}
        onPress={() => {
          markItemDone(todoData.indexOf(item));
        }}
      />
      <Text>{item.name}</Text>
      <Text>  {moment(item.due).format("ddd, MM Do YYYY")}</Text>
      <Text>  {moment(item.due).fromNow()}</Text>
    </View>
  );


    return(
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text>Num is {num}</Text>
      <Button uppercase={false} mode={"contained"} onPress={() => setNum(num +1 )}>
        Increase num by 1.
      </Button>
      <Button uppercase={false} mode={"contained"} onPress={() => setNum(num -1 )}>
        Decrease num by 1.
      </Button>
      <Button uppercase={false} mode={"contained"} onPress={() => setNum(num *2 )}>
        Mutiply num by 2.
      </Button>
      <Button uppercase={false} mode={"contained"} onPress={() => setNum(num /2 )}>
        Divid num by 2.
      </Button>
      <Button uppercase={false} mode={"contained"} onPress={() => setNum(0 )}>
        Clear.
      </Button>
      <View style={styles.list}>
          <FlatList
            data={marked?todoData:finished}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            extraData = {used}
          />
        </View>
    </View>
    
  )
}

// const Item = ({ name }) => (
//   <View style={styles.todoList.item}>
//     <Text style={styles.todoList.name}>{name}</Text>
//   </View>
// )

// const TodoList = ({navigation}) => {
//   //const renderItem= {(item) => renderArticle(item)}
//   const renderItem = ({item}) => renderArticle(item.item);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={Todo}
//         renderItem={renderItem}
//         keyExtractor={item => item.name}
//       />
//     </View>
//   );
// }
// const useEffect = (() => {
//   function fetchRSS() {
//     fetch(Todo)
//     .then((response) => response.text())
//     .then((textResponse) => {
//       let obj = parse(textResponse);
//       let rssData = obj.todo;
//       settodo(rssData);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   }
//   fetchRSS();
// }, []);
// function fetchRSS() {
//   const [todo, settodo] = useState([]);
//   fetch(Todo)
//     .then((response) => response.text())
//     .then((textResponse) => {
//       let obj = parse(textResponse);
//       let rssData = obj.todo;
//       settodo(rssData);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   return(todo)
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // AboutButton:{
  //   size: 18,
  //   paddingLeft: 8,
  //   width: 100,
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   },
  // itme: {
  //   backgroundColor: '#f9c2ff',
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
  // name: {
  //   fontSize: 32,
  // },
  // done:{
  //   fontSize: 32,
  // }
});

const AboutButton = StyleSheet.create ({
  container:{
    size: 18,
    paddingLeft: 8,
    width: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'cneter',
    justifyContent: 'center',
    //aligncontent: 'flex-start',
    //alignself: 'auto',
  },
  
});


const todoList = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itme: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
  },
  done:{
    fontSize: 32,
  }
});