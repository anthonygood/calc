import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RepaymentTable from './RepaymentTable'
import LabelledElement from './LabelledElement'
import { moneyFmt } from '../view-helpers/formatRepayment'
import './ProductCalculator.scss'

const Unavailable = ({ reason }) => (
  <div className="Unavailable">Unfortunately this product has {reason}.</div>
)

const Body = ({
  amount,
  duration,
  repayments,
  config
}) => {
  if (amount < config.amount.min) return <Unavailable reason={`a minimum amount of ${moneyFmt(config.amount.min)}`} />
  if (amount > config.amount.max) return <Unavailable reason={`a maximum amount of ${moneyFmt(config.amount.max)}`} />
  if (duration < config.duration.min) return <Unavailable reason={`a minimum duration of ${config.duration.min} month`} />
  if (duration > config.duration.max) return <Unavailable reason={`a maximum duration of ${config.duration.max} months`} />

  return <RepaymentTable repayments={repayments} />
}

const InterestControl = ({ interest, onChange }) => (
  <LabelledElement labelText='Interest' output={`${interest}%`}>
    <input
      name="amount"
      value={interest}
      type="range"
      min="1" max="5" step="0.01"
      onChange={({ target }) => onChange(target.value)}
    />
  </LabelledElement>
)

class ProductCalculator extends Component {
  state = {
    interest: 3.33
  }

  render() {
    const {
      amount,
      calculateRepayments,
      config,
      duration,
      name,
    } = this.props

    const repayments = calculateRepayments(amount, duration, this.state.interest)

    return (
      <div className="ProductCalculator">
        <h2>{name}</h2>
        <InterestControl interest={this.state.interest} onChange={interest => this.setState({ interest })} />
        <Body amount={amount} duration={duration} repayments={repayments} config={config} />
      </div>
    )
  }
}

const MinMaxType = PropTypes.shape({
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
})

const ProductConfigType = PropTypes.shape({
  amount: MinMaxType,
  duration: MinMaxType,
})

Body.propTypes = {
  amount: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  repayments: PropTypes.array,
  config: ProductConfigType,
}

ProductCalculator.propTypes = {
  amount: PropTypes.number.isRequired,
  calculateRepayments: PropTypes.func.isRequired,
  config: ProductConfigType,
  duration: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}

export default ProductCalculator
