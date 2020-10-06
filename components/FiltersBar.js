import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {setFilterAction} from '../redux/dataDuck';
import { Ionicons } from '@expo/vector-icons';
import { 
    StyleSheet, 
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const FiltersBar = ({setFilterAction, filter}) => {
    const [charButtonActive, setCharButtonActive] = useState ();
    const [locButtonActive, setLocButtonActive] = useState ();
    const [epButtonActive, setEpButtonActive] = useState ();

    useEffect(()=>{
        turnOnButton(filter)
    }, [charButtonActive, locButtonActive, epButtonActive]);
    
    const turnOnButton = (buttonName) => {
        if(buttonName === 'characters'){
            setCharButtonActive(true)
            setLocButtonActive(false)
            setEpButtonActive(false)
            return
        };
        if(buttonName === 'locations'){
            setCharButtonActive(false)
            setLocButtonActive(true)
            setEpButtonActive(false)
            return
        };
        if(buttonName === 'episodes'){
            setCharButtonActive(false)
            setLocButtonActive(false)
            setEpButtonActive(true)
            return
        };
    };

    const setFilter = (filterBy) => {
        setFilterAction(filterBy)
        turnOnButton(filterBy)
    };


  return (
        <View style={styles.filterBar}>
            <TouchableOpacity style={styles.newButtonContainer} onPress={() => setFilter('characters')}>
                <View style={styles.buttonFormat}>
                    <Ionicons 
                    name="md-person" 
                    size={24} 
                    color={charButtonActive ? 'cyan' : 'lightgray'} 
                    style={styles.icon} 
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newButtonContainer} onPress={() => setFilter('locations')}>
                <View style={styles.buttonFormat}>
                    <Ionicons 
                    name="md-pin" 
                    size={24} 
                    color={locButtonActive ? 'cyan' : 'lightgray'} 
                    style={styles.icon} 
                    />  
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newButtonContainer} onPress={() => setFilter('episodes')}>
                <View style={styles.buttonFormat}>
                    <Ionicons 
                    name="ios-videocam" 
                    size={24} 
                    color={epButtonActive ? 'cyan' : 'lightgray'} 
                    style={styles.icon} 
                    />  
                </View>
            </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
    filterBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: 'center',
        backgroundColor: '#333',
        paddingVertical: 7,
        borderRadius: 50,
        marginBottom: 20,
        minHeight: Dimensions.get('window').width * .18,
        borderColor: '#777',
        borderWidth: 2,
    },
    newButtonContainer: {
        width: Dimensions.get('window').width * .13,
        height: Dimensions.get('window').width * .13,
        borderColor: '#ccc',
        marginHorizontal: 30,
        borderWidth: 2,
        borderRadius: 50,
        justifyContent: 'center',
    },
    buttonFormat: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});

function mapState (state){
    return {
        filter: state.obtainedData.filter,
    };
};

export default connect (mapState, {setFilterAction})(FiltersBar);


