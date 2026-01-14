import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://afrqngfmyipkwpaymihp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI...'
const supabase = createClient(supabaseUrl, supabaseKey)

const countInput = document.getElementById('ffl-count')
const submitButton = document.getElementById('submit-count')

submitButton.addEventListener('click', async () => {
  const userCount = parseInt(countInput.value)
  if (!userCount || userCount < 0) return alert('Enter a valid number')

  await supabase.from('simulations').insert([{ user_count: userCount }])
  alert('Submitted! Refresh page to see updated histogram.')
})

