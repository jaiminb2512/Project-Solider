import connectDB from '../../backend/connectDB';
import Property from '../../backend/Property';

export default async function handler(req, res) {
    await connectDB();

    if (req.method === 'GET') {
        try {
            const properties = await Property.find();
            res.status(200).json(properties);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'POST') {
        try {
            const { title, description, image, contact } = req.body;
            if (!title || !description || !image || !contact) {
                return res.status(400).json({ message: 'Incomplete property data' });
            }
            const newProperty = new Property({ title, description, image, contact });
            const savedProperty = await newProperty.save();
            res.status(201).json(savedProperty);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
