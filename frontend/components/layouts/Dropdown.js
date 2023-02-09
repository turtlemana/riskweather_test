
import React,{forwardRef} from 'react';

const Dropdown=(({value,onChange,options, placeholder,width},ref)=>{
    return (
        <div className={``}>
        <select ref={ref} onChange={onChange} key={options} required defaultValue={placeholder} className={`form-input w-full`} >
         <option disabled value={placeholder}  onChange={onChange}  className={`display-none`} >{placeholder}</option>   
        {options.map((option,idx)=>(<option key={idx} value={option.value}>{option.label}</option>))}
        </select>
        </div>
)
})

export default forwardRef(Dropdown);