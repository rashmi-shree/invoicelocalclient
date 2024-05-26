import React from 'react';
import '../../../style/style.css';

const CustomizedCard = ({
    cardname,
    cardlabel,
    onClick
  })=> {
  return (
    <div onClick = {()=>{onClick()}} className='cardcontainer'>
      <p className='cardlabel'>{cardlabel}</p>
      <div className='cardname'>{cardname}</div>
    </div>
  );
}
export default CustomizedCard;