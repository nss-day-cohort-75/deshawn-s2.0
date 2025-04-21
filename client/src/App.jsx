import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink as BSNavLink,
} from "reactstrap";
import { NavLink as RRNavLink, Outlet } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
//  tag prop that lets you swap out the underlying HTML element
function App() {
  return (
    <div className="App">
      <Navbar color="light" expand="md" className="px-4">
        <NavbarBrand tag={RRNavLink} to="/">
          🐕‍🦺 🐩 DeShawn's Dog Walking
        </NavbarBrand>
        <Nav className="me-auto" navbar>
          <NavItem>
            <BSNavLink tag={RRNavLink} to="/" end>
              Dogs
            </BSNavLink>
          </NavItem>
          <NavItem>
            <BSNavLink tag={RRNavLink} to="/walkers">
              Walkers
            </BSNavLink>
          </NavItem>
          <NavItem>
            <BSNavLink tag={RRNavLink} to="/cities">
              Cities
            </BSNavLink>
          </NavItem>
          <NavItem>
            <BSNavLink tag={RRNavLink} to="/dogs/new">
              + Add Dog
            </BSNavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default App;
