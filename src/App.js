import React, { Component } from 'react'
import RCF from './models/RCF'
import BL from './models/BL'
import RepaymentTable from './components/RepaymentTable'
import './App.scss'

const Header = () =>
  <h1>Your loan</h1>

const Inputs = ({ amount, duration, onChange }) =>
  <form>
    <label html="amount">Amount (in £)</label>
    <input
      name="amount"
      value={amount}
      type="range"
      min="1000" max="200000" step="1000"
      onChange={({ target }) => onChange(target.value, duration)}
    />

  <label html="amount">Duration (in months)</label>
    <input
      name="duration"
      value={duration}
      type="range"
      min="1" max="24" step="1"
      onChange={({ target })  => onChange(amount, target.value)}
    />
  </form>

const DEFAULT_AMOUNT = 10000
const DEFAULT_DURATION = 6
const DEFAULT_INTEREST = 3.33

class RepaymentCalculator extends Component {
  state = {
    amount: DEFAULT_AMOUNT,
    duration: DEFAULT_DURATION,
    interest: DEFAULT_INTEREST,
    rcfRepayments: RCF(DEFAULT_AMOUNT, DEFAULT_DURATION, DEFAULT_INTEREST),
    blRepayments: BL(DEFAULT_AMOUNT, DEFAULT_DURATION, DEFAULT_INTEREST),
  }

  onInputChange = (amount, duration) => {
    const rcfRepayments = RCF(amount, duration, this.state.interest)
    const blRepayments = BL(amount, duration, this.state.interest)
    this.setState({
      amount,
      duration,
      rcfRepayments,
      blRepayments,
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Inputs amount={this.state.amount} duration={this.state.duration} onChange={this.onInputChange} />
        <RepaymentTable name="Revolving Credit Facility" repayments={this.state.rcfRepayments} />
        <RepaymentTable name="Business Loan" repayments={this.state.blRepayments} />
      </div>
    )
  }
}

export default RepaymentCalculator
