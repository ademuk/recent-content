import React, {Component} from 'react';

import {CONTENT_BASE_URL, API_KEY} from 'config';

export default class RecentContent extends Component {
  state = {
    articles: [],
    selectedTab: undefined
  };

  componentDidMount() {
    this.selectTab(this.props.tabs[0]);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.tabs.map(tab => this.renderTab(tab))}
        </ul>
        <ol>
          {this.state.articles.map(article => this.renderArticle(article))}
        </ol>
      </div>
    )
  }

  renderTab(tab) {
    const {
      title,
      searchTerm
    } = tab;
    return (
      <li key={searchTerm}>
        <button
           title={title}
           className={this.state.selectedTab === tab ? "selected" : ""}
           onClick={this.handleTabClick.bind(this, tab)}>{title}
         </button>
      </li>
    )
  }

  renderArticle(article) {
    const {
      id,
      webTitle,
      webUrl
    } = article;
    return (
      <li key={id}>
        <a href={webUrl} title={webTitle}>{webTitle}</a>
      </li>
    )
  }

  selectTab(tab) {
    this.setState({
      selectedTab: tab
    });

    return fetch(`${CONTENT_BASE_URL}?q=${tab.searchTerm}&api-key=${API_KEY}`)
      .then(response => this.handleFetchComplete(response))
      .then(response => this.setState({articles: response.response.results}))
      .catch(err => this.setState({error: err}));
  }

  handleTabClick(tab) {
    this.selectTab(tab);
  }

  handleFetchComplete(response) {
    {
      if (response.status !== 200) {
        this.setState({error: response.status});
        return;
      }

      return response.json()
    }
  }
}