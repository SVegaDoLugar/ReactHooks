import React, {useState, useReducer, useMemo,useRef, useCallback} from 'react';
import '../styles/Characters.css';
import '../App.css';
import Search from './Search';
import useCharacters from '../hooks/useCharacters';

const initialState = {
    favorites: []
}

const API = 'https://rickandmortyapi.com/api/character/';
const favoriteReducer = (state, action) => {
    switch (action.type){
        case 'ADD_TO_FAVORITE':
            const validation = state.favorites.filter(
                (favorite)=> action.payload.id === favorite.id);
            
            if(validation.length === 0){
            return  {
                ...state,
                favorites: [...state.favorites, action.payload]
            }} else{
                return {...state};
            };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites.filter(
                    (favorite)=> action.payload.id === favorite.id), action.payload]
            }
        default:
            return state;
    }
}
const Characters = () =>{
    
    const characters = useCharacters(API);
    
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const handleClick = favorite => {
            dispatch({type: 'ADD_TO_FAVORITE', payload: favorite});
    }

    // const handleClick2 = favorite => {
    //     console.log(favorites.favorites.indexOf(favorite));
    //     //dispatch({type: 'REMOVE_FAVORITE', payload: favorites.favorites.splice(favorites.favorites.indexOf(favorite),1)})
    //     //favorites.favorites.filter(favorites.favorites.indexOf(favorite));
        
    //     dispatch({type: 'REMOVE_FAVORITE',

    //         payload: var 
                

    //     )
    // });
    //     // favorites.favorites.filter(favorite => favorites.favorites.favorite.length === -1); 
    //     console.log(favorites.favorites);
    //     console.log(favorites.favorites.indexOf(favorite));
        
    // }

    const[search, setSearch] = useState('');
    // const filteredUsers = characters.filter((user) => {
    //     return user.name.toLowerCase().includes(search.toLowerCase());
    // });
    const filteredUsers = useMemo(() =>
        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase()); 
        }), [characters, search]
    );

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    }, []);
    //El valor será nulo, porque lo activaremos directamente en nuestro input
    const searchInput = useRef(null);
    return(
            <section className="Characters">
                <h1>Favorites:</h1>        
                <section className="mainList">
                    {
                        favorites.favorites.length >= 0 ?

                        favorites.favorites.map(favorite =>(
                            <li className="favList" key={"FavoriteCharacter " + favorite.id}>
                                <figure>
                                    <img className="favImg"
                                        src={favorite.image}
                                        alt={favorite.name + " image"}
                                        />
                                </figure>
                            </li>
                        ))
                        : null
                    }
                    
                </section>

                <Search search={search}
                        searchInput={searchInput}
                        handleSearch={handleSearch}/>

                {filteredUsers.map(character => (
                    <section className="characterSection" key={character.id}>
                        <figure>
                            <img className='characterImg' src={character.image} alt={character.name + " image"}/>
                        </figure>
                        <h1 className='characterName'>{character.name}</h1>
                        <p>{character.species}</p>
                        <p>From: {character.origin.name}</p>
                        {
                            favorites.favorites.includes(character) ?
                            <button
                                type="button"
                                className="themeButtonFavoritesRemove"
                                
                            >Added to favorites
                            </button>
                            :
                            <button 
                                type="button"
                                className="themeButtonFavoritesAdd"
                                onClick={() => handleClick(character)}>Add to favorites
                            </button>

                        }
                    </section>
                ))}
            </section>
        
    )
}
export default Characters;