import React from 'react'
import { render } from '@testing-library/react'
import RepaymentTable from './RepaymentTable'

describe('RepaymentTable', () => {
  const repayments = [
    { date: '2020-03-09', principal: 10, interest: 5,     total: 15     },
    { date: '2020-04-09', principal: 10, interest: 1.123, total: 11.123 }
  ]

  it('renders name', () => {
    const { getByText } = render(<RepaymentTable name="Foo" repayments={repayments} />)

    expect(getByText('Foo')).toBeInTheDocument()
  })

  it('renders table headings', () => {
    const { getByText, getAllByText } = render(<RepaymentTable repayments={repayments} />)

    ;['Repayment Date', 'Principal', 'Interest'].forEach(heading =>
      expect(getByText(heading)).toBeInTheDocument()
    )

    expect(getAllByText('Total')).toHaveLength(2)
  })

  it('renders FORMATTED payment dates', () => {
    const { getByText } = render(<RepaymentTable repayments={repayments} />)

    expect(getByText('09/03/2020')).toBeInTheDocument()
  })

  it('renders FORMATTED repayment values', () => {
    const { getAllByText } = render(<RepaymentTable repayments={repayments} />)

    expect(getAllByText('£10')).toHaveLength(2)

    expect(getAllByText('£5')).toHaveLength(1)
    expect(getAllByText('£15')).toHaveLength(1)

    expect(getAllByText('£1')).toHaveLength(1)
    expect(getAllByText('£11')).toHaveLength(1)
  })

  it('formats thousands with separator', () => {
    const repayments = [{ principal: 10000, interest: 500, total: 10500 }]
    const { getAllByText } = render(<RepaymentTable repayments={repayments} />)

    expect(getAllByText('£10,000')).toHaveLength(2)
    expect(getAllByText('£10,500')).toHaveLength(2)
  })

  it('renders totals as bottom row', () => {
    const repayment = { principal: 1000, interest: 30, total: 1030 }
    const { getByText } = render(<RepaymentTable repayments={[repayment, repayment]} />)

    expect(getByText('£2,000')).toBeInTheDocument()
    expect(getByText('£2,060')).toBeInTheDocument()
  })
})
