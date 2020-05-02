import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

const Server = "http://localhost:1337";

const ViewItem = props => {
  let { url } = useRouteMatch();
  const [value, setValue] = useState();

  useEffect(() => {
    // Update the document title using the browser API
    // SEO

      var serverLocation = Server + url
      axios.get(serverLocation)
      .then(res => {
        setValue(res.data)
      })
      .catch(function (error){
        console.log(error);
      })
  }, [url]);

  let viewPlantURL;
  const viewElements = [];
  const pictureElement = [];
  const data = value;

  if (data){

    // Image
    if (data['Picture Source']){
      if (data['Common Name']){
        pictureElement.push(
          <img key="image" style={{objectFit: 'cover', maxWidth: '300px', borderRadius: '15px 0 0 15px'}} src={data['Picture Source'] } alt={data['Common Name']}/>
        )
      } else {
        pictureElement.push(
          <img key="image" style={{objectFit: 'cover', maxWidth: '300px', borderRadius: '15px 0 0 15px'}} src={data['Picture Source'] } alt="Plant"/>
        )
      }
    }

    // Names
    if (data['Scientific Name'] && data['Common Name']){
      viewElements.push(
        <div key='names' className="pb-2">
          <h2 className="m-0">{data['Common Name']}</h2>
          <h4>{data['Scientific Name']}</h4>
        </div>
      );
    }

    // Plant Source
    if (data['Source'] && (data['Germinated'] >= 0 || data['Planted']) ){
      let textBlock = data['Germinated'] >= 0 ? 'Seeds sourced from ' + data['Source'] : 'Plants bought from ' + data['Source'] ;

      viewElements.push(
        <p key='source'>
          {textBlock}
        </p>
      );
    }

    // Plant Date & Quantity
    if (data['Plant Type'] && (data['Germinated'] >= 0 || data['Planted']) && data['Plant Date']) {
      // Formatting Date
      let newDate = new Date(data['Plant Date']);
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      newDate = months[(newDate.getMonth() + 1).toString().padStart(2, 0) - 1] + ' ' + newDate.getDate().toString().padStart(2, 0) + ' of ' + newDate.getFullYear().toString();

      let textBlock
      if (data['Germinated'] >= 0)
          textBlock = data['Germinated'] + ' germinated out of ' + data['Planted'] + ' planted on ' + newDate
      else
          textBlock = data['Planted'] + ' plants bought on ' + newDate;

      viewElements.push(
        <p key='info'>
            {textBlock}
        </p>
      );
    }

    // Seed Date
    if (data['Entry Type'] && data['Source'] && data['Obtain Date']) {
      // Formatting Date
      let newDate = new Date(data['Obtain Date']);
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      newDate = months[(newDate.getMonth() + 1).toString().padStart(2, 0) - 1] + ' ' + newDate.getDate().toString().padStart(2, 0) + ' of ' + newDate.getFullYear().toString();

      viewElements.push(
        <p key='source'>
            {data['Entry Type']} sourced from <strong>{data['Source']}</strong> on <strong>{newDate}</strong>
        </p>
      );
    }

    // Seed Quantity
    if (data['Plant Type'] && data['Seed Quantity']) {
      viewElements.push(
        <p key='quantity'>
            There are {data['Seed Quantity']} grams of this <strong>{data['Plant Type']}</strong> in collection.
        </p>
      );
    }
    viewPlantURL = '/nursery/container/' + data['Container ID'];

  }
  // TODO: Create viewButtons for plants where 'Add Plant' === 'View Tray ID' to show new view (viewTray.componenet)
  // const viewPlantURL = '/nursery/' + data['Container ID'];

  const stepUpData = {...data, stepUp: true };

  const viewPlantButtons = (
      <span className="d-flex w-100 p-2">
        <Link className="w-50 text-center py-1 mr-1" style={{backgroundColor: '#47A025', color: '#C3E991', borderRadius: '15px', boxShadow: 'inset rgba(66, 66, 66, 0.8) 0px 0px 5px'}} to={url + "/edit"}>Edit Item</Link>
        <Link className="w-50 text-center py-1 mx-1" style={{backgroundColor: '#C3E991', color: '#47A025', borderRadius: '15px', boxShadow: 'inset rgba(66, 66, 66, 0.8) 0px 0px 5px'}} to={{ pathname: viewPlantURL, data: data}}>View Tray</Link>
        <Link className="w-50 text-center py-1 ml-1" style={{backgroundColor: 'rgba(104, 86, 52, .6)', color: '#C3E991', borderRadius: '15px', boxShadow: 'inset rgba(66, 66, 66, 0.8) 0px 0px 5px'}} to={{ pathname:"/nursery/plants/add", data:stepUpData}}>Step Up</Link>

      </span>
    )



  const viewSeedButtons = (
    <span className="d-flex w-100 p-2">
      <Link className="w-50 text-center py-1 mr-1" style={{backgroundColor: '#47A025', color: '#C3E991', borderRadius: '15px', boxShadow: 'inset rgba(66, 66, 66, 0.8) 0px 0px 5px'}} to={url + "/edit"}>Edit Item</Link>
      <Link className="w-50 text-center py-1 ml-1" style={{backgroundColor: '#C3E991', color: '#47A025', borderRadius: '15px', boxShadow: 'inset rgba(66, 66, 66, 0.8) 0px 0px 5px'}} to={{ pathname:"/nursery/plants/add", data: data}}>Add Plant</Link>
    </span>)


// TODO: Submit button functionality
  const previewButtons = (
    <div className='w-100 d-flex'>
      <div className="w-50 text-center py-1 mr-1" onClick={props.backToForm} style={{backgroundColor: '#C3E991', color: '#47A025', borderRadius: '15px', boxShadow: 'inset rgba(66, 66, 66, 0.8) 0px 0px 5px'}}>Back</div>
      <div className="w-50 text-center py-1 ml-1" onClick={props.submitEdits} style={{backgroundColor: '#47A025', color: '#C3E991', borderRadius: '15px', boxShadow: 'inset rgba(66, 66, 66, 0.8) 0px 0px 5px'}}>Submit</div>
    </div>)

  let buttons;

  if (props.mode === 'viewSeed')
    buttons = viewSeedButtons;
  else if (props.mode === 'viewPlant')
    buttons = viewPlantButtons;
  else
    buttons = previewButtons ;


  let backURL;
  if (url.includes('plants')){
      backURL = '/nursery/plants'
  }
  if (url.includes('seeds')){
    backURL = '/nursery/seeds'
}

  let backButton = (
      <div className='d-flex align-items-center' style={{height: '50px'}} >
        <Link to={backURL}>
            <div style={{ color: 'red', fontSize: '40px'}}>&#8592;</div>
        </Link>
      </div>)

  backButton = props.mode === 'viewSeed' || props.mode === 'viewPlant'  ? backButton : '';

console.log(data);
  return(
    <React.Fragment>
      {backButton}
      <div className="d-flex justify-content-center pt-5">
        <div className="d-flex mx-auto pr-5 border border-dark" style={{ backgroundColor: '#edffd5', borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 10px, rgba(66, 66, 66,0.8) 0 0 10px' }}>
          {pictureElement}
          <div className="px-4 my-auto">
            {viewElements}
            {buttons}
          </div>
        </div>
      </div>
    </React.Fragment>
    )
}

export default ViewItem;
