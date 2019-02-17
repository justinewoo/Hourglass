import React, { Component }from 'react';
import { StyleSheet, ScrollView, Text, View, Button, AppRegistry, TouchableHighlight } from 'react-native';



class ChatbookScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUsers: ''
    }
  }

  _goToChatroom = (userValue) => {
    console.log(userValue)
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
