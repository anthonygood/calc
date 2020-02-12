import React from 'react'
import PropTypes from 'prop-types'
import LabelledElement from './LabelledElement'
import { moneyFmt } from '../view-helpers/formatRepayment'

const Inputs = ({ amount, duration, onChange }) =>
  <form>
    <LabelledElement labelText={'Amount'} output={moneyFmt(amount)}>
      <input
        name="amount"
        value={amount}
        type="range"
        // TODO: configure via Products API
        min="1000" max="200000" step="1000"
        onChange={({ target }) => onChange(Number(target.value), duration)}
      />
    </LabelledElement>

    <LabelledElement labelText='Duration' output={`${duration} months`}>
      <input
        name="duration"
        value={duration}
        type="range"
        // TODO: configure via Products API
        min="1" max="60" step="1"
        onChange={({ target })  => onChange(amount, Number(target.value))}
      />
    </LabelledElement>
  </form>

Inputs.propTypes = {
  amount: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Inputs
