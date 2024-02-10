import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { Content } from './Content';
import AdminPanel from "./components/admin/AdminPanel";
import CarReviews from './pages/CarReviews';
import CreateReview from './pages/CreateReview';
import RegistrationForm from './pages/RegistrationForm';
import SignInForm from './pages/SingInForm';
import StartPage from './pages/StartPage';
import UserAccount from './pages/UserAccount';
import { store } from './store';

function App() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Content>
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/addReview/:carId" element={<CreateReview />} />
                <Route path="/carReviews/:carId" element={<CarReviews />} />
                <Route path="/account" element={<UserAccount />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/signup" element={<RegistrationForm />} />
                <Route path="/signin" element={<SignInForm />} />
              </Routes>
            </Content>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </>
  );
}

export default App;

