import fetch from 'node-fetch'

const url =
  'http://localhost:3000/user-balance/39b7468a-604a-4637-b959-548ba5de3bb1'
const requestData = {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ delta: -2 }),
}

const runLoadTest = async () => {
  const statusCount = { 200: 0, 400: 0, other: 0 }

  const requests = Array.from({ length: 10000 }, () => fetch(url, requestData))
  const responses = await Promise.allSettled(requests)

  for (const result of responses) {
    if (result.status === 'fulfilled') {
      const statusCode = result.value.status
      if (statusCode === 200) {
        statusCount['200']++
      } else if (statusCode === 400) {
        statusCount['400']++
      } else {
        statusCount.other++
      }
    } else {
      statusCount.other++
    }
  }

  console.log('Results:')
  console.log(`✅ 200: ${statusCount['200']}`)
  console.log(`⚠️ 400: ${statusCount['400']}`)
  console.log(`❌ Other: ${statusCount.other}`)
}

runLoadTest()
