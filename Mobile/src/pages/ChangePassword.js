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

export default class ChangePassword extends Component {
  static navigationOptions = {
    header: null,
  };
  
  state = {
    loggedInUser: null,
    errorMessage: null,
    email: '',
    token:'',
    password:'',
  };

  componentWillMount() {
    this.setState ({
        email: this.props.navigation.getParam('email')
    });
  }

  onChangeTextEmail = (event) => {
    event.persist();
    this.setState({ email:event.nativeEvent.text });
  };

  onChangeTextToken = (event) => {
    event.persist();
    this.setState({ token:event.nativeEvent.text });
  };

  onChangeTextPassword = (event) => {
    event.persist();
    this.setState({ password:event.nativeEvent.text });
  };

  Change = async (email, token, password) => {
  
    try {
        const response = await api.post('/auth/reset_password', {
        email,
        token,
        password,
      }); 

      Alert.alert( '' ,'Senha redefinida com sucesso!', [{
        text: 'Ok',
        onPress: () => this.props.navigation.navigate('Login'),
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
            onPress = { () => this.props.navigation.navigate('ForgotPassword')}
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
            placeholder = 'Digite o código recebido'
            placeholderTextColor = '#736a86'
            style = {styles.placeholder}
            onChange = {this.onChangeTextToken}
          > 

          </TextInput>

          <TextInput
            placeholder = 'Digite sua nova senha'
            secureTextEntry = {true}
            placeholderTextColor = '#736a86'
            style = {styles.placeholder}
            onChange = {this.onChangeTextPassword}
          > 

          </TextInput>
        
        </View>

        {!!this.state.errorMessage && <Text style = {styles.errorText}>{this.state.errorMessage}</Text>}
        <View style={styles.containerButton}>
          
          <TouchableOpacity
            style = {styles.button}
            onPress={() => this.Change(this.state.email, this.state.token, this.state.password)}
            
          >
            <Text style = {styles.buttonText} >REDEFINIR SENHA</Text>

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
    paddingTop:100,
  },
  logo: {
    marginTop:50,
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
    paddingLeft:95,
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
    paddingTop: 10,
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
  },
});
