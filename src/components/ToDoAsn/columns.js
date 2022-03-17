import  {ColumnFilter}  from "./ColumnFilter"
export const COLUMNS = [
    {
        Header : "To Do Tasks",
        Footer :  "To Do Tasks",
        accessor : "todo",
        Filter : ColumnFilter,
    },
    {
        Header : "Missed Tasks",
        Footer : "Missed Tasks",
        accessor : "missed",
        Filter : ColumnFilter,
    },
    {
        Header : "Completed Tasks",
        Footer : "Completed Tasks",
        accessor : "completed",
        Filter : ColumnFilter,
    },
]

