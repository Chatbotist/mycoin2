const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/api/getListItems', async (req, res) => {
  const apiUrl = 'https://app.leadteh.ru/api/v1/getListItems';
  const { api_token, schema_id } = req.body;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        api_token: api_token || 'DOlW2wu8eIkzv2eu5yONxq2SUHrSXlLvRrbsRgDjBjzENmPI2vZpDyIKC6kb',
        schema_id: schema_id || '66766a7ee60a49ba79057c62'
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
