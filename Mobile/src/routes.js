import { createStackNavigator } from 'react-navigation';

import NewUser from './pages/newUser';
import Login from './pages/LoginScreen';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import Config from './pages/Config';
import Cards from './pages/Cards';
import UpdateCards from './pages/UpdateCards';


export default createStackNavigator({
    Login: {
        screen: Login
    },
    ForgotPassword:{
        screen: ForgotPassword
    },
    NewUser:{
        screen: NewUser
    },
    ChangePassword:{
        screen: ChangePassword
    },
    Home:{
        screen: Home
    },
    Config:{
        screen: Config
    },
    Cards:{
        screen: Cards
    },
    UpdateCards:{
        screen : UpdateCards
    }
}, {
    navigationOptions:{
        headerStyle: {
            backgroundColor: "#FFF"
        },
        headerTintColor: "#4B0082"
    },

}, {
    InitialRouteName: "Login",
});
