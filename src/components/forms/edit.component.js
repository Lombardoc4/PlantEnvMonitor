import React, { useState, useEffect } from 'react';
import { Redirect, Link, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

import ViewPreview from '../views/viewPlant.component'

const Server = "http://localhost:1337";

const EditItem = props => {
  let { url } = useRouteMatch();
  const [preview, setPreview] = useState(false);
  const [botAttack, underAttack] = useState(false);
  const seedFields = [
      'Entry Type',
      'Common Name',
      'Scientific Name',
      'Plant Type',
      'Source',
      'Obtain Date',
      'Seed Quantity',
      'Picture Source'
  ]
  const plantFields = [
    'Entry Type',
    'Container ID',
    'Common Name',
    'Scientific Name',
    'Plant Type',
    'Source',
    'Plant Date',
    'Germinated',
    'Planted',
    'Picture Source'
]
const [values, setValues] = useState([]);
  useEffect(() => {
    // Update the document title using the browser API
      var serverLocation = Server + url;
      axios.get(serverLocation)
      .then(res => {
        setValues(res.data)
      })
      .catch(function (error){
        console.log(error);
      })
  }, [url]);

const data = props.location.data ? props.location.data : values;
const honeypotStyle = {
  opacity: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  height: 0,
  width: 0,
  zIndex: -1,
}

  const handleChange = evt => {
    let newValue = {};
    newValue[evt.target.name] = evt.target.value;
    for (let [name, value] of Object.entries(values)){
        if (evt.target.name === name) {
          newValue[name] = evt.target.value;
        } else {
          newValue[name] = value;
        }
    }

    console.log(newValue)
    setValues(newValue);
  }

  const rejectInput = evt => {
    evt.preventDefault();
    underAttack(true);

  }

  const formPreview = evt =>{
    evt.preventDefault();
    if (botAttack){
      window.location.reload(false);
      return;
    }
    else {
      setPreview(!preview)
    }
  }

  const submitEdits = evt => {
    evt.preventDefault();
    if (botAttack){
      window.location.reload(false);
      return;
    }
    else {
      let updatedEntry = {...values}
      console.log('submitting');
      // Axios post

      var serverLocation = Server + url;
      axios.post(serverLocation, updatedEntry)
        .then(console.log('updated'))
        .catch(err => console.log(err));

        setPreview('submitted');
    }
  }

  // const omitList =  (Array.isArray(props.omits) && props.omits.length) ? props.omits : ["_id", '__v'];

  let dataFields;
  if (data) {
    dataFields = data['Entry Type'] === "Seed" ? seedFields : plantFields;
  }

  // Need to compare use questionHeader as mainList

  const formInputs = dataFields.map(questionHeader => {
    let dataValue = data[questionHeader] ? data[questionHeader] : '';

    // if (data[questionHeader]) {

      if (questionHeader === "Entry Type"){
        return(
          <React.Fragment key={questionHeader}>
            <span className="d-flex align-items-baseline justify-content-center">
                <h5>{questionHeader}:</h5>&nbsp;&nbsp;&nbsp;
                <input type="radio" id="seed" name="Entry Type" value="Seed" onChange={handleChange} checked={dataValue === "Seed"}/>
                <label for="seed">&nbsp;&nbsp;Seed</label>&nbsp;&nbsp;&nbsp;
                <input type="radio" id="plant" name="Entry Type" value="Plant" onChange={handleChange} checked={dataValue === "Plant"}/>
                <label for="plant">&nbsp;&nbsp;Plant</label>
                <br/>
            </span>
            <div className="mb-2 mx-auto" style={{width: '80%', backgroundColor: '#c6c6c6', height: '1px', borderRadius: '10px'}}></div>
          </React.Fragment>
        )
      }
      if (["Container ID", "Common Name", "Scientific Name", "Source", "Picture Source"].includes(questionHeader) ){
        return(
          <React.Fragment key={questionHeader}>
          <span className="d-flex align-items-baseline justify-content-center">
          {/* <span className="d-flex align-items-baseline" key={questionHeader}> */}
              <h5 className='text-right'>{questionHeader}:</h5>&nbsp;&nbsp;&nbsp;
              <input type="text" name={questionHeader} className="w-50 form-control" onChange={handleChange} value={dataValue}/>
              <input type="text" autoComplete="off" value="Gotcha" onChange={rejectInput} style={honeypotStyle} />

          {/* </span> */}
          </span>
          <div className="my-2 mx-auto" style={{width: '80%', backgroundColor: '#c6c6c6', height: '1px', borderRadius: '10px'}}></div>
        </React.Fragment>
        )
      }
      if (questionHeader === "Plant Type"){
        return(
          <React.Fragment key={questionHeader}>
          <span className="d-flex align-items-baseline justify-content-center">
              <h5>{questionHeader}:</h5>&nbsp;&nbsp;&nbsp;
              <input type="radio" id="tree" name="Plant Type" value="Tree" onChange={handleChange} checked={dataValue === "Tree"}/>
              <label for="tree">&nbsp;&nbsp;Tree</label>&nbsp;&nbsp;&nbsp;
              <input type="radio" id="shrub" name="Plant Type" value="Shrub" onChange={handleChange} checked={dataValue === "Shrub"}/>
              <label for="shrub">&nbsp;&nbsp;Shrub</label>&nbsp;&nbsp;&nbsp;
              <input type="radio" id="wildflower" name="Plant Type" value="Wildflower" onChange={handleChange} checked={dataValue === "Wildflower"}/>
              <label for="wildflower">&nbsp;&nbsp;Wildflower</label>&nbsp;&nbsp;&nbsp;
              <input type="radio" id="vine" name="Plant Type" value="Vine" onChange={handleChange} checked={dataValue === "Vine"}/>
              <label for="vine">&nbsp;&nbsp;Vine</label>&nbsp;&nbsp;&nbsp;
              <input type="radio" id="grass" name="Plant Type" value="Grass" onChange={handleChange} checked={dataValue === "Grass"}/>
              <label for="grass">&nbsp;&nbsp;Grass</label>
            </span>
          <div className="mb-2 mx-auto" style={{width: '80%', backgroundColor: '#c6c6c6', height: '1px', borderRadius: '10px'}}></div>
        </React.Fragment>

        )
      }

      if (["Obtain Date", "Plant Date"].includes(questionHeader) ){
        let  newDate = new Date(dataValue);
        newDate = newDate.getFullYear().toString() + '-' + (newDate.getMonth() + 1).toString().padStart(2, 0) + '-' + newDate.getDate().toString().padStart(2, 0);
        return(

        <React.Fragment key={questionHeader}>
          <span className="d-flex align-items-baseline justify-content-center">
              <h5 className="m-0">{questionHeader}:</h5>&nbsp;&nbsp;&nbsp;
              <input type="date" className="w-25 form-control" id="plantDate" onChange={handleChange} value={newDate} name={questionHeader}/>
              <input type="date" autoComplete="off" value="Gotcha" onChange={rejectInput} style={honeypotStyle} />

              <br/>
          </span>
          <div className="mt-1 mb-2 mx-auto" style={{width: '80%', backgroundColor: '#c6c6c6', height: '1px', borderRadius: '10px'}}></div>
        </React.Fragment>
        )
      }

      if (["Seed Quantity"].includes(questionHeader) ){
        return(
        <React.Fragment key={questionHeader}>
          <span className="d-flex align-items-baseline justify-content-center">
              <h5>{questionHeader}:</h5>&nbsp;&nbsp;&nbsp;
              <input type="number" className="w-25 form-control text-right" id="seedquantity" name="seed_quantity" onChange={handleChange} value={dataValue}/> grams
              <input type="number" autoComplete="off" value="Gotcha" onChange={rejectInput} style={honeypotStyle} />

              <br/>
          </span>
          <div className="mt-1 mb-2 mx-auto" style={{width: '80%', backgroundColor: '#c6c6c6', height: '1px', borderRadius: '10px'}}></div>
        </React.Fragment>

        )
      }
      if (["Germinated"].includes(questionHeader) ){
        return(
          <React.Fragment key={questionHeader}>
            <span className="d-flex align-items-baseline justify-content-center">
                <h5>{questionHeader}:</h5>&nbsp;&nbsp;&nbsp;
                <input type="number" className="w-25 form-control text-right" id="Germinated" name="Germinated" onChange={handleChange} value={dataValue}/> plants
                <input type="number" autoComplete="off" value="Gotcha" onChange={rejectInput} style={honeypotStyle} />
                <br/>
            </span>
              <div className="mb-2 mx-auto" style={{width: '80%', backgroundColor: '#c6c6c6', height: '1px', borderRadius: '10px'}}></div>
          </React.Fragment>
        )
      }
      if (["Planted"].includes(questionHeader) ){
        return(
          <React.Fragment key={questionHeader}>
          <span className="d-flex align-items-baseline justify-content-center">
              <h5>{questionHeader}:</h5>&nbsp;&nbsp;&nbsp;
              <input type="number" className="w-25 form-control" id="Planted" name="Planted" onChange={handleChange} value={dataValue}/> plants
              <input type="number" autoComplete="off" value="Gotcha" onChange={rejectInput} style={honeypotStyle} />

              <br/>
          </span>
            <div className="mb-2 mx-auto" style={{width: '80%', backgroundColor: '#c6c6c6', height: '1px', borderRadius: '10px'}}></div>
        </React.Fragment>

        )
      }

          return(
              <div key={data[questionHeader]} className="d-flex align-items-baseline">
                  <h4>{questionHeader}</h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="text" name={questionHeader} className="w-50 form-control" onChange={handleChange} placeholder={data[questionHeader]}/> <br/>

              </div>
          );

  });

  formInputs.push(

    <div className="d-flex justify-content-center p-2">
      <input type="submit" value="Preview Revisions" className="w-50 bg-info text-white py-1" style={{border: 'none', borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 10px'}}/>
    </div>
  )

  const formOrPreview = preview ? <ViewPreview data={data} mode='preview' submitEdits={(e) => submitEdits(e)} backToForm={(e) => formPreview(e)}/> : <form className="w-75 mt-2 p-3 d-flex flex-column" style={{borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 10px', backgroundColor: '#edffd5'}} onSubmit={formPreview}>{formInputs}</form>;

  let backURL = url.replace('/edit', '')
  let backButton = !preview ? <Link to={backURL}><div style={{ color: 'red', fontSize: '40px'}}>&#8592;</div></Link> :<div onClick={formPreview} style={{ color: 'red', fontSize: '40px'}}>&#8592;</div>;
  // console.log(backURL)

  if (preview === 'submitted') {
    let returnAddress = data['Entry Type'] === "Seed" ? '/nursery/seeds' : '/nursery/plants';
    return (<Redirect to={returnAddress}/>)
  }

  return(
    <React.Fragment>
      <div className='d-flex align-items-center' style={{height: '50px'}} >
        {backButton}
      </div>
      <div className="d-flex justify-content-center">
        {formOrPreview}
      </div>
    </React.Fragment>
  )
}

export default EditItem;