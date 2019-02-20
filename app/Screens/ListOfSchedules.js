import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, DatePickerIOS, TextInput, Alert, ScrollView} from 'react-native';
import { Card, CardItem, Container, Content, Item, Header, List, ListItem, Left, Right, Body, Input, Button, Text} from 'native-base';

class ListOfSchedules extends Component {
  static navigationOptions = {
    headerTitle: "Scheduled Messages"
  };
  constructor(props) {
  		super(props)
		this.state = {chosenDate: new Date(), text: '', message: '', modalVisible: false};
		this.setDate = this.setDate.bind(this);

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

  render(){
    return(

      <View styles = {styles.cotainer}>
        <View style={{ alignItems: 'center', marginTop: 50, height: 600}}>

        	<ScrollView>

          		<View style={styles.scheduleBubble}>
        			<View style = {styles.dynamic}>

                  	<Button full rounded info
						style = {styles.redExit}
      					onPress = {() => Alert.alert('Delete')}
      					>

      					</Button>

        			<Text style = {styles.title}>Contact Name</Text>

        			<Text style = {styles.title}>asdjfladsjflkasdjfl;sadjflsdjflksadjflasdjfljadslkfjasdljfladsjfldsjlfjdslafjlkdasjf;klasdflkjsdalkfj;alksdjfl;sadjf;lksadjf;klsdajf;klsafkl;sadfkl;jasd;lkfjal;fjsd;klfjsl;kfj;lsdfjlasfj;alsjfl;adsjf;ldsj</Text>

					<Text style = {styles.title}>Dat;akosdjflasdjfkl;sdjflksdlkfjds;lajfl;kajsdlfjasdljfklsadjf;lsdjal;jfalkdsjfldjsalfjlsajf;ldasjl;kfjadsl;kfjsa;lkdjfldksjflksdajflkjdsakl;fjdsa;lfl;akse</Text>

					<Text style = {styles.container}>a;sdifjl;sadjfl;adsjfl;asdjljasdfljasl;kfjasdl;jf;lasdlfj</Text>

					<Button block info
						style = {styles.update}
      					onPress = {() => this.openModal()}
      					>
      						<Text style = {{color: 'black', fontFamily: 'Helvetica-Light'}}> Update </Text>
      					</Button>


      				</View>



        		</View>

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
