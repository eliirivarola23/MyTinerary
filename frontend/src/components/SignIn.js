import Footer from "./Footer";
import NavBar from "./NavBar";
import FormSignIn from "./FormSignIn";
const SignIn = () => {
  return (
    <div
      className="home"
      style={{ backgroundImage: `url("/assets/Proyecto2.png")` }}
    >
      <NavBar />
      <FormSignIn />
      <Footer />
    </div>
  );
};

export default SignIn;
