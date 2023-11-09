import MyCalendar from "./components/MyCalendar";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/Error";


const router = createBrowserRouter([
  {
    element: <MyCalendar />,
    path: "/",
    errorElement: <Error />,
  },
  {
    element: <Error />,
    path: "*"
  }
]);

function App() {
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
