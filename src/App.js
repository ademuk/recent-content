import React, { Component } from 'react';
import RecentContent from 'containers/RecentContent';
import './App.css';

const TABS = [
  {
    title: 'UK news',
    sectionId: 'uk-news'
  },
  {
    title: 'Football',
    sectionId: 'football'
  },
  {
    title: 'Travel',
    sectionId: 'travel'
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guardian</h1>
          <h2>Recent content</h2>
        </header>
        <RecentContent tabs={TABS} />
      </div>
    );
  }
}

export default App;
