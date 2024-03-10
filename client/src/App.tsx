import "./App.css";
import HomePage from "./mainPages/homePage";
import NavBar from "./components/navBar";
import Services from "./mainPages/servicesPage";
import About from "./mainPages/aboutPage";
import Contact from "./mainPages/contactPage";
import NotFound from "./mainPages/notFound";
import Footer from "./components/footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTES from "./ROUTES/routes";
import HereAndNow from "./pages/hereAndNow";
import LetUsLedYouForward from "./pages/letUsLedYouForward";
import GoodCoffeeGoodMorning from "./pages/goodCoffeeGoodMorning";
import LetUsLedYou from "./pages/letUsLedYou2";
import FreeAdvice from "./pages/freeAdvice";
import DiscoverTheWorld from "./pages/discoverTheWorld";
import ConnectFour from "./jsPages/connectFour/connectFour";
import { SlCalender } from "react-icons/sl";
import Calendar from "./jsPages/calendar/calendar";
import CartList from "./jsPages/cartList/cartList";
import MemoryGame from "./jsPages/memoryGame/memoryGame";
import PageBuilder from "./jsPages/pageBuilder/pageBuilder";
import XOGame from "./jsPages/x_oGame/x_oGame";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.SERVICES,
    element: <Services />,
  },
  {
    path: ROUTES.ABOUT,
    element: <About />,
  },
  {
    path: ROUTES.CONTACT,
    element: <Contact />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/hereAndNow",
    element: <HereAndNow />,
  },
  {
    path: "/LetUsLedYouForward",
    element: <LetUsLedYouForward />,
  },
  {
    path: "/GoodCoffeeGoodMorning",
    element: <GoodCoffeeGoodMorning />,
  },
  {
    path: "/LetUsLedYou",
    element: <LetUsLedYou />,
  },
  {
    path: "/FreeAdvice",
    element: <FreeAdvice />,
  },
  {
    path: "/DiscoverTheWorld",
    element: <DiscoverTheWorld />,
  },
  {
    path: "/Calendar",
    element: <Calendar />,
  },
  {
    path: "/CartList",
    element: <CartList />,
  },
  {
    path: "/MemoryGame",
    element: <MemoryGame />,
  },
  {
    path: "/ConnectFour",
    element: <ConnectFour />,
  },
  {
    path: "/PageBuilder",
    element: <PageBuilder />,
  },
  {
    path: "/XOGame",
    element: <XOGame />,
  },
]);

function App() {
  return (
    <div className="App">
      <NavBar />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}
export default App;
