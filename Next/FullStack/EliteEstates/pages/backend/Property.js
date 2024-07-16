import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
        required: true,
    },
});

const Property = mongoose.models.Property || mongoose.model('Property', PropertySchema);

export default Property;
