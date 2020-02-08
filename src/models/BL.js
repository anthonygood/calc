import RCF from './RCF'

const BL = (amount, durationMonths, interest) => {
  const upfrontFees = amount * 0.1
  const [firstRepayment, ...rest] = RCF(amount, durationMonths, interest)

  firstRepayment.interest += upfrontFees
  firstRepayment.total += upfrontFees

  return [firstRepayment, ...rest]
}

export default BL
