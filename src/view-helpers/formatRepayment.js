import moment from 'moment'

const DATE_FORMAT = 'DD/MM/YYYY'

const commaSeparate = num =>
  num.toString()
    .split('')
    .reverse()
    .map((digit, i, arr) => i < arr.length - 1 && (i + 1) % 3 === 0 ? `,${digit}` : digit)
    .reverse()
    .join('')

export const moneyFmt = num =>
 '£' + commaSeparate(
   Math.round(num)
 )

export const formatRepayment = ({ date, principal, interest, total }) => ({
  date: moment(date).format(DATE_FORMAT),
  principal: moneyFmt(principal),
  interest: moneyFmt(interest),
  total: moneyFmt(total),
})
