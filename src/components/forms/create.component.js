import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import ViewItem from '../views/viewPlant.component';

import plantInitial from './resources/plant.svg';

const Server = "http://localhost:1337/";
const seedFields = {
    'Stage': 1,
    'Entry Type': 'Seed',
    'Common Name': '',
    'Scientific Name': '',
    'Plant Type': '',
    'Source': '',
    'Obtain Date': '',
    'Seed Quantity': '',
    'Picture Source': ''
};
const plantFields = {
    'fromSeed': false,
    'Stage': 1,
    'Entry Type': 'Plant',
    'Container ID': '',
    'Common Name': '',
    'Scientific Name': '',
    'Plant Type': '',
    'Source': '',
    'in House': true,
    'Plant Date': '',
    'Planted': '',
    'Picture Source': ''
};

const CreateHome = props => {
    const input1 = useRef(null);
    const input2 = useRef(null);
    const [botAttack, underAttack] = useState();
    const [inputs, setInputs] = useState({'Stage': 0});
    useEffect(() => {
        if (props.location.data){
            let newInputs = {};
            for (let [name, value] of Object.entries(plantFields)){
                newInputs[name] = value;
                if (props.location.data[name] && name !== 'Entry Type'){
                    newInputs[name] = props.location.data[name];
                }
            }
            if (props.location.data.stepUp) {
                newInputs['stepUp'] = true
            } else {
                newInputs['fromSeed'] = true;
            }
            setInputs(newInputs);
        } else if (props.match.params[0] === 'seeds') {
            setInputs(seedFields);
        } else if (props.match.params[0] === 'plants') {
            setInputs(plantFields);
        }

    }, [props.match.params, props.location.data])


    // Bot/Crawler Trap
    const rejectInput = evt => {
        evt.preventDefault();
        underAttack(true);
    }

    const onChange = evt => {
        evt.persist();
        setInputs(inputs => {console.log(evt.target.name);  return({...inputs, [evt.target.name]: evt.target.value})});

    }

    // On form stage change
    const nextStage = evt => {
        let newValue = {};

        // Multiple Choice Questions
        if (Array.isArray(evt)){
            for (let [name, value] of Object.entries(inputs)){
                if (evt[0] === name) {
                    let key = evt[0];
                    newValue[key] = evt[1];
                } else {
                  newValue[name] = value;
                }
            }
        }

        if (!evt) {
            for (let [name, value] of Object.entries(inputs)){
                if (input1.current && input1.current.name === name) {
                    newValue[name] = input1.current.value;
                } else if (input2.current && input2.current.name === name){
                    newValue[name] = input2.current.value;
                } else {
                  newValue[name] = value;
                }
            }
            let value = inputs['Stage'];
            newValue['Stage'] = value + 1;
        }
        // Increment the state
        let value = inputs['Stage'];
        newValue['Stage'] = value + 1;

        setInputs(newValue);
    }

    // Prior form stage
    const priorStage = () => {
        let newStage = {};
        for (let [name, value] of Object.entries(inputs)){
            if (name === 'Stage') {
                let lastStage = value
                newStage[name] = lastStage - 1;
            } else {
                newStage[name] = value;
            }
        }
        setInputs(newStage);
    }

    const submitForm = () => {
        if (botAttack){
            window.location.reload(false);
            return;
        }
        let entryObject = {};
        // axios and state fresh
        for (let [name, value] of Object.entries(inputs)){
            if (name !== 'Stage') {
                entryObject[name] = value;
            }
            if (name === 'Picture Source'){
                entryObject[name] = input1.current.value;
            }
            // If planted in house add 0 germinated
            if (name === 'in House' && value === true){
                entryObject['Germinated'] = 0;
            }
        }

        var serverLocation = Server + 'nursery/add-life';
        axios.post(serverLocation, entryObject)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));

        let updatedState = {};
        if (props.match.params[0] === 'seeds') {
            for (let [name, value] of Object.entries(seedFields)){
                updatedState[name] = value;
            }
        }
        if (props.match.params[0] === 'plants') {
            for (let [name, value] of Object.entries(plantFields)){
                updatedState[name] = value;
            }

        }
        updatedState['Entered'] = true;
        setInputs(updatedState);
    }

    console.log(inputs['Entry Type'])
    // Form to display
    let viewForm;
    if (inputs['Stage'] >= 1 && inputs['Entry Type'] === "Seed"){
        viewForm = <SeedForm nextStage={nextStage} rejectInput={rejectInput} priorStage={priorStage} submitForm={submitForm} inputs={inputs} input1={input1} input2={input2}/>
    }
    if (inputs['Stage'] >= 1 && inputs['Entry Type'] === "Plant"){
        viewForm = <PlantForm nextStage={nextStage} onChange={onChange} rejectInput={rejectInput} priorStage={priorStage} submitForm={submitForm} inputs={inputs} input1={input1} input2={input2}/>
    }

    // Form confirmation
    let confirmation;
    if (inputs['Entered']){
        confirmation = <h5 className='text-success pb-2 text-center'>Entry has been succesfully submitted</h5>
    }
    if (inputs['Entered'] === false){
        confirmation = <h5 className='text-warning'>Try again</h5>
    }


    return(
        <span>
            <span className="d-flex p-3">
                <div className='pr-3 pt-5' style={{width: '66%'}}>
                    {confirmation}
                    {viewForm}
                </div>
                <CreatePreview inputs={inputs}/>
            </span>
        </span>
    )
}

