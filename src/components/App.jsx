import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import StartPage from './pages/StartPage';
import CreateReview from './pages/CreateReview';
import { Content } from './Content';

function App() {

  return (
    <>
        <BrowserRouter>
          <Content>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/newReview" element={<CreateReview />} />
            </Routes>
          </Content>
        </BrowserRouter>
    </>
  );
}

export default App;
