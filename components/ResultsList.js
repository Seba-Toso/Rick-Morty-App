import React, {useState} from 'react'
import { connect } from 'react-redux';
import {View, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import CardWithImage from './CardWithImage';
import CardWithOutImage from './CardWithOutImage';
import {getDataAction, setLoadMoreAction} from '../redux/dataDuck';


//Results management
const Results = props => {  
    const {characters, episodes, locations, current, nextPage, filter, fetching} = props;
    const [isScrolling, setIsScrolling] = useState(false);
    
    const onScrolling = () => {
        setIsScrolling(true)
    };


    const loadMoreResults = () => {
        props.setLoadMoreAction(true)
        if(!isScrolling){
            return null
        };
        if(nextPage != null){
            props.getDataAction(current, nextPage)
        };
    };

    //change display options
    const whatToShow = () => {
        if(filter === 'characters'){
            return characters
        };
        if(filter === 'episodes'){
            return episodes
        };
        if(filter === 'locations'){
            return locations
        };
    };


    return (
        <View style={styles.resultsContainer}>
            <FlatList  
                keyExtractor={item => item.id.toString()}
                data={whatToShow()}
                onScroll={onScrolling}
                onEndReached={loadMoreResults}
                onEndReachedThreshold={0.1}
                ListFooterComponent={
                    nextPage && fetching ? <ActivityIndicator size={30} color={'#333'} style={{marginTop: 30}} /> : <View style={{marginTop: 100}}></View>
                }
                renderItem={item => (
                    <TouchableOpacity onPress={() => props.onNavigate.navigate({
                        routeName: 'Details', 
                        params: {itemData: item.item}
                    })}>
                        {
                            props.filter === 'characters' ? 
                                <CardWithImage item={item}/> 
                                : 
                                <CardWithOutImage item={item}/>
                        }
                    </TouchableOpacity>)
                } 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    resultsContainer: {
        height: '100%',
        width: '75%',
        alignItems: 'center',
    },
});

function mapState (state){
    return {
        fetching: state.obtainedData.fetching,
        characters: state.obtainedData.characters,
        episodes: state.obtainedData.episodes,
        locations: state.obtainedData.locations,
        filter: state.obtainedData.filter,
        current: state.obtainedData.current,
        nextPage: state.obtainedData.nextPage,
    };
};

export default connect (mapState, {getDataAction, setLoadMoreAction})(Results);