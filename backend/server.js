import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

// In-memory store (replace with DB later)
const submissions = []

app.post('/api/contact', (req, res) => {
  const { name, email, company, role, message, interest, type } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' })
  }

  const entry = {
    id: Date.now(),
    type: type || 'brand',
    name,
    email,
    company: company || '',
    role: role || '',
    message: message || '',
    interest: interest || '',
    createdAt: new Date().toISOString()
  }

  submissions.push(entry)

  console.log(`\n📬 New ${entry.type} submission:`)
  console.log(`   Name: ${entry.name}`)
  console.log(`   Email: ${entry.email}`)
  if (entry.company) console.log(`   Company: ${entry.company}`)
  if (entry.interest) console.log(`   Interest: ${entry.interest}`)
  if (entry.message) console.log(`   Message: ${entry.message.slice(0, 80)}…`)

  res.json({ ok: true, message: "Thanks! We'll be in touch soon." })
})

app.get('/api/submissions', (req, res) => {
  res.json({ count: submissions.length, data: submissions })
})

app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }))

app.listen(PORT, () => {
  console.log(`🚀 Creator's Crew backend running on http://localhost:${PORT}`)
})
