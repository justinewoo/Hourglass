import React, { Component }from 'react';
import { StyleSheet, ScrollView, Text, View, Button, AppRegistry, TouchableHighlight, AsyncStorage } from 'react-native';
import axios from "axios"

class ChatbookScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUsers: '',
      allMessages: []
    }
  }

  _goToChatroom = async (userValue) => {
    var self = this
    const uname = await AsyncStorage.getItem("Username")
    const getSenderToReceiver = {
      type: 'user',
      todo: 'getMessage',
      sender: uname,
      receiver: userValue['value']['username']
    }
    const getReceiverToSender = {
      type: 'user',
      todo: 'getMessage',
      sender: userValue['value']['username'],
      receiver: uname
    }
    const querystring = require('querystring');
    const currentHistory = []
    axios.post('http://169.234.64.64:8000/hourglass_db/', querystring.stringify(getSenderToReceiver))
        .then(function(receiverRep){
          axios.post('http://169.234.64.64:8000/hourglass_db/', querystring.stringify(getReceiverToSender))
            .then(function(senderRep){
              //console.log(JSON.parse(JSON.stringify(senderRep['data'])))
              //currentHistory = JSON.parse(JSON.stringify(senderRep['data'])).concat(JSON.parse(JSON.stringify(receiverRep['data'])))
              // currentHistory.sort(function(d1,d2){
              //   if (d1['year'] < d2['year']){
              //     return 1
              //   }
              //   else if (d1['year'] > d2['year']){
              //     return -1
              //   }else{
              //     if(d1['month']<d2['month']){
              //       return 1
              //     }else if (d1['month']>d2['month']) {
              //       return -1
              //     }else{
              //       if(d1['day'] < d2['day']){
              //         return 1
              //       }else if (d1['day'] > d2['day']) {
              //         return -1
              //       }else{
              //         if (d1['time'] < d2['time']){
              //           return 1
              //         }else if (d1['time'] > d2['time']) {
              //           return -1
              //         }
              //       }
              //     }
              //   }
              // })
              self.props.navigation.navigate("ChatroomScreen", {receiver: userValue['value']['username'], fname: userValue['value']['firstName'], lname: userValue['value']['lastName'], currentReceiverMessages: receiverRep['data'], currentSenderMessages: senderRep['data']})
            })
        })
  }

 render() {
    const {navigation} = this.props;
    const currentUserValues = navigation.getParam("allUsers", "Get some friends")
    this.state.allUsers = currentUserValues
    return (

      <ScrollView>
      	<View style={styles.container}>
          {this.state.allUsers.map ((value, index) => (
              <TouchableHighlight
               style={styles.button}
               onPress={() => {
                   this._goToChatroom({value})
               }}
              underlayColor="#eaf5f9"
              key={index}
              >
               <Text style = {{fontSize: 20}}> {value['firstName']} {value['lastName']} </Text>
              </TouchableHighlight>
          ))}
      	</View>
      </ScrollView>
    )
  }
}
export default ChatbookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  button: {
    backgroundColor: '#f7f7f7',
    padding: 50,
  },
})
