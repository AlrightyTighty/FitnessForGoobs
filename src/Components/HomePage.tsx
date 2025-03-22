import TopNav from "./TopNav";

import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <TopNav />
      <div className="homepage-bg-image" />
      <div className="homepage-text">
        <p className="homepage-big-text">
          YOUR FITNESS
          <br />
          YOUR WAY
        </p>
        <p className="little-text">Personalized goals, a supportive community, detailed exercises, all to bring you the best workout experience of your life.</p>
      </div>
    </>
  );
};

export default HomePage;
