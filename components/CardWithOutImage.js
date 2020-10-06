import React from 'react';
import { 
    View, 
    StyleSheet,
    Text
} from 'react-native';

const CartWithOutImage = props => {

    let dataToShow ;
    if(props.item === undefined){
        return(
            <View>
                <Text>NO CARD AVAILABLE</Text>
            </View>
        );
    };
    if(props.item.item){
        dataToShow = props.item.item;

    return (                                                           
        <View style={{...styles.card, ...props.style}}>
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.text} numberOfLines={2}>{dataToShow.name}</Text>
                    <Text style={styles.text} numberOfLines={2}>
                        {dataToShow.episode || dataToShow.dimension}
                    </Text>
                </View>        
            </View>    
        </View>  
        );
    };
};                                                                                  

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1
    },
    row: {
        flexDirection: 'row'
    },
    col: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});


export default CartWithOutImage;