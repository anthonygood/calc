const RCF = (amount, durationMonths, interest) => {
  let outstanding = amount
  const principal = amount / durationMonths

  return Array.from({ length: durationMonths }).map(() => {
    const repaymentInterest = outstanding * (interest / 100)
    const repaymentTotal = principal + repaymentInterest

    // NB. interest only accrues against principal (not compound)
    outstanding -= principal

    return {
      principal,
      interest: repaymentInterest,
      total: repaymentTotal,
    }
  })
}

export default RCF
