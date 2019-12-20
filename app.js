'use strict';

const http = require('http')
const express = require('express');
const redis = require('redis')
const helmet = require('helmet')
const bluebird = require('bluebird')
const cookieParser = require('cookie-parser')

// Configure & Run the http server
const app = express();

// Bluebird Promise
bluebird.promisifyAll(redis)

// Creating Client Cache
const cache = redis.createClient()

// verify Connection Cache
cache.on('connect', () => {
	console.log('[REDIS] Connected...')
})
cache.on('error', (e) => {
	console.log('[Redis] Failed...', e)
})

// Promise
cache.getAsync('tii').then((res) => {
	console.log(res)
})

// @Middleware
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))
app.use(cookieParser())

// @Routes
app.get('/', (req, res) => {
	console.log(`Cookies: `, req.signedCookies)
	res.json({status: 'THE REDIS_NODE'})
})

// Create & Listen Server
app.listen(3000, () => {
  console.log('HTTP server running on port 80');
});
