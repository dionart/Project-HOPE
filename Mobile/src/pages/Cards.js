import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Picker,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
    Image,
    Button,
    Alert,
    RefreshControl,
} from 'react-native';

//Importa a api
import api from '../services/api';

//Criação dos cards dentro do App Mobile
export default class CreateCards extends Component {

    //Inicia os estados com nulo
    state = {
        title: null,
        type: null,
        description: null,
        content:null,
        errorMessage: null,
    };

    //Header na aba de Criação de Cards
    static navigationOptions = {
        title: 'Criar Cards',
        headerTintColor: '#4B0082',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    //Funções para mudança de texto em tempo real na entrada
    onChangeTextTitle = (event) => {
        this.setState({ title: event.nativeEvent.text });
    };

    onChangeTextDescription = (event) => {
        this.setState({ description: event.nativeEvent.text });
    };

    //Função para criação de cards através dos parametros passados
    createCards = async (title, type, description, content) => {
        try{
            if(description){
                const token = await AsyncStorage.getItem('@CodeApi:token');

                //Pega cada paramêtro do ''models'' de cards e preenche com os parametros da função
                await api.post('/cards/register_card', {
                    title,
                    type,
                    description,
                    content,
                }, { headers: { Authorization: `Bearer ${token}` }});

                Alert.alert('Card criado com sucesso!');
            }

        } catch (response) {
            console.log(response);
            this.setState({ errorMessage: response.data.error });
        }
    }

//Estilização da página mobile
    render() {
        return(
            <View style = {styles.containerAll}>   
                <View style = {styles.container}>

                    <Text style={styles.textType} >
                        Selecione um tipo de card:
                    </Text>

                    <View style = {styles.containerPicker}>
                        <Picker
                            style={styles.picker}
                            itemStyle={{fontSize: 50}}
                            selectedValue={this.state.type}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({type: itemValue})
                            }
                        >   
                            <Picker.Item label = 'Tipos de card' value = {null} />
                            <Picker.Item label = 'Dicas' value = 'dicas' />
                            <Picker.Item label = 'Fatos' value = 'fatos'/>
                            <Picker.Item label = 'Motivacional' value = 'motivacional'/>
                            
                        </Picker>

                    </View>

                    {   
                        (this.state.type == 'dicas' ||
                        this.state.type == 'fatos') &&

                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder = 'Título'
                                onChange={this.onChangeTextTitle}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder = 'Conteúdo'
                                onChange={this.onChangeTextDescription}
                            />
                        </View>
                    }
                    {   
                        
                        this.state.type == 'motivacional' &&

                        <View>

                            <TextInput
                                style={styles.input}
                                placeholder = 'Descrição'
                                onChange={this.onChangeTextDescription}
                            />

                        </View>
                    }

                { !!this.state.errorMessage && <Text style = { styles.textError }> { this.state.errorMessage }</Text> }

                </View>

                <View
                    style={styles.containerButton}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.createCards(
                            this.state.title, 
                            this.state.type, 
                            this.state.description, 
                            this.state.link, 
                            this.state.image
                        )}
                    >
                        
                        <Text style = { styles.textbutton }>
                            CRIAR
                        </Text>

                    </TouchableOpacity>
                </View>

            </View>
        );
    }
};

const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
    },
    container: {
        height: 730,
    },
    containerPicker: {
        borderBottomWidth: 2,
        borderColor: '#33333333',
        marginBottom: 20,
    },
    containerButton:{
        alignItems: 'center',
        
    },
    textType: {
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 30,
        paddingBottom: 30,
        fontWeight:'bold',
    },
    picker: {
        color: '#44059E',
    },
    input: {
        borderColor: '#33333333',
        borderBottomWidth: 1,
        marginTop: 25,
        padding: 15,
        backgroundColor: '#FFF',
        fontSize: 16,
    },
    button: {
        
        height: 42,
        width: 350,
        backgroundColor: '#44059E',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    textbutton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    textError: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F33',
    }
});