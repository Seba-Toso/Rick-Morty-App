import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'

import StartScreen from '../screens/StartScreen';
import SearchScreen from '../screens/SearchScreen';
import DetailsScreen from '../screens/DetailsScreen';

const AppNavigation = createStackNavigator({
    Start: StartScreen,
    Search: {
        screen: SearchScreen
    },
    Details: {
        screen: DetailsScreen
    }
},
{
    navigationOptions: {
        headerStyle: {
            height: 70,

        }
    }
});

export default createAppContainer(AppNavigation);