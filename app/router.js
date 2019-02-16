import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
//import Icon from "react-native-vector-icons/Ionicons";
import { AsyncStorage } from "react-native";

import SignUpScreen from "./Screens/SignUpScreen"
import SignInScreen from "./Screens/SignInScreen"

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
    initialRouteName: "SignUpScreen",
    headerMode: "null"
  }
);
const AuthStack = createStackNavigator(
  { SignIn: LoginStack },
  { headerMode: "null" }
);

const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedOut: {
        screen: AuthStack
      }
    },
    {
      initialRouteName: "SignedOut"
    }
  );
};
export default createAppContainer(createRootNavigator);

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
