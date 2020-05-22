import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../Buttons/Button.js'
import Input from '../Basics/Input'
import Label from '../Basics/Label'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
`

const Entrance = ({ setResultAvaliable, setGitStatistics }) => {
  const [gitLink, setGitLink] = useState('')

  const handleSubmit = event => {
    setGitLink('')
    event.preventDefault()
    fetch('api/GitStatistics')
      .then(response => response.json())
      .then(json => {
        setGitStatistics({
          commitsTotalNumber: json.commitsTotalNumber,
          filesCommitedTogetherAverage: json.filesCommitedTogetherAverage,
          filesCommitedTogetherMax: json.filesCommitedTogetherMax,
          sumOfLinesInRepository: json.sumOfLinesInRepository
        })
        setResultAvaliable(true)
      })
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
  )
}

Entrance.propTypes = {
  setResultAvaliable: PropTypes.func,
  setGitStatistics: PropTypes.func
}

export default Entrance
