export let setQuery = (filter) => { 

    switch(filter){
        case 'characters':
            return(
                `query($page: Int, $filter: FilterCharacter) {
                characters(page: $page, filter: $filter) {
                    info {
                        pages
                        next
                        prev
                        count
                    }
                    results {
                        name
                        id
                        image
                        species
                        type
                        gender
                        }
                    }
                }`
            );
        case 'episodes':
            return (
                ` query($page: Int, $filter: FilterEpisode) {
                    episodes(page: $page, filter: $filter) {
                        info {
                        pages
                        next
                        prev
                        }
                        results {
                        name
                        id
                        air_date
                        episode
                        characters {
                            name
                            image
                            }
                        }
                    }
                }`
            );
        case 'locations': 
            return (
                `query($page: Int, $filter: FilterLocation) {
                    locations(page: $page, filter: $filter) {
                      info {
                        pages
                        next
                        prev
                      }
                      results {
                        name
                        id
                        type
                        dimension
                        residents {
                            name
                            image
                            }
                        }
                    }
                }`
            );
        default:
            return
    }
};


