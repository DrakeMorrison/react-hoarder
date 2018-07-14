import React from 'react';

class Item extends React.Component {
  render () {
    const {details, addToHoard} = this.props;
    return (
      <div className='Item'>
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img src={details.itemImage} alt="..." />
            <div className="caption">
              <h3>{details.itemName}</h3>
              <p>{details.itemDescription}</p>
              <p><button className="btn btn-primary" onClick={() => addToHoard(details.id)}>Grab</button></p>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Item;
