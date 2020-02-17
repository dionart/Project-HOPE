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

export default class ForgotPassword extends Component {
  static navigationOptions = {
    header: null,
  };
  
  state = {
    loggedInUser: null,
    errorMessage: null,
    email: '',
  };

  onChangeTextEmail = (event) => {
    event.persist();
    this.setState({ email:event.nativeEvent.text });
  };


  Forgot = async (email) => {
  
    try {
      const response = await api.post('/auth/forgot_password', {
        email,
      }); 

      const test = await AsyncStorage.setItem('@CodeApi:email', email);
      console.log(test);

      Alert.alert( '' ,'Código enviado com sucesso!', [{
        text: 'Ok',
        onPress: () => this.props.navigation.navigate('ChangePassword', {
            email: email,
        }),
      }]);
      
    }catch (response) {
      console.log(response);
      this.setState({ errorMessage: response.data.error});
    }
  };
  
  render(){
    return (
      <View style = {styles.container}>
        
        <TouchableOpacity
            style = {styles.buttonArrow}
            onPress = { () => this.props.navigation.navigate('Login')}
        >
            <Image
                style = {styles.backArrow}
                source = {require('../pics/voltar.png')}
            />
            
        </TouchableOpacity>
        
        
        <Image
            style = {styles.logo}
            source = {require('../pics/logo.png')}
        />
        
        <View>
          <TextInput
            placeholder = 'Digite seu email para envio do código'
            placeholderTextColor = '#736a86'
            style = {styles.placeholder}
            onChange = {this.onChangeTextEmail}
          > 

          </TextInput>
        
        </View>

        {!!this.state.errorMessage && <Text style = {styles.errorText}>{this.state.errorMessage}</Text>}
        <View style={styles.containerButton}>
          
          <TouchableOpacity
            style = {styles.button}
            onPress = { () => this.Forgot(this.state.email.trim())}
          >
            <Text style = {styles.buttonText} >ENVIAR CÓDIGO</Text>

          </TouchableOpacity>

        </View>

        <View style = {styles.newUserDisplay}>
          
          <Text style = {styles.newUser}>
            NÃO POSSUI CONTA?
          </Text>

        
          <TouchableOpacity
            style = {styles.newUserButton}
            onPress = { () => this.props.navigation.navigate('NewUser') }
          >
            <Text style = {styles.newUserButtonText}>
              CRIAR CONTA
            </Text>

          </TouchableOpacity>
        </View>


      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop:110,
  },
  logo: {
    marginTop:80,
    width: 500,
    height: 150,
  },
  backArrow: {
    marginTop:10,
    width: 40,
    height: 40,
  },
  buttonArrow:{
    backgroundColor: '#FFF',
    borderRadius:8,
    width: 40,
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  button: {
    marginTop:15,
    paddingTop:11,
    paddingLeft:108,
    backgroundColor: '#44059E',
    borderRadius: 8,
    height:50,
    width:330,
  },
  buttonText: {
    color:'#FFF',
    fontSize:16,
    fontWeight: 'bold',
  },
  errorText:{
    color: '#c4342d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholder:{
    borderColor: '#E8E8E8',
    borderBottomWidth: 1.5,
    width: 340,
    marginTop: 10,
    paddingTop: 25,
    padding: 10,
    fontSize: 14,
    marginBottom:10,
  },
  newUserButton:{
    borderColor: '#44059E',
    borderWidth: 2,
    borderRadius: 6,
    marginLeft: 25,
    width: 150,
    height: 30,
    marginBottom: 5
  },
  newUserDisplay:{
    flexDirection: 'row',
    paddingTop:100,
  },
  newUser:{
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#44059E',
    paddingTop:4,
  },
  newUserButtonText:{
    paddingTop:2,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#44059E',
  }
  
});
