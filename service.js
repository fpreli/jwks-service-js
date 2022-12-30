const fs = require('fs');
const jose = require('node-jose');
const jwktopem = require('jwk-to-pem')
const jwt = require('jsonwebtoken')
const axios = require('axios');

var express = require('express');
var router = express();

router.get('/rotate/ec', async (req, res) => {
  const keyStore = jose.JWK.createKeyStore()
  keyStore.generate('EC', 'P-256', {alg: 'ES256', use: 'sig', x: 'drUef3Fq_k496CUnMHWcwLeL8X6-z03Tg20tBlIQ1v4', y: '0BTWRnwr5Sgo7iw3gpe-UO_vldShnvPDnrG80UUA5VA', d: '0g5vAEKzugrXaRbgKG0Tj2qJ5lMP4Bezds1_sTybkfk'})
    .then(result => {
      fs.writeFileSync(
      'keys_ec.json',
      JSON.stringify(keyStore.toJSON(true), null, '  ')
      )
    })
    res.send('EC Key Rotated')
})

router.get('/rotate/rsa', async (req, res) => {
        const keyStore = jose.JWK.createKeyStore()
        keyStore.generate('RSA', 2048, {alg: 'RS256', use: 'sig' })
        .then(result => {
          fs.writeFileSync(
            'keys_rsa.json', 
            JSON.stringify(keyStore.toJSON(true), null, '  ')
          )
        })
res.send('RSA Key Rotated')
})

router.get('/jwks/ec', async (req, res) => {
  const ks = fs.readFileSync('keys_ec.json')
  const keyStore = await jose.JWK.asKeyStore(ks.toString())
  res.send(keyStore.toJSON())
})

router.get('/jwks/rsa', async (req, res) => {
  const ks = fs.readFileSync('keys_rsa.json')
  const keyStore = await jose.JWK.asKeyStore(ks.toString())
  res.send(keyStore.toJSON())
})

router.get('/token/ec', async (req, res) => {
    const ks = fs.readFileSync('keys.json')
    const keyStore = await jose.JWK.asKeyStore(ks.toString())
    const [key] = keyStore.all({ use: 'sig' })

    const payload = JSON.stringify({
        sub: 'apigee-test-subject',
        aud: 'apigee-test-aud',
    })

    const token = await jose.JWS.createSign({alg: "ES256", format: 'compact'}, key)
        .update(payload, "utf8")
        .final()
    res.send({ token })
})

router.get('/token/rsa', async (req, res) => {
  const ks = fs.readFileSync('keys_rsa.json')
  const keyStore = await jose.JWK.asKeyStore(ks.toString())
  const [key] = keyStore.all({ use: 'sig' })
  
  const opt = { compact: true, jwk: key, fields: { typ: 'jwt' } }
  const payload = JSON.stringify({
    sub: 'apigee-test-subject',
    aud: 'apigee-test-aud'
  })
  const token = await jose.JWS.createSign(opt, key)
    .update(payload)
    .final()
  res.send({ token })
})

router.listen(3000);
