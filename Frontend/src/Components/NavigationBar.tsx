import {
  Col,
  Container,
  Form,
  Image,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from 'react-bootstrap';
import './NavigationBar.css';

const NavigationBar = () => {
  const loggedIn = false;

  return (
    <>
      <Navbar expand='md' className='bg-body-tertiary w-100'>
        <Container fluid className='d-flex justify-content-between'>
          <Row className='mx-auto w-100'>
            <Col sm={4} className='d-flex align-items-center'>
              <Navbar.Brand href='#home'>
                <Image
                  src='/images/Logo.png'
                  alt='Reddit Logo'
                  className='d-inline-block align-top'
                />
              </Navbar.Brand>
            </Col>
            <Col md={6} className='d-flex align-items-center'>
              <Form className='d-flex'>
                <div className='d-flex gap-2 align-items-center bg-secondary rounded-pill px-3 py-2 w-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-search'
                    viewBox='0 0 16 16'
                  >
                    <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0' />
                  </svg>
                  <Form.Control
                    type='search'
                    placeholder='Search Reddit'
                    className='p-0 bg-transparent border-0'
                    aria-label='Search'
                  />
                </div>
              </Form>
            </Col>
            <Col className='d-flex justify-content-end align-items-center'>
              {loggedIn ? <CampainLoggedIn /> : <CampainLoggedOut />}
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

const CampainLoggedOut = () => {
  return (
    <div>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#home'>Get App</Nav.Link>
          <Nav.Link href='#link'>Log In</Nav.Link>
          <NavDropdown title='...' id='basic-nav-dropdown' drop='start'>
            <NavDropdown.Item href='#action/3.1'>
              Log In / Sign Up
            </NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>
              Advertise on Reddit
            </NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>
              Shop Collectible Avatars
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </div>
  );
};

const CampainLoggedIn = () => {
  return (
    <>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#home'>Get App</Nav.Link>
          <Nav.Link href='#link'>Log In</Nav.Link>
          <NavDropdown title='...' id='basic-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>
              Log In / Sign Up
            </NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>
              Advertise on Reddit
            </NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>
              Shop Collectible Avatars
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </>
  );
};

export default NavigationBar;
