import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware för konvertera till json data
app.use(express.json());

let databaseFlowers = [];

// Test endpoint för server debugging
app.get('/', (req, res) => {
  res.status(200).json('Server is live');
});

// Hämta flower databas
app.get('/api/get-flowers', (req, res) => {
  res.status(200).json(databaseFlowers);
});

// Lägg till blommor
app.post('/api/add-flowers', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: 'No name request.' });
    return;
  }

  const flowers = {
    id: Date.now(),
    name: req.body.name,
    // specie: req.body.specie, // Nycklar som kanske bör finnas i databasen
    // moisture: req.body.moisture,
    // temperature: req.body.temperature,
    // humidity: req.body.humidity,
  };

  databaseFlowers.push(flowers);
  res.json(databaseFlowers);
});

// Ta bort blommor
app.delete('/api/remove-flower/:id', (req, res) => {
  const index = databaseFlowers.findIndex(
    (flower) => flower.id === parseInt(req.params.id)
  );

  if (index === -1) return res.status(404).json({ error: 'Flower not found' });

  databaseFlowers.splice(index, 1);
  res.json({ message: 'Flower deleted' });
});

// Updatera blommor
app.put('/api/update-flower/:id', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: 'No name request.' });
    return;
  }

  const flower = databaseFlowers.find((f) => f.id === parseInt(req.params.id));

  if (!flower) return res.status(404).json({ error: 'Flower not found' });

  flower.name = req.body.name;

  res.json(databaseFlowers);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is live http://localhost:${PORT}/`);
});
