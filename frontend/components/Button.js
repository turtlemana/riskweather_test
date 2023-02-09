import React from 'react';
import { useRouter} from 'next/router';
import useWindowDimensions from '../public/useWindowDimensions';



const Button=(props)=>{
  const router=useRouter();
  const handleClick=(e)=>{
    e.preventDefault();
    router.push(props.link)
  }
  

  return (
    <button onClick={handleClick} type={`${props.type}`} className={(props.textSize ? `max-[450px]:${props.textSize} ` : ``)+(props.size ? `${props.size} ` : `btn-md `) 
    + (props.color ? `${props.color}` : `btn-primary`) }>
      {(useWindowDimensions().width<540) && (props.name=="Contact Us")  ? <p>{props.name.slice(0,7)}</p> : <p>{props.name} &gt;</p>}
    </button>
  )

}

export default Button;