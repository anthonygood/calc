import React from 'react'
import { render } from '@testing-library/react'
import RepaymentTable from './RepaymentTable'

describe('RepaymentTable', () => {
  const repayments = [
    { principal: 10, interest: 5,     total: 15     },
    { principal: 10, interest: 1.123, total: 11.123 }
  ]

  it('renders table heading', () => {
    const { getByText } = render(<RepaymentTable repayments={repayments} />)

    ;['Principal', 'Interest', 'Total'].forEach(heading =>
      expect(getByText(heading)).toBeInTheDocument()
    )
  })

  it('renders ROUNDED repayment values', () => {
    const { getAllByText } = render(<RepaymentTable repayments={repayments} />)

    expect(getAllByText('10')).toHaveLength(2)

    expect(getAllByText('5')).toHaveLength(1)
    expect(getAllByText('15')).toHaveLength(1)

    expect(getAllByText('1')).toHaveLength(1)
    expect(getAllByText('11')).toHaveLength(1)
  })

  it('formats thousands with separator', () => {
    const repayments = [{ principal: 10000, interest: 500, total: 10500 }]
    const { getByText } = render(<RepaymentTable repayments={repayments} />)

    expect(getByText('10,000')).toBeInTheDocument()
    expect(getByText('10,500')).toBeInTheDocument()
  })
})
