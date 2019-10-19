import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import StartScreen from './screens/StartScreen';
import MainScreen from './screens/MainScreen';
import KataScreen from './screens/KataScreen';
import KumiteScreen from './screens/KumiteScreen';
import HistoryScreen from './screens/HistoryScreen';
import AboutScreen from './screens/AboutScreen';
import AddMarkScreen from './screens/AddMarkScreen';

const MainNavigator = createStackNavigator({
    startScreen: {
        screen: StartScreen,
        navigationOptions: {
            header: null
        }
    },
    mainScreen: {
        screen: MainScreen,
        navigationOptions: {
            header: null
        }
    },
    kataScreen: {
        screen: KataScreen,
        navigationOptions: {
            header: null
        }
    },
    kumiteScreen: {
        screen: KumiteScreen,
        navigationOptions: {
            header: null
        }
    },
    historyScreen: {
        screen: HistoryScreen,
        navigationOptions: {
            header: null
        }
    },
    aboutScreen: {
        screen: AboutScreen,
        navigationOptions: {
            header: null
        }
    },
    addMarkScreen: {
        screen: AddMarkScreen,
        navigationOptions: {
            header: null
        }
    }
});

const App = createAppContainer(MainNavigator);

export default App;