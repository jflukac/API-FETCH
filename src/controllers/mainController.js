// ******** Sequelize ***********

const { Product, Sequelize, Brand, Category } = require('../database/models');
const Op = Sequelize.Op;

module.exports = {
	index (req, res){
		 res.render('index')
	},

	// Ejemplo con async / await
	async search (req, res) {

		let products = await Product.findAll({
			where: {
				name: {
					[Op.substring]: req.query.search
				}
			},
			limit: 12
		});

		return res.render('results', { products: products.sort(() => Math.random() - 0.5), search: req.query.search })
	}
};