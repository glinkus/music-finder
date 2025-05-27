import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
    return(
        <Navbar>
            <Container>
                <Nav className='ms-auto' style={{padding: '20px'}}>
                    <Nav.Link as={Link} to="/favorites">
                        Favorite artists
                    </Nav.Link>

                </Nav>
            </Container>
        </Navbar>
    )
}

export default CustomNavbar