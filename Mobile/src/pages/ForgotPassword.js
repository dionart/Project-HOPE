import React, {Component} from 'react';

import { 
  Platform,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Scrollview, 
  Text, 
  View,
  Button,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  } from 'react-native';

import api from '../services/api';

//Função de envio de token para troca de senha
export default class ForgotPassword extends Component {
  //Ignora o header
  static navigationOptions = {
    header: null,
  };
  //Inicia os estados como null
  state = {
    loggedInUser: null,
    errorMessage: null,
    email: '',
  };

  //Sobrescreve oque está sendo digitado na Input box
  onChangeTextEmail = (event) => {
    event.persist();
    this.setState({ email:event.nativeEvent.text });
  };

  //Função de envio de token para o Email
  Forgot = async (email) => {
  
    try {
      //Consome a api
      const response = await api.post('/auth/forgot_password', {
        email,
      }); 

      //Utiliza o AsyncStorage para guardar o email do usuário para uso futuro
      const test = await AsyncStorage.setItem('@CodeApi:email', email);

      Alert.alert( '' ,'Código enviado com sucesso!', [{
        text: 'Ok',
        //mudança de página e envio do email digitado
        onPress: () => this.props.navigation.navigate('ChangePassword', {
            email: email,
        }),
      }]);
      
    }catch (response) {
      this.setState({ errorMessage: response.data.error});
    }
  };
  
  //Estilização da pagina mobile
  render(){
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={"padding"} 
        
      >
        <ScrollView>
          <TouchableOpacity
              style = {styles.buttonArrow}
              onPress = { () => this.props.navigation.navigate('Login')}
          >
              <Image
                  style = {styles.backArrow}
                  source = {require('../pics/voltar.png')}
              />
              
          </TouchableOpacity>
          
          <View style = {styles.containerLogo}>
            <Image
                style = {styles.logo}
                source = {require('../pics/logo.png')}
            />
          </View>
          
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
  containerLogo:{
    marginHorizontal:-50,
  },
  backArrow: {
    marginTop:10,
    width: 40,
    height: 40,
  },
  buttonArrow:{
    backgroundColor: '#FFF',
    borderRadius:8,
    paddingTop:25,
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
    marginLeft:29,
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
