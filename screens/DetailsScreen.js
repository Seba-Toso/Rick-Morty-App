import React from 'react';
import TitleBase from '../components/TitleBase';
import CardWithImage from '../components/CardWithImage';
import { 
    View, 
    StyleSheet, 
    Text,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';


const DetailsScreen = props => {
    let data = props.navigation.state.params.itemData;
    let charsArray;
    let noData = <Text style={styles.text} >There is no information</Text>;

    if(data.residents || data.characters){
        charsArray = data.residents || data.characters;
        charsArray = charsArray.slice(0,5);
        if(charsArray.length <= 1 && charsArray[0].name === null && charsArray[0].image === null){
            charsArray = null
        };
    };

    if(data.image){
        return (                                                           
            <View style={styles.screen}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: data.image}} style={styles.image}  />
                </View>
                <View style={styles.detailsContainer}>
                    <TitleBase>Specie</TitleBase>
                    <Text style={styles.text}>{data.species}</Text>
                    <TitleBase>Gender</TitleBase>
                    <Text style={styles.text}>{data.gender}</Text>
                    <TitleBase>{data.type? 'Type' : null}</TitleBase>
                    <Text style={styles.text}>{data.type}</Text>
                </View>
            </View> 
        );
    };

    return (                                                           
        <View style={styles.screen}>
            <View style={styles.detailsContainer}>
                <TitleBase>{data.type? 'Type' : 'Release Date'}</TitleBase>
                <Text style={styles.text}>{data.type || data.air_date}</Text>
                <TitleBase>{data.dimension? 'Dimension' : 'Episode'}</TitleBase>
                <Text style={styles.text}>{data.dimension || data.episode}</Text>
                <TitleBase>{data.residents? 'Resident(s) in this dimension:' : 'Character(s) in this episode:'}</TitleBase>
                <ScrollView style={styles.list} fadingEdgeLength={40}>
                    {      
                        charsArray? charsArray.map( item => <CardWithImage key={item.name} item={item} /> ) : noData
                    }
                </ScrollView>
            </View>
        </View> 
    );
};                                                                                  

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'red'
    },
    image: {
        width: Dimensions.get('window').width,
        height: '100%'
    },
    detailsContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    list: {
        width: '80%',
        shadowColor: 'white',
        shadowOpacity: 0.6,
        borderRadius: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10
    }
});

DetailsScreen.navigationOptions = (navData) => {
    return{
        headerTitle: navData.navigation.state.params.itemData.name,
    };
};


export default DetailsScreen;