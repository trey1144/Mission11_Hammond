// simple dark mode button that switches some of the styling to a dark mode
function DarkMode() {
  return (
    <>
      <button
        className="btn btn-dark"
        onClick={() => document.body.classList.toggle('dark-mode')}
      >
        🌙 Dark Mode
      </button>
    </>
  );
}

export default DarkMode;
