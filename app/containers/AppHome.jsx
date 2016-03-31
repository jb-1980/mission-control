import React from 'react';

import Home from '../components/Home';

export default class App extends React.Component {
  render (){
    return (
      <div className="pure-g" style={{display:"flex", flexFlow: "row wrap"}}>
        <Home />
      </div>
    );
  }
}
