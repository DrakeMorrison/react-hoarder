import React from 'react';

import myStuffRequests from '../../firebaseRequests/myStuff';

class SingleItem extends React.Component {
  state = {
    details: {},
  };

  componentDidMount () {
    const itemId = this.props.match.params.id;
    myStuffRequests
      .getSingleRequest(itemId)
      .then((res) => {
        this.setState({details: res});
      })
      .catch(console.error.bind(console));
  }

  render () {
    const {details} = this.state;
    return (
      <div className='Item'>
        <div className="col-xs-12">
          <div className="thumbnail">
            <img src={details.itemImage} alt="..." />
            <div className="caption">
              <h3>{details.itemName}</h3>
              <p>{details.itemDescription}</p>
              <h2>Single Item</h2>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default SingleItem;
