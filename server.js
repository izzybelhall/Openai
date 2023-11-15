const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const openai = require('openai');

const app = express();
const port = 3000;

app.use(bodyParser.json());
/*app.use(cors({
    origin: 'http://127.0.0.1:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));*/
  


const openaiApiKey = process.env.OPENAI_API_KEY ; 
  
app.post('/api/get-reply', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  try { 
    const { messages } = req.body;

    const response = await new openai.Completion({ apiKey: openaiApiKey }).create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    const replyContent = response.choices[0].message.content;
    res.json({ replyContent });
  } catch (error) {
    console.error('Error fetching reply:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


