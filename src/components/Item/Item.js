import React from 'react';

class Item extends React.Component {
  render () {
    const {details, addToHoard, isOwned, removeFromHoard} = this.props;
    const grabButton = <button className="btn btn-primary" onClick={() => addToHoard(details)}>Grab</button>;
    const deleteButton = <button className='btn btn-danger' onClick={() => removeFromHoard(details)}>Delete</button>;
    return (
      <div className='Item'>
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img src={details.itemImage} alt="..." />
            <div className="caption">
              <h3>{details.itemName}</h3>
              <p>{details.itemDescription}</p>
              <p>{isOwned ? deleteButton : grabButton}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Item;
