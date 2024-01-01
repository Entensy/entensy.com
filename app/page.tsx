import Navigation from '@/app/navbar/navigation';
import Hero from './hero';
import Service from './service';
import Portfolio from './portfolio';
import Contact from './contact';
import About from './about';
import Footer from './footer';

const Home = () => {
  return (
    <main className="w-full">
      <Navigation />
      <Hero />
      <Service />
      <Portfolio />
      <Contact />
      <About />
      <Footer />
    </main>
  );
};

export default Home;
