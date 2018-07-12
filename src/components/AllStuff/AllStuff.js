import React from 'react';

import allStuffRequests from '../../firebaseRequests/allStuff';
import Item from '../Item/Item';

import './AllStuff.css';

class AllStuff extends React.Component {
  state = {
    stuff: [],
  }

  componentDidMount () {
    allStuffRequests
      .getRequest()
      .then((stuff) => {
        this.setState({stuff});
      })
      .catch(console.error.bind(console));
  }

  render () {
    const itemComponents = this.state.stuff.map((item) => {
      return (
        <Item
          key={item.id}
          details={item}
        />
      );
    });
    return (
      <div className="AllStuff col-xs-12">
        <h2>AllStuff</h2>
        <ul className="fishes">
          {itemComponents}
        </ul>
      </div>
    );
  }
}

export default AllStuff;
