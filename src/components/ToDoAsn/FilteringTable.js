import React , {useMemo} from "react";
import { useTable , useGlobalFilter , useFilters} from 'react-table'
import {COLUMNS} from "./columns"
import GlobalFilter from "./GlobalFilter";
import "./table.css"

function FilteringTable(props){
    const columns = useMemo(() =>  COLUMNS , [])
    const len=props.statusTasks.length;
    const arrayTasks=[];
    for(let i=0 ; i<len ; i++){
        arrayTasks.push({todo:"yo" , missed :"hari om" , completed:"kashi vishwanath"} );
    }
    const data = useMemo(() => arrayTasks , [])

    const tableInstance = useTable({
        columns : columns,
        data : data,
    } ,useFilters, useGlobalFilter )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRows,
        state,
        setGlobalFilter,
    } = tableInstance

    const {globalFilter} = state;
    try{
        console.log("success" , props.statusTasks);
    }
    catch{
        console.log("oops");
    }

    return(
        <>
        {props.statusTasks?"om" : 'narayan'}
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
       <table {...getTableProps()}>
            <thead >
                {headerGroups.map(headerGroup =>(
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map((column) =>(
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                            <div>
                                {column.canFilter ? column.render("Filter") : null }
                            </div>
                        </th>
                    ))
                    }
                    
                </tr>
                     ) )
                }
                
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row =>{
                        prepareRows(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) =>{
                                return <td {...cell.getCellProps()}> {cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
          
       </table>
    </>
    );
}

export default FilteringTable;

/*
      
*/