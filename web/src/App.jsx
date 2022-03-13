import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {SolidPage} from "./components/solid_page";
import {PrebuildModesPage} from "./components/prebuilt_page";
import {FadingPage} from "./components/fading_page";
import {Menu, Dropdown, Segment, Container, Image} from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {FilePage} from "./components/file_page";
import {SolidRoughPage} from "./components/solid_rough_page";
import {MuffinPage} from "./components/muffin_page";


function App() {
    return (
        <div className="App">
            <Router>
                  <Menu attached='top'>
                      <Dropdown item icon='wrench' simple>
                        <Dropdown.Menu>
                          <Dropdown.Item as={Link} to="/solid">Solid</Dropdown.Item>
                          <Dropdown.Item as={Link} to="/solid_rough">Solid Rough</Dropdown.Item>
                          <Dropdown.Item as={Link} to="/fading">Fading</Dropdown.Item>
                          <Dropdown.Item as={Link} to="/prebuilt">Prebuilt Modes</Dropdown.Item>
                          <Dropdown.Item as={Link} to="/muffin">Muffin Mode</Dropdown.Item>
                          <Dropdown.Item as={Link} to="/file">File Upload</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu>

                <Segment attached='bottom'>
                    <Container>
                        <Switch>
                            <Route path="/file"><FilePage/></Route>
                            <Route path="/solid"><SolidPage/></Route>
                            <Route path="/solid_rough"><SolidRoughPage/></Route>
                            <Route path="/prebuilt"><PrebuildModesPage/></Route>
                            <Route path="/fading"><FadingPage/></Route>
                            <Route path="/muffin"><MuffinPage/></Route>
                            <Route path="/"><SolidPage/></Route>
                        </Switch>
                        <Image src="https://motioneye.oram.ca/" />
                    </Container>
                </Segment>

            </Router>
      </div>
  );
}

export default App
