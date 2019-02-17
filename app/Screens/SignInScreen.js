import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, TextInput, Image, Font, AsyncStorage } from 'react-native';
import axios from "axios"

class SignInScreen extends Component {
  static navigationOptions = {
    headerTitle: "Shells (Select 1)"
  };
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', titleText: 'Hourglass'};

  }
  _signIn = async () => {
      var self = this
      var usernameValue = ''
      var passwordValue = ''
      const loginData = {
          todo: 'login',
          type: 'user',
          username: self.state.username,
          password: self.state.password
      }
      const getUsersData = {
          todo: 'getAllUsers',
          type: 'user'
      }
      const querystring = require('querystring');
      axios.post('http://169.234.64.64:8000/hourglass_db/', querystring.stringify(loginData))
          .then(function(response) {
              passwordValue = response['data']['password']
              usernameValue = response['data']['username']
              firstNameValue = response['data']['firstName']
              lastNameValue = response['data']['lastName']
              if (passwordValue == self.state.password) {
                  axios.post('http://169.234.64.64:8000/hourglass_db/', querystring.stringify(getUsersData))
                      .then(function(allUsersValues) {
                          AsyncStorage.setItem("Username", usernameValue)
                          AsyncStorage.setItem("FirstName", firstNameValue)
                          AsyncStorage.setItem("LastName", lastNameValue)
                          self.props.navigation.navigate("ChatbookScreen", {allUsers: allUsersValues['data']})
                      })
              } else if (usernameValue == undefined) {
                  alert('This username and password are incorrect')
              }
          })
  }

  _goBackToCreate = () => {
    var self = this
    self.props.navigation.navigate("SignUpScreen")
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
          onChangeText={(username) => this.setState({username})} value = {this.state.username}
        />

        <TextInput
		  style = {{fontSize: 30, margin: 15}}
          placeholder="Enter your password"
          onChangeText={(password) => this.setState({password})} value = {this.state.password}
        />

        <Button
          onPress={() => {
              this._signIn()
          }}
          title="Log In"
        />

        <Button
          onPress={() => {
              this._goBackToCreate()
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
