import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, TextInput, Image, Font, ScrollView, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import axios from "axios"

class ChatroomScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    firstName = navigation.getParam("fname")
    lastName = navigation.getParam("lname")
    return {
      title: firstName + " " + lastName
    }
  };
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
      count: 0,
      dynamicAttributesArray: []
    };
    this._addToScreen = this._addToScreen.bind(this)

  }
  // async componentDidMount() {
  //   var self = this
  //   const uname = await AsyncStorage.getItem("Username")
  //   const getSenderToReceiver = {
  //     type: 'user',
  //     todo: 'getMessage',
  //     sender: uname,
  //     receiver: userValue['value']['username']
  //   }
  //   const getReceiverToSender = {
  //     type: 'user',
  //     todo: 'getMessage',
  //     sender: userValue['value']['username'],
  //     receiver: uname
  //   }
  //   const querystring = require('querystring');
  //   const currentHistory = []
  //   this.loadData()
  //   }
  // async loadData() {
  //   axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(getSenderToReceiver))
  //       .then(function(receiverRep){
  //         axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(getReceiverToSender))
  //           .then(function(senderRep){
  //             var finalSenderMessages = []
  //             var finalReceiverMessages = []
  //             for (var i = 0; i < senderRep['data'].length; i++) {
  //               if (Number(senderRep['data'][i]['time']) <= Number(Date.now())) {
  //                 finalSenderMessages.push(senderRep['data'][i])
  //               }
  //             }
  //             for (var i = 0; i < receiverRep['data'].length; i++) {
  //               if (Number(receiverRep['data'][i]['time']) <= Number(Date.now())) {
  //                 finalReceiverMessages.push(receiverRep['data'][i])
  //               }
  //             }
  //             //prevState => ({ count: prevState.count + 1 }),
  //             console.log(senderValues)
  //             console.log(receiverValues)
  //             self.setState({ senderValues: finalSenderMessages, receiver: finalReceiverMessages })
  //           })
  //       })
  // }
  //   // if (this.state.count != 0) {
  //   //   console.log('sup')
  //   //   setInterval(() => this.loadData(), 1000);
  //   // }
  //   this.loadData()
  // }
  // async loadData() {
  //   var self = this
  //   var currentUser = await AsyncStorage.getItem("Username")
  //   var receiverUser = await AsyncStorage.getItem("Receiver")
  //   const getSenderToReceiver = {
  //     type: 'user',
  //     todo: 'getMessage',
  //     sender: currentUser,
  //     receiver: receiverUser
  //   }
  //   const getReceiverToSender = {
  //     type: 'user',
  //     todo: 'getMessage',
  //     sender: receiverUser,
  //     receiver: currentUser
  //   }
  //   const querystring = require('querystring');
  //   axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(getSenderToReceiver))
  //       .then(rep => {
  //         axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(getReceiverToSender))
  //           .then(res => {
  //             const sender = rep.data
  //             const receiver = res.data
  //             this.setState({ sender, receiver })
  //           })
  //       })
  // }
  componentWillUpdate() {
    console.log(this.state.historyMessages)
  }
  _addToScreen = (newMessage) => {
    this.setState({senderValues:newMessage, message:''})

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
    const currentListOfMessage = this.state.senderValues
    currentListOfMessage.push(postMessageData)
    const querystring = require('querystring')
    //console.log(currentListOfMessage)
    this._addToScreen(currentListOfMessage)
    axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(postMessageData))
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
    currentHistory = this.state.receiverValues.concat(this.state.senderValues)
    const receiverAttribute =  {
    	marginTop: 3,
      	position: 'relative',
        paddingRight: 5,
      	width: 200,
      	top: 0,
      	borderRadius: 10,
      	alignItems: 'flex-start',
    	justifyContent: 'flex-start',
    }
    const senderAttribute = {
    	marginTop: 3,
      	position: 'relative',
      	top: 0,
      	right: -150,
      	width: 200,
      	borderRadius: 10,
      	alignItems: 'flex-end',
    	justifyContent: 'flex-start',
    }
    const senderDynamicAttribute = {flex: -1,
                        	marginLeft: 0,
                        	paddingRight: 5,
                        	backgroundColor: 'skyblue',
                  			marginRight: 5,
                  			borderRadius: 10,
                  			paddingBottom: 5,
                  			paddingTop: 2,
                  			marginRight: 3}
    const receiverDynamicAttribute = {flex: -1,
                        marginLeft: 2,
                        paddingBottom: 5,
                        paddingTop: 2,
                        paddingRight: 10,
                        backgroundColor: '#e8ffdb',
                  		marginRight: 5,
                  		borderRadius: 10,
                  		padding: 5,}
    const currentAttributes = []
    const currentDynamicAttributes = []
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
      if (currentHistory[i]['sender'] == currentUser) {
        currentAttributes.push(senderAttribute)
        currentDynamicAttributes.push(senderDynamicAttribute)
      } else {
        currentAttributes.push(receiverAttribute)
        currentDynamicAttributes.push(receiverDynamicAttribute)
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
    this.state.dynamicAttributesArray = currentDynamicAttributes
    return(
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style = {styles.cotainer}>

          <View style={{flex: 1}}>
            	<View style = {styles.MessagePage}>
              	<ScrollView
    				ref={ref => this.scrollView = ref}
    				onContentSizeChange={(contentWidth, contentHeight)=>{
        			this.scrollView.scrollToEnd({animated: false});
    				}}>
                  {this.state.historyMessages.map ((value, index) => (
                		  <View style = {this.state.attributeArray[{index}["index"]]} key = {index}>
                			   	<View style = {this.state.dynamicAttributesArray[{index}["index"]]}>
                			   		<Text style = {styles.MessageStyle}> {value["message"]} </Text>
                	    		</View>
                	    	</View>

                  ))}
              	</ScrollView>
            	</View>
            </View>
          <View style = {styles.tainer}>

            <TextInput
			style = {{fontSize: 15, height: 20, marginTop: 10, marginLeft: 5, width: 300}}
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
            </KeyboardAvoidingView>

            );
            }
            }
export default ChatroomScreen



const styles = StyleSheet.create({
  container: {
  	flexGrow: 1,
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
  	height: 490,
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
  	marginTop: 5,
  	position: 'relative',
  	top: 0,
    width: 200,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    },
  Receiver: {
  	marginTop: 5,
  	position: 'relative',
  	top: 0,
  	right: -150,
    width: 200,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    },
  MessageStyle: {
  	paddingTop: 10,
  	paddingLeft: 10,
  },
});
