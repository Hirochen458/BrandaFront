import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
//import { DataTable } from "react-native-paper";
//import app from '/Users/hirochen/BrandaFrontend/components/app.json'

const AppInfo = require("../app.json").expo;

export default function About(){
  
  const AboutTable = () =>{
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Item</DataTable.Title>
        <DataTable.Title>Value</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Name</DataTable.Cell>
        <DataTable.Cell>{AppInfo.name}</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  }
  const [copiedText, setCopiedText] = React.useState('');

  const copyToClipboard = async () => {
    //await Clipboard.setStringAsync(AboutTable);
    await Clipboard.setStringAsync(AppInfo.icon);
    };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  return (
    <View style={styles.container}>
      <Button uppercase={false}
      onPress={copyToClipboard} >
      <Text style={styles.copiedText}> Click here to copy to Clipboard </Text>
      </Button>
      <Button  uppercase={false}
      onPress={fetchCopiedText} >
      <Text style={styles.copiedText}> View copied text </Text>
      </Button>
      <Text style={styles.copiedText}>{copiedText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});