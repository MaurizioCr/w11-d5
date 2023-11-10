import { Container, Navbar } from "react-bootstrap";

function MyNav() {
    const expands = [false, 'sm', 'md', 'lg', 'xl', 'xxl'];
    const lastExpand = expands[expands.length - 1];

    return (
        <>
            <Navbar key={lastExpand} expand={lastExpand} className="bg-body-tertiary mb-3">
                <Container fluid>
                    <Navbar.Brand href="#">Spotify</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${lastExpand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${lastExpand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${lastExpand}`}
                        placement="end"
                    >

                        {/* Resto del tuo codice Offcanvas... */}
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}

export default MyNav;
