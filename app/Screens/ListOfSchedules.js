import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, DatePickerIOS, TextInput, Alert, ScrollView, AsyncStorage} from 'react-native';
import { Card, CardItem, Container, Content, Item, Header, List, ListItem, Left, Right, Body, Input, Button, Text} from 'native-base';
import axios from "axios"

class ListOfSchedules extends Component {
  static navigationOptions = {
    headerTitle: "Scheduled Messages"
  };
  constructor(props) {
  		super(props)
		this.state = {chosenDate: new Date(), text: '', message: '', modalVisible: false, scheduledMessages: []};
		this.setDate = this.setDate.bind(this);
    this._delete = this._delete.bind(this);
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
  _delete(newList){
    this.setState({scheduledMessages: newList})
  }
  _deleteMessage = async (scheduledMessage) => {
    var self = this
    const userName = await AsyncStorage.getItem("Username")
    const parseScheduledMessage = JSON.parse(scheduledMessage['value'])
    const indexOfValue = this.state.scheduledMessages.indexOf(scheduledMessage['value'])
    const newList = this.state.scheduledMessages.splice(indexOfValue, 1)
    // this._delete(newList)
    // const userName = await AsyncStorage('Username')
    // const parseScheduledMessage = JSON.parse(scheduledMessage['value'])
    // const indexOfValue = this.state.scheduledMessages.indexOf(scheduledMessage['value'])
    // const newList = this.state.scheduledMessages.splice(indexOfValue, 1)
    console.log(userName)
    const deleteMessageData = {
      type: 'user',
      todo: 'deleteUpdatedMessage',
      username: userName,
      sender: userName,
      receiver: parseScheduledMessage['receiver'],
      day: parseScheduledMessage['day'],
      month: parseScheduledMessage['month'],
      year: parseScheduledMessage['year'],
      time: parseScheduledMessage['time'],
      message: parseScheduledMessage['message']
    }
    // const deleteMessageData = {
    //   type: "user",
    //   todo: "deleteUpdatedMessage",
    //   username: "K",
    //   sender: "K",
    //   receiver: "K",
    //   day: "21",
    //   month: "2",
    //   year: "2019",
    //   time: "1550795629000",
    //   message: "Sup"
    // }
    console.log(indexOfValue)
    const querystring = require('querystring');
    // this._delete(newList)
    console.log(querystring.stringify(deleteMessageData))
    axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(deleteMessageData))
      .then(function(response) {
        self._delete(newList)
      })
  }

  render(){
    const {navigation} = this.props;
    const currentScheduledMessages = navigation.getParam("allScheduled")
    this.state.scheduledMessages = currentScheduledMessages
    return(

      <View styles = {styles.cotainer}>
        <View style={{ alignItems: 'center', marginTop: 50, height: 600}}>

        	<ScrollView>
              {this.state.scheduledMessages.map ((value, index) => (
            		<View style={styles.scheduleBubble}>
          			<View style = {styles.dynamic}>

                    	<Button full rounded info
  						style = {styles.redExit}
        					onPress={() => {this._deleteMessage({value})}}
        					>

        					</Button>

          			<Text style = {styles.title}>Contact Name: {JSON.parse(value)['receiver']}</Text>

          			<Text style = {styles.title}>Message: {JSON.parse(value)['message']}</Text>

  					<Text style = {styles.title}>Scheduled Date: {JSON.parse(value)['month']}/{JSON.parse(value)['day']}/{JSON.parse(value)['year']}</Text>
            <Text style = {styles.container}>a;sdifjl;sadjfl;adsjfl;asdjljasdfljasl;kfjasdl;jf;lasdlfj</Text>
  					<Button block info
  						style = {styles.update}
              onPress = {() => this.openModal()}
            >
        						<Text style = {{color: 'black', fontFamily: 'Helvetica-Light'}}> Update </Text>
        					</Button>


        				</View>



          		</View>
            ))}
        	</ScrollView>
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

        </View>




      </View>
      );
      }
      }
export default ListOfSchedules


const styles = StyleSheet.create({
  container: {
    marginTop:15,
    marginLeft: 30,
    marginBottom: 20,
    marginRight: 30,
    fontFamily: 'Helvetica-Light',
    },
    title: {
    fontFamily: 'Helvetica-Light',
    marginTop:15,
    marginLeft: 30,
    marginRight: 30,
    },
    scheduleBubble: {
    width: 330,
    borderRadius: 10,
    top:0,
    },
    dynamic: {flex: -1,
    marginLeft: 0,
    backgroundColor: 'skyblue',
    borderRadius: 10,
    padding: 5,
    },
    redExit:
     {backgroundColor: 'red',
     marginLeft: 3,
     marginRight: 3,
     width: 12,
     height: 3,
     alignItems: 'flex-start'
     },
    update: {
     backgroundColor: '#DDDDDD',
     marginBottom: 3,
     marginLeft: 3,
     marginRight: 3
     },

    });
