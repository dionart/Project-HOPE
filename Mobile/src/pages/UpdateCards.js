import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Image,
    FlatList,
    TextInput,
    Alert,
} from 'react-native';

 import api from '../services/api';


function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

//Função para edição de cards
export default class UpdateCards extends Component {

    //Define configurações de header
    static navigationOptions = {
        headerTitle: 'Cards',
        headerTintColor: '#44059E',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }

    //Seta estados para null
    state = {
        cards: null,
        loggedInUser: null,
        isLoading: false,
        isUpdateDelete: false,
        isUpdate: false,

        idCard: null,
        title: null,
        type: null,
        description: null,
        content: null,
    }

    //Função de Leitura de cards
    readCards = async () => {
        try{
            const token = await AsyncStorage.getItem('@CodeApi:token');
            const response = await api.get('/cards/', {}, { headers: { Authorization: `Bearer ${token}` }});
            const cards =  response.data.cards;
    
            this.setState({cards});
        }catch(erro){
            Alert.alert('Erro ao ler os cards');
        } 
    }

    //Espera 5 segundos para listar os cards
    getCards = () => {
        wait(5000).then(() => this.setState({isLoading: true})).then(() => this.setState({isLoading: false}));
        this.readCards();
    }
    
    //Carrega informações dos cards postados
    componentWillMount(){
        this.readCards();
    }

    //Função de delete através do id
    delete = async (id) => {
        const token = await AsyncStorage.getItem('@CodeApi:token');
        //consome a api
        await api.delete(`/cards/${id}`, {}, { headers: { Authorization: `Bearer ${token}` }});

        Alert.alert('Card excluído com sucesso!');

        this.setState({isUpdateDelete: false});
    }

    //Função de update através do id
    update = async (title, type, description, content, id) => {
        try{
            
            const token = await AsyncStorage.getItem('@CodeApi:token');
            //consome a api
            await api.put(`/cards/${id}`, {
                title,
                type,
                description,
                content,
            }, { headers: { Authorization: `Bearer ${token}` }});

            Alert.alert('Card editado com sucesso!');

        } catch (response) {
            this.setState({ errorMessage: response.data.error });
            console.log(response);
        }
    }

    //Atualiza em tempo real oque está sendo digitado na input box
    onChangeTextTitle = (event) => {
        this.setState({ title: event.nativeEvent.text });
    };

    onChangeTextDescription = (event) => {
        this.setState({ description: event.nativeEvent.text });
    };

