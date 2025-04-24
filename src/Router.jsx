import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Producs from "./Pages/Producs";
import Category from "./Pages/Category";
import Discount from "./Pages/Discount";
import Sizes from "./Pages/Sizes";
import Colors from "./Pages/Colors";
import Faq from "./Pages/Faq";
import Contact from "./Pages/Contact";
import Team from "./Pages/Team";
import News from "./Pages/News";


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
          {
            path:"/",
            element:<Login/>
          },
          {
            path:"/home",
            element:<Home/>,
            children:[
                {
                    path:"/home",
                    element: <Producs/>,
                },
                {
                    path:"/home/category",
                    element: <Category/>,
                },
                {
                    path:"/home/discount",
                    element: <Discount/>,
                },
                {
                    path:"/home/sizes",
                    element: <Sizes/>,
                },
                {
                    path:"/home/colors",
                    element: <Colors/>,
                },
                {
                    path:"/home/faq",
                    element: <Faq/>,
                },
                {
                    path:"/home/contact",
                    element: <Contact/>,
                },
                {
                    path:"/home/team",
                    element: <Team/>,
                },
                {
                    path:"/home/news",
                    element: <News/>,
                },
            ]
          }
        ]
      }
])