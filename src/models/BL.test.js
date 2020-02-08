import BL from './BL'

describe('BL', () => {
  describe('10,000 over 4 months at 3%', () => {
    const repayments = BL(10000, 4, 3)
    const [one, two, three, four] = repayments

    it('returns array of 4 payments', () => {
      expect(repayments).toHaveLength(4)
    })

    it('each repayment has correct principal amount', () => {
      repayments.forEach(repayment =>
        expect(repayment.principal).toBe(2500)
      )
    })

    it('correctly applies 10% fee to first month\s interest', () => {
      expect(one.interest).toBe(1300)
    })

    it('returns correct interest for other repayments', () => {
      expect(two.interest).toBe(225)
      expect(three.interest).toBe(150)
      expect(four.interest).toBe(75)
    })

    it('each repayment has correct total attribute', () => {
      expect(one.total).toBe(3800)
      expect(two.total).toBe(2725)
      expect(three.total).toBe(2650)
      expect(four.total).toBe(2575)
    })
  })
})
