import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, TextInput, Image, Font } from 'react-native';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: ''
    }

  }
  _signOut = () => {
    var self = this
    self.props.navigation.navigate("SignInScreen")
  }

  render(){
    const {navigation} = this.props;
    const currentFirstName = navigation.getParam("firstName")
    const currentLastName = navigation.getParam("lastName")
    const currentUsername = navigation.getParam("userName")
    console.log(currentFirstName)
    this.state.firstName = currentFirstName
    this.state.lastName = currentLastName
    this.state.userName = currentUsername
    return(

     <View style = {styles.container}>

        <Text style = {{paddingTop: 9, fontSize: 30}}> {this.state.userName} </Text>

        <Text style = {{paddingTop: 40, fontSize: 30, marginBottom: 50}}>{this.state.firstName} {this.state.lastName}</Text>

        <Button
  	      onPress={() => {
              this._signOut()
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
