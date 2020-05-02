import React from 'react';
import { Switch, Route, Link, useRouteMatch} from "react-router-dom";

import TableBody from './views/table.component';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function Header() {
    let { path, url } = useRouteMatch();

    return(
        <Container style={{ marginTop: 20 }}>
            <Row>
                <Col sm={12}>
                <span ><Link className="nav-item" to={url}>Seeds</Link></span>
                &nbsp;&nbsp;&nbsp;
                <span><Link className="text-danger" to={`${url}/trays-pots`}>Trays & Pots</Link></span>
                <span className="float-right"><Link className="text-warning" to={`${url}/add-seeds`}>Add Seeds</Link></span>
                <span className="float-right"><Link className="text-warning" to={`${url}/add-trays-pots`}>Add Trays or Pots</Link>&nbsp;&nbsp;&nbsp;</span>

                </Col>
            </Row>
            <Switch>
                <Route path={path}>
                    <h3 style={{paddingLeft: "15px"}}>Seed Inventory</h3>
                    <SeedTable/>
                </Route>
                <Route path={`${path}/trays-pots`}>
                <div>
                    <h3>Testing</h3>
                </div>
                </Route>
                <Route path={`${path}/add-seeds`}>
                <div>
                    Notes
                </div>
                </Route>
                <Route path={`${path}/add-trays-pots`}>
                    <h3>Howdy</h3>
                </Route>
            </Switch>
        </Container>
    )
}

export default Header;


function SeedTable() {
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
                    <TableBody data={dataSample}/>
                </Col>
            </Row>
        </Container>
    )
}