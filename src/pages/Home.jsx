import Hero from '../components/Hero';
import PromosBanner from '../components/PromosBanner';
import Catalog from '../components/Catalog';
import Promos from '../components/Promos';
import Branches from '../components/Branches';
import AboutUs from '../components/AboutUs';

export default function Home({ searchTerm }) {
    return (
        <main>
            <Hero />
            <PromosBanner />
            <Catalog searchTerm={searchTerm} />
            <Promos />
            <Branches />
            <AboutUs />
        </main>
    );
}
