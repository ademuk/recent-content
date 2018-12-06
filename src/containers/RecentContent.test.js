import React from "react";
import TestRenderer from 'react-test-renderer';

import RecentContent from "./RecentContent";

const results = [
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
];

const tabs = [
  {
    title: 'UK News',
    searchTerm: 'uk news'
  },
  {
    title: 'Football',
    searchTerm: 'football'
  }
];

describe('RecentContent', () => {
  it('default tab selected', () => {
    const renderer = TestRenderer.create(<RecentContent tabs={tabs}/>);
    const {root} = renderer;

    expect(root.findByProps({className: "selected"}).children)
      .toEqual(["UK News"]);
  });

  it('fetched articles are rendered', () => {
    global.fetch = jest.fn().mockImplementation(() =>
      new Promise(resolve => resolve({
        status: 200,
        json: () =>
          new Promise(resolve =>
            resolve({
              response: {
                results
              }
            })
          )
      }))
    );

    const renderer = TestRenderer.create(<RecentContent tabs={tabs}/>);
    const {root} = renderer;

    return renderer.getInstance().selectTab(tabs[1])
      .then(() =>
        expect(root.findAllByType('a').length)
          .toEqual(2)
      );

  });
});