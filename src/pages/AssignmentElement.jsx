function AssignmentElement(){
 return (
    <div
    style={{
      backgroundColor: "slategrey",
      padding: "30px 30px",
      margin: "20px 50px",
      width: "1393px"
    }}
  >
    <div>
      <h5>Assignment Name.</h5>
    </div>
    <div style={{display:"block"}}>
      Assignment description  : Assignment based on Trees 
      
      <div
        style={{
          width: "150px",
          textAlign: "center",
          backgroundColor: "white",
          padding: "5px",
          float: "right",
        }}
      >
        <btn>Upload</btn>
      </div>
    </div>
  </div>
 );

}

export default AssignmentElement;