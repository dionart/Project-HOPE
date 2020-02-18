import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
    FlatList,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback, 
    StatusBar,
} from 'react-native';

import api from '../services/api';

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

export default class Home extends Component {
  
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);

    const didWillFocusSubscription = this.props.navigation.addListener(
      'willFocus', async (payLoad) => {
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));

        if(user) {
            this.setState({ loggedInUser: user });
        }
      }
    );

    this.setState({didWillFocusSubscription});
  }

  //Inicia os estados como null
  state = {
    cards: null,
    loggedInUser: null,
    isLoading: false,
    didWillFocusSubscription: null,
  }

  //Função para ler cards postados
  readCards = async () => {
    const token = await AsyncStorage.getItem('@CodeApi:token');
    //Consome a api
    const response = await api.get('/cards/', {}, { headers: { Authorization: `Bearer ${token}` }});
    const cards =  response.data.cards;
    this.setState({cards});
  }

  async componentDidMount() {
    //Recebe o token e usuários armazenados no login
    const token = await AsyncStorage.getItem('@CodeApi:token');
    const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));

    //Se ambos forem verdadeiro o usuário está logado
    if(token && user) {
      this.setState({ loggedInUser: user });
    }
  };

  //Função de espera, atualização e exibição dos cards
  getCards = () => {
    wait(5000).then(() => this.setState({isLoading: true})).then(() => this.setState({isLoading: false}));
    this.readCards();
  }

  componentWillMount(){
    this.readCards();
  }

  //Estilização da pagina mobile
  render(){
    if(!this.state.cards){
        return null;
    }

    return(
          <View style={styles.container}>
            
            <View style={styles.header}>   
                
                <View style={styles.welcomeText}>
                    
                  <Text style={styles.textHeader}>
                    Bem vindo, {this.state.loggedInUser.name}
                      
                  </Text>

                  <Text style = {styles.dateText}>
                    Domingo, 17 de fevereiro
                  </Text>
                </View>

                <View style={styles.containerPic}>
                    <TouchableOpacity
                      style={styles.userButton}
                      onPress={() => this.props.navigation.navigate('Config')}
                    >
                      <Image
                        source={this.state.loggedInUser &&
                          this.state.loggedInUser.pic ? 
                          {uri: this.state.loggedInUser.pic} : 
                          require('../pics/defaultUser2.png')}
                        style={styles.iconUser}
                      />
                    </TouchableOpacity>
                </View>
            </View>

            <View style = {styles.noteContainer}>
                <Image 
                  style = {styles.logo}
                  source = {require('../pics/sober.png')}
                />
                <View style = {styles.sendContainer}>
                  <TextInput
                    placeholder = 'Conte-nos como está sendo'
                    placeholderTextColor = '#736a86'
                    style = {styles.placeholder}
                    onChange = {this.onChangeTextEmail}
                  >
                  </TextInput>
                  
                  <TouchableOpacity>
                      <Image
                        style = {styles.sendLogo}
                        source = {require('../pics/enviar.png')}
                      />
                  </TouchableOpacity>
                
                </View>                
               
            </View>

            <FlatList 
                data={this.state.cards}
                refreshing={this.state.isLoading}
                onRefresh={this.getCards}
                renderItem={({ item }) => {
                return(
                  <View style={styles.containerCards}>
                    {
                      item.type === 'dicas' &&
                      <View style={styles.container, styles.dicas}>
                        <View style={styles.containerDicas}>
                             <View style={styles.containerDicasPic}>
                                <Image
                                  source = {require('../pics/dicas.png')}
                                  style = { styles.iconDicas }
                                  resizeMode='center'
                                />
                              </View>

                              <View style={styles.containerDicasContent}>
                                <Text
                                  style={styles.title}
                                >
                                  {item.title}
                                </Text>
                                
                                <Text
                                  style={styles.description}
                                >
                                  {item.description}
                                </Text>
                              </View>
                            </View>
                              <TouchableOpacity
                                style={styles.button}
                              >
                                  
                                <Text
                                  style={styles.textButton}
                                >
                                  VER MAIS DICAS
                                </Text>
                              </TouchableOpacity>
                        </View>
                    }
                    
                    {
                      item.type === 'fatos' &&
                      <View style={styles.container, styles.fatos}>
                        <View style={styles.containerFatos}>
                          <View style={styles.containerFatosContent}>
                            <Text
                              style={styles.title}
                            >
                              {item.title}
                            </Text>

                            <Text
                              style={styles.description}
                            >
                              {item.description}
                            </Text>
                          </View>
                                  
                          <View style={styles.containerFatosPic}>
                            <Image
                            source = {require('../pics/fatos.png')}
                            style = { styles.iconFatos }
                            resizeMode='center'
                            />
                          </View>

                        </View>
                      </View>
                    }
                    
                    {
                      item.type === 'motivacional' &&
                      <View style={styles.container, styles.motivacional}>
                        <View style={styles.containerMotivacional}>
                          <View style={styles.containerMotivacionalPic}>
                            <Image
                                source = {require('../pics/motivacional.png')}
                                style = { styles.iconMotivacional }
                                resizeMode='center'
                            />
                            </View>
                              <View style={styles.containerMotivacionalContent}>
                                <Text
                                  style={styles.descriptionMotivacional}
                                >
                                  {item.description}
                                </Text>
                            </View>
                          </View>
                        </View>
                    }
                  </View>
                );
              }}
            />
          </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'column',
  },  
  header:{
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 80,
    marginBottom: 10,
    position: 'relative',
  },
  welcomeText: {
    paddingLeft:15,
    marginTop:110,
    height:80,
    width: 300,
  },
  dateText:{
    color: '#797878',
    fontSize:12,
  },
  placeholder:{
    borderColor: '#E8E8E8',
    borderBottomWidth: 1.5,
    width: 340,
    paddingTop: 10,
    marginLeft:15,
    padding: 10,
    fontSize: 14,
    marginBottom:10,
  },
  sendContainer:{
    flexDirection: 'row',
  },
  sendLogo:{
    marginTop:10,
    marginLeft:10,
    width: 30,
    height: 30,
  },
  logo:{
    marginLeft:6,
    marginTop:50,
    width: 393,
    height: 120,
  },
  containerPic: {
    paddingLeft:12,
    paddingTop:50,
    height: 80,
    width: 95,
  },
  userButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderWidth: 5,
    borderColor: '#44059E',
    borderRadius: 100,
  },
  iconUser: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#44059E',
  },
  //card dicas
  dicas: {
    height: 270,
    marginBottom: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: '#33333333',
  },  
  containerDicas: {
    flexDirection: 'row',
    marginRight: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  containerDicasPic: {
    position: 'relative',
    width: 120,
    height: 200,
    justifyContent: 'flex-start',
    borderRadius: 25,
  },
  containerDicasContent: {
    flex: 1,
    height: 200,
    borderRadius: 25,
  },
  iconDicas: {
    width: 110,
    height: 130,
  },
  button:{
    backgroundColor: 'rgb(211, 189, 240)',
    height: 43,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  textButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#44059E',
  },
  title: {
    fontSize: 18,
    color: '#334',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  description: {
    color: '#333',
    fontSize: 15,
    paddingTop: 10,
  },

  //fatos
  fatos: {
    height: 200,
    marginBottom: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: '#33333333',
  },  
  containerFatos: {
    flexDirection: 'row',
    marginLeft: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  containerFatosPic: {
    position: 'relative',
    width: 110,
    height: 200,
    justifyContent: 'flex-start',
    borderRadius: 25,
    marginRight: 10,
  },
  containerFatosContent: {
    flex: 1,
    height: 200,
    borderRadius: 25,
    paddingLeft: 10,
  },
  iconFatos: {
    width: 140,
    height: 140,
  },

  //motivacional
  motivacional: {
    height: 200,
    marginBottom: 20,
    backgroundColor: '#44059E',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 15,
  },
  containerMotivacional: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 10,
  },
  containerMotivacionalPic: {
    alignItems: 'center',
    width: 110,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
    paddingTop: 25,
  },
  containerMotivacionalContent: {
    flex: 1,
    height: 200,
    borderRadius: 25,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 15,
  },
  iconMotivacional: {
    width: 60,
    height: 60,
  },
  descriptionMotivacional:{
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
    fontSize: 17,
    paddingTop: 10,
  }
  
});