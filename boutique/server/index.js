const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schemas/index.js');

const port = 4000;

app.use(cors());
dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.STRING_URI);

//API Rest
const Product = require('./models/product');
app.get('/products', async (req, res) => {
	const products = await Product.find({});
	try {
		res.send(products);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.get('/products/:category', async (req, res) => {
	const category = req.params.category;
	const products = await Product.find({ category: category });
	try {
		res.send(products);
	} catch (error) {
		res.status(500).send(error);
	}
});

//GraphQL
app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
