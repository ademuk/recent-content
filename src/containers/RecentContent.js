import React, {Component} from 'react';

import {CONTENT_BASE_URL, API_KEY} from 'config';

import styles from './RecentContent.module.css';

export default class RecentContent extends Component {
  state = {
    articles: [],
    selectedTab: undefined,
    error: ''
  };

  componentDidMount() {
    this.selectTab(this.props.tabs[0]);
  }

  render() {
    return (
      <div className={styles.RecentContent}>
        <ul className={styles.tabList}>
          {this.props.tabs.map(tab => this.renderTab(tab))}
        </ul>
        {this.state.error && <div className="error">Error fetching content.</div>}
        <ol className={styles.articleList}>
          {this.state.articles.map(article => this.renderArticle(article))}
        </ol>
      </div>
    )
  }

  renderTab(tab) {
    const {
      title,
      sectionId
    } = tab;
    return (
      <li key={sectionId}>
        <button
           title={title}
           className={this.state.selectedTab === tab ? styles['selected'] : ""}
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

    return fetch(`${CONTENT_BASE_URL}?section=${tab.sectionId}&api-key=${API_KEY}&order-by=newest`)
      .then(response => this.handleFetchComplete(response))
      .catch(err => this.setState({error: err}));
  }

  handleTabClick(tab) {
    this.selectTab(tab);
  }

  handleFetchComplete(response) {
    if (response.status !== 200) {
      this.setState({error: response.status});
      return;
    }

    return response.json()
      .then(response =>
        this.setState({articles: response.response.results})
      )
  }
}