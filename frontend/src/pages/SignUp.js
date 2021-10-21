import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Form from "../components/Form";

const SignUp = () => {
  return (
    <div
      className="home"
      style={{ backgroundImage: `url("/assets/Proyecto2.png")` }}
    >
      <NavBar />
      <Form />
      <Footer />
    </div>
  );
};

export default SignUp;
