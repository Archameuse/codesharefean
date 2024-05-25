const Express = require('express')
const cors = require('cors')
require('dotenv').config()
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { apps } = require('firebase-admin');

const app = Express()
app.use(Express.json())
app.use(cors({}))


const PORT = process.env.PORT
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT)
if(!apps?.length) {
  initializeApp({
    credential: cert(serviceAccount)
  })
}
const db = getFirestore()
const collection = db.collection('codes')
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

app.get('/api/codes', async(req,res) => {
  const {id} = req.query
  if(!id) return res.status(400).json('Provide id')
  const doc = (await collection.doc(id).get()).data()
  if(!doc) return res.status(404).json('Not found')
  return res.json(doc)
})
app.post('/api/codes', async(req,res) => {
  const {code, language} = req.body
  if(!code) return res.status(400).json('Bad request, provide code')
  try {
    const resp = await collection.add({
      code,
      language: language??'javascript'
    })
    return res.status(200).json(resp.id)
  } catch (error) {
    return res.status(500).json(error)
  }
})
