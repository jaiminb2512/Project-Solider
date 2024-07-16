import { useEffect, useState } from 'react';
import AddProperty from './components/AddProperty';
import PropertyList from './components/PropertyList';
import Head from 'next/head';

const Home = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await fetch('/api/properties');
            const data = await response.json();
            setProperties(data);    
        };

        fetchProperties();
    }, []);

    return (
        <div>
            <Head>
                <title>Elite Estate</title>
            </Head>
            <h1>Real Estate Properties</h1>
            <AddProperty />
            <PropertyList properties={properties} />
        </div>
    );
};

export default Home;
