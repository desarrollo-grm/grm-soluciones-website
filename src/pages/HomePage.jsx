import { useState, useEffect } from 'react';
import Header from '/src/components/layout/Header';
import Hero from '/src/components/pages/home/Hero';
import Clients from '/src/components/pages/home/Clients';
import Services from '/src/components/pages/home/Services';
import Articles from '/src/components/pages/home/Articles';
import Footer from '/src/components/layout/Footer';
import clientsData from '/src/data/clients';
import { getPostsForHome } from '/src/data/posts';

const HomePage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const posts = await getPostsForHome(4);
                setArticles(posts);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <>
            <Header />
            <Hero />
            <Clients clients={clientsData}/>
            <Services />
            {!loading && <Articles articles={articles} />}
            <Footer />
        </>
    );
};

export default HomePage;