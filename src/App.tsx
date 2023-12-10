import './App.css';

function App() {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          console.log(window.electron.checkHashCode('e199e161bb28885b5ab4a54daadb8029'));
        }}
      >
        Click Me
      </button>
    </div>
  );
}

export default App;
