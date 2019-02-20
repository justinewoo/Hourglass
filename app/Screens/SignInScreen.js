import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, View, Text, TextInput, Image, Font, AsyncStorage, TouchableOpacity } from 'react-native';
import {Button} from 'native-base'
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
      axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(loginData))
          .then(function(response) {
              passwordValue = response['data']['password']
              usernameValue = response['data']['username']
              firstNameValue = response['data']['firstName']
              lastNameValue = response['data']['lastName']
              if (passwordValue == self.state.password) {
                  axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(getUsersData))
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
    return(

      <View style = {styles.container}>

        <Text style = {styles.titleText}>
          {this.state.titleText}{'\n'}
        </Text>


      <View styles = {{flex: 1, flexDirection: 'row'}}>
      <TextInput
		  style = {{fontSize: 20, margin: 0, marginTop: 50, flexDirection: 'row' }}
          placeholder="Enter your username"
          placeholderTextColor = 'white'
          autoCorrect = {false}
          onChangeText={(username) => this.setState({username})} value = {this.state.username}        />
      	<View style = {{backgroundColor: 'white', height: 2, width: 325, justifyContent: 'space-between', borderRadius:10}}>

	</View>
    </View>

    <View styles = {{flex: 1, flexDirection: 'row'}}>
      <TextInput
		  style = {{fontSize: 20, margin: 0, marginTop: 50,flexDirection: 'row' }}
		  secureTextEntry = {true}
		  autoCorrect = {false}
          placeholder="Enter your password"
          placeholderTextColor = 'white'
          onChangeText={(password) => this.setState({password})} value = {this.state.password}        />
      	<View style = {{backgroundColor: 'white', height: 2, width: 325, justifyContent: 'space-between', borderRadius:10, marginBottom: 50}}>

	</View>
    </View>
        <Button block info
      		style = {{padding: 20, marginLeft:40, marginRight:40, backgroundColor: 'white'}}
          onPress={() => {
              this._signIn()
          }}      	>
      		<Text> Log In </Text>
      	</Button>
        <TouchableOpacity
        onPress={() => {
            this._goBackToCreate()
        }}      	>
      		<Text style = {{justifyContent: 'space-between', marginTop: 5, color: 'white'}}>Do not Have an Account? Create One </Text>
      	</TouchableOpacity>

      </View>
      );
      }
      }
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    height: 800,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: 'skyblue',
    },
  titleText: {
    fontSize: 40,
    fontFamily: 'Helvetica-Light',
    },
    });

//AppRegistry.registerComponent('Hourglass', () => LogIn);
