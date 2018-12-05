import React, {Component} from 'react';

export default class RecentContent extends Component {
  state = {
    articles: [
      {
        id: 'foo',
        webTitle: 'title',
        webUrl: 'http://foo'
      }
    ]
  };

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <ul>
          {this.props.tabs.map(this.renderTab)}
        </ul>
        <ol>
          {this.state.articles.map(this.renderArticle)}
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
        <a href="#" title={title}>{title}</a>
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
}