const Notifications = require ('../models/Notifications');

module.exports = {

    // FUNÇÃO PARA LISTAR Notificações
    async list(req, res){
        const notification = await Notifications.findAll();

        return res.json(notification)
    },
    // FUNÇÃO PARA CRIAR Notificações
    /*async store(req, res){

        const { doc } = req.body;
        // pegar doc do corpo da requisição e fazer uma junção da tabela User para preencher o User_id ao qual aquele doc pertence

        const notification = await Notifications.create({
            doc,
        });

        return res.json(notification);
    }*/
}