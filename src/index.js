const axios = require('axios')
const crypto = require('crypto')

var exports = (module.exports = {})

exports.get = {
  token: function(email, pass) {
    axios({
      method: 'POST',
      url: 'https://mobile-api-gateway.truemoney.com/mobile-api-gateway/api/v1/signin',
      headers: {
        Host: 'mobile-api-gateway.truemoney.com',
        'Content-Type': 'application/json',
      },
      data: {
        username: email,
        password: crypto
          .createHash('sha1')
          .update(email + pass)
          .digest('hex'),
        type: 'email',
      },
    })
      .then(function(json) {
        return json.data.data.accessToken
      })
      .catch(function(e) {
        console.log(e.response.data)
      })
  },
  balance: function(token) {
    axios({
      method: 'GET',
      url: `https://mobile-api-gateway.truemoney.com/mobile-api-gateway/api/v1/profile/balance/${token}`,
      headers: {
        Host: 'mobile-api-gateway.truemoney.com',
      },
    })
      .then(function(json) {
        return json.data.data
      })
      .catch(function(e) {
        console.log(e.data)
      })
  },
  profile: function(token) {
    axios({
      method: 'GET',
      url: `https://mobile-api-gateway.truemoney.com/mobile-api-gateway/api/v1/profile/${token}`,
      headers: {
        Host: 'mobile-api-gateway.truemoney.com',
      },
    })
      .then(function(json) {
        return json.data.data
      })
      .catch(function(e) {
        console.log(e.data)
      })
  },
}

exports.fetch = {
  activity: function(token, start, end, limit = 25) {
    axios({
      method: 'GET',
      url: `https://mobile-api-gateway.truemoney.com/mobile-api-gateway/user-profile-composite/v1/users/transactions/history?start_date=${start}&end_date=${end}&limit=${limit}`,
      headers: {
        Host: 'mobile-api-gateway.truemoney.com',
        Authorization: token,
      },
    })
      .then(function(json) {
        return json.data.data.activities
      })
      .catch(function(e) {
        console.log(e.data)
      })
  },
  txDetail: function(token, id) {
    axios({
      method: 'GET',
      url: `https://mobile-api-gateway.truemoney.com/mobile-api-gateway/user-profile-composite/v1/users/transactions/history/detail/${id}`,
      headers: {
        Host: 'mobile-api-gateway.truemoney.com',
        Authorization: token,
      },
    })
      .then(function(json) {
        return json.data.data
      })
      .catch(function(e) {
        console.log(e.data)
      })
  },
}

exports.cashcard = {
  topup: function(token, cashcard) {
    const time = Date.now()
    axios({
      method: 'POST',
      url: `https://mobile-api-gateway.truemoney.com/mobile-api-gateway/api/v1/topup/mobile/${time}/${token}/cashcard/${cashcard}`,
      headers: {
        Host: 'mobile-api-gateway.truemoney.com',
      },
    })
      .then(function(json) {
        return json.data.data
      })
      .catch(function(e) {
        console.log(e.data)
      })
  },
  buy: {
    request: function(token, mobile, amount) {
      axios({
        method: 'POST',
        url: `https://mobile-api-gateway.truemoney.com/mobile-api-gateway/api/v1/buy/e-pin/draft/verifyAndCreate/${token}`,
        headers: {
          Host: 'mobile-api-gateway.truemoney.com',
          'Content-Type': 'application/json',
        },
        data: {
          recipientMobileNumber: mobile,
          amount: amount,
        },
      })
        .then(function(json) {
          return json.data.data
        })
        .catch(function(e) {
          console.log(e.data)
        })
    },
    confirm: function(token, draft, mobile, otp, otpRef) {
      const time = Date.now()
      axios({
        method: 'PUT',
        url: `https://mobile-api-gateway.truemoney.com/mobile-api-gateway/api/v1/buy/e-pin/confirm/${draft}/${token}`,
        headers: {
          Host: 'mobile-api-gateway.truemoney.com',
          'Content-Type': 'application/json',
        },
        data: {
          mobileNumber: mobile,
          otpString: otp,
          otpRefCode: otpRef,
          timestamp: time,
        },
      })
        .then(function(json) {
          return json.data.data
        })
        .catch(function(e) {
          console.log(e.data)
        })
    },
  },
}

exports.logout = function(token) {
  axios({
    method: 'GET',
    url: `https://mobile-api-gateway.truemoney.com/mobile-api-gateway/api/v1/signout/${token}`,
    headers: {
      Host: 'mobile-api-gateway.truemoney.com',
    },
  })
    .then(function(json) {
      return json.data.data
    })
    .catch(function(e) {
      console.log(e.data)
    })
}
