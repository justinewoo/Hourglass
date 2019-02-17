import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, TextInput, Image, Font } from 'react-native';

class Settings extends Component {
  constructor(props) {
    super(props);


  }

  render(){
    return(


     <View style = {styles.container}>

        <Text style = {{paddingTop: 9, fontSize: 30}}>Username</Text>

        <Text style = {{paddingTop: 40, fontSize: 30, marginBottom: 50}}>Name</Text>

        <Button
  	      onPress={() => {
  	      Alert.alert('You have logged out.');
  	      }}
          title="Log Out"
        />
      </View>

      );
      }
      }

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    marginLeft: 15,
    }
    });
