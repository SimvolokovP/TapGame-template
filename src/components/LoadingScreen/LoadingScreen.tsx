import "./LoadingScreen.scss";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img
        className="loading-screen__image"
        loading="lazy"
        src={"loader.svg"}
        alt="tap man loader"
      />
      <div className="loading-screen__text">TapMan</div>
    </div>
  );
};

export default LoadingScreen;
