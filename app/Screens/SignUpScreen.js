import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import {Button} from 'native-base'
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
      <Text style = {styles.titleText}>
          {this.state.titleText}{'\n'}
        </Text>
        <View styles = {{flex: 1, flexDirection: 'row'}}>
    	  <TextInput
		  style = {{fontSize: 20, margin: 0, marginTop: 50, flexDirection: 'row' }}
          placeholder="Enter your username"
          placeholderTextColor = 'white'
          autoCorrect = {false}
          onChangeText={(username) => this.setState({username})} value = {this.state.username}
          />
      	  <View style = {{backgroundColor: 'white', height: 2, width: 325, justifyContent: 'space-between', borderRadius:10}}>

		  </View>
    	</View>

      <View styles = {{flex: 1, flexDirection: 'row'}}>
      <TextInput
    style = {{fontSize: 20, margin: 0, marginTop: 50, flexDirection: 'row' }}
        placeholder="Enter your password"
        placeholderTextColor = 'white'
        secureTextEntry = {true}
        autoCorrect = {false}
        onChangeText={(password) => this.setState({password})} value = {this.state.password}
        />
        <View style = {{backgroundColor: 'white', height: 2, width: 325, justifyContent: 'space-between', borderRadius:10}}>

    </View>
    </View>

    <View styles = {{flex: 1, flexDirection: 'row'}}>
    <TextInput
  style = {{fontSize: 20, margin: 0, marginTop: 50, flexDirection: 'row' }}
      placeholder="Enter your first name"
      placeholderTextColor = 'white'
      autoCorrect = {false}
      onChangeText={(firstName) => this.setState({firstName})} value = {this.state.firstName}
      />
      <View style = {{backgroundColor: 'white', height: 2, width: 325, justifyContent: 'space-between', borderRadius:10}}>

  </View>
  </View>

  <View styles = {{flex: 1, flexDirection: 'row'}}>
  <TextInput
style = {{fontSize: 20, margin: 0, marginTop: 50, flexDirection: 'row' }}
    placeholder="Enter your last name"
    placeholderTextColor = 'white'
    autoCorrect = {false}
    onChangeText={(lastName) => this.setState({lastName})} value = {this.state.lastName}
    />
    <View style = {{backgroundColor: 'white', height: 2, width: 325, justifyContent: 'space-between', borderRadius:10, marginBottom: 20}}>

</View>
</View>

        <Button block info
         style = {{padding: 20, marginLeft:20, marginRight:20, backgroundColor: 'white'}}
         onPress={() => {this._postUser()}}
        >
          <Text> Sign Up </Text>
      	</Button>
        <TouchableOpacity
      		onPress = {() => {this._goToLogin()}}
      	>
      		<Text style = {{justifyContent: 'space-between', marginTop: 5, color: 'white'}}>Already have an Account? Log In </Text>
      	</TouchableOpacity>

      </View>
    );
  }
}
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    paddingBottom: 300,
    alignItems: 'center',
    backgroundColor: 'skyblue',
    },
    titleText: {
    fontSize: 40,
    fontFamily: 'Helvetica-Light',
    },
    });



//AppRegistry.registerComponent('Hourglass', () => SignIn);
