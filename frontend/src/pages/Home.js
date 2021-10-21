import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import Information from "../components/Information";

const Home = () => {
  return (
    <div
      className="home"
      style={{ backgroundImage: `url("/assets/Proyecto2.png")` }}
    >
      <Header />
      <Information />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
