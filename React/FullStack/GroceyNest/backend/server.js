const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
const cors = require('cors');

mongoose.connect('mongodb://localhost/grocerynest',
{
	useNewUrlParser: true,
	useUnifiedTopology: true
}
);

app.use(express.json());
app.use(cors()); // Use the cors middleware

const productSchema = new mongoose.Schema({
name: String,
type: String,
description: String,
price: Number,
image: String,
});

const Product = mongoose.model('Product', productSchema);

// Function to seed initial data into the database
const seedDatabase = async () => {
try {
	await Product.deleteMany(); // Clear existing data

	const products = [
		{
			name: 'Apple',
			type: 'Fruit',
			description: 'Fresh and crispy  ',
			price: 200,
			image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg'
		},
		{
			name: 'Banana',
			type: 'Fruit',
			description: 'Rich in potassium  ',
			price: 100,
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxaV5ickGc5r_WOBp9Ya1NE3Y9734O80CX9Q&s'
		},
		{
			name: 'Orange',
			type: 'Fruit',
			description: 'Packed with vitamin C  ',
			price: 250,
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe_ACiJ6hVHQxMGOLRo7xqzrF36Iy7AQBhzw&s'
		},
		{
			name: 'Carrot',
			type: 'Vegetable',
			description: 'Healthy and crunchy  ',
			price: 150,
			image: 'https://seed2plant.in/cdn/shop/products/carrotseeds.jpg?v=1604032858'
		},
		{
			name: 'Broccoli',
			type: 'Vegetable',
			description: 'Nutrient-rich greens  ',
			price: 200,
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQs13BpyZz_aySdb-f7wmkQS8sLvUF37M3sQ&s'
		},
		{
			name: 'Grapes',
			type: 'Fruit',
			description: 'Sweet and juicy  ',
			price: 250,
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSVWTo_5KaCy_f0If7LxyVftskd-0ixa4fUQ&s'
		},
		{
			name: 'Strawberry',
			type: 'Fruit',
			description: 'Delicious red berries  ',
			price: 300,
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ72-X4vyUN3h1pu1Z9j9aoFSxS98cRwgFIpw&s'
		},
		{
			name: 'Lettuce',
			type: 'Vegetable',
			description: 'Crisp and fresh  ',
			price: 170,
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41JTR0rvCGBZOXSG9ZHUQ22XByzQBoKnp9g&s'
		},
		{
			name: 'Tomato',
			type: 'Vegetable',
			description: 'Versatile and flavorful  ',
			price: 230,
			image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142704/tomato.jpg'
		},
		{
			name: 'Cucumber',
			type: 'Vegetable',
			description: 'Cool and hydrating  ',
			price: 180,
			image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142621/cocumber.jpg'
		},
	];
	

	await Product.insertMany(products);
	console.log('Database seeded successfully');
} catch (error) {
	console.error('Error seeding database:', error);
}
};

// Seed the database on server startup
seedDatabase();

// Define API endpoint for fetching all products
app.get('/api/products', async (req, res) => {
try {
	// Fetch all products from the database
	const allProducts = await Product.find();

	// Send the entire products array as JSON response
	res.json(allProducts);
} catch (error) {
	console.error(error);
	res.status(500)
	.json({ error: 'Internal Server Error' });
}
});

app.listen(PORT, () => {
console.log(
	`Server is running on port ${PORT}`
);
});
