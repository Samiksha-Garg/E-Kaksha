function TableElement(props) {
    return (<div> 
        <div style={{width : "100%", display : "flex"}}>
        <div style={{width : "20%"}}> {props.name}</div>
        <div style={{width : "35%"}}> {props.beginTime}</div>
        <div style={{width : "35%"}}> {props.endTime}</div>
        <div style={{width : "10%"}}> {props.endTime}</div>
        </div>
    </div>);
}

export default TableElement