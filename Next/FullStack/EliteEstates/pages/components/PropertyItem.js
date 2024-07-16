const PropertyItem = ({ property }) => {
  return (
    <div className="property-item">
      <h2>{property.title}</h2>
      <div className="property-container">
        <img src={property.image} alt={property.title} />
        <div className="content">
          <p>{property.description}</p>
          <p>{property.contact}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyItem;
