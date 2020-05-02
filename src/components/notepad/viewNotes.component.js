import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

const Server = "http://localhost:1337";

const ViewNote = props => {
  let { id } = useParams();
  let { url } = useRouteMatch();
  const [value, setValue] = useState(props.location.data);

  // useEffect(() => {
  //   // Update the document title using the browser API
  //         var serverLocation = Server + url + id;
  //     axios.get(serverLocation)
  //     .then(res => {
  //       setValue(res.data)
  //     })
  //     .catch(function (error){
  //       console.log(error);
  //     })
  // });


  const omitList =  (Array.isArray(props.omits) && props.omits.length) ? props.omits : ["_id", '__v'];
  const viewElements = [];
  const data = props.location.data ? props.location.data : value;

  for (const key in data){
    if (data.hasOwnProperty(key) && !omitList.includes(key)) {
      //no a property from prototype chain
      viewElements.push(
        <div key={key} className="d-flex align-items-baseline">
            <h4>{key}</h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p>{data[key]}</p>
        </div>
      );
    }
  }

  return(
    <div className="container" style={{marginTop: 20}}>
      <h3>Viewing {id}</h3>
      <div>
            {viewElements}
      </div>
    </div>
  )
}

export default ViewNote;
