const authService = require('../services/authService.js')

async function login(req , res){
    try {
        const {email , password} = req.body;
         if(!email || !password){
            return res.status(400).json({message : " email and password is required"});
         }

         const result = await authService.login(email ,password);
         res.json(result);
        
    } catch (error) {
        res.status(401).json({ message: err.message });
    }

}

module.exports = {login};