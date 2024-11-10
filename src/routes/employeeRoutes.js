const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - salary
 *             properties:
 *               name:
 *                 type: string
 *               salary:
 *                 type: number
 */
router.post('/', employeeController.createEmployee);

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 */
router.get('/', employeeController.getEmployees);

/**
 * @swagger
 * /api/employees/name/{name}:
 *   get:
 *     summary: Get employee by name
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/name/:name', employeeController.getEmployeeByName);

/**
 * @swagger
 * /api/employees/highest-paid:
 *   get:
 *     summary: Get highest paid employee
 *     tags: [Employees]
 */
router.get('/highest-paid', employeeController.getHighestPaidEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;