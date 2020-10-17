import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {SolidPage} from "./components/solid_page";
import {RainbowPage} from "./components/rainbow_page";
import {FadingPage} from "./components/fading_page";
import {Divider} from "semantic-ui-react";


function App() {
  return (
    <div className="App">
      <Divider horizontal />
      <SolidPage />
      <Divider horizontal />
      <RainbowPage />
      <Divider horizontal />
      <FadingPage />
    </div>
  );
}

export default App