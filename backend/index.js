require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { analyzeImage } = require('./analyzeImage');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());
app.use(express.json());

app.post('/analyze', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  const filePath = req.file.path;  

  try {
    const analysis = await analyzeImage(filePath);
    res.json({ result: analysis });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao analisar imagem' });
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001 🚀');
});