export default CreateHome;

const CreatePreview = props => {

    const creationPreview = [];

    for (let [name, value] of Object.entries(props.inputs)){
        if (name !== 'Stage' && name !== 'Entry Type' && name !== 'Entered' && name !== 'fromSeed' ){
            if (name === 'in House' && props.inputs['in House']) {
                value = 'Yes'
            }
            creationPreview.push(
                <div key={name} className="d-flex">
                    <h5>{name}: </h5><p>&nbsp;&nbsp;{value}</p>
                </div>
            )
        }
    }


    return (
        <div style={{width: '33%'}}>
            <h3 key="header">Current Addition</h3>
            {creationPreview}
        </div>
    )
}


const SeedForm = props => {
    let questionDisplay = [];
    const honeypotStyle = {
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        height: 0,
        width: 0,
        zIndex: -1,
    }
    if (props.inputs['Stage'] === 1){


        // Switch this to values to it can retain the value
        let sciNamePlaceholder = 'Aquilegia canadensis'
        let comNamePlaceholder = 'Eastern Columbine'

        if (props.inputs['Scientific Name']){
            sciNamePlaceholder = props.inputs['Scientific Name'];
        }
        if (props.inputs['Common Name']){
            comNamePlaceholder = props.inputs['Common Name'];
        }
        questionDisplay.push(
            <form key='names' onSubmit={(evt) => {evt.preventDefault(); props.nextStage();}} className="p-2">
                <div className="d-flex row">
                    <div className="w-50 p-2 text-center">
                        <label>Common Name</label>
                        <input type="text" className="form-control" name="Common Name" ref={props.input2} placeholder={comNamePlaceholder} value={props.inputs['Common Name']} required/>
                    </div>
                    <input type="text" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                    <div className="w-50 p-2 text-center">
                        <label>Scientific Name</label>
                        <input type="text" className="form-control" name="Scientific Name" ref={props.input1} placeholder={sciNamePlaceholder} value={props.inputs['Scientific Name']} required/>
                    </div>
                    <input type="text" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div className="row">
                    <div className="w-50 text-center"></div>
                    <span className="w-50 d-flex justify-content-center"><input type="submit" value="Next" /></span>
                </div>
            </form>
        )
    }

    if (props.inputs['Stage'] === 2){
        questionDisplay.push(
            <div key='plantType' className="p-2">
                <p className="text-center">Plant Type</p>
                <div className="row justify-content-center">
                    <div onClick={() => {props.nextStage(['Plant Type', 'Tree'])}} className="text-center border border-dark m-2 p-3" style={{borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 6px'}}>
                        <img style={{height: "80px"}} src={plantInitial} alt="Tree"/>
                        <br/>Tree
                    </div>
                    <div onClick={() => {props.nextStage(['Plant Type', 'Shrub'])}} className="text-center border border-dark m-2 p-3" style={{borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 6px'}}>
                        <img style={{height: "80px"}} src={plantInitial} alt="Shrub"/>
                        <br/>Shrub
                    </div>
                    <div onClick={() => {props.nextStage(['Plant Type', 'Wildflower'])}} className="text-center border border-dark m-2 p-3" style={{borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 6px'}}>
                        <img style={{height: "80px"}} src={plantInitial} alt="Plant"/>
                        <br/>Wildflower
                    </div>
                    <div onClick={() => {props.nextStage(['Plant Type', 'Vine'])}} className="text-center border border-dark m-2 p-3" style={{borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 6px'}}>
                        <img style={{height: "80px"}} src={plantInitial} alt="Plant"/>
                        <br/>Vine
                    </div>
                    <div onClick={() => {props.nextStage(['Plant Type', 'Grass'])}} className="text-center border border-dark m-2 p-3" style={{borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 6px'}}>
                        <img style={{height: "80px"}} src={plantInitial} alt="Plant"/>
                        <br/>Grass
                    </div>
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div onClick={props.priorStage}className="w-25 text-center">Back</div>

            </div>
        )
    }

    if (props.inputs['Stage'] === 3){
        let sourcePlaceholder = 'Restore Native Plants'
        if (props.inputs['Source']){
            sourcePlaceholder = props.inputs['Source'];
        }
        questionDisplay.push(
            <form key='Source' onSubmit={(evt) => {evt.preventDefault(); props.nextStage()}} className="p-2">
                <div className="row justify-content-center">
                    <div className="w-50 p-2 text-center">
                        <label>Source</label>
                        <input type="text" className="form-control" name='Source' ref={props.input1} placeholder={sourcePlaceholder} required/>
                        <input type="text" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                    </div>
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div className="row">
                    <div onClick={props.priorStage} className="w-50 text-center">Back</div>
                    <span className="w-50 d-flex justify-content-center"><input type="submit" value="Next" /></span>
                </div>
            </form>
        )
    }

    if (props.inputs['Stage'] === 4){
        questionDisplay.push(
            <form key='CollectData' onSubmit={(evt) => {evt.preventDefault(); props.nextStage()}} className="p-2">
                <div className="row justify-content-center">
                    <div className="w-50 p-2 text-center">
                        <label>Seed Collected On:</label><br/>
                        <input type="date" id="plantDate" ref={props.input1} name="Obtain Date"/>
                        <input type="date" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                    </div>
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div className="row">
                    <div onClick={props.priorStage} className="w-50 text-center">Back</div>
                    <span className="w-50 d-flex justify-content-center"><input type="submit" value="Next" /></span>
                </div>
            </form>
        )
    }

    if (props.inputs['Stage'] === 5){
        let seedQtyPlaceholder = '22'
        if (props.inputs['Seed Quantity']){
            seedQtyPlaceholder = props.inputs['Seed Quantity'];
        }
        questionDisplay.push(
            <form key='quantity' onSubmit={(evt) => {evt.preventDefault(); props.nextStage()}} className="p-2">
                <div className="row justify-content-center">
                    <div className="w-50 p-2 text-center">
                        <label>Seed Quantity:</label><br/>
                        <input type="number" id="seedquantity" name="Seed Quantity" ref={props.input2} placeholder={seedQtyPlaceholder} required/>&nbsp;&nbsp;grams
                        <input type="number" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                    </div>
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div className="row">
                    <div onClick={props.priorStage} className="w-50 text-center">Back</div>
                    <span className="w-50 d-flex justify-content-center"><input type="submit" value="Next" /></span>
                </div>
            </form>
        )
    }

    if (props.inputs['Stage'] === 6){
        questionDisplay.push(
            <form key='picture' onSubmit={(evt) => {evt.preventDefault(); props.nextStage(); props.submitForm()}} className="p-2">
                <div className="row justify-content-center">
                    <div className="w-50 p-2 text-center">
                        <label>Upload Picture</label>
                        <input type="text" className="form-control" name='Picture Source' ref={props.input1} placeholder='google.images.com/#plant'/>
                        <input type="text" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                    </div>
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div className="row">
                    <div onClick={props.priorStage} className="w-50 text-center">Back</div>
                    <span className="w-50 d-flex justify-content-center"><input type="submit" value="Preview/Submit" /></span>
                </div>
            </form>
        )
    }

    return questionDisplay;
}


const PlantForm = props => {
    const honeypotStyle = {
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        height: 0,
        width: 0,
        zIndex: -1,
    }
    let questionDisplay = [];

    if (props.inputs['Stage'] === 1){
        questionDisplay.push(
            <form key='Container' className="p-5" onSubmit={(evt) => {evt.preventDefault(); props.nextStage()}}>
                <div className="row justify-content-center">
                    <div className="w-50 p-2 text-center">
                        <label>Container ID</label>
                        <input type="text" className="form-control" name='Container ID' onChange={props.onChange} ref={props.input1} placeholder='F001 (Flat 001)' required/>
                        <input type="text" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                    </div>
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div className="row">
                    <div onClick={props.priorStage} className="w-50 text-center">Back</div>
                    <span className="w-50 d-flex justify-content-center"><input type="submit" value="Next" /></span>
                </div>
            </form>
        )
    }

    // if seeds no need for Container ID

    if (props.inputs['Stage'] === 2){
        let sciNamePlaceholder = 'Aquilegia canadensis';
        let comNamePlaceholder = 'Eastern Columbine';
        let sciNameValue = props.inputs['Scientific Name'];
        let comNameValue = props.inputs['Common Name'];

        // if (props.inputs['Scientific Name']){
        //     sciNameValue = props.inputs['Scientific Name'];

        // }
        // if (props.inputs['Common Name']){
        //     comNameValue = props.inputs['Common Name'];
        // }
        console.log(comNameValue)
        questionDisplay.push(
            <form key='names' onSubmit={(evt) => {evt.preventDefault(); props.nextStage();}} className="p-2">
                <div className="d-flex row">
                    <div className="w-50 p-2 text-center">
                        <label>Common Name</label>
                        <input type="text" className="form-control" name="Common Name" onChange={props.onChange} ref={props.input2} placeholder={comNamePlaceholder} value={comNameValue} required/>
                    </div>
                    <input type="text" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                    <div className="w-50 p-2 text-center">
                        <label>Scientific Name</label>
                        <input type="text" className="form-control" name="Scientific Name" onChange={props.onChange} ref={props.input1} placeholder={sciNamePlaceholder} value={sciNameValue} required/>
                    </div>
                    <input type="text" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div className="row">
                    <div onClick={props.priorStage} className="w-50 text-center">Back</div>
                    <span className="w-50 d-flex justify-content-center"><input type="submit" value="Next" /></span>
                </div>
            </form>
        )
    }

    if (props.inputs['Stage'] === 3){
        questionDisplay.push(
            <div key='plantType' className="p-2">
            <p className="text-center">Plant Type</p>
            <div className="row justify-content-center">
                <div onClick={() => {props.nextStage(['Plant Type', 'Tree'])}} className="text-center border border-dark m-2 p-3" style={{borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 6px'}}>
                    <img style={{height: "80px"}} src={plantInitial} alt="Tree"/>
                    <br/>Tree
                </div>
                <div onClick={() => {props.nextStage(['Plant Type', 'Shrub'])}} className="text-center border border-dark m-2 p-3" style={{borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 6px'}}>
                    <img style={{height: "80px"}} src={plantInitial} alt="Shrub"/>
                    <br/>Shrub
                </div>
                <div onClick={() => {props.nextStage(['Plant Type', 'Wildflower'])}} className="text-center border border-dark m-2 p-3" style={{borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 6px'}}>
                    <img style={{height: "80px"}} src={plantInitial} alt="Plant"/>
                    <br/>Wildflower
                </div>
                <div onClick={() => {props.nextStage(['Plant Type', 'Vine'])}} className="text-center border border-dark m-2 p-3" style={{borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 6px'}}>
                    <img style={{height: "80px"}} src={plantInitial} alt="Plant"/>
                    <br/>Vine
                </div>
                <div onClick={() => {props.nextStage(['Plant Type', 'Grass'])}} className="text-center border border-dark m-2 p-3" style={{borderRadius: '15px', boxShadow: 'rgba(66, 66, 66,0.8) 0 0 6px'}}>
                    <img style={{height: "80px"}} src={plantInitial} alt="Plant"/>
                    <br/>Grass
                </div>
            </div>
            <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
            <div onClick={props.priorStage}className="w-25 text-center">Back</div>

        </div>
        )
    }

    if (props.inputs['Stage'] === 4){
        let sourcePlaceholder = 'Restore Native Plants'
        let sourceValue = '';

        if (props.inputs['Source']){
            sourceValue = props.inputs['Source'];
        }
        questionDisplay.push(
            <form key='Source' onSubmit={(evt) => {evt.preventDefault(); props.nextStage()}} className="p-2">
                <div className="row justify-content-center">
                    <div className="w-50 p-2 text-center">
                        <label>Source</label>
                        <input type="text" className="form-control" name='Source' onChange={props.onChange} ref={props.input1} placeholder={sourcePlaceholder} value={sourceValue} required/>
                        <input type="text" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                    </div>
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div className="row">
                    <div onClick={props.priorStage} className="w-50 text-center">Back</div>
                    <span className="w-50 d-flex justify-content-center"><input type="submit" value="Next" /></span>
                </div>
            </form>
        )
    }

    if (props.inputs['Stage'] === 5) {
        if (props.inputs['fromSeed']){
            props.nextStage()
        }
        let trueCheck = props.inputs['in House'];
        let falseCheck = !props.inputs['in House'];

        questionDisplay.push(
            <div key='in House' className="p-2">
                <label>Was this plant grown in house?</label><br/>
                <div className="row w-50 text-center mx-auto justify-content-center">
                        <div onClick={() => {props.nextStage(['in House', true])}} checked={trueCheck} className="text-center m-2 p-3">Yes/True</div>
                        <div onClick={() => {props.nextStage(['in House', false])}} checked={falseCheck} className="text-center m-2 p-3">No/False</div>
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div className="row">
                    <div onClick={props.priorStage} className="w-50 text-center">Back</div>
                    <span className="w-50 d-flex justify-content-center"><input type="submit" value="Next" /></span>
                </div>
            </div>
        )
    }

    if (props.inputs['Stage'] === 6){
        let questionLabel;
        if (props.inputs['in House'] === true){
            questionLabel = <label>Planted On:</label>
        }
        if (props.inputs['in House'] === false) {
            questionLabel = <label>Aquired On:</label>
        }

        questionDisplay.push(
            <form key='CollectData' onSubmit={(evt) => {evt.preventDefault(); props.nextStage()}} className="p-2">
                <div className="row justify-content-center">
                    <div className="w-50 p-2 text-center">
                        {questionLabel}<br/>
                        <input type="date" id="plantDate" onChange={props.onChange} ref={props.input1} name="Plant Date"/>
                        <input type="date" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                    </div>
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div className="row">
                    <div onClick={props.priorStage} className="w-50 text-center">Back</div>
                    <span className="w-50 d-flex justify-content-center"><input type="submit" value="Next" /></span>
                </div>
            </form>
        )
    }

    //
        //
    // Differentiate between Amount of PLants and seeds planted?
        //
    //
    if (props.inputs['Stage'] === 7){
        let seedQtyPlaceholder = '22'
        if (props.inputs['Seed Quantity']){
            seedQtyPlaceholder = props.inputs['Seed Quantity'];
        }
        questionDisplay.push(
            <form key='quantity' onSubmit={(evt) => {evt.preventDefault(); props.nextStage()}} className="p-2">
                <div className="row justify-content-center">
                    <div className="w-50 p-2 text-center">
                        <label>Plant Quantity:</label><br/>
                        <input type="number" id="planted" name="Planted" onChange={props.onChange} ref={props.input2} placeholder={seedQtyPlaceholder} required/>&nbsp;&nbsp;grams
                        <input type="number" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                    </div>
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div className="row">
                    <div onClick={props.priorStage} className="w-50 text-center">Back</div>
                    <span className="w-50 d-flex justify-content-center"><input type="submit" value="Next" /></span>
                </div>
            </form>
        )
    }

    if (props.inputs['Stage'] === 8){
        let picValue = props.inputs['Picture Source'];
        questionDisplay.push(
            <form key='picture' onSubmit={(evt) => {evt.preventDefault(); props.nextStage(); props.submitForm()}} className="p-2">
                <div className="row justify-content-center">
                    <div className="w-50 p-2 text-center">
                        <label>Upload Picture</label>
                        <input type="text" className="form-control" name='Picture Source' onChange={props.onChange} ref={props.input1} placeholder='google.images.com/#plant' value={picValue}/>
                        <input type="text" autoComplete="off" value="Gotcha" onChange={props.rejectInput} style={honeypotStyle} />
                    </div>
                </div>
                <div className="bg-dark w-100 mt-3 mb-3" style={{height: '2px'}}></div>
                <div className="row">
                    <div onClick={props.priorStage} className="w-50 text-center">Back</div>
                    <span className="w-50 d-flex justify-content-center"><input type="submit" value="Preview/Submit" /></span>
                </div>
            </form>
        )
    }

    return questionDisplay;
}
