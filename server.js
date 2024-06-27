const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.post('/api/getUserData', async (req, res) => {
  const { telegram_id } = req.body;
  try {
    const response = await fetch('https://app.leadteh.ru/api/v1/getListItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        api_token: 'DOlW2wu8eIkzv2eu5yONxq2SUHrSXlLvRrbsRgDjBjzENmPI2vZpDyIKC6kb',
        schema_id: '66766a7ee60a49ba79057c62'
      })
    });
    const data = await response.json();
    const userData = data.data.find(user => user.telegramId === telegram_id);
    if (userData) {
      res.json({ data: userData });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

app.post('/api/getListItems', async (req, res) => {
  try {
    const response = await fetch('https://app.leadteh.ru/api/v1/getListItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        api_token: 'DOlW2wu8eIkzv2eu5yONxq2SUHrSXlLvRrbsRgDjBjzENmPI2vZpDyIKC6kb',
        schema_id: '66766a7ee60a49ba79057c62'
      })
    });
    const data = await response.json();
    res.json({ data: data.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch list items' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
