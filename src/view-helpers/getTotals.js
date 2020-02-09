const getTotals = repayments => repayments.reduce((acc, item) => ({
  principal: acc.principal + item.principal,
  interest:  acc.interest  + item.interest,
  total:     acc.total     + item.total,
}))

export default getTotals
