import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <h1>Họ tên: Huỳnh Minh Mẫn</h1>
        <p>MSSV: 22110377</p>
        <p>Môn học: Các công nghệ phần mềm mới - Nhóm 01_ST3_ST4_A122</p>
        <p>Bài tập: Bài tập 01 (19/08/2025): Cài đặt môi trường</p>

        <p>
          Link github:&nbsp;
          <a href="https://github.com/hmman444"
              className="App-link"
              target="_blank"
              rel="noopener noreferrer">
            https://github.com/hmman444
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
