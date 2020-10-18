import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {SolidPage} from "./components/solid_page";
import {RainbowPage} from "./components/rainbow_page";
import {FadingPage} from "./components/fading_page";
import {Menu, Dropdown, Segment, Container} from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
    return (
        <div className="App">
            <Router>
                  <Menu attached='top'>
                      <Dropdown item icon='wrench' simple>
                        <Dropdown.Menu>
                          <Dropdown.Item as={Link} to="/solid">Solid</Dropdown.Item>
                          <Dropdown.Item as={Link} to="/rainbow">Rainbow</Dropdown.Item>
                          <Dropdown.Item as={Link} to="/fading">Fading</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu>

                <Segment attached='bottom'>
                    <Container>
                        <Switch>
                            <Route path="/solid"><SolidPage/></Route>
                            <Route path="/rainbow"><RainbowPage/></Route>
                            <Route path="/fading"><FadingPage/></Route>
                            <Route path="/"><SolidPage/></Route>
                        </Switch>
                    </Container>
                </Segment>

            </Router>
      </div>
  );
}

export default App