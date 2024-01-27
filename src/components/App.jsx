import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import StartPage from './pages/StartPage';
import { Content } from './Content';

function App() {

  return (
    <>
        <BrowserRouter>
          <Content>
            <Routes>
              <Route path="/" element={<StartPage />} />
            </Routes>
          </Content>
        </BrowserRouter>
    </>
  );
}

export default App;
