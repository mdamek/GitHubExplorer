import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
`;

const ReadyStatistics = ({gitStatistics}) => {
  const {commitsTotalNumber, filesCommitedTogetherAverage, filesCommitedTogetherMax, sumOfLinesInRepository} = gitStatistics;
  return (
    <Wrapper>
        <label>
        commitsTotalNumber:
        </label>
        {commitsTotalNumber}
        <label>
        filesCommitedTogetherAverage:
        </label>
        {filesCommitedTogetherAverage}
        <label>
        filesCommitedTogetherMax:
        </label>
        {filesCommitedTogetherMax}
        <label>
        sumOfLinesInRepository:    
        </label>
        {sumOfLinesInRepository}
    </Wrapper>
  );
  
};
 
 
export default ReadyStatistics;