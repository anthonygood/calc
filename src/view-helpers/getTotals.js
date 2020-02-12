const getTotals = repayments => repayments.reduce((acc, item) => ({
  principal: acc.principal + item.principal,
  interest:  acc.interest  + item.interest,
  total:     acc.total     + item.total,
}), {
  principal: 0,
  interest: 0,
  total: 0 }
)

export default getTotals
