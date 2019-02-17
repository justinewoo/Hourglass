import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, TextInput, Image, Font, ScrollView, AsyncStorage } from 'react-native';
import axios from "axios"


class ChatroomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      fname: '',
      lname: '',
      historyMessages: [],
      attributeArray: [],
      sender: '',
      receiver: '',
      senderValues: [],
      receiverValues: [],
      count: 0
    };


  }
  componentDidUpdate() {
    if (this.state.count != 0) {
      console.log('sup')
      setInterval(() => this.loadData(), 1000);
    }
  }
  async loadData() {
    var self = this
    var currentUser = await AsyncStorage.getItem("Username")
    var receiverUser = await AsyncStorage.getItem("Receiver")
    const getSenderToReceiver = {
      type: 'user',
      todo: 'getMessage',
      sender: currentUser,
      receiver: receiverUser
    }
    const getReceiverToSender = {
      type: 'user',
      todo: 'getMessage',
      sender: receiverUser,
      receiver: currentUser
    }
    const querystring = require('querystring');
    axios.post('http://169.234.64.64:8000/hourglass_db/', querystring.stringify(getSenderToReceiver))
        .then(function(receiverRep){
          axios.post('http://169.234.64.64:8000/hourglass_db/', querystring.stringify(getReceiverToSender))
            .then(function(senderRep){
              self.setState( { senderValues: senderRep })
              self.setState({receiverValues: receiverRep})

            })
        })
  }
  _postMessage = () => {
    var self = this
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var t = today.getTime();
    const postMessageData = {
      type: 'user',
      todo: 'postMessage',
      sender: self.state.sender,
      receiver: self.state.receiver,
      message: self.state.message,
      year: yyyy,
      month: mm,
      day: dd,
      time: t
    }
    const currentListOfMessage = this.state.historyMessages
    currentListOfMessage.push(postMessageData)
    const querystring = require('querystring')
    axios.post('http://169.234.64.64:8000/hourglass_db/', querystring.stringify(postMessageData))
  }
  render(){
    const shadowStyle = { shadowOpacity: 0.5, shadowColor: 'gray', shadowRadius: 50,}
    const {navigation} = this.props;
    const currentReceiverValues = navigation.getParam("currentReceiverMessages", "Get some friends")
    const currentSenderValues = navigation.getParam("currentSenderMessages", "Get some friends")
    const firstName = navigation.getParam("fname")
    const lastName = navigation.getParam("lname")
    const currentUser = navigation.getParam("unameValue")
    const receiver = navigation.getParam("receiver")
    this.state.senderValues = currentReceiverValues
    this.state.receiverValues = currentSenderValues
    console.log(currentUser)
    currentHistory = this.state.receiverValues.concat(this.state.senderValues)
    const receiverAttribute =  {
      	position: 'relative',
        right: -35,
      	width: 100,
      	height: 80,
      	backgroundColor: '#e8ffdb',
      	borderRadius: 10,
    }
    const senderAttribute = {
      	position: 'relative',
      	right: -235,
      	width: 100,
      	height: 80,
      	borderRadius: 10,
      	backgroundColor: 'skyblue'
    }
    const currentAttributes = []
    currentHistory.sort(function(d1,d2){
      if (Number(d1['year']) < Number(d2['year'])){
        return -1
      }
      else if (Number(d1['year']) > Number(d2['year'])){
        return 1
      }else{
        if(Number(d1['month'])<Number(d2['month'])){
          return -1
        }else if (Number(d1['month'])>Number(d2['month'])) {
          return 1
        }else{
          if(Number(d1['day']) < Number(d2['day'])){
            return -1
          }else if (Number(d1['day']) > Number(d2['day'])) {
            return 1
          }else{
            if (Number(d1['time']) < Number(d2['time'])){
              return -1
            }else if (Number(d1['time']) > Number(d2['time'])) {
              return 1
            }
          }
        }
      }
    })
    for (var i = 0; i < currentHistory.length; i++) {
      console.log(currentHistory[i]['sender'])
      console.log(currentUser)
      if (currentHistory[i]['sender'] == currentUser) {
        currentAttributes.push(senderAttribute)
      } else {
        currentAttributes.push(receiverAttribute)
      }
    }
    //console.log(currentAttributes)
    this.state.historyMessages = currentHistory
    this.state.fname = firstName
    this.state.lname = lastName
    this.state.attributeArray = currentAttributes
    this.state.sender = currentUser
    this.state.receiver = receiver
    this.state.count = 1
    return(
        <View style = {styles.con}>

          <View style={styles.container}>

            <Text style = {[styles.viewStyle, shadowStyle]}>
            	{this.state.fname} {this.state.lname}
            </Text>
            	<View style = {styles.MessagePage}>
              	<ScrollView>
                  {this.state.historyMessages.map ((value, index) => (
                		  <View style = {this.state.attributeArray[{index}["index"]]} key = {index}>
                			   <Text style = {styles.MessageStyle}> {value["message"]} </Text>
                	    </View>
                  ))}
              	</ScrollView>
            	</View>
            </View>
          <View style = {styles.tainer}>

            <TextInput
    		style = {{fontSize: 15, height: 20, marginTop: 10, marginLeft: 5}}
            placeholder="Message"
            onChangeText={(message) => this.setState({message})} value = {this.state.message}
            />


            <View style = {styles.buttonLayout}>
              <Button
      	        onPress={() => {
      	        this._postMessage()
      	        }}
                title="Send"
              />
            </View>
        </View>
        </View>

            );
            }
            }
export default ChatroomScreen



const styles = StyleSheet.create({
  container: {
  	flex: 1,
  },
  tainer: {
    padding: 10,
    paddingTop: 10,
    paddingBottom: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0,
    height: 2,
    marginTop: 490,
    backgroundColor: 'skyblue',
        },
  buttonLayout: {
    fontSize: 5,
    height: 40,

    },
  con: {
    fontSize: 5,
    },
  MessagePage: {
  	padding: 10,
  	height: 450,
  },
  viewStyle: {
  	height: 50,
  	backgroundColor: '#f7f7f7',
  	paddingTop: 25,
  	paddingLeft: 20,
  	fontSize: 20,
  	fontFamily: 'Helvetica',
  },
  Sender: {
  	position: 'relative',
    right: -35,
  	width: 100,
  	height: 80,
  	backgroundColor: '#e8ffdb',
  	borderRadius: 10,
  },
  Reciever: {
  	position: 'relative',
  	right: -235,
  	width: 100,
  	height: 80,
  	borderRadius: 10,
  	backgroundColor: 'skyblue'
  },
  MessageStyle: {
  	paddingTop: 10,
  	paddingLeft: 10,
  },
});
