import React, {useState} from 'react'
import Select from 'react-select'

function SelectDate (){
    const [selectedDate , setSelectedDate] = useState(new Date())

    const SelectDate=e=>{
        setSelectedDate(e.target.value);
    }
    return(
        <div>
            <input type="date" value={selectedDate} onChange={SelectDate} ></input>
        </div>
    );
}

/*
const[result  ,DDvalue] = useState(props.courses.name);
function Dropdown(props){
    const DDHandler=e=>{
        DDvalue(e.label)
    }
    return(
        <div>
            <Select options={props.courses.name} onChange={DDHandler}></Select>
            {result}
        </div>
    );
}

export default Dropdown;
*/