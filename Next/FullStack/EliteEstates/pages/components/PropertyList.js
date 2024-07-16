import PropertyItem from './PropertyItem';

const PropertyList = ({ properties }) => {
    return (
        <div className="property-list">
            {properties.map((property) => (
                <PropertyItem key={property._id} property={property} />
            ))}
        </div>
    );
};

export default PropertyList;
