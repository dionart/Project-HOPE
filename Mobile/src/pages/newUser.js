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

export default class newUser extends Component {
  static navigationOptions = {
    header: null,
  };
  
  state = {
    loggedInUser: null,
    errorMessage: null,
    name: '',
    email: '',
    password: '',
  };

  onChangeTextName = (event) => {
    event.persist();
    this.setState({ name:event.nativeEvent.text });
  };
  
  onChangeTextEmail = (event) => {
    event.persist();
    this.setState({ email:event.nativeEvent.text });
  };

  onChangeTextPassword = (event) => {
    event.persist();
    this.setState({ password:event.nativeEvent.text });
  };

  Register = async (name, email, password) => {
  
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      }); 

      Alert.alert('','Conta criada com sucesso!');
      
    }catch (response) {
      console.log(response);
      this.setState({ errorMessage: response.data.error});
    }
  };
  
  render(){
    return (
      <View style = {styles.container}>

        <Image
          style = {styles.logo}
          source = {require('../pics/logo.png')}
        />
        
        <View>
          
          <TextInput
            placeholder = 'Nome'
            placeholderTextColor = '#736a86'
            style = {styles.placeholder}
            onChange = {this.onChangeTextName}
          > 

          </TextInput>

          <TextInput
            placeholder = 'E-mail'
            placeholderTextColor = '#736a86'
            style = {styles.placeholder}
            onChange = {this.onChangeTextEmail}
          > 

          </TextInput>
        
          <TextInput
            placeholder = 'Senha'
            placeholderTextColor = '#736a86'
            secureTextEntry = {true}
            style = {styles.placeholder}
            onChange = {this.onChangeTextPassword}
          >
            
          </TextInput>
        
        </View>

        {!!this.state.errorMessage && <Text style = {styles.errorText}>{this.state.errorMessage}</Text>}
        <View style={styles.containerButton}>
          
          <TouchableOpacity
            style = {styles.button}
            onPress = { () => this.Register(this.state.name ,this.state.email, this.state.password)}
            onPress = { () => this.props.navigation.navigate('Login') }
          >
            <Text style = {styles.buttonText} >CADASTRAR</Text>
          </TouchableOpacity>

        </View>

        <View>
          <TouchableOpacity
            style = {styles.passwordButton}
            onPress = { () => this.props.navigation.navigate('ForgotPassword') }
          >
          
          <Text style = {styles.passwordText}>
            ESQUECI MINHA SENHA
          </Text>

          </TouchableOpacity>

        </View>

        <View style = {styles.newUserDisplay}>
          
          <Text style = {styles.newUser}>
            JÁ É CADASTRADO?
          </Text>

        
          <TouchableOpacity
            style = {styles.newUserButton}
            onPress = { () => this.props.navigation.navigate('Login') }
          >
            <Text style = {styles.newUserButtonText}>
              FAZER LOGIN
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
  button: {
    marginTop:15,
    paddingTop:11,
    paddingLeft:120,
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
    marginTop: 8,
    paddingTop: 10,
    padding: 10,
    fontSize: 14,
    marginBottom:10,
  },
  passwordText: {
    paddingTop: 50,
    color:'#999999',
    fontWeight:'bold',
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
    paddingTop:50,
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
