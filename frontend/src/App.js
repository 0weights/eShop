import Footer from "./components/Footer";
import Header from "./components/Header";
import Container from "react-bootstrap/esm/Container";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main>
        <Container >
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
