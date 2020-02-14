import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';
import Login from './pages/LoginScreen';

export default createStackNavigator({
    Login: {
        screen: Login
    },
    Main: {
        screen: Main
    }
}, {
    navigationOptions:{
        headerStyle: {
            backgroundColor: "#DA552F"
        },
        headerTintColor: "#FFF"
    },

}, {
    InitialRouteName: "Login",
});
