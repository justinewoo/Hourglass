import React, { Component }from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, DatePickerIOS, TextInput, Alert, ScrollView, AsyncStorage} from 'react-native';
import { Card, CardItem, Container, Content, Item, Header, List, ListItem, Left, Right, Body, Input, Button, Text} from 'native-base';
import axios from "axios"

class ChatbookScreen extends Component {
  static navigationOptions = {
    headerTitle: "Contacts"
  };
	constructor(props) {
		super(props)
		this.state = {chosenDate: new Date(), text: '', message: '',allUsers: '', allMessages: [], currentReceiver: '', receiverFirstName: '', receiverLastName: '', modalVisible: false};
		this.setDate = this.setDate.bind(this);

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
    axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(getSenderToReceiver))
        .then(function(receiverRep){
          axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(getReceiverToSender))
            .then(function(senderRep){
              var finalSenderMessages = []
              var finalReceiverMessages = []
              for (var i = 0; i < senderRep['data'].length; i++) {
                if (Number(senderRep['data'][i]['time']) <= Number(Date.now())) {
                  finalSenderMessages.push(senderRep['data'][i])
                }
              }
              for (var i = 0; i < receiverRep['data'].length; i++) {
                if (Number(receiverRep['data'][i]['time']) <= Number(Date.now())) {
                  finalReceiverMessages.push(receiverRep['data'][i])
                }
              }
              AsyncStorage.setItem("Receiver", userValue['value']['username'])
              self.props.navigation.navigate("ChatroomScreen", {receiver: userValue['value']['username'], fname: userValue['value']['firstName'], lname: userValue['value']['lastName'], unameValue: uname, currentReceiverMessages: finalReceiverMessages, currentSenderMessages: finalSenderMessages})
            })
        })
  }

	setDate(newDate) {
		this.setState({chosenDate: newDate});
	}

	state = {
		modalVisible: false,
	};

	openModal(userValue) {
		this.setState({modalVisible:true, currentReceiver: userValue['value']['username'], receiverFirstName: userValue['value']['firstName'], receiverLastName: userValue['value']['lastName']});
	}

	closeModal() {
		this.setState({modalVisible:false});
	}
  _postScheduleMessage = async() => {
    var self = this
    var dd = self.state.chosenDate.getDate();
    var mm = self.state.chosenDate.getMonth()+1;
    var yyyy = self.state.chosenDate.getFullYear();
    var t = self.state.chosenDate.getTime();
    var user = await AsyncStorage.getItem("Username")
    const postMessageData = {
      type: 'user',
      todo: 'postMessage',
      sender: user,
      receiver: self.state.currentReceiver,
      message: self.state.message,
      year: yyyy,
      month: mm,
      day: dd,
      time: t
    }
    const updateMessageData = {
      sender: user,
      receiver: self.state.currentReceiver,
      message: self.state.message,
      year: yyyy,
      month: mm,
      day: dd,
      time: t
    }
    const updateScheduledMessageData = {
      type: 'user',
      todo: 'updateMessage',
      username: user,
      newMessage: JSON.stringify(updateMessageData)
    }
    const querystring = require('querystring')
    axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(postMessageData))
      .then(function(docs) {
        axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(updateScheduledMessageData))

      })
  }

	render() {
    const {navigation} = this.props;
    const currentUserValues = navigation.getParam("allUsers", "Get some friends")
    this.state.allUsers = currentUserValues
    return (
      <Container>
        <ScrollView>
          {this.state.allUsers.map ((value, index) => (
              <View key = {index}>
          		<Modal
          			visible = {this.state.modalVisible}
          			animationType = {'slide'}
          			onRequestClose={() => this.closeModal()}
          			backdropOpacity ={0.1}
          		>
          			<View
          				style = {{paddingTop: 30, paddingLeft: 10, paddingBottom: 40}}
          			>
                  <Text> {this.state.currentReceiver}</Text>
          				<Button small border
          					onPress = {() => this.closeModal()}
          				>
          					<Text>Exit</Text>
          				</Button>
          			</View>
          			<View style = {{justifyContent: 'center', flexDirection: 'row', height: 50}}>
          				<Text style = {{fontSize: 30, fontFamily: 'Helvetica-Light'}}> Schedule Message </Text>
          			</View>
          			<View style = {{paddingLeft: 10, paddingRight: 10, paddingBottom: 20}}>
          				<View style = {{paddingBottom: 20}}>
          					<Item rounded>
          						<Input
          							placeholder = 'Message'
                        onChangeText={(message) => this.setState({message})} value = {this.state.message}
          						/>
          					</Item>
          				</View>
          			</View>
          			<View>
          				<View style = {{justifyContent: 'center', flexDirection: 'row'}}>
          					<Text style = {{fontFamily: 'Helvetica-Light'}}>
          						Date to send: {this.state.chosenDate.toString().substr(4,12)}
          					</Text>
          				</View>
          				<View style = {{paddingBottom: 100}}>
          					<DatePickerIOS
                      minimumDate = {new Date()}
          						date = {this.state.chosenDate}
          						onDateChange = {this.setDate}
          					/>
          				</View>
          				<View style = {{paddingLeft: 10, paddingRight: 10}}>
          					<Button block info
          					style = {{padding: 20}}
          					onPress={() => {this._postScheduleMessage()}}
          					>
          						<Text> Send </Text>
          					</Button>
          				</View>
          			</View>
          		</Modal>
          		<List>
            			<ListItem Avatar button onPress={() => this._goToChatroom({value})}>

            				<View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>


                        <Text> {value['firstName']} {value['lastName']}</Text>


                					<Button full rounded info
                						onPress = {() => this.openModal({value})}
                					>
                						<Text> Schedule </Text>
                					</Button>

            				</View>

            			</ListItem>
          		</List>
            </View>

        ))}
        	</ScrollView>
      </Container>
    );
  }
}
export default ChatbookScreen
