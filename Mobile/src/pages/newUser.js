import React, {Component} from 'react';

import { 
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView, 
  Text, 
  View,
  ScrollView,
  Alert,
  } from 'react-native';

import api from '../services/api';

//Criação de novo Usuário
export default class newUser extends Component {
  //ignora o header
  static navigationOptions = {
    header: null,
  };
  
  //Define os estados como null
  state = {
    loggedInUser: null,
    errorMessage: null,
    name: '',
    email: '',
    password: '',
  };

  //Sobrescreve oque está sendo digitado no input box
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

  //Função de registro através dos parametros
  Register = async (name, email, password) => {
  
    //Preenche os models do usuário
    try {
      //Consome a api
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      }); 

      Alert.alert( '' ,'Conta criada com sucesso!', [{
        text: 'Ok',
        //Mudança de página ao apertar o Alert
        onPress: () => this.props.navigation.navigate('Login')
      }]);
      
    }catch (response) {
      console.log(response);
      this.setState({ errorMessage: response.data.error});
    }
  };
  
  //Estilização da página mobile
  render(){
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={"padding"} // you can change that by using Platform
        
      >
        <ScrollView>
          <View style = {styles.test}>
            <Image
              style = {styles.logo}
              source = {require('../pics/logo.png')}
            />
          </View>
          <View >
            
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
              onPress = { () => this.Register(this.state.name ,this.state.email.trim(), this.state.password)}
              
            >
              <Text style = {styles.buttonText} >CADASTRAR</Text>
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
          </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  test:{
    marginHorizontal:-50,
  },
  logo: {
    alignContent:'center',
    marginTop:180,
    width: 500,
    height: 150,
  },
  button: {
    marginTop:15,
    paddingTop:11,
    paddingLeft:110,
    marginLeft:29,
    backgroundColor: '#44059E',
    borderRadius: 8,
    height:50,
    width:330,
  },
  buttonText: {
    color:'#FFF',
    fontSize:16,
    fontWeight: 'bold',
    paddingLeft:4,
  },
  errorText:{
    color: '#c4342d',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft:125,
  },
  placeholder:{
    borderColor: '#E8E8E8',
    borderBottomWidth: 1.5,
    width: 340,
    marginLeft:25,
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
    paddingTop:90,
    marginLeft:38,
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
