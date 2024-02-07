import { Routes, Route, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { lazy, Suspense } from "react";

import "./App.css";

const Posts = lazy(() => import("./Components/Crud_Axios/Posts"));
const Forms = lazy(() => import("./Components/Forms/Forms"));
const Lazyloadind = lazy(() => import("./Components/Lazy/Lazyloadind"));
function App() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/posts")}>
            Posts
          </Button>
          <Button color="inherit" onClick={() => navigate("/forms")}>
            Forms
          </Button>
          <Button color="inherit" onClick={() => navigate("/lazy")}>
            Lazy
          </Button>
        </Toolbar>
      </AppBar>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/lazy" element={<Lazyloadind />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
const Welcome = () => <h1>Welcome My APP ⭐🎉✨🎊🎆</h1>;
