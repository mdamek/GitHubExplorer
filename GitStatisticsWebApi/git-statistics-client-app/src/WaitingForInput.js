import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button.js'
import Input from './Input';
import Label from './Label';

const Wrapper = styled.div`
`;

const WaitingForInput = ({setResultAvaliable, setGitStatistics}) => {
    
    const [gitLink, setGitLink] = useState("");

    const handleSubmit = event => {
        setGitLink("");
        event.preventDefault();
        fetch('api/GitStatistics')
        .then(response => response.json())
        .then(json => {
            setGitStatistics({
                commitsTotalNumber: json.commitsTotalNumber,
                filesCommitedTogetherAverage: json.filesCommitedTogetherAverage,
                filesCommitedTogetherMax: json.filesCommitedTogetherMax,
                sumOfLinesInRepository: json.sumOfLinesInRepository
            });
            setResultAvaliable(true);
        }); 
    }
    const handleChange = event => {
        setGitLink(event.target.value)
    }
  return (
    <Wrapper>
        <form onSubmit={handleSubmit}>
            <Label>Enter the link to the github repository you want to learn more about</Label>
            <Input type="text" placeholder="Git link" onChange={e => handleChange(e)} value={gitLink}/>
            <Button type="submit">
                Explore!
            </Button>
        </form>
    </Wrapper>
  );
  
};
export default WaitingForInput;