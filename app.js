// app.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Connect to Supabase
const supabaseUrl = 'https://afrqngfmyipkwpaymihp.supabase.co'
const supabaseKey = 'YOUR_ANON_KEY_HERE'  // Paste your anon/public key from Supabase
const supabase = createClient(supabaseUrl, supabaseKey)

// Submit button logic
document.getElementById('submit-count').addEventListener('click', async () => {
  const count = parseInt(document.getElementById('ffl-count').value)
  if (isNaN(count) || count < 0) {
    alert('Please enter a valid number.')
    return
  }

  const { error } = await supabase.from('simulations').insert([{ user_count: count }])
  if (error) {
    console.error(error)
    alert('Error saving your response.')
  } else {
    alert('Thanks! Your response was saved.')
    loadHistogram()
  }
})

// Load histogram from saved counts
async function loadHistogram() {
  const { data, error } = await supabase.from('simulations').select('user_count')
  if (error) {
    console.error(error)
    return
  }

  const counts = data.map(row => row.user_count)
  const countMap = {}

  counts.forEach(c => {
    countMap[c] = (countMap[c] || 0) + 1
  })

  const labels = Object.keys(countMap).sort((a, b) => a - b)
  const values = labels.map(l => countMap[l])

  const ctx = document.getElementById('histogram').getContext('2d')
  if (window.histogramChart) {
    window.histogramChart.destroy()
  }

  window.histogramChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Number of Students',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      }]
    },
    options: {
      responsive: false,
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Number of Students' } },
        x: { title: { display: true, text: 'FFL Count Entered' } }
      }
    }
  })
}

// Run on page load
loadHistogram()
