const User = require ('../models/User');
const bcrypt = require ('bcrypt');
const Associates = require ('../models/Associates')
const Owner = require ('../models/Owners')


module.exports = {

    // FUNÇÃO PARA LISTAR USUÁRIOS (Não necessário)
    async list(req, res){
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        }
        );

        return res.json(users)
    },
    

    // FUNÇÃO PARA ATUALIZAR REGISTRO USUÁRIO
    


    async solicitedAssociated (req, res){

        const { cpf_u, email_u, pass_u, telefone_u } = req.body;


                 const user = await User.update(
                         {
                        email: email_u,
                        pass: pass_u,
                        telefone: telefone_u },
                        { where: { doc: cpf_u } }
                        )
                        if(!user){
                            return res.status(401).send('User does not exists')
                        }
                        return res.status(201).send('User updated')
              
    },
 
  
    
}