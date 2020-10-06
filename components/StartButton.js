import React from 'react';
import { 
    View, 
    StyleSheet, 
    Text,
    TouchableOpacity
} from 'react-native';


const StartButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>START</Text>
            </View>
        </TouchableOpacity>
    );
};
                                                               
const styles = StyleSheet.create({
    buttonContainer: {
        height: 48,
        marginTop: 100,
        marginBottom: 10,
        backgroundColor: '#333',
        borderColor: '#777',
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 28,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
});


export default StartButton;
