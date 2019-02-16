import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, TextInput, Image, Font } from 'react-native';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', titleText: 'Hourglass'};

  }

  render(){
    let pic = {
      uri: 'http://cliparts101.com/files/189/7560C01DA965819F6055A1E5B041F83D/Architetto__Clessidra.png'
      };
    return(

      <View style = {styles.container}>

        <Text style = {styles.titleText}>
          {this.state.titleText}{'\n'}
        </Text>

      <Image source={pic} style={{width: 193, height: 200}}/>

        <TextInput
		  style = {{fontSize: 30, margin: 15, marginTop: 50 }}
          placeholder="Enter your username"
          onChangeText = {(username) => this.setState({username})}
        />

        <TextInput
		  style = {{fontSize: 30, margin: 15}}
          placeholder="Enter your password"
          onChangeText = {(password) => this.setState({password})}
        />

        <Button
          onPress={() => {
          Alert.alert('You have logged in.');
          }}
          title="Log In"
        />

        <Button
          onPress={() => {
          Alert.alert('Redirecting to Account Creation Screen');
          }}
          title="Create an Account"
        />

      </View>
      );
      }
      }
export default SignInScreen;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    alignItems: 'center',
    },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    },
    });

//AppRegistry.registerComponent('Hourglass', () => LogIn);
