import axios from 'axios'
import crypto from 'crypto'

let exports = module.exports = {};

exports.get = {
  token: async function(email, pass) {
    const json = await axios({
      method: 'POST',
      url: 'https://mobile-api-gateway.truemoney.com/mobile-api-gateway/api/v1/signin',
      headers: {
        Host: 'mobile-api-gateway.truemoney.com',
        'Content-Type': 'application/json',
      },
      data: {
        username: email,
        password: crypto.createHash('sha1').update(pass).digest('hex'),
        type: 'email'
      }
    })
    return json.data.accessToken
  },
  balance: async function(token) {
    const json = await axios({
      method: 'GET',
      url: `https://mobile-api-gateway.truemoney.com/mobile-api-gateway/api/v1/profile/balance/${token}`,
      headers: {
        Host: 'mobile-api-gateway.truemoney.com',
      }
    })
    return json.data
  },
  profile: async function(token) {
    const json = await axios({
      method: 'GET',
      url: `https://mobile-api-gateway.truemoney.com/mobile-api-gateway/api/v1/profile/${token}`,
      headers: {
        Host: 'mobile-api-gateway.truemoney.com',
      }
    })
    return json.data
  }
}

exports.fetch = {
  activity: async function(token, start, end, limit = 25) {
    const json = await axios({
      method: 'GET',
      url: `https://mobile-api-gateway.truemoney.com/mobile-api-gateway/user-profile-composite/v1/users/transactions/history?start_date=${start}&end_date=${end}&limit=${limit}`,
      headers: {
        Host: 'mobile-api-gateway.truemoney.com',
        Authorization: token,
      }
    })
    return json.data.activities
  },
  txDetail: async function(token, id) {
    // TODO: Code
  }
}

exports.cashcard = {
  topup: async function(token, cashcard) {
    // TODO: Code
  },
  buy: {
    request: async function(token, mobile, amount) {
      // TODO: Code
    },
    confirm: async function(token, draft, mobile, otp, otpRef) {
      // TODO: Code
    }
  }
}

exports.logout = async function(token) {
  const json = await axios({
    method: 'GET',
    url: `https://mobile-api-gateway.truemoney.com/mobile-api-gateway/api/v1/signout/${token}`,
    headers: {
      Host: 'mobile-api-gateway.truemoney.com',
    }
  })
  return json.data
}