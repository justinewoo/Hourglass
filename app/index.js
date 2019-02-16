import React from "react";
import { createRootNavigator, createAppContainer } from "./router";

export default class App extends React.Component {
  render() {
    const Layout = createAppContainer;
    return <Layout />
  }
}
