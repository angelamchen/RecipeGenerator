import React from 'react';
import styled from 'styled-components';
import { Button, Row } from 'react-bootstrap';

const DarkerSection = styled.div`
background-color: #f3f7f9;
padding-bottom: 5%;
margin-bottom: 15px;
`

const BlueTitle = styled.span`
color: #5da1a3;
`

const Wrapper = styled.div`
  padding-top: 20%;
  margin: 25px;
  text-align: center;
  align-items: center;
`

const UploadWrapper = styled.div`
  margin: 25px;
`

const UploadButtons = styled(Button)`
margin: 15px;
`

class MastHead extends React.Component {

    renderSendButton = () => {
        if (this.props.showSendButton) {
            return (
                <div>
                    <UploadButtons variant="info" onClick={this.props.fileUploadHandler}>Send Image</UploadButtons>
                </div>
            )                 
        }
        return (<div />);
    }

    render() {
        const { darkTitle, blueTitle, description } = this.props
        const sendButton = this.renderSendButton();

        return (
            <DarkerSection>
                <Wrapper>
                    <h1>{darkTitle} <BlueTitle>{blueTitle}</BlueTitle></h1>
                    <br />
                    <p>{description}</p>
                </Wrapper>
                <UploadWrapper>
                <h6>Selected Image: {this.props.uploadedFile}</h6>
                <Row> 
                    <input
                        style={{ display: 'none' }} type="file"
                        onChange={this.props.fileSelectedHandler}
                        ref={fileInput => this.fileInput = fileInput}
                    />
                    <UploadButtons variant="info" onClick={() => this.fileInput.click()}>Upload Image</UploadButtons>
                    {sendButton}
                    </Row>
                </UploadWrapper>
            </DarkerSection>
        )
    }
}

export default MastHead