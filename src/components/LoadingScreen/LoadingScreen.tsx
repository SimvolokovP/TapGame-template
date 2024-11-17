import "./LoadingScreen.scss";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img
        className="loading-screen__image"
        loading="lazy"
        key={Math.random()}
        src={"loader.svg"}
        alt="coffee beans"
      />
      <div className="loading-screen__text">TapMan</div>
    </div>
  );
};

export default LoadingScreen;
