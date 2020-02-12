import React from 'react'
import PropTypes from 'prop-types'

const LabelledElement = ({
  labelText,
  children,
  output
}) => (
  <div>
    <label html="amount">{labelText}</label>
    {children}
    <output>{output}</output>
  </div>
)

LabelledElement.propTypes = {
  labelText: PropTypes.string.isRequired,
  children: PropTypes.node,
  output: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default LabelledElement
