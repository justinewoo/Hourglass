// import React, { Component } from 'react';
// import { Alert, AppRegistry, Button, StyleSheet, View, Text, TextInput } from 'react-native';
// import axios from "axios";
//
// export default class SignIn extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {username: '', password: '', firstName: '', lastName: ''};
//
//   }
//   _postUser = () => {
//     console.log(this.state.firstName)
//     var self = this;
//     console.log(self.state.firstName)
//     console.log(self.state.lastName)
//     const getUsersData = {
//       todo: "register",
//       type: "user",
//       firstName: self.state.firstName,
//       lastName: self.state.lastName,
//       password: self.state.password,
//       username: self.state.username
//     }
//     console.log(getUsersData)
//     const querystring = require('querystring');
//     axios.post ("http://169.234.64.64:8000/hourglass_db/", querystring.stringify(getUsersData))
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//
//         <TextInput
// 		  style = {{fontSize: 30, margin: 30, marginTop: 20 }}
//           placeholder="Enter your first name"
//           onChangeText={(firstName) => this.setState({firstName})} value = {this.state.firstName}
//         />
//
//         <TextInput
//
// 		  style = {{fontSize: 30, margin: 30 }}
//           placeholder="Enter your last name"
//           onChangeText={(lastName) => this.setState({lastName})} value = {this.state.lastName}
//         />
//
//         <TextInput
// 		  style = {{fontSize: 30, margin: 30 }}
//           placeholder="Enter your username"
//           onChangeText={(username) => this.setState({username})} value = {this.state.username}
//         />
//
//         <TextInput
// 		  style = {{fontSize: 30, margin: 30, marginBottom: 50 }}
//           placeholder="Enter your password"
//           onChangeText={(password) => this.setState({password})} value = {this.state.password}
//         />
//
//         <Button
//   		  onPress={() => {
//       	  this._postUser()
//           }}
//           title="Create Account"
//         />
//
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingTop: 100,
//     alignItems: 'center'
//     }
//     });
//
//
//
// AppRegistry.registerComponent('Hourglass', () => SignIn);

// import App from "./app/index";
// export default App;

import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { AsyncStorage } from "react-native";
import SignUpScreen from "./app/Screens/SignUpScreen"
import SignInScreen from "./app/Screens/SignInScreen"
import ChatbookScreen from "./app/Screens/ChatbookScreen"
import axios from "axios"
import ChatroomScreen from "./app/Screens/ChatroomScreen"
import Settings from "./app/Screens/Settings"
import ListOfSchedules from "./app/Screens/ListOfSchedules"

const LoginStack = createStackNavigator(
  {
    SignInScreen: {
      screen: SignInScreen
    },
    SignUpScreen: {
      screen: SignUpScreen
    }
  },
  {
    initialRouteName: "SignInScreen",
    headerMode: "null"
  }
);

const UserStack = createStackNavigator(
  {
    ChatbookScreen: {
      screen: ChatbookScreen
    },
    ChatroomScreen: {
      screen: ChatroomScreen
    }
  }
)

const ScheduledStack = createStackNavigator(
  {
    ListOfSchedules: {
      screen: ListOfSchedules
    }
  }
)

const SettingsStack = createStackNavigator(
  {
    SettingsScreen: {
      screen: Settings
    }
  }
)

const AuthStack = createStackNavigator(
  { SignIn: LoginStack },
  { headerMode: "null" }
);

const AppStack = createBottomTabNavigator(
  {
    Chatroom: {
      screen: UserStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "CHAT",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-contact" color={tintColor} size={24} />
        ),
        tabBarOnPress: () => {
          var self = this
          const getUsersData = {
              todo: 'getAllUsers',
              type: 'user'
          }
          const querystring = require('querystring');
          axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(getUsersData))
              .then(function(allUsersValues) {
                navigation.navigate("ChatbookScreen", {allUsers: allUsersValues['data']})

              })
        }
      })
    },
    Schedules: {
      screen: ScheduledStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "SCHEDULES",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-contact" color={tintColor} size={24} />
        ),
        tabBarOnPress: async () => {
          var self = this
          currentUsername = await AsyncStorage.getItem("Username")
          const getScheduledMessagesData = {
              todo: 'getAllScheduledMessages',
              type: 'user',
              username: currentUsername
          }
          const querystring = require('querystring');
          axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(getScheduledMessagesData))
              .then(function(allSchedulesValues) {
                //console.log(allSchedulesValues['data'])
                var listOfSchedules = allSchedulesValues['data']['listOfMessages']

                listOfSchedules.sort(function(d1, d2) {
                  if (Number(JSON.parse(d1)['time']) < Number(JSON.parse(d2)['time'])){
                    return -1
                  }else if (Number(JSON.parse(d1)['time']) > Number(JSON.parse(d2)['time'])) {
                    return 1
                  }
                })
                navigation.navigate("ListOfSchedules", {allScheduled: listOfSchedules.filter(message => Number(JSON.parse(message)['time']) >= Number(Date.now()))})
              })
        }
      })
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "SETTINGS",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-contact" color={tintColor} size={24} />
        ),
        tabBarOnPress: async () => {
          currentFirstName = await AsyncStorage.getItem("FirstName")
          currentLastName = await AsyncStorage.getItem("LastName")
          currentUsername = await AsyncStorage.getItem("Username")
          navigation.setParams({firstName: currentFirstName, lastName: currentLastName, userName: currentUsername});
          navigation.navigate("Settings")
        }
      })
    }
})

export const createRootNavigator = () => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: AppStack
      },
      SignedOut: {
        screen: AuthStack
      }
    },
    {
      initialRouteName: "SignedOut"
    }
  );
};
// const createRootNavigator = (signedIn = false) => {
//   return createSwitchNavigator(
//     {
//       SignedOut: {
//         screen: AuthStack
//       },
//     },
//     {
//       initialRouteName: "SignedOut"
//     }
//   );
// };

export default createAppContainer(createSwitchNavigator(
  {
    SignedIn: {
      screen: AppStack
    },
    SignedOut: {
      screen: AuthStack
    }
  },
  {
    initialRouteName: "SignedOut"
  }
));

//export default AppContainer
// export const createRootNavigator = (signedIn = false) => {
//   return createSwitchNavigator(
//     {
//       SignedIn: {
//         screen: AppStack
//       },
//       SignedOut: {
//         screen: AuthStack
//       }
//     },
//     {
//       initialRouteName: signedIn ? "SignedIn" : "SignedOut"
//     }
//   );
// };




// var self = this
// const parseScheduledMessage = JSON.parse(scheduledMessage['value'])
// const indexOfValue = this.state.scheduledMessages.indexOf(scheduledMessage['value'])
// const newList = this.state.scheduledMessages.splice(indexOfValue, 1)
// const userName = await AsyncStorage('Username')
// const deleteMessageData = {
//   type: 'user',
//   todo: 'deleteUpdatedMessage',
//   username: userName,
//   sender: userName,
//   receiver: parseScheduledMessage['receiver'],
//   day: parseScheduledMessage['day'],
//   month: parseScheduledMessage['month'],
//   year: parseScheduledMessage['year'],
//   time: parseScheduledMessage['time'],
//   message: parseScheduledMessage['message']
// }
// console.log(deleteMessageData)
// this._delete(newList)
// // axios.post('http://localhost:8000/hourglass_db/', querystring.stringify(deleteMessageData))
// //   .then(function(result) {
// //   })

//        					onPress = {() => this.openModal()}



//{(new Date(JSON.parse(value)['time'])).getHours()}<
