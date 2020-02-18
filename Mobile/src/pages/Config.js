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

    static navigationOptions = {
        title: 'Configurações',
        headerTintColor: '#4B0082',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };
    
    state = {
        cards: null,
        loggedInUser: null,
        pic: null,
    };

    getPermissionAsync = async () => {
        
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        
        if (status !== 'granted') {
            Alert('','É preciso fornecer permissão para usar este recurso');
        }
    }
    
    async componentDidMount() {
        const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));

        this.getPermissionAsync();
        this.setState({ loggedInUser: user });
        this.setState({ pic: user.pic });
    };

    
    
    updatePicture = async (id) => {
        try{
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
        
            const pic = this.state.pic;
            const token = await AsyncStorage.getItem('@CodeApi:token');
            const user = this.state.loggedInUser;
            
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
                    onPress={() => this.props.navigation.navigate('UserInfo')}
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
        borderColor: 'rgb(62, 6, 136)'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        width: 350,
        height: 42,
        backgroundColor: '#4B0082',
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFF',
    }
});