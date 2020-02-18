import React, {Component} from 'react';

import { 
  Platform,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text, 
  View,
  Button,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  AsyncStorage,
  Alert,
  } from 'react-native';

import api from '../services/api';

//Função para Login de Usuários
export default class Login extends Component {
  //Ignora o header
  static navigationOptions = {
    header: null,
  };
  //Inicia os estados como null
  state = {
    loggedInUser: null,
    errorMessage: null,
    email: '',
    password: '',
  };

  //Sobrescreve oque está sendo digitado na Input box
  onChangeTextEmail = (event) => {
    event.persist();
    this.setState({ email:event.nativeEvent.text });
  };

  onChangeTextPassword = (event) => {
    event.persist();
    this.setState({ password:event.nativeEvent.text });
  };

  //Função de Login com os parametros necessários
  signIn = async (email, password) => {
  
    try {
      //Consome a api
      const response = await api.post('/auth/authenticate', {
        email,
        password,
      }); 
      
      const{ user, token } = response.data;
      
      //Armazena o token e o usuário logado
      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],
        ['@CodeApi:user', JSON.stringify(user)],
      ]);

      //seta os estado do usuário para logado
      this.setState({ loggedInUser: user });

      Alert.alert( '' ,'Login realizado com sucesso!', [{
        text: 'Ok',
        //Mudança de página
        onPress: () => this.props.navigation.navigate('Home'),
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
        behavior={"padding"} 
        
      >
        <ScrollView>
          <View style = {styles.test}>
            <Image
              style = {styles.logo}
              source = {require('../pics/logo.png')}
            />
          </View>

          <View>
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
          <View>
            
            <TouchableOpacity
              style = {styles.button}
              onPress = { () => this.signIn(this.state.email.trim(), this.state.password)}
            >
              <Text style = {styles.buttonText} >ENTRAR</Text>
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
  logo: {
    marginTop:180,
    width: 500,
    height: 150,
  },
  test:{
    marginHorizontal: -50,
  },
  button: {
    marginTop:15,
    paddingTop:11,
    paddingLeft:139,
    backgroundColor: '#44059E',
    borderRadius: 8,
    height:50,
    marginLeft:29,
    width:330,
  },
  buttonText: {
    color:'#FFF',
    fontSize:16,
    fontWeight: 'bold',
  },
  errorText:{
    color: '#c4342d',
    paddingLeft:100,
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholder:{
    borderColor: '#E8E8E8',
    borderBottomWidth: 1.5,
    width: 340,
    marginTop: 10,
    marginLeft:25,
    paddingTop: 25,
    padding: 10,
    fontSize: 14,
    marginBottom:10,
  },
  passwordText: {
    paddingTop: 50,
    color:'#999999',
    fontWeight:'bold',
    marginLeft:100,
  },
  newUserButton:{
    borderColor: '#44059E',
    borderWidth: 2,
    borderRadius: 6,
    marginLeft: 25,
    width: 150,
    height: 30,
    marginBottom: 5,
  },
  newUserDisplay:{
    flexDirection: 'row',
    paddingTop:50,
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
