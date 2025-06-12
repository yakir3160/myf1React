// src/router.js
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../AppLayout";

import HomePage from "../pages/HomePage";
import StandingsPage from "../pages/StandingsPage";
import DriversPage from "../pages/DriversPage";
import TeamsPage from "../pages/TeamsPage";
import EventsPage from "../pages/EventsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/standings",
        element: <StandingsPage />,
      },
      {
        path: "/drivers",
        element: <DriversPage />,
      },
      {
        path: "/teams",
        element: <TeamsPage />,
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
    ],
  },
]);

export default router;
