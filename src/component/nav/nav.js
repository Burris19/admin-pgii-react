import React from 'react'
import Nav from 'react-bootstrap/Nav'

const Navbar = () => {
    return (
        <Nav justify variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/bodegas">Bodegas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default Navbar