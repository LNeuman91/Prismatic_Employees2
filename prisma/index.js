const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Prismatic Employees API.');
});

// Get all employees
app.get('/employees', async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.json(employees);
});

// Add a new employee
app.post('/employees', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send('Name is required.');
  const employee = await prisma.employee.create({ data: { name } });
  res.status(201).json(employee);
});

// Get an employee by ID
app.get('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const employee = await prisma.employee.findUnique({ where: { id: Number(id) } });
  if (!employee) return res.status(404).send('Employee not found.');
  res.json(employee);
});

// Update an employee by ID
app.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).send('Name is required.');
  const employee = await prisma.employee.update({
    where: { id: Number(id) },
    data: { name },
  }).catch(() => null);

  if (!employee) return res.status(404).send('Employee not found.');
  res.json(employee);
});

// Delete an employee by ID
app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const employee = await prisma.employee.delete({
    where: { id: Number(id) },
  }).catch(() => null);

  if (!employee) return res.status(404).send('Employee not found.');
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
