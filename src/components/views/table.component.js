import React from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import axios from 'axios';

import trashIcon from './trash.png'
const Server = "http://localhost:1337";


const TableHeader = props => {
    const tableHeaders = [];

    for(const header in props.header){
        if (!props.omit.includes(header)){
            tableHeaders.push(<th key={header}  style={{position: 'sticky', top: 0, border: 'none', boxShadow: '0 1px'}} className="bg-white p-0 text-center">{header}</th>);
        }
    }

    tableHeaders.push(<th key={"search"} style={{position: 'sticky', top: 0, border: 'none', boxShadow: '0 1px'}} className="bg-white p-0 text-center"></th>);

    return tableHeaders;
}

const TableRow = props => {
    let {  url } = useRouteMatch();
    const rowCells = [];

    const deleteItem = (itemID) => {
        // ***********************************
        // TODO: Implement some sort of confirmation
        // ***********************************

        axios.delete(Server + url + '/' + itemID)
        .then(console.log('deleted'))
        .catch(function (error){
            console.log(error);
        })
        props.getData(itemID);
    }

    for(const cellKey in props.item){
        if (!props.omit.includes(cellKey)){
            let viewUrl = `${url}/view/` + props.item._id;
            rowCells.push(
                <td key={cellKey} className="p-0">
                    <Link to={{pathname: viewUrl, data: props.item}} style={{cursor: 'pointer', textDecoration: 'none'  }}>
                        <div className="p-3 text-dark text-center" style={{height:'100%', width: '100%'}}>
                            {props.item[cellKey]}
                            </div>
                    </Link>
                </td>
            );
        }
    }

    rowCells.push(<td onClick={() => {deleteItem(props.item._id)}} style={{width: '50px'}} className="text-center pr-5" key='remove'><img src={trashIcon} alt="Remove" style={{height: '30px'}}/></td> );

    return(
        <tr>
            {rowCells}
        </tr>
    );
}


const TableBody = props => {
    // console.log(props.data);
    const omitList =  (Array.isArray(props.omits) && props.omits.length) ? props.omits : ["_id", '__v'];

    let theData = props.data;

    const seedData = theData.map((dataSet, index) => {
        if (theData[index]['Germinated'] >= 0 && theData[index]['Planted']){
            theData[index]['Germination Rate'] = Number.parseFloat(theData[index]['Germinated'] / theData[index]['Planted']).toPrecision(2);
            delete theData[index]['Germinated'];
            delete theData[index]['Planted'];
        }

        return (
          <TableRow getData={props.getData} item={theData[index]} omit={omitList} key={index} />
        )
    });
    let newMaxHeight =  props.containerHeight - 290 + 'px';

    return (
        <table className="table table-striped"  style={{maxHeight: newMaxHeight , height: '100%', overflow: 'scroll'}}>
                <tr>
                    <TableHeader header={theData[0]} omit={omitList}/>
                </tr>
            <tbody>
                {seedData}
            </tbody>
        </table>
    )
}

export default TableBody;