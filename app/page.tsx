import Navigation from '@/app/navbar/navigation';
import Hero from './hero';
import Service from './service';
import Portfolio from './portfolio';
import Contact from './contact';
import About from './about';
import Footer from './footer';

const Home = () => {
  return (
    <>
      <Navigation />
      <main className="w-full">
        <Hero />
        <Service />
        <Portfolio />
        <Contact />
        <About />
      </main>
      <Footer />
    </>
  );
};

export default Home;
