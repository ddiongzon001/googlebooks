import React from 'react';
import Column from '../Column';
import Container from '../Container';
import Row from '../Row';

const Jumbotron = props => {
    return (
        <div
            className={`
        jumbotron
        ${props.fluid ? "jumbotron-fluid" : ""}
        bg-${props.bg || 'default'}
        text-${props.color || 'dark'}
        text-center 
        `}>
            <Container>
                <Row helper={'justify-content-around'}>
                    <Column>
                        <h1>{props.pageTitle}</h1>
                    </Column>
                </Row>
            </Container>
        </div>
    )
}

export default Jumbotron;
