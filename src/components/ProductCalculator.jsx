import React, { Component } from 'react'
import RepaymentTable from './RepaymentTable'
import './ProductCalculator.scss'

const Unavailable = ({ reason }) => (
  <div>Unfortunately this product requires {reason}.</div>
)

const Body = ({
  amount,
  duration,
  repayments,
  config
}) => {
  if (amount < config.amount.min) return <Unavailable reason={`a minimum amount of £${config.amount.min}`} />
  if (amount > config.amount.max) return <Unavailable reason={`a maximum amount of £${config.amount.max}`} />
  if (duration < config.duration.min) return <Unavailable reason={`a minimum duration of ${config.duration.min} month`} />
  if (duration > config.duration.max) return <Unavailable reason={`a maximum duration of ${config.duration.max} months`} />

  return <RepaymentTable repayments={repayments} />
}

const InterestControl = ({ interest, onChange }) => (
  <div>
    <label html="amount">Interest (%)</label>
    <input
      name="amount"
      value={interest}
      type="range"
      min="1" max="5" step="0.01"
      onChange={({ target }) => onChange(target.value)}
    />
  </div>
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
      <div class="ProductCalculator">
        <h2>{name}</h2>
        <InterestControl interest={this.state.interest} onChange={interest => this.setState({ interest })} />
        <Body amount={amount} duration={duration} repayments={repayments} config={config} />
      </div>
    )
  }
}

export default ProductCalculator
