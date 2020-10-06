import React, {useState} from 'react';
import { connect } from 'react-redux';
import {getDataAction, clearAllAction, setCurrentAction, setLoadMoreAction} from '../redux/dataDuck';
import { TouchableOpacity, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Input = ({getDataAction, setCurrentAction, clearAllAction, setLoadMoreAction}) => {
    const [inputWord , setInputWord] = useState('');
    
    //input Border Color
    let borderColorCheck;
    inputWord.length === 0 ? 
    borderColorCheck = '#ccc'
    :
    inputWord.length < 3 ? 
    borderColorCheck = 'red'
    :
    borderColorCheck = 'green'
    
    //input handler
    const onWrite = writedInput => {
        setInputWord(writedInput);
    };

    //search Action
    const onSearch = () => {
        if(inputWord.length >= 3){
            clearAllAction()
            getDataAction( inputWord, 1 )
            setCurrentAction (inputWord)
            setLoadMoreAction(false)
        };
    };
    //clear Action
    const onDelete = () => {
        clearAllAction()
        setInputWord('')
    };

    return (
        <View style={styles.inputContainer} borderColor={borderColorCheck}>
            <TextInput 
                style={styles.input}
                placeholder='Search...'
                onChangeText={onWrite} 
                onSubmitEditing={onSearch}
                clearTextOnFocus={true}
                value={inputWord}
                returnKeyType='search'
            />
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.buttonContainer} onPress={onSearch} disabled={inputWord.length < 3 ? true : false}>
                    <View >
                        <Ionicons name='ios-search' size={22} color={'lightgray'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={onDelete}  >
                    <View >
                        <Ionicons name='ios-close' size={26} color={'red'} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 3,
        borderRadius: 150,
        borderWidth: 1,
    },
    input: {
        width: '75%',
        fontSize: 18,
        marginLeft: '2%',
    },
    buttonGroup: {
        width: '20%',
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderLeftColor: '#ccc',
        borderLeftWidth: 1
    },
    buttonContainer: {
        justifyContent: 'center',
        paddingHorizontal: 10
    },
});


function mapState (){
    return {
    };
};

export default connect (mapState,{getDataAction, setCurrentAction, clearAllAction, setLoadMoreAction})(Input);