import React from 'react';
import useWindowDimensions from '../public/useWindowDimensions';


const FormButton=(props)=>{


  return (
    <button  type={`${props.type}`} className={(props.size ? `${props.size} ` : `btn-md `) 
    + (props.color ? `${props.color}` : `btn-primary`)}>
      {useWindowDimensions().width<540 && props.name=="Send" ? <p>{props.name}</p> : <p>{props.name} &gt;</p>}
    </button>
  )

}

export default FormButton;