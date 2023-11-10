// reducers.js
// Modifica questo import nel tuo file reducers.js
import * as actionTypes from './action'; // o qualsiasi sia l'export del tuo file actions.js

import {
    FETCH_SONGS_REQUEST,
    FETCH_SONGS_SUCCESS,
    FETCH_SONGS_FAILURE,
    SET_SEARCH_RESULTS,
    LIKE_SONG,
  } from './action';
  
  const initialState = {
    loading: false,
    error: null,
    rockSection: [],
    popSection: [],
    hipHopSection: [],
    searchResults: [],
  };
  
  const musicReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SONGS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_SONGS_SUCCESS:
        return {
          ...state,
          loading: false,
          [action.payload.section]: action.payload.data.slice(0, 4),
          error: null,
        };
      case FETCH_SONGS_FAILURE:
        return { ...state, loading: false, error: action.payload.error };
      case SET_SEARCH_RESULTS:
        return { ...state, searchResults: action.payload };
      case LIKE_SONG:
        return {
          ...state,
          searchResults: state.searchResults.map((song) =>
            song.id === action.payload.songId
              ? { ...song, liked: !song.liked }
              : song
          ),
        };
      default:
        return state;
    }
  };
  
  export default musicReducer;
  