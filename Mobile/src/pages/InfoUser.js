import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    AsyncStorage,
  } from 'react-native';

export default class InfoUser extends Component {

    //define as configurações do header
    static navigationOptions = {
        title: 'Informações da conta',
        headerTintColor:'#44059E',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }

    state = {
        loggedInUser: null,
    }

    //Carrega as informações para montagem futura
    async componentWillMount(){
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));

        this.setState({ loggedInUser: user });
    }

    //Estilização da pagina mobile
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.containerPic}>
                    <Image
                        //Verifica se o usuário já possuia imagem definida para setar em default ou não
                        source={this.state.loggedInUser &&
                            this.state.loggedInUser.pic ? 
                            {uri: this.state.loggedInUser.pic} : source = require('../pics/defaultUser2.png')}
                        style={styles.userPic}
                        resizeMode='cover'
                    />
                </View>
                

                <View style={styles.containerText}>
                    <Text style={styles.textTitle}>
                        Usuário
                    </Text>

                    <Text style={styles.textDescription}>
                        { this.state.loggedInUser && this.state.loggedInUser.name }
                    </Text>

                    <Text style={styles.textTitle}>
                        E-mail
                    </Text>

                    <Text style={styles.textDescription}>
                        { this.state.loggedInUser && this.state.loggedInUser.email}
                    </Text>

                    <TouchableOpacity
                    style = {styles.newUserButton}
                    //Mudança de página
                    onPress = { () => this.props.navigation.navigate('ForgotPassword') }
                    >
                    <Text style = {styles.newUserButtonText}>
                        TROCAR SENHA
                    </Text>

                    </TouchableOpacity>
                    

                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF',
    },
    containerPic: {
        alignItems: 'center',
        marginTop: 30,
        paddingBottom: 40,
        borderBottomWidth: 1,
        borderColor: '#44059E',
    },  
    userPic: {
        paddingTop:90,
        borderWidth: 5,
        borderColor: '#44059E',
        height: 300,
        width: 300,
        borderRadius: 300,
    },
    containerText:{
        marginTop:20,
        alignItems: 'flex-start',
        paddingLeft: 32,
    },
    newUserButton:{
        borderColor: '#44059E',
        borderWidth: 2,
        borderRadius: 8,
        width: 300,
        height: 50,
        marginLeft:22,
        marginTop:50,
        marginBottom: 5,
      },
      newUserButtonText:{
        paddingTop:10,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#44059E',
      },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom:3,
        color: '#44059E',
    },
    textDescription: {
        paddingTop:10,
        fontSize: 15,
        color: '#6669',
        marginBottom:15,
    }
});