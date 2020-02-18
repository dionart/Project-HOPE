import React, {Component} from 'react';
import {
    Alert,
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
    Image,
}from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import api from '../services/api';

export default class Config extends Component {

    //Configura o header
    static navigationOptions = {
        title: 'Configurações',
        headerTintColor: '#4B0082',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };
    
    //Seta os estados para null
    state = {
        cards: null,
        loggedInUser: null,
        pic: null,
    };

    getPermissionAsync = async () => {
        //Espera o usuário conceder permissão de acesso a galeria
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        
        if (status !== 'granted') {
            Alert('','É preciso fornecer permissão para usar este recurso');
        }
    }
    
    //Carrega o usuario para setar o campo user e sua imagem
    async componentDidMount() {
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));

        this.getPermissionAsync();
        this.setState({ loggedInUser: user });
        this.setState({ pic: user.pic });
    };

    
    //Função de upload de imagens
    updatePicture = async (id) => {
        try{
            //aguarda o upload da imagem da galeria
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                base64: true,
                aspect: [4,3],
                quality: 1
            });
        
            if (!result.cancelled) {
              this.setState({ pic: result.uri });
            }
            
            //define a imagem atual
            const pic = this.state.pic;
            const token = await AsyncStorage.getItem('@CodeApi:token');
            const user = this.state.loggedInUser;
            
            //Se o usuario possuir uma imagem já cadastrada ela será carregada ao logar-se
            if(user.pic){
                user.pic = `data:image/jpeg;base64,${pic}`;
            }

            await AsyncStorage.setItem(
                '@CodeApi:user', JSON.stringify(user),
            );

            await api.put(`/user/${id}/pic`, {
                pic
            }, { headers: { Authorization: `Bearer ${token}` }});

        } catch (response) {
            console.log(response);
            this.setState({ errorMessage: response.data.error });
        }
        
        
    };

    render(){
        return(

            <View style = { styles.container }>

                <View style={styles.containerImage}>
                    
                    <TouchableOpacity
                        onPress={() => this.updatePicture(this.state.loggedInUser._id)}
                    >
                        <Image
                            style={styles.image}
                            resizeMode='cover'
                            source={this.state.pic ? {uri: this.state.pic} : require('../pics/defaultUser2.png')}
                        />
                    </TouchableOpacity>
                 </View> 


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('InfoUser')}
                >
                    <Text style={styles.textButton}>
                        INFORMAÇÕES PESSOAIS
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.updatePicture(this.state.loggedInUser._id)}
                >
                    <Text style={styles.textButton}>
                        MUDAR FOTO DE PERFIL
                    </Text>
                </TouchableOpacity>

                
                {this.state.loggedInUser && 
                //Menu disponível apenas para administradores
                 this.state.loggedInUser.isAdmin &&
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('UpdateCards')}
                    >
                        <Text style={styles.textButton}>
                            CARDS
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    arrowContainer:{
        width: 60,
        height: 40,
        flexDirection: 'row',
    },
    containerImage: {
        width: 200,
        height: 200,
        marginTop: 120,
        marginBottom: 60,
    },
    image:{
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 10,
        borderColor: '#44059E'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        width: 350,
        height: 42,
        backgroundColor: '#44059E',
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFF',
    }
});