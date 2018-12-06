import React from "react";
import TestRenderer from 'react-test-renderer';

import RecentContent from "./RecentContent";

const tabs = [
  {
    title: 'UK News',
    sectionId: 'uk news'
  },
  {
    title: 'Football',
    sectionId: 'football'
  }
];

function mockFetch(status, response) {
  return jest.fn().mockImplementation(() =>
    new Promise(resolve => resolve({
      status,
      json: () =>
        new Promise(resolve => resolve(response))
    }))
  )
}

describe('RecentContent', () => {
  it('default tab selected', () => {
    const renderer = TestRenderer.create(<RecentContent tabs={tabs}/>);
    const {root} = renderer;

    expect(root.findByProps({className: "selected"}).children)
      .toEqual(["UK News"]);
  });

  it('fetched articles are rendered', () => {
    const response = {
      results: [
        {
          id: 'foo',
          webTitle: 'title 1',
          webUrl: 'http://foo'
        },
        {
          id: 'bar',
          webTitle: 'title 2',
          webUrl: 'http://bar'
        }
      ]
    };

    global.fetch = mockFetch(200, {
      response
    });

    const renderer = TestRenderer.create(<RecentContent tabs={tabs}/>);
    const {root} = renderer;

    return renderer.getInstance().selectTab(tabs[1])
      .then(() => {
        const articles = root.findAllByType('a');

        expect(articles.length).toEqual(2);

        const [article1, article2] = articles;

        expect(article1.children).toEqual(['title 1']);
        expect(article1.props.href).toEqual('http://foo');
        expect(article2.children).toEqual(['title 2']);
        expect(article2.props.href).toEqual('http://bar');
      });

  });

  it('error upon fetched articles failed', () => {
    global.fetch = mockFetch(500, {});

    const renderer = TestRenderer.create(<RecentContent tabs={tabs}/>);
    const {root} = renderer;

    return renderer.getInstance().selectTab(tabs[1])
      .then(() =>
        expect(root.findByProps({className: 'error'}).children)
          .toEqual(['Error fetching content.'])
      );

  });
});