// models/employeeModel.js
const pool = require('../config/db');

async function findByEmail(email) {
    const [rows] = await pool.query(
        `SELECT e.*, r.role_name FROM Employee e
         JOIN roles r ON e.role_id = r.role_id
         WHERE e.email = ?`,
        [email]
    );
    return rows[0] || null;
}

async function findById(empId) {
    const [rows] = await pool.query(
        `SELECT e.*, r.role_name FROM employee e
         JOIN roles r ON e.role_id = r.role_id
         WHERE e.Emp_id = ?`,
        [empId]
    );
    return rows[0] || null;
}

async function updateStatus(empId, status) {
  await pool.query("UPDATE employees SET status = ? WHERE Emp_id = ?", [status, empId]);
  return findById(empId);
}

async function create({ name, email, passwordHash, roleId, deptId, reportingTo }) {
    const [result] = await pool.query(
        `INSERT INTO employee (name, email, password_hash, role_id, Dept_id, reporting_to, status,)
         VALUES (?, ?, ?, ?, ?, ?, 'active')`,
        [name, email, passwordHash, roleId, deptId, reportingTo]
    );
    return result.insertId; // this is the new Emp_id
}

async function findDirectReports(empId) {
  const [rows] = await pool.query("SELECT * FROM employees WHERE reporting_to = ?", [empId]);
  return rows;
}

module.exports = { findByEmail, findById, create, updateStatus, findDirectReports };