import { createStackNavigator } from 'react-navigation';

import NewUser from './pages/newUser';
import Login from './pages/LoginScreen';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';


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
}, {
    navigationOptions:{
        headerStyle: {
            backgroundColor: "#FFF"
        },
        headerTintColor: "#FFF"
    },

}, {
    InitialRouteName: "Login",
});
