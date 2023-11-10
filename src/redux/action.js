// actions.js
export const fetchSongs = (query, section) => {
    return async (dispatch) => {
      dispatch(fetchSongsRequest());
  
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
        );
  
        if (response.ok) {
          const data = await response.json();
          dispatch(fetchSongsSuccess(data.data, section));
        } else {
          throw new Error('Error in fetching songs');
        }
      } catch (error) {
        dispatch(fetchSongsFailure(error.message));
      }
    };
  };

export const FETCH_SONGS_REQUEST = 'FETCH_SONGS_REQUEST';
export const FETCH_SONGS_SUCCESS = 'FETCH_SONGS_SUCCESS';
export const FETCH_SONGS_FAILURE = 'FETCH_SONGS_FAILURE';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const LIKE_SONG = 'LIKE_SONG';

export const fetchSongsRequest = () => ({
  type: FETCH_SONGS_REQUEST,
});

// Nel tuo actions.js
export const fetchSongsSuccess = (data, section) => {
    console.log('Fetched songs:', data);
    return {
      type: FETCH_SONGS_SUCCESS,
      payload: { data, section },
    };
  };
  

export const fetchSongsFailure = (error) => ({
  type: FETCH_SONGS_FAILURE,
  payload: { error },
});

export const setSearchResults = (results) => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});

export const likeSong = (songId) => ({
  type: LIKE_SONG,
  payload: { songId },
});

