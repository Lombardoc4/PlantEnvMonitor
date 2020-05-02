import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, Link, useRouteMatch, useLocation} from "react-router-dom";
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import TableBody from './views/table.component';
import EditItem from './forms/edit.component';
import ViewItem from './views/viewPlant.component';
import ViewContainer from './views/viewContainer.component';
import NoteBody from './notepad/notepad.component';
import Create from './forms/create.component';

const Server = "http://localhost:1337/";

function Header() {
    let { path, url } = useRouteMatch();
    const local = useLocation();
    const [currWindow, setWindow] = useState({
        height: window.innerHeight,
        pathname: local.pathname
    });

    useEffect(() => {
        function handleResize() {
            setWindow({
                height: window.innerHeight,
                pathname: local.pathname
            });
        }
        window.addEventListener('resize', handleResize)
        handleResize();
        return () => window.removeEventListener('resize', handleResize());
    }, [local])


    const location = currWindow.pathname;

    // Style aspects
    let buttonStyle = { textDecoration: 'none',  backgroundColor: '#edffd5', color: 'rgb(104, 86, 52)', width: '150px', border: '1px solid black', borderBottom: '1px solid black', borderRadius: '15px 15px 0 0'};
    let buttonActiveStyle = { textDecoration: 'none',  backgroundColor: 'rgb(71, 160, 37)', color: '#edffd5', width: '150px', border: '1px solid black', borderBottom: 'none', borderRadius: '15px 15px 0 0'};

    let dashBorderBottom = location === '/nursery' ? {...buttonActiveStyle} : {...buttonStyle};
    let plantBorderBottom = location.includes(['plants']) ? {...buttonActiveStyle} : {...buttonStyle};
    let seedBorderBottom =  location.includes(['seeds']) ? {...buttonActiveStyle} : {...buttonStyle};
    let noteBorderBottom =  location.includes(['notes']) ? {...buttonActiveStyle} : {...buttonStyle};

    const containerHeight = (currWindow.height - 60) + 'px';

    return(
        <Container className="p-4 bg-white" style={{color: 'rgb(104, 86, 52)', minHeight: containerHeight, height: '100%'}}>
            <div className="row pt-2 pl-3">
                <div className="row pl-3">
                <Link className="text-center p-2" style={dashBorderBottom} to={url}>Dashboard</Link>
                <Link className="text-center p-2" style={plantBorderBottom} to={`${url}/plants`}>Plants</Link>
                <Link className="text-center p-2" style={seedBorderBottom} to={`${url}/seeds`}>Seeds</Link>
                <Link className="text-center p-2" style={noteBorderBottom} to={`${url}/notes`}>Notes</Link>
                </div>
                <div className="ml-2" style={{flex: '1 1 auto', borderBottom: '1px solid black'}}></div>
            </div>

            <Switch>
                <Route exact path={path}>
                    <div>
                        {/* Include images of plants */}
                        {/* Include sidebar of todo */}
                        {/* Include a nice note */}
                        <h3>Welcome to the Nursery</h3>
                        <Dashboard/>
                    </div>
                </Route>
                <Route exact path={`${path}/plants`}>
                    <div>
                        <PlantTable containerHeight={currWindow.height}/>
                    </div>
                </Route>
                <Route exact path={`${path}/seeds`}>
                    <div>
                        <SeedTable containerHeight={currWindow.height}/>
                    </div>
                </Route>
                <Route exact path={`${path}/notes`}>
                    <div>
                        <h3 className="pt-3">Notes</h3>
                        <Notes/>
                    </div>
                </Route>
                <Route path={`${path}/*/add`} component={Create} />
                <Route path={`${path}/*/:id/edit`} component={EditItem } />
                <Route path={`${path}/seeds/view/:id`} component={() => <ViewItem mode='viewSeed'/>} />
                <Route path={`${path}/plants/view/:id`} component={() => <ViewItem mode='viewPlant'/>} />
                <Route path={`${path}/container/:id`} component={() => <ViewContainer/>} />
            </Switch>
        </Container>
    )
}

export default Header;

