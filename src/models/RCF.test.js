import moment from 'moment'
import RCF from './RCF'

const now = moment('2020-09-02')

describe('RCF loan', () => {
  describe('10,000 over 4 months at 3%', () => {
    const repayments = RCF(10000, 4, 3, now)
    const [one, two, three, four] = repayments

    it('returns array of 4 payments', () => {
      expect(repayments).toHaveLength(4)
    })

    it('each repayment has correct date', () => {
      repayments.forEach((repayment, i) =>
        expect(
          repayment.date.toString()
        ).toBe(
          now.clone().add(i + 1, 'month').toString()
        )
      )
    })

    it('each repayment has correct principal amount', () => {
      repayments.forEach(repayment =>
        expect(repayment.principal).toBe(2500)
      )
    })

    it('each repayment has correct interest attribute', () => {
      expect(one.interest).toBe(300)
      expect(two.interest).toBe(225)
      expect(three.interest).toBe(150)
      expect(four.interest).toBe(75)
    })

    it('each repayment has correct total attribute', () => {
      expect(one.total).toBe(2800)
      expect(two.total).toBe(2725)
      expect(three.total).toBe(2650)
      expect(four.total).toBe(2575)
    })
  })
})
