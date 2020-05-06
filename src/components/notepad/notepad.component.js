import React, {useState, useEffect, useCallback} from 'react';
import { Link,  useRouteMatch } from "react-router-dom";
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const Server = "http://localhost:1337/";

const NoteBody = props => {

    let {  url } = useRouteMatch();

    const contentPreview = props.item.copy.slice(0, 105) + "...";

    const NoteHeader = <div><span>{props.item.header}</span><span className="float-right">{props.item.date}</span></div>
    const NoteContent = <div>{contentPreview}</div>
    let viewUrl = `${url}/view/` + props.item._id;


    return(
        <Col sm={4} className="mb-3">
            <Link to={{pathname: viewUrl, data: props.item}}  style={{cursor: 'pointer', textDecoration: 'none'  }}>
                <div className="p-3 text-dark border border-success" >
                    {NoteHeader}
                    {NoteContent}
                </div>
            </Link>
        </Col>
    )
}

const CreateNote  = (props) => {
    const [note, writeNote] = useState(
        {
            subject: '',
            copy: '',
        }
    );

    const handleChange = evt => {
        let newValue = {};
        newValue[evt.target.name] = evt.target.value;
        for (let [name, value] of Object.entries(note)){
            if (evt.target.name === name) {
              newValue[name] = evt.target.value;
            } else {
              newValue[name] = value;
            }
        }
        writeNote(newValue);
    }

    const confirmSubmit = () => {
        console.log('submitted');
        props.toggleModal();
        props.getData();
    }

    const submitNote = evt => {
        evt.preventDefault();

        var serverLocation = Server + "nursery/notes";
        axios.post(serverLocation, note)
            .then(confirmSubmit)
            .catch(err => console.log(err));

    }


    return (
        <div style={{position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', zIndex: 3}}>
            <div onClick={props.toggleModal} style={{position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(128, 128, 128, 0.6)'}}></div>
            <div style={{disply: 'flex', position: 'relative', top: '50%', left: '50%', width: '500px', height: '400px', backgroundColor: 'white', borderRadius: '50px', transform: 'translate(-50%, -50%)'}}>

                <form className="p-5">
                    {/*
                        use onClick events to trigger textarea change, get content - is it possible to get highlighted text?,
                        TODO: Make this so there is a defining character for the 'headers'
                        This will seperate the contents,

                        OR... AND?

                        Dont even seperate the contents just lump all notes by date ---- DO THIS FIRST
                    */}
                    <h3>New Note</h3>
                    <input name="subject" onChange={handleChange} style={{width: '100%'}} type='text' autoFocus placeholder='Enter subject...'/>
                    <textarea name="copy" onChange={handleChange} style={{resize: 'none', width: '100%'}} rows="8" placeholder='Enter note...'/>
                    <button onClick={submitNote}>Submit</button>
                </form>
            </div>
        </div>
    )
}


const NotePreview = props => {
    const [notes, setData] = useState({
        data: '',
        modal: false
    });

    const getData = useCallback(() => {
        let serverLocation = Server + 'nursery/notes';

        axios.get(serverLocation)
        .then(res => {
            if (res.data.length > 0){
                console.log(res.data)
                setData({
                    data: res.data
                })
            }
        })
        .catch(function (error){
            console.log(error);
        });
    }, [notes.length])

    useEffect(() => {
        getData();
    }, [getData])

    const toggleModal = () => {
        setData({...notes, modal: !notes.modal});
    }

    const omitList =  (Array.isArray(props.omits) && props.omits.length) ? props.omits : ["_id", '__v'];

    let allData;
    if (notes.data){
        console.log(notes.data);
        allData = notes.data.map(function(dataSet, index) {
            return (
            <NoteBody item={dataSet} getData={getData} omit={omitList} key={index} />
            )
        });
    }

    let showModal = notes.modal ? <CreateNote toggleModal={toggleModal}/> : '';

    return (
        <Container>
            {showModal}
            <Row>
                <Col sm={4} className="mb-3">
                    <div onClick={toggleModal} className="d-flex flex-column justify-content-center align-items-center h-100 p-3 text-dark border border-success" >
                        <span style={{fontSize: '64px', lineHeight: '42px'}}>+</span>
                        <small>Add Note</small>
                    </div>
                </Col>
                {allData}
            </Row>
        </Container>
    )
}

export default NotePreview;