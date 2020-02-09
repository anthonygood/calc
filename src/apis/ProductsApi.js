const PRODUCTS_URL = 'http://www.mocky.io/v2/5d4aa9e93300006f000f5ea9'

class Product {
  constructor({
    amount_min = 1000,
    amount_max = 200000,
    duration_min = 1,
    duration_max = 60
  } = {}) {
    this.amount = {
      min: amount_min,
      max: amount_max,
    }
    this.duration = {
      min: duration_min,
      max: duration_max,
    }
  }
}

/* Example payload:
{
    "revolving_credit_facility": {
        "amount_min": 1000,
        "amount_max": 150000,
        "duration_min": 1,
        "duration_max": 12
    },
    "business_loan": {
        "amount_min": 10000,
        "amount_max": 200000,
        "duration_min": 1,
        "duration_max": 60
    }
}
*/
const get = () => fetch(PRODUCTS_URL).then(response =>
  response.ok && response.json()
)

class ProductApi {
  constructor() {
    // Default values until data is fetched
    this.RCF = new Product()
    this.BL = new Product()
  }

  get() {
    return get().then(json => {
      if (json) {
        const { revolving_credit_facility, business_loan } = json
        this.RCF = new Product(revolving_credit_facility)
        this.BL = new Product(business_loan)
      }
    })
  }
}

export default ProductApi
