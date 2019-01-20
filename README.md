truewallet
==========

[![Build Status](https://travis-ci.org/rayriffy/truewallet.svg?branch=master)](https://travis-ci.org/rayriffy/truewallet)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/89a51596e35441998bee1025c0363143)](https://www.codacy.com/app/rayriffy/truewallet?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rayriffy/truewallet&amp;utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/v/truewallet.svg)](https://www.npmjs.com/package/truewallet)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

True Wallet API for JS

Install
-------

```bash
yarn add truewallet
```

Examples
--------

### Login and Logout

```javascript
const truewallet = require('truewallet')

// Get token with email and password
var token = truewallet.get.token('example@example.com', 'p4ssw0rd')

// Logout
truewallet.logout(token)
```

### Check balance

```javascript
const truewallet = require('truewallet')

// Get token with email and password
var token = truewallet.get.token('example@example.com', 'p4ssw0rd')

// Check scuccessfully login
if(token !== null) {
  var profile = truewallet.get.profle(token)
  console.log(profile)

  // Logout
  truewallet.logout(token)
}
```

### Topup TrueMoney Cashcard

```javascript
const truewallet = require('truewallet')

// Get token with email and password
var token = truewallet.get.token('example@example.com', 'p4ssw0rd')

// Check scuccessfully login
if(token !== null) {
  var topup = truewallet.cashcard.topup(token, '00000000000000')

  // Logout
  truewallet.logout(token)
}
```

### Fetch Tx

```javascript
const moment = require('moment')
const truewallet = require('truewallet')

// Get token with email and password
var token = truewallet.get.token('example@example.com', 'p4ssw0rd')

// Check scuccessfully login
if(token !== null) {
  var startDate= moment().subtract(1, 'days').format('YYYY-MM-DD')
  var endDate= moment().add(1, 'days').format('YYYY-MM-DD')

  var activities = truewallet.fetch.activity(token, startDate, endDate)
  console.log(activities)

  // Logout
  truewallet.logout(token)
}
```

### Get Tx detailes by ID

```javascript
const moment = require('moment')
const truewallet = require('truewallet')

// Get token with email and password
var token = truewallet.get.token('example@example.com', 'p4ssw0rd')

// Check scuccessfully login
if(token !== null) {
  var startDate= moment().subtract(1, 'days').format('YYYY-MM-DD')
  var endDate= moment().add(1, 'days').format('YYYY-MM-DD')

  var activities = truewallet.fetch.activity(token, startDate, endDate)

  activities.forEach(function(activity) {
    if(activity.original_action === 'creditor') {
      var data = truewallet.fetch.txDetail(token, data.report_id)

      // Tx ID
      var txId = data.section4.column2.cell1.value

      // Value
      var txValue = data.section3.column1.cell1.value.replace(',', '')

      console.log(txId)
      console.log(txValue)
    }
  })

  // Logout
  truewallet.logout(token)
}
```

Contributing
------------

We welcome all contributions by sending PR to this repository.

Need Help
---------

If you need help with anything, here're following methods:

### Create an Issue

If you have something you want to discuss in detail, or have hit an issue which you believe others will also have in deployment or development of the system, [opening an issue](https://github.com/rayriffy/truewallet/issues) is the best way to get help. It creates a permanent resource for others wishing to contribute to conversation.

Donation
--------

You can feed me by donating money via [Bank Account](https://storage.rayriffy.com/files/image/BANK_ACCOUNT.png) or [PromptPay](https://storage.rayriffy.com/files/image/PROMPTPAY.png)