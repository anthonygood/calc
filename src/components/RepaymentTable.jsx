import React from 'react'

const commaSeparate = num =>
  num.toString()
    .split('')
    .reverse()
    .map((digit, i, arr) => i < arr.length - 1 && (i + 1) % 3 === 0 ? `,${digit}` : digit)
    .reverse()
    .join('')

const format = num =>
 commaSeparate(
   Math.round(num)
 )

const RepaymentItem = ({ interest, principal, total }) =>
  <tr>
    <td>{format(principal)}</td>
    <td>{format(interest)}</td>
    <td>{format(total)}</td>
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
      {repayments.map((repayment, i) => <RepaymentItem key={Object.values(repayment)} {...repayment} />)}
    </tbody>
  </table>

export default RepaymentTable
