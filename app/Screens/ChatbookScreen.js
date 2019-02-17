import React, { Component }from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, DatePickerIOS, TextInput, Alert, ScrollView, AsyncStorage} from 'react-native';
import { Card, CardItem, Container, Content, Item, Header, List, ListItem, Left, Right, Body, Input, Button, Text} from 'native-base';
import axios from "axios"

class ChatbookScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {chosenDate: new Date(), text: '', message: '',allUsers: '', allMessages: []};
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
    axios.post('http://169.234.64.64:8000/hourglass_db/', querystring.stringify(getSenderToReceiver))
        .then(function(receiverRep){
          axios.post('http://169.234.64.64:8000/hourglass_db/', querystring.stringify(getReceiverToSender))
            .then(function(senderRep){
              AsyncStorage.setItem("Receiver", userValue['value']['username'])
              self.props.navigation.navigate("ChatroomScreen", {receiver: userValue['value']['username'], fname: userValue['value']['firstName'], lname: userValue['value']['lastName'], unameValue: uname, currentReceiverMessages: receiverRep['data'], currentSenderMessages: senderRep['data']})
            })
        })
  }

	setDate(newDate) {
		this.setState({chosenDate: newDate});
	}

	state = {
		modalVisible: false,
	};

	openModal() {
		this.setState({modalVisible:true});
	}

	closeModal() {
		this.setState({modalVisible:false});
	}

	render() {
    const {navigation} = this.props;
    const currentUserValues = navigation.getParam("allUsers", "Get some friends")
    this.state.allUsers = currentUserValues
    return (
      <Container>
      	<Header>
      		<Text> Contacts </Text>
      	</Header>
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
          							onChangeText = {(message) => this.setState({message})}
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
          						date = {this.state.chosenDate}
          						onDateChange = {this.setDate}
          					/>
          				</View>
          				<View style = {{paddingLeft: 10, paddingRight: 10}}>
          					<Button block info
          					style = {{padding: 20}}
          					onPress={() => {Alert.alert('Message Sent');}}
          					>
          						<Text> Send </Text>
          					</Button>
          				</View>
          			</View>
          		</Modal>
          		<List>
            			<ListItem Avatar>

            				<View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => this._goToChatroom({value})}>

                        <Text> {value['firstName']} {value['lastName']}</Text>
                        </TouchableOpacity>

                					<Button full rounded info
                						onPress = {() => this.openModal()}
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
