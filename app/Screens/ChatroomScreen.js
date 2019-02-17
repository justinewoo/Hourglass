import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text, TextInput, Image, Font, ScrollView } from 'react-native';


class ChatroomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      fname: '',
      lname: '',
      historyMessages: []
    };

  }

  render(){
    const shadowStyle = { shadowOpacity: 0.5, shadowColor: 'gray', shadowRadius: 50,}
    const {navigation} = this.props;
    const currentReceiverValues = navigation.getParam("currentReceiverMessages", "Get some friends")
    const currentSenderValues = navigation.getParam("currentSenderMessages", "Get some friends")
    const firstName = navigation.getParam("fname")
    const lastName = navigation.getParam("lname")
    currentHistory = currentReceiverValues.concat(currentSenderValues)

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
    this.state.historyMessages = currentHistory
    this.state.fname = firstName
    this.state.lname = lastName
    return(
        <View style = {styles.con}>

          <View style={styles.container}>

            <Text style = {[styles.viewStyle, shadowStyle]}>
            	{this.state.fname} {this.state.lname}
            </Text>
            	<View style = {styles.MessagePage}>
            	<ScrollView>

            		<View style = {styles.Sender}>

            			<Text style = {styles.MessageStyle}> hello </Text>

            	    </View>
            		<View style = {styles.Reciever}>
            			<Text style = {styles.MessageStyle}> hello </Text>
            		</View>
            	</ScrollView>

            	</View>
          </View>
          <View style = {styles.tainer}>

            <TextInput
    		style = {{fontSize: 15, height: 20, marginTop: 10, marginLeft: 5}}
            placeholder="Message"
            onChangeText = {(message) => this.setState({message})}
            />


            <View style = {styles.buttonLayout}>
              <Button
      	        onPress={() => {
      	        Alert.alert('Message Sent');
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
    marginTop: 610,
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
  	height: 550,
  },
  viewStyle: {
  	height: 100,
  	backgroundColor: '#f7f7f7',
  	paddingTop: 50,
  	paddingLeft: 20,
  	fontSize: 20,
  	fontFamily: 'PingFangHK-Light',
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




    //AppRegistry.registerComponent('Hourglass', () => chatLog);
