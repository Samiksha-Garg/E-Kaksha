import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

function Questions({questions}){
    return <div>
        <List>
  {questions.map((event, index) => {
    return (
      <div>
        <ListItem >
          <ListItemText
            primary={"Q - " + event.question}
            secondary={
                <div>
                    <p>Option 1 - {event.option1}</p>
                    <p>Option 2 - {event.option2}</p>
                    <p>Option 3 - {event.option3}</p>
                    <p>Option 4 - {event.option4}</p>
                    <p>Correct Option : {event.correctOption} 
                    <br></br>
                         Marks : {event.marks}
                    </p>
                </div>
                }
          />
          
        </ListItem>
        <Divider />
      </div>
    );
  })}
</List>
    </div>
}

export default Questions;