import React from 'react';
import TitleBase from '../components/TitleBase';
import StartButton from '../components/StartButton';
import { 
    View, 
    StyleSheet, 
    Text,
    Image,
} from 'react-native';



const StartScreen = props => {
    let date = new Date( );
    date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    
    return (                                                           
        <View style={styles.screen}>
            <Image source={require('../assets/welcomeIcon.png')} style={styles.image} />
            <TitleBase>REACT NATIVE CHALLENGE</TitleBase>
            <Text style={styles.subtitle}>SEBASTIÁN TOSO</Text>
            <View style={styles.buttonAndDate}>
                <StartButton onPress={() => props.navigation.replace('Search')} />
                <Text>{date}</Text>
            </View>
        </View> 
        );
};                                                                                  

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 50
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 20
    },
    buttonAndDate:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

StartScreen.navigationOptions = () => {
    return{
        headerShown: false
    };
};

export default StartScreen;
