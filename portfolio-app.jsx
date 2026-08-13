const App = () => {
  return (
    <div>
      <AmbientBackground />
      <Nav />
      <PortfolioHero />
      <PortfolioAbout />
      <PortfolioInteractiveCards />
      <PortfolioExperience />
      <PortfolioProjects />
      <PortfolioSkills />
      <PortfolioEducation />
      <PortfolioContact />
      <PortfolioFooter />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
