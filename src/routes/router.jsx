// src/router.js
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@src/AppLayout";

import HomePage from "@src/pages/HomePage";
import StandingsPage from "@src/pages/StandingsPage";
import DriversPage from "@src/pages/DriversPage";
import TeamsPage from "@src/pages/TeamsPage";
import EventsPage from "@src/pages/EventsPage";

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
