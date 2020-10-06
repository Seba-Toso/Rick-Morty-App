import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';


const TitleBase = props => {
    return (
        <Text style={{...styles.title, ...props.styles}}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: Dimensions.get('window').width * .06,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        textDecorationLine: 'underline' 
    }
});

export default TitleBase;