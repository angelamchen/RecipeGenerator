import React from "react";
import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';

const Wrapper = styled.ul`
  list-style-type: none;
  margin-top: 0;
  top: 0;
  padding: 0;
  overflow: hidden;
  background-color: white;
  position: fixed;
  width: 100%;
  z-index:1;
`;

const NavLogo = styled.h2`
    display: block;
    padding-top: 10px;
`;

const Logo = styled.a`
color: black;
&:hover {
    color: grey;
    text-decoration: none;
}
`

class Navbar extends React.Component {
    render() {
        return (
                <Wrapper>
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <Logo href='/'>
                                <NavLogo>{'SNAPMEAL'}</NavLogo>
                                </Logo>
                            </Col>
                        </Row>
                    </Container>
                </Wrapper>
        );
    }
}

export default Navbar