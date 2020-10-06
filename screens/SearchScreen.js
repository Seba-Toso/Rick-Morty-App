import React, {useState} from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import FiltersBar from '../components/FiltersBar';
import Results from '../components/ResultsList'
import { 
    View, 
    StyleSheet, 
    Text,
    TouchableWithoutFeedback, 
    Keyboard,
} from 'react-native';


//Error message
const Error = () => {
    return (
        <View style={styles.screen}>
            <Text>Your search has no results</Text>
        </View>
    );
};

const SearchScreen = props => {
    let {error} = props;
    
    return (         
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >                                                  
            <View style={styles.screen}>
                {
                    error? <Error /> 
                    : 
                    <Results onNavigate={props.navigation} />
                }  
                
                <View style={styles.filterBar}>
                    <FiltersBar />
                </View>
                
            </View> 
        </TouchableWithoutFeedback>
    );
};                                                                                  

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    resultsContainer: {
        flex: 1,
        width: '75%',
        alignItems: 'center',
    },
});


SearchScreen.navigationOptions = () => {
    return{
        headerTitle: () => <Input />,
        headerLeft: () => null,
    };
};


function mapState (state){
    return {
        error: state.obtainedData.error,
        fetching: state.obtainedData.fetching
    };
};

export default connect (mapState)(SearchScreen);