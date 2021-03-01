import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Radio from './Radio';
import StationList from './StationList';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Radio} />
        <Route path="/stationList" component={StationList} />
      </Router>
    )
  }
}

export default App;
