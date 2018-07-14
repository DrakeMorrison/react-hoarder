import React from 'react';

import allStuffRequests from '../../firebaseRequests/allStuff';
import myStuffRequests from '../../firebaseRequests/myStuff';
import Item from '../Item/Item';

import './AllStuff.css';

class AllStuff extends React.Component {
  state = {
    stuff: [],
  }

  addItem = item => {
    const newItem = {};
    newItem.id = item.id;
    newItem.itemDescription = item.itemDescription;
    newItem.itemName = item.itemName;
    newItem.itemImage = item.itemImage;
    myStuffRequests
      .postRequest(newItem)
      .catch(console.error.bind(console));
  };

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
          addToHoard={this.addItem}
        />
      );
    });
    return (
      <div className="AllStuff col-xs-12">
        <h2>AllStuff</h2>
        <ul className="items">
          {itemComponents}
        </ul>
      </div>
    );
  }
}

export default AllStuff;
