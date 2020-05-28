import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
const Wrapper = styled.div`
`

const Statistics = ({ gitStatistics }) => {
  const { commitsTotalNumber, filesCommitedTogetherAverage, filesCommitedTogetherMax, sumOfLinesInRepository, allCommits } = gitStatistics;
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
  )
}

Statistics.propTypes = {
  gitStatistics: {
    commitsTotalNumber: PropTypes.number,
    filesCommitedTogetherAverage: PropTypes.number,
    filesCommitedTogetherMax: PropTypes.number,
    sumOfLinesInRepository: PropTypes.number,
    allCommits: PropTypes.arrayOf(PropTypes.shape({
      author: PropTypes.string,
      date: PropTypes.date,
      hash: PropTypes.string
    }))
  }
}

export default Statistics
