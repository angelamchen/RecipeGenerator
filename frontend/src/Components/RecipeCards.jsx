import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

const Cards = styled(Card)`
box-shadow: 5px 5px 15px #e8e8e8;
border-radius: 20px;
border: none;
width: 100%;

&:hover {
    transform: scale(1.01);
}
`

const Wrapper = styled.div`
  margin-right: 15px;
  margin-left: 15px;
`;

export default class RecipeCards extends React.Component {
    render() {
        const recipe = this.props.recipe

        return (
            <Wrapper>
            <Cards>
                <Card.Body className='text-dark'>
                    <h4 className="card-title">{recipe.recipeName}</h4>
                    <h6>calories: {recipe.calories}</h6>
                </Card.Body>
            </Cards>
            </Wrapper>
        );
    }
}