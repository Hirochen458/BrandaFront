import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from '/Users/hirochen/BrandaFront/components/About.js'
import ItemDetail  from '/Users/hirochen/BrandaFront/components/ItemDetail.js'
import LibraryHours from './components/LibraryHours';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import React from "react";
import {useState} from "react";
import { useEffect } from 'react';
import { Checkbox } from 'react-native-paper';
import moment from "moment";
import { FlatList } from 'react-native';


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
        options=  {({navigation}) =>({
            headerRight: () => (
              <TouchableOpacity style={styles.AboutButton}
                onPress={() => navigation.navigate('About', {name:'About'})}>
                <Text style={{letterSpacing: 3}}> About  
                
                <AntDesign name="infocirlce" size={18} color="black"  />
                </Text>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity style={styles.LibraryButton}
                onPress={() => navigation.navigate('LibraryHours', {name:'LibraryHours'})}>
                <Text style={{letterSpacing: 0}}> LibraryHours  
                
                <AntDesign name="bars" size={18} color="green"  />
                </Text>
              </TouchableOpacity>
            ),
            
          })
          }
      />
      <Root.Screen
        name = "About"
        component={About}
        options=  {({navigation}) =>({
            headerRight: () => (
              <TouchableOpacity style={styles.AboutButton}
                onPress={() => navigation.navigate('ItemDetail', {name:'ItemDetail'})}>
                <Text style={{letterSpacing: 0}}> ItemDetail 
                
                <AntDesign name="infocirlce" size={18} color="black"  />
                </Text>
              </TouchableOpacity>
            ),
          })
          }
      />

      <Root.Screen name ="ItemDetail" component={ItemDetail}/>
      <Root.Screen name ="LibraryHours" component={LibraryHours}/>
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
    </View>
  );

    return(
    <View style={styles.container}>
      <View style={styles.container}>
          <FlatList
            data={marked?todoData:finished}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            extraData = {used}
          />
      </View>
      <Text>Click below button to see or hide checked items</Text>
      <Button color='#000000' mode={"contained"} onPress={() => setMarked(!marked)}>
          Checked-off Items
      </Button>
      <Text>
        
      </Text>

      <Text>Open up App.js to start working on your app!</Text>
      <Text>

      </Text>
      <StatusBar style={styles.container} />
      <Text size={50} >Num is {num}</Text>
      <Button color='#00ffff' uppercase={false} mode={"contained"} onPress={() => setNum(num +1 )}>
        Increase num by 1.
      </Button>
      <Button color='#00ff00' uppercase={false} mode={"contained"} onPress={() => setNum(num -1 )}>
        Decrease num by 1.
      </Button>
      <Button color='#00ff7f' uppercase={false} mode={"contained"} onPress={() => setNum(num *2 )}>
        Mutiply num by 2.
      </Button>
      <Button color='#7fffd4' uppercase={false} mode={"contained"} onPress={() => setNum(num /2 )}>
        Divid num by 2.
      </Button>
      <Button color='#e0ffff' uppercase={false} mode={"contained"} onPress={() => setNum(0 )}>
        Clear.
      </Button>
      
      <Text>

      </Text>
      
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column-reverse',
    marginVertical: 0,
  },
  AboutButton:{
    size: 18,
    paddingLeft: 6,
    width: 100,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  LibraryButton:{
    fontsize: 10,
    size: 1,
    paddingLeft: 0,
    width: 150,
    flex: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    },
});

