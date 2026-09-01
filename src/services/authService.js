const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const employeeModel = require('../models/employeeModel');



async function login(email , password){
    const employee = await employeeModel.findbyemail(email);
    if (!employee) throw new Error("Invalid email or password")

    const match = await bcrypt.compare(password,employee.password_hash);
    if(!match) throw new Error("Invalid email or password")

    const token = jwt.sign(
        {emp_id : employee.emp_id,  role_id : employee.role_id ,Dept_id : employee.Dept_id,},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '8h'}

    );

     return {token , employee : { emp_id: Employee.emp_id, name: Employee.name, role: Employee.role_name }}
}

module.exports = {login};