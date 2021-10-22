const express = require ('express')
const routes = express.Router();

const authMiddleware = require ('./middlewares/auth');
const authAdmin = require ('./middlewares/authAdmin');
const multer =  require ('multer');
const multerConfig = require ('./middlewares/multer');

const AdminController = require ('./controllers/AdminController');
const BusinessController = require ('./controllers/BusinessController');
//const CategoriesController = require ('./controllers/CategorieController');
const OwnersController = require ('./controllers/OwnersController');
const AssociatesController = require ('./controllers/AssociatesController');
const AuthorizationsController = require ('./controllers/AuthorizationsController');
const AdvertsController = require ('./controllers/AdvertsController');
const AuthController = require ('./controllers/AuthController');
const PhotoController = require ('./controllers/PhotoAdvertsController');
const UserController = require ('./controllers/UserController');
const ContactsController = require('./controllers/ContactsController');
//const CnpjController = require ('./controllers/CnpjController');

// USUÁRIO ENTRA NO PORTAL:
routes.use('/index', express.static('rota default'));

// Rota para testes
routes.get('/users', UserController.list);

// ROTA PARA VALIDAR LOGIN ASSOCIADO
routes.post('/loginComprador', AuthController.validateAssociate)

// ROTA PARA VALIDAR LOGIN OWNERS

routes.post('/loginVendedor', AuthController.validateOwner);


// ROTA PARA ESQUECI MINHA SENHA
routes.post('/esqueceuSenha', AuthController.forgotPassword);
routes.post('/resetarSenha', AuthController.resetPassword);

// USUÁRIO ESCOLHE *EU COMPRO*:
routes.post('/registrarComprador', AssociatesController.searchAssociate);
// USUÁRIO ESCOLHE *EU VENDO*:
routes.post('/registrarVendedor', OwnersController.searchOwner)

// ROTAS PARA ADMINISTRADOR
routes.get('/admin/login', AuthController.validateAdmin);
routes.put('/admin/owners', authAdmin, AdminController.habilitedOwner);
routes.put('/admin/associates', authAdmin, AdminController.habilitedAssociate);

// ROTAS AUTHORIZATIONS
routes.get('/autorizacao', authMiddleware, AuthorizationsController.listener);

routes.get('/autorizacao/:id', authMiddleware, AuthorizationsController.show);

routes.post('/autorizacao', authMiddleware, AuthorizationsController.created);

routes.delete('/autorizacao/:id', authMiddleware, AuthorizationsController.deleted);

// CATEGORIES - ***** COLOCAR MIDDLEWARE DE AUTENTICAÇÃO PARA SOMENTE ADMIN CRIAR"
/*
routes.post('/categories', CategoriesController.store);
routes.get('/categories', CategoriesController.listener);,
*/

/* ROTAS PARA CNPJS DIFERENTES *** EM desuso
routes.post('/cnpj/criar', authMiddleware, CnpjController.create);
routes.post('/cnpj/dados', authMiddleware, CnpjController.listener);
//routes.delete('/cnpj/delete/:id', authMiddleware, CnpjController.delete);
*/

// ROTAS PARA OWNERS PARA CONTROLE DE BUSINESS
routes.post('/negocio/dados', authMiddleware, BusinessController.businessOfUser);
//routes.post('/negocio/dadosBusinesses', authMiddleware, BusinessController.informBusinesses);
routes.put('/negocio/atualizar', authMiddleware, multer(multerConfig).single('file'), BusinessController.updated);
routes.put('/negocio/logo', authMiddleware, multer(multerConfig).single('file'), BusinessController.appendImage);
routes.post('/negocio/criar', authMiddleware, multer(multerConfig).single('file'), BusinessController.created);
routes.get('/negocio/listar', BusinessController.listener);

routes.get('/negocio/inventario', authMiddleware, AuthorizationsController.inventory);

// ROTAS PARA CONTATOS
routes.post('/contatos/criar', authMiddleware, ContactsController.create);
routes.put('/contatos/atualizar', authMiddleware, ContactsController.update);
routes.get('/contatos/:id', authMiddleware, ContactsController.find);

// ROTAS PARA ADVERTS (ANÚNCIOS)
routes.post('/negocio/anuncio', authMiddleware, AdvertsController.store);
routes.get('/negocio/anuncio', authMiddleware, AdvertsController.list);
routes.get('/negocio/anuncio/:id', authMiddleware, AdvertsController.show);
routes.delete('/negocio/anuncio/:id', authMiddleware, AdvertsController.deleted);
routes.put('/negocio/anuncio', authMiddleware, AdvertsController.updated);

// ROTAS PARA GERENCIAMENTO DE FOTOS EM ANÚNCIOS
routes.post('/negocio/anuncio/:id/imagens', authMiddleware, multer(multerConfig).array('file', 5), PhotoController.appendImages);
routes.delete('/negocio/anuncio/:id/imagens', authMiddleware, PhotoController.deleteImages);

// ROTAS PARA LISTAGEM DE ANÚNCIO
routes.get('/anuncios/:id', authMiddleware, PhotoController.finded);
routes.get('/anuncios/:id', authMiddleware, PhotoController.findedAll);


// ROTA PARA ASSOCIATES VISUALIZAREM O DASHBOARD DE NEGOCIOS
routes.get('/painel', authMiddleware, BusinessController.listener);
// ROTA ADVERTS PARA ASSOCIATES
// ROTA PARA PESQUISAR ANÚNCIO PELO NOME
routes.post('/autorizacao/anuncio/explore_name', authMiddleware, AdvertsController.explore_for_name);
// ROTA PARA PESQUISAR TODOS OS ANÚNCIOS DO BUSINESS (PELO NOME)
routes.post('/autorizacao/anuncio/explore_business', authMiddleware, AdvertsController.explore_for_bs);
// ROTA PARA PESQUISAR TODOS OS ANÚNCIOS POR CATEGORIA
routes.post('/autorizacao/anuncio/explore_categorie', authMiddleware, AdvertsController.explore_for_categorie);

// ROTA PARA OWNERS CONSULTAREM SUAS AUTHORIZATIONS VINCULADAS AOS ASSOCIATES

module.exports = routes;


