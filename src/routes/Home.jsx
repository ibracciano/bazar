import { useEffect } from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";
import { getItems } from "../utils/hook";
import { useState } from "react";

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    // importer les produits ici
    const getData = async () => {
        try {
            const data = await getItems();
            setItems(data);

        } catch (error) {
            console.log('Erreur : ' + error.message);
        }
    }

    useEffect(() => {
        getData()
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [])

    return (
        <div className='mt-[10vh]'>
            <Banner />
            <Products items={items} loading={loading} />
        </div>
    );
};

export default Home;
