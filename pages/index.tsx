import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/features/home"));

const HomePage = () => {
  return <Home />;
};

export default HomePage;
