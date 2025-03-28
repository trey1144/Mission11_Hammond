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
