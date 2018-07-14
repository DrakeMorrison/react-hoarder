import React from 'react';

import myStuffRequests from '../../firebaseRequests/myStuff';
import Item from '../Item/Item';

class MyStuff extends React.Component {
  state = {
    stuff: [],
  };

  componentDidMount () {
    myStuffRequests
      .getRequest()
      .then((stuff) => {
        this.setState({stuff});
      })
      .catch(console.error.bind(console));
  };

  deleteItem = (item) => {
    myStuffRequests
      .deleteRequest(item.id)
      .then(() => {
        myStuffRequests
          .getRequest()
          .then(stuff => {
            this.setState({stuff});
          });
      })
      .catch(console.error.bind(console));
  };

  render () {
    const itemComponents = this.state.stuff.map((item) => {
      return (
        <Item
          key={item.id}
          details={item}
          isOwned={true}
          removeFromHoard = {this.deleteItem}
        />
      );
    });

    return (
      <div className='MyStuff'>
        <h2>MyStuff</h2>
        <ul className='items'>
          {itemComponents}
        </ul>
      </div>
    );
  };
};

export default MyStuff;
