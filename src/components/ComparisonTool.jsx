import React, { Component } from 'react'

import RCF from '../models/RCF'
import BL from '../models/BL'
import ProductApi from '../apis/ProductsApi'
import Inputs from './Inputs'
import ProductCalculator from './ProductCalculator'

const DEFAULT_AMOUNT = 10000
const DEFAULT_DURATION = 6
const DEFAULT_INTEREST = 3.33

class ComparisonTool extends Component {
  constructor(props) {
    super(props)
    this.products = new ProductApi()
    this.state = {
      amount: DEFAULT_AMOUNT,
      duration: DEFAULT_DURATION,
      interest: DEFAULT_INTEREST,
      products: {
        RCF: this.products.RCF,
        BL: this.products.BL,
      }
    }
  }

  componentDidMount() {
    this.products.get().then(() => {
      this.setState({
        products: {
          RCF: this.products.RCF,
          BL: this.products.BL,
        }
      })
    })
  }

  render() {
    const {
      amount,
      duration,
      products
    } = this.state

    return (
      <div className="ComparisonTool">
        <h1>Your loan</h1>
        <Inputs amount={amount} duration={duration} onChange={this.onInputChange} />

        <ProductCalculator
          name="Revolving Credit Facility"
          amount={amount}
          duration={duration}
          config={products.RCF}
          calculateRepayments={RCF}
        />

        <ProductCalculator
          name="Business Loan"
          amount={amount}
          duration={duration}
          config={products.BL}
          calculateRepayments={BL}
        />
      </div>
    )
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
}

export default ComparisonTool
