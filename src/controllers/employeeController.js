const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const employee = await prisma.employee.create({
      data: {
        name,
        salary
      }
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeByName = async (req, res) => {
  try {
    const { name } = req.params;
    const employee = await prisma.employee.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHighestPaidEmployee = async (req, res) => {
  try {
    const employee = await prisma.employee.findFirst({
      orderBy: {
        salary: 'desc'
      }
    });
    if (!employee) {
      return res.status(404).json({ error: 'No employees found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};