const { Product, Sequelize, Brand, Category } = require('../../database/models');
const Op = Sequelize.Op;

module.exports = {
    latest: (req, res) => {
        Product.findAll({
			order: [
				['createdAt', 'DESC']
			],
			limit: 8
		})
        .then( ultimos => {
            let ultimosResponse = {
                "meta": {
                    "status": 200,
                    "count": ultimos.length,
                    "url": "api/products/latest"
                },
                "data": ultimos
            }
            return res.json(ultimosResponse)
        })
        .catch(error=> {
            console.log(error);
            return res.send(error)
        })
    },
    offers: (req, res) => {
        Product.findAll({
			where: {
				discount: {
					[Op.gt]: 0
				}
			},
			limit: 8
		})
        .then( ofertas => {
            let ofertasResponse = {
                "meta": {
                    "status": 200,
                    "count": ofertas.length,
                    "url": "api/products/offers"
                },
                "data": ofertas
            }
            return res.json(ofertasResponse)
        })
        .catch(error=> {
            console.log(error);
            return res.send(error)
        })
    },
    categories: (req, res) => {
        let where = {};
		let products = [];
        let response = function(products){
            return res.json({
                "meta": {
                "status": 200,
                "productsCount": products.length,
                "url": "api/products/categories" + (req.params.category ? '/' + req.params.category :'')
                },
                "data": products
            })
        }
        if (req.params.category) {
            Category.findOne({
                where: {
                    name: req.params.category
                },
                include: ['products']
            })
            .then(category => {
                if (category) {
                    products = category.products
                }
                return response(products)
            })
        } else {
            Product.findAll(where)
            .then(products => {
                return response(products)
            })
        }
    } 
  
}