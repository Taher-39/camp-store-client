import './loader.css'; 

const HalalLoader = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className="halal-loader">
      <div className="logo-text">Halal Zone</div>
      <div className="spinner">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="dot"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <div className="loading-text">Loading your halal experience...</div>
    </div>
  );
};

export default HalalLoader;