const  SeedTable = props => {
    const omitList = [ '_id', '__v', 'Seed Quantity', 'Entry Type', 'Obtain Date', 'Picture Source'];
    const [filter, setFilter]  = useState('');

    // TODO: Create a maximum load size, add a 'Show More' button, load next data set

    const [data, setData] = useState();
    const getData = useCallback(() => {
        let serverLocation = Server + 'nursery/seeds';

        if (filter) {
            serverLocation += '/' + filter;
        }
        axios.get(serverLocation)
            .then(res => {
                if (res.data.length > 0){
                    console.log(res.data)
                    setData(res.data)
                } else {
                    setData();
                }
            })
            .catch(function (error){
                console.log(error);
            });
    }, [filter])
    useEffect(() => {
        getData();
    }, [getData])

    const toggleFilter = (value) => {
        if (filter === value) {
            setFilter('');
        } else {
            setFilter(value);
        }
    }

    let filterStyle = {color: 'rgb(71, 160, 37)', cursor: 'pointer' };
    let filterActiveStyle = { color: 'rgb(104, 86, 52)', cursor: 'pointer'};

    let treeStyle = filter === 'Tree' ? {...filterActiveStyle} : {...filterStyle};
    let shrubStyle = filter === 'Shrub' ? {...filterActiveStyle} : {...filterStyle};
    let wildflowerStyle = filter === 'Wildflower' ? {...filterActiveStyle} : {...filterStyle};
    let vineStyle = filter === 'Vine' ? {...filterActiveStyle} : {...filterStyle};
    let grassStyle = filter === 'Grass' ? {...filterActiveStyle} : {...filterStyle};

    let newMaxHeight =  props.containerHeight - 270 + 'px';

    let tableBlock = data ? <TableBody getData={getData} data={data} omits={omitList} containerHeight={props.containerHeight}/> : <div className="d-flex justify-content-center align-items-center" style={{height: '100px'}}><h2>None of these plants exist</h2></div>

    return(
        <div>
            <Container>
                <div className='d-flex mt-3'>
                        <Link className="text-center p-2 mr-4 btn bg-success text-white w-25" to='seeds/add'>Add Seeds</Link>
                        <input className='form-control' type='text' placeholder='Search'/>
                </div>
                <div className='mt-1 d-flex'  style={{color: 'rgb(104, 86, 52)'}}>
                    Filters: &nbsp;&nbsp;&nbsp;
                    <span style={treeStyle} onClick={() => toggleFilter('Tree')}>Trees</span>&nbsp;&nbsp;&nbsp;
                    <span style={shrubStyle} onClick={() => toggleFilter('Shrub')}>Shrubs</span>&nbsp;&nbsp;&nbsp;
                    <span style={wildflowerStyle} onClick={() => toggleFilter('Wildflower')}>Wildflowers</span>&nbsp;&nbsp;&nbsp;
                    <span style={vineStyle} onClick={() => toggleFilter('Vine')}>Vines</span>&nbsp;&nbsp;&nbsp;
                    <span style={grassStyle} onClick={() => toggleFilter('Grass')}>Grasses</span>
                </div>
                <Row>
                    <Col className="mt-3" sm={12}  style={{maxHeight: newMaxHeight , height: '100%', overflow: 'scroll'}}>
                        {tableBlock}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const PlantTable = props => {
    const omitList = [ '_id', '__v', 'Seed Quantity', 'Entry Type', 'Source', 'Obtain Date', 'Plant Date', 'Picture Source'];
    const [filters, setFilter]  = useState({
        'plantType':'',
        'inHouse': ''
    });

    const [data, setData] = useState([]);
    const getData = useCallback(() => {
        var serverLocation = Server + 'nursery/plants';
        console.log(filters)
        if (filters['plantType'] !== '') {
            serverLocation += '/' + filters['plantType'];
        }
        if (filters['inHouse'] !== '') {
            serverLocation += '/' + filters['inHouse'];
        }
        console.log(serverLocation);
        axios.get(serverLocation)
            .then(res => {
                setData(res.data)
            })
            .catch(function (error){
                console.log(error);
            });
    }, [filters])

    useEffect(() => {
        getData();
    }, [getData])

    const multipleFilters = (type, value) => {
        let newFilters = {...filters}
        if (filters[type] === value){
            newFilters[type] = '';
        } else {
            newFilters[type] = value;
        }
        setFilter(newFilters);
    }
    let filterStyle = {color: 'rgb(71, 160, 37)', cursor: 'pointer' };
    let filterActiveStyle = { color: 'rgb(104, 86, 52)', cursor: 'pointer'};

    let purchaseStyle = filters['inHouse'] === 'Purchased' ? {...filterActiveStyle} : {...filterStyle};
    let germStyle = filters['inHouse'] === 'Germinated' ? {...filterActiveStyle} : {...filterStyle};
    let treeStyle = filters['plantType'] === 'Tree' ? {...filterActiveStyle} : {...filterStyle};
    let shrubStyle = filters['plantType'] === 'Shrub' ? {...filterActiveStyle} : {...filterStyle};
    let wildflowerStyle = filters['plantType'] === 'Wildflower' ? {...filterActiveStyle} : {...filterStyle};
    let vineStyle = filters['plantType'] === 'Vine' ? {...filterActiveStyle} : {...filterStyle};
    let grassStyle = filters['plantType'] === 'Grass' ? {...filterActiveStyle} : {...filterStyle};

    let newMaxHeight =  props.containerHeight - 270 + 'px';

    let tableBlock = data ? <TableBody getData={getData} data={data} omits={omitList} containerHeight={props.containerHeight}/> : <div className="d-flex justify-content-center align-items-center" style={{height: '100px'}}><h2>None of these plants exist</h2></div>

    return(
        <Container>
            <div className='mt-3 d-flex'>
                    <Link className="text-center p-2 mr-4 btn bg-success text-white w-25" to='plants/add'>Add Plants</Link>
                    <input className='form-control' type='text' placeholder='Search'/>
            </div>
            <div className='mt-1 d-flex' style={{color: 'rgb(104, 86, 52)'}}>
                Filters: &nbsp;&nbsp;&nbsp;
                {/* <span style={purchaseStyle} onClick={() => multipleFilters('inHouse','Purchased')}>Purchased</span>&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; */}
                <span style={purchaseStyle} onClick={() => multipleFilters('inHouse','Purchased')}>Purchased</span>&nbsp;&nbsp;&nbsp;
                <span style={germStyle} onClick={() => multipleFilters('inHouse','Germinated')}>Germinated</span>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <span style={treeStyle} onClick={() => multipleFilters('plantType','Tree')}>Trees</span>&nbsp;&nbsp;&nbsp;
                <span style={shrubStyle} onClick={() => multipleFilters('plantType','Shrub')}>Shrubs</span>&nbsp;&nbsp;&nbsp;
                <span style={wildflowerStyle} onClick={() => multipleFilters('plantType','Wildflower')}>Wildflowers</span>&nbsp;&nbsp;&nbsp;
                <span style={vineStyle} onClick={() => multipleFilters('plantType','Vine')}>Vines</span>&nbsp;&nbsp;&nbsp;
                <span style={grassStyle} onClick={() => multipleFilters('plantType','Grass')}>Grasses</span>
            </div>
            <Row>
                <Col className="mt-3" sm={12}  style={{maxHeight: newMaxHeight , height: '100%', overflow: 'scroll'}}>
                    {tableBlock}
                </Col>
            </Row>
        </Container>
    )
}

function Dashboard() {
    const omitList = [ '_id', '__v', 'Quantity'];

    const dataSample = [
        {'_id':'3333333', 'ScientificName': '123', 'CommonName': 'abc', 'Source': 'dsfsf', 'Quantity': 'jgjg', 'PlantType': 'plffsffsd'},
        {'_id':'4444444', 'ScientificName': '213', 'CommonName': 'def', 'Source': 'ffsddfsf', 'Quantity': 'jghjg', 'PlantType': 'wrwbfgbx'},
        {'_id':'5555555', 'ScientificName': '231', 'CommonName': 'ghi', 'Source': 'fsdfdsfd', 'Quantity': 'jghjg', 'PlantType': 'ffsfs'},
        {'_id':'6666666', 'ScientificName': '132', 'CommonName': 'cba', 'Source': 'fsdfsdf', 'Quantity': 'jghj', 'PlantType': 'jgdfgfdhjg'},
        {'_id':'7777777', 'ScientificName': '312', 'CommonName': 'fed', 'Source': 'sdfsdfds', 'Quantity': 'jghj', 'PlantType': 'jweretrghg'},
        {'_id':'8888888', 'ScientificName': '321', 'CommonName': 'ihg', 'Source': 'hjghjgjg', 'Quantity': 'jhgjhg', 'PlantType': 'jhjg'},
    ];

    return(
        <Container>
            <Row>
                <Col sm={12}>
                    <TableBody data={dataSample} omits={omitList}/>
                </Col>
            </Row>
        </Container>
    )
}

function Notes() {
    const omitList = [ '_id', '__v', 'Quantity'];

    const dataSample = [
        {'_id':'3333333', 'Date': '12/3/12', 'Title': 'General', 'General': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu odio risus. Sed eget sagittis sapien. Aliquam orci ex, elementum.', 'Source': 'dsfsf', 'Quantity': 'jgjg', 'PlantType': 'plffsffsd'},
        {'_id':'4444444', 'Date': '2/13/13', 'Title': 'Plant Conditions', 'General': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu odio risus. Sed eget sagittis sapien. Aliquam orci ex, elementum.', 'Source': 'ffsddfsf', 'Quantity': 'jghjg', 'PlantType': 'wrwbfgbx'},
        {'_id':'5555555', 'Date': '2/31/11', 'Title': 'Plant leaves yellow', 'General': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu odio risus. Sed eget sagittis sapien. Aliquam orci ex, elementum.', 'Source': 'fsdfdsfd', 'Quantity': 'jghjg', 'PlantType': 'ffsfs'},
        {'_id':'6666666', 'Date': '1/3/02', 'Title': 'General', 'General': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu odio risus. Sed eget sagittis sapien. Aliquam orci ex, elementum.', 'Source': 'fsdfsdf', 'Quantity': 'jghj', 'PlantType': 'jgdfgfdhjg'},
        {'_id':'7777777', 'Date': '3/12/18', 'Title': 'General', 'General': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu odio risus. Sed eget sagittis sapien. Aliquam orci ex, elementum.', 'Source': 'sdfsdfds', 'Quantity': 'jghj', 'PlantType': 'jweretrghg'},
        {'_id':'8888888', 'Date': '3/2/11', 'Title': 'Plant Condition', 'General': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu odio risus. Sed eget sagittis sapien. Aliquam orci ex, elementum.', 'Source': 'hjghjgjg', 'Quantity': 'jhgjhg', 'PlantType': 'jhjg'},
    ];

    return(
        <NoteBody data={dataSample} omits={omitList}/>
    )
}