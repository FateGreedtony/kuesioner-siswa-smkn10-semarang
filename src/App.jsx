import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/kuesioner-siswa-smkn10-semarang" element={<HomePage />} />
        <Route path="/questionnaire/:id" element={<Questionnaire />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
