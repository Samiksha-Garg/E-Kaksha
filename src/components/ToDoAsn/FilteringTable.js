import React , {useMemo} from "react";
import { useTable , useGlobalFilter , useFilters} from 'react-table'
import {COLUMNS} from "./columns"
import GlobalFilter from "./GlobalFilter";
import "./table.css"

function FilteringTable(props){
    const columns = useMemo(() =>  COLUMNS , [])
    const data = useMemo(() => props.statusTasks , [])
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
    //console.log(props.statusTasks);

    return(
        <>
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