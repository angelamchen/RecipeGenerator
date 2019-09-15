import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import RecipeCards from './RecipeCards'

const ExperienceCards = styled(Col)`
    display: flex;
    padding-bottom: 20px;
`

class Experience extends React.Component {
    render() {
        const recipes = this.props.recipes

        return (
            <div>
                <Container>
                    <Row>
                        {recipes.map((recipe) => {
                            return (
                                <ExperienceCards lg={4}>
                                    <RecipeCards
                                        recipe={recipe}
                                    />
                                </ExperienceCards>
                            )
                        })}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Experience;