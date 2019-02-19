import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, TextInput } from 'react-native';
import axios from "axios";

class SignUpScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', firstName: '', lastName: ''};

  }
  _postUser = () => {
    var self = this;
    const createMessageArr = {
      todo:"postScheduledMessage",
      type:"user",
      username: self.state.username
    }
    const getUsersData = {
      todo: "register",
      type: "user",
      firstName: self.state.firstName,
      lastName: self.state.lastName,
      password: self.state.password,
      username: self.state.username
    }

    const querystring = require('querystring');
    axios.post ("http://localhost:8000/hourglass_db/", querystring.stringify(getUsersData))
        .then(function (response) {
          alert('Successfully created account')
            axios.post("http://localhost:8000/hourglass_db/",querystring.stringify(createMessageArr))

        })
  }
  _goToLogin = () => {
    this.props.navigation.navigate("SignInScreen")
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
		  style = {{fontSize: 30, margin: 30, marginTop: 20 }}
          placeholder="Enter your first name"
          onChangeText={(firstName) => this.setState({firstName})} value = {this.state.firstName}
        />

        <TextInput

		  style = {{fontSize: 30, margin: 30 }}
          placeholder="Enter your last name"
          onChangeText={(lastName) => this.setState({lastName})} value = {this.state.lastName}
        />

        <TextInput
		  style = {{fontSize: 30, margin: 30 }}
          placeholder="Enter your username"
          onChangeText={(username) => this.setState({username})} value = {this.state.username}
        />

        <TextInput
		  style = {{fontSize: 30, margin: 30, marginBottom: 50 }}
          placeholder="Enter your password"
          onChangeText={(password) => this.setState({password})} value = {this.state.password}
        />

        <Button
  		  onPress={() => {
      	  this._postUser()
          }}
          title="Create Account"
        />
        <Button
        onPress = {() => {
          this._goToLogin()
          }}
          title = "Go to login"
        />

      </View>
    );
  }
}
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    alignItems: 'center'
    }
    });



//AppRegistry.registerComponent('Hourglass', () => SignIn);
