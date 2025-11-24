import Header from '/src/components/layout/Header';
import Hero from '/src/components/pages/blog/Hero';
import Posts from '/src/components/pages/blog/Posts';
import Footer from '/src/components/layout/Footer';

const Blog = () => {
    return (
        <>
            <Header/>
            <Hero />
            <Posts />
            <Footer />
        </>
    );
};

export default Blog;