    //estilização da pagina mobile
    render(){
        if(!this.state.cards){
            return null;
        }
        return(
            <View
                style={{
                    flex:1,
                    backgroundColor: this.state.isUpdateDelete || this.state.isUpdate ? '#33333' : '#fff'
                }}
            >
                <FlatList 
                    data={this.state.cards}
                    refreshing={this.state.isLoading}
                    onRefresh={this.getCards}
                    renderItem={({ item }) => {
                        return(
                            <View style={styles.containerCards}>
                                {   
                                    //Define o template dos cards através de seu tipo
                                    item.type === 'dicas' &&
                                    
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                isUpdateDelete: true, 
                                                idCard: item._id,
                                                title: item.title,
                                                type: item.type,
                                                description: item.description,
                                                content: item.content
                                            });
                                        }}
                                    >
                                        <View style={styles.dicas}>
                                            <View style={styles.containerDicas}>
                                                <View style={styles.containerDicasPic}>
                                                    <Image
                                                        source = {require('../pics/dicas.png')}
                                                        style = { styles.picDicas }
                                                        resizeMode='center'
                                                    />
                                                </View>

                                                <View style={styles.containerDicasDescription}>
                                                    <Text style={styles.textTitle}>
                                                        {item.title}
                                                    </Text>
                                                    
                                                    <Text style={styles.textDescription}>
                                                        {item.description}
                                                    </Text>
                                                </View>
                                            </View>
                                        
                                        </View>
                                    </TouchableOpacity>
                                }
                                {
                                    //Define o template dos cards através de seu tipo
                                    item.type === 'fatos' &&
                                    
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                isUpdateDelete: true, 
                                                idCard: item._id,
                                                title: item.title,
                                                type: item.type,
                                                description: item.description,
                                                content: item.content,
                                            });
                                        }}
                                    >
                                    
                                        <View style={styles.fatos}>
                                            <View style={styles.containerFatos}>
                                                <View style={styles.containerDescription}>
                                                    <Text style={styles.textTitle}>
                                                        {item.title}
                                                    </Text>

                                                    <Text style={styles.textDescription}>
                                                        {item.description}
                                                    </Text>
                                                </View>
                                                
                                                <View style={styles.fatosPic}>
                                                    <Image
                                                        source = {require('../pics/fatos.png')}
                                                        style = { styles.containerPicFatos }
                                                        resizeMode='center'
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                }
                                {
                                    //Define o template dos cards através de seu tipo
                                    item.type === 'motivacional' &&
                                    
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                isUpdateDelete: true, 
                                                idCard: item._id,
                                                title: item.title,
                                                type: item.type,
                                                description: item.description,
                                                content: item.content,
                                            });
                                        }}
                                    >
                                    
                                        <View style={styles.containerMotivacional}>
                                            <View style={styles.containerAspas}>
                                                <View style={styles.containerAspasPic}>
                                                    <Image
                                                        source = {require('../pics/motivacional.png')}
                                                        style = { styles.picMotivacional }
                                                        resizeMode='center'
                                                    />
                                                </View>

                                                <View style={styles.containerAspasDescription}>
                                                    <Text style={styles.textMotivacional}>
                                                        {item.description}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>
                        );
                    }}
                />
                {   
                    //Abre o menu de seleção se for verdade
                    this.state.isUpdateDelete &&

                    
                    <View style={styles.containerUD}>
                        <TouchableOpacity
                            style={styles.buttonUD}
                            onPress={() => this.setState({isUpdate: true, isUpdateDelete: false})}
                        >
                            <Text style={styles.TextUD}>
                                EDITAR
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonUD}
                            onPress={() => this.delete(this.state.idCard)}
                        >
                            <Text style={styles.TextUD}>
                                DELETAR
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonBack}
                            onPress={() => this.setState({isUpdateDelete: false})}
                        >
                            <Text style={styles.TextBack}>
                                VOLTAR
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                }
                {
                    //Abre o menu para edição do card selecionado
                    this.state.isUpdate &&

                    <View style={styles.containerUpdate}>
                        <FlatList
                            data={this.state.cards}
                            refreshing={this.state.isLoading}
                            onRefresh={this.getCards}
                            renderItem={({ item }) => {
                                return(
                                    <View>
                                        {
                                            (item._id == this.state.idCard) &&

                                            
                                            <View>
                                                { 
                                                    (item.type == 'dicas' ||
                                                    item.type == 'fatos') &&

                                                    <View style={{height: 320}}>
                                                        <TextInput
                                                            style={styles.input}
                                                            onChange={this.onChangeTextTitle}
                                                            placeholder = 'Título'
                                                        />

                                                        <TextInput
                                                            style={styles.input}
                                                            onChange={this.onChangeTextDescription}
                                                            placeholder = 'Descrição'
                                                        />
                                                    </View>
                                                }
                                                {
                                                    item.type == 'motivacional' &&

                                                    <View style={{height: 320}}>
                                                        <TextInput
                                                            style={styles.input}
                                                            onChange={this.onChangeTextDescription}
                                                            placeholder = 'Descrição'
                                                        />
                                                    </View>
                                                }

                                                <TouchableOpacity
                                                    style={styles.buttonUD}
                                                    onPress={() => {
                                                        this.setState({isUpdate: false}),
                                                        this.update(
                                                            this.state.title, 
                                                            this.state.type, 
                                                            this.state.description, 
                                                            this.state.content,
                                                            this.state.idCard,
                                                        )
                                                    }}
                                                >
                                                    <Text style={styles.TextUD}>
                                                        EDITAR
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={styles.buttonBack}
                                                    onPress={() => this.setState({isUpdate: false, isUpdateDelete: true})}
                                                >
                                                    <Text style={styles.TextBack}>
                                                        VOLTAR
                                                    </Text>
                                                </TouchableOpacity>

                                            </View>
                                        
                                        }   
                                    </View>
                                );

                            }}
                        />
                    </View>
                 
                }
                {   
                    //Se o usuário nao criar ou deletar nada, o menu de criação é selecionado
                    !this.state.isUpdateDelete && 
                    !this.state.isUpdate &&

                    <View style={styles.containerButtonCreate}>
                        <TouchableOpacity
                            style={styles.buttonCreate}
                            onPress={() => this.props.navigation.navigate('Cards')}
                        >
                            <Image
                                style={styles.createImage}
                                source={require('../pics/AddFile.png')}
                            />
                        </TouchableOpacity>
                    </View>
                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerRow:{
        flex: 1,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#44059E',
        
        paddingVertical: 8,
    },
    containerInfo: {
        marginTop: -10,
        width: 350,
    },
    textType: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#44059E',
    },
    textDescription: {
        fontSize: 18,
        color: '#44059E',
    },
    buttonMore: {
        alignItems: 'center',
        paddingTop: 1,
        borderRadius: 100,
        width: 40,
        height: 40,
    },
    imageButton: {
        width: 25,
        height: 25,
    },
    containerUD: {
        backgroundColor: '#DAD8D8',
        borderTopWidth: 3,
        borderColor: '#44059E',
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextUD: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#44059E',
    },
    buttonUD: {
        backgroundColor: '#FFF',
        height: 42,
        width: 350,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        borderRadius: 10,
    },
    TextBack: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    buttonBack: {
        backgroundColor: '#44059E',
        height: 42,
        width: 350,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 10,
        borderRadius: 10,
    },
    containerUpdate: {
        backgroundColor: '#DAD8D8',
        borderTopWidth: 3,
        borderColor: '#44059E',
        paddingTop: 20,
        height: 500,
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#FFF',
        marginTop: 25,
        borderRadius: 10,
        height: 42,
        width: 350,
    },
    containerButtonCreate: {
        backgroundColor: '#FFF',
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 15,
        right: 15,
        elevation: 3,
        borderRadius: 100,
    },
    buttonCreate:{
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#FFF',
    },
    createImage: {
        marginLeft:8,
        height: 40,
        width: 40,
    },
    dicas: {
        height: 150,
        marginHorizontal: 7,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E4E4E4',
        backgroundColor: '#FFF',
    },  
    containerDicas: {
        flexDirection:'row-reverse',
        marginRight: 25,
    },
    containerDicasPic: {
        width: 120,
        height: 200,
        borderRadius: 25,
    },
    containerDicasDescription: {
        flex: 1,
        height: 200,
        borderRadius: 25,
    },
    containerCards:{
        width:400,
        height:150,
        
    },
    containerPicFatos: {
        width: 110,
        height: 130,
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        height: 43,
        borderRadius: 20,
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#4B0082',
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        paddingTop: 20,
        color: '#334',
    },
    textDescription: {
        fontSize: 18,
        paddingTop: 10,
        color: '#333',
    },
    fatos: {
        height: 150,
        marginHorizontal: 7,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E4E4E4',
        backgroundColor: '#FFF',
    },  
    containerFatos: {
        flexDirection: 'row',
        borderRadius: 25,
        marginLeft: 10,
        marginBottom: 10,
    },
    fatosPic: {
        width: 110,
        height: 200,
        borderRadius: 25,
        marginRight: 10,
    },
    containerDescription: {
        height: 200,
        flex: 2,
        borderRadius: 25,
        paddingLeft: 10,
    },
    picDicas: {
        width: 140,
        height: 140,
    },
    containerMotivacional: {
        alignItems: 'center',
        height: 150,
        marginHorizontal: 7,
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: '#44059E',
    },
    containerAspas: {
        alignItems: 'center',
        flexDirection: 'row-reverse',
        borderRadius: 25,
    },
    containerAspasPic: {
        alignItems: 'center',
        height: 150,
        paddingLeft:20,
        paddingRight:15,
        borderRadius: 25,
    },
    containerAspasDescription: {
        height: 200,
        flex: 2,
        borderRadius: 25,
        marginRight: 20,
        marginLeft: 20,
        paddingTop: 15,
    },
    picMotivacional: {
        width: 70,
        height: 60,
    },
    textMotivacional:{
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 22,
        paddingTop: 10,
        color: '#FFF',
    },
});