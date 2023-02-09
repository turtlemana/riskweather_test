import React,{forwardRef} from 'react';

const FormInput=(props,ref)=>{

  return (
    <div>
      <label htmlFor="helper-text" className={`form-label`}>{props.label}</label>
      <div className={`flex items-center`}>
        <input ref={ref} type={`${props.type}`} id="helper-text" required aria-describedby="helper-text-explanation" 
          className={`form-input flex-1 mx-2`} placeholder={`${props.placeholder}`} />
          {props.children}
      </div>
    </div>
  )

}

export default forwardRef(FormInput);