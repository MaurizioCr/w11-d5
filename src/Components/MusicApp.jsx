import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, setSearchResults, likeSong } from '../redux/action';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Col, Form, Nav, Offcanvas, ProgressBar, Row } from 'react-bootstrap';
import logo from './assets/logo/logo.png';
import { Stop } from 'react-bootstrap-icons';
import { SkipStart } from 'react-bootstrap-icons';
import { SkipEnd } from 'react-bootstrap-icons';
import { HouseDoor } from 'react-bootstrap-icons';
import { Book } from 'react-bootstrap-icons';

const expands = [false, 'sm', 'md', 'lg', 'xl', 'xxl'];
const lastExpand = expands[expands.length - 1];

const MusicApp = () => {
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.searchResults);
    const likedSongs = useSelector((state) => state.likedSongs);

    const [selectedSong, setSelectedSong] = useState(null);
    const [showOffcanvas, setShowOffcanvas] = useState(false); // Aggiunto stato per Offcanvas

    useEffect(() => {
        // Carica i dati iniziali al caricamento dell'app
        dispatch(fetchSongs('queen', 'rockSection'));
        dispatch(fetchSongs('katyperry', 'popSection'));
        dispatch(fetchSongs('eminem', 'hipHopSection'));
    }, [dispatch]);

    const handleSearch = async (event) => {
        event.preventDefault(); // Aggiungi questa linea per evitare il comportamento di default del form
        const searchQuery = document.querySelector('#searchField').value;

        if (searchQuery.length > 2) {
            dispatch(fetchSongs(searchQuery, 'searchResults'));
        } else {
            // Nascondi i risultati della ricerca se la query è troppo corta
            dispatch(setSearchResults([]));
        }
    };


    const handleLike = (songId) => {
        // Gestisci il "Mi piace" della canzone utilizzando Redux
        dispatch(likeSong(songId));
    };

    const handleSongClick = (songInfo) => {
        // Aggiorna il brano selezionato per il "player musicale"
        setSelectedSong(songInfo);
    };

    return (
        <div>
            {/* Sidebar */}
            <Container fluid className="p-0 ms-3 d-flex">
                <Row className="no-gutters">
                    <Col className="bg-black d-sm-none d-md-flex flex-column grow-3 h-100">
                        <img
                            src={logo}
                            height="30"
                            width='80'
                            className="d-inline-block align-self-center m-3"
                            alt="logo"
                        />
                        {/* Testo ricerca  */}
                        <Form className="d-flex my-4" id='grow'>
                            <input type="text" id="searchField" className="form-control" placeholder="Cerca canzoni" />
                            <Button variant="dark" onClick={handleSearch} className="ml-2">Cerca</Button>
                        </Form>

                        <Nav.Link href='#' className='text-white text-center'><HouseDoor className='me-1' />Home</Nav.Link>
                        <Nav.Link href='#' className='text-white text-center mb-4'><Book className='me-1' />Playlist</Nav.Link>
                        <Col>
                            <ul>
                                {likedSongs && likedSongs.length > 0 ? (
                                    likedSongs.map((likedSong) => (
                                        <li key={likedSong.id}>
                                            {likedSong.title} - {likedSong.artist.name}
                                        </li>
                                    ))
                                ) : (
                                    <p className='mb-5 text-center'>Aggiugni i tuoi brani preferiti </p>
                                )}
                            </ul>
                        </Col>

                        {/* Login  */}
                        <Col className=' align-self-end'>
                            <Form>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className=" text-secondary">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Col>

                    {/* NavBar  */}
                    <Col md={10}>
                        <Navbar bg="dark" variant="dark" expand={lastExpand} className="flex-column">

                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${lastExpand}`} onClick={() => setShowOffcanvas(!showOffcanvas)} />
                            <Navbar.Collapse className="flex-column">

                                <Nav className="mt-3">
                                    <Nav.Link href='#' className='text-secondary me-3 ms-5'>TRENDING</Nav.Link>
                                    <Nav.Link href='#' className='text-secondary me-3 ms-5'>PODCAST</Nav.Link>
                                    <Nav.Link href='#' className='text-secondary me-3 ms-5'>MOODS AND GENERES</Nav.Link>
                                    <Nav.Link href='#' className='text-secondary me-3 ms-5'>NEW RELEASES</Nav.Link>
                                    <Nav.Link href='#' className='text-secondary  ms-5'>DISCOVER</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <div className="container mt-3">
                            <div className="row">
                                {/* Risultati della ricerca */}
                                <div id="searchResults" className="d-flex flex-wrap">
                                    {searchResults && searchResults.length > 0 ? (
                                        searchResults.map((songInfo) => (
                                            <div className="col text-center mb-3" key={songInfo.id}>

                                                <img
                                                    className="img-fluid"
                                                    src={songInfo.album.cover_medium}
                                                    alt="track"
                                                />
                                                <p>
                                                    Track: "{songInfo.title.length < 16
                                                        ? `${songInfo.title}`
                                                        : `${songInfo.title.substring(0, 16)}...`
                                                    }"<br />
                                                    Artist: {songInfo.artist.name}
                                                    <br />
                                                    <button onClick={() => handleLike(songInfo.id)}>
                                                        {songInfo.liked ? 'Unlike' : 'Like'}
                                                    </button>

                                                    <br />
                                                    <button onClick={() => handleSongClick(songInfo)}>
                                                        Play
                                                    </button>
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Cerca il tuo artista </p>

                                    )}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div id='footer' className="col-md-3 player-container">
                {selectedSong && (
                    <div className="player">

                        <img
                            width={50 + 'px'}
                            className="img-fluid"
                            src={selectedSong.album.cover_medium}
                            alt="track"
                        />
                        <p>
                            Track: {selectedSong.title}<br />
                        </p>
                        {/* Barra del player */}
                        <div className="player-progress-bar mb-5" >
                            <ProgressBar now={50} label="50%" />
                            <SkipStart />
                            <Stop />
                            <SkipEnd />
                        </div>
                    </div>

                )}
            </div>

        </div>









    );
};
export default MusicApp;
