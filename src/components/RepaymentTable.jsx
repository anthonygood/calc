import React from 'react'
import { formatRepayment, moneyFmt } from '../view-helpers/formatRepayment'
import getTotals from '../view-helpers/getTotals'

const Row = ({ values }) =>
  <tr>
    {values.map(value => <td key={value}>{value}</td>)}
  </tr>

const toKey = (repayment, i) => `${i}:${Object.values(repayment)}`

const totals = repayment => Object.values(
  getTotals(repayment)
).map(moneyFmt)

const RepaymentTable = ({ repayments }) =>
  <div className="RepaymentTable">
    <table>
      <thead>
        <tr>
          <th>Repayment Date</th>
          <th>Principal</th>
          <th>Interest</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {repayments
          .map(formatRepayment)
          .map((repayment, i) => <Row key={toKey(repayment, i)} values={Object.values(repayment)} />)
        }
      </tbody>
      <tfoot>
        <Row values={['Total', ...totals(repayments)]} />
      </tfoot>
    </table>
  </div>

export default RepaymentTable
