import moment from 'moment'

const RCF = (amount, durationMonths, interest, now = moment()) => {
  let outstanding = amount
  const principal = amount / durationMonths

  return Array.from({ length: durationMonths }).map((_, i) => {
    const date = now.clone().add(i + 1, 'month')
    const repaymentInterest = outstanding * (interest / 100)
    const repaymentTotal = principal + repaymentInterest

    // NB. interest only accrues against principal (not compound)
    outstanding -= principal

    return {
      date,
      principal,
      interest: repaymentInterest,
      total: repaymentTotal,
    }
  })
}

export default RCF
