import React, { Component } from 'react'
import RCF from './models/RCF'
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

const RepaymentItem = ({ interest, principal, total }) =>
  <tr>
    <td>{principal}</td>
    <td>{interest}</td>
    <td>{total}</td>
  </tr>

const RepaymentTable = ({ repayments = [] }) =>
  <table>
    <thead>
      <tr>
        <th>Principal</th>
        <th>Interest</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {repayments.map(repayment => <RepaymentItem key={JSON.stringify(repayment)} {...repayment} />)}
    </tbody>
  </table>

const DEFAULT_AMOUNT = 10000
const DEFAULT_DURATION = 4
const DEFAULT_INTEREST = 3

class RepaymentCalculator extends Component {
  state = {
    amount: DEFAULT_AMOUNT,
    duration: DEFAULT_DURATION,
    interest: DEFAULT_INTEREST,
    rcfRepayments: RCF(DEFAULT_AMOUNT, DEFAULT_DURATION, DEFAULT_INTEREST)
  }

  onInputChange = (amount, duration) => {
    const rcfRepayments = RCF(amount, duration, this.state.interest)
    this.setState({
      amount,
      duration,
      rcfRepayments
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Inputs amount={this.state.amount} duration={this.state.duration} onChange={this.onInputChange} />
        <RepaymentTable repayments={this.state.rcfRepayments} />
      </div>
    )
  }
}

export default RepaymentCalculator
