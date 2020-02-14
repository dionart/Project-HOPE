import React, {Component} from 'react';

import { 
  Platform,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback, 
  Text, 
  View,
  Button,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  } from 'react-native';

import api from '../services/api';

export default class Login extends Component {
  state = {
    loggedInUser: null,
    errorMessage: null,
  };

  signIn = async () => {
    
    try {
      const response = await api.post('/auth/authenticate', {
        email: 'arthurdaao@hotmail.com',
        password: '123456',
      }); 

      const{ user, token } = response.data;

      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],
        ['@CodeApi:user', JSON.stringify(user)],
      ]);

      this.setState({ loggedInUser: user });

      Alert.alert('Login com sucesso!');
      
    } catch (response) {
      this.setState({ errorMessage: response.data.error});
      
    }
  };
  
  render(){
    return (
      <View style={styles.container}>
        {!!this.state.loggedInUser && <Text>{this.state.loggedInUser.name}</Text>}
        {!!this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
        <Button onPress={this.signIn} title = "Entrar"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
