import connectDB from '../../../backend/connectDB';
import Property from '../../../backend/Property';

export default async function handler(req, res) {
    await connectDB();

    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const property = await Property.findById(id);
            if (!property) {
                return res.status(404).json({ message: 'Property not found' });
            }
            res.status(200).json(property);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const deletedProperty = await Property.findByIdAndDelete(id);
            if (!deletedProperty) {
                return res.status(404).json({ message: 'Property not found' });
            }
            res.status(200).json({ message: 'Property deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
