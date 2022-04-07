import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Problems from './components/Problems';
import Login from './components/Login';
import Register from './components/Register';
import ProblemDetails from './components/ProblemDetails';
import MySubmissions from './components/MySubmissions';
import Account from './components/Account';
import AccountSettings from './components/AccountSettings';
import CreateProblem from './components/CreateProblem';
import Contests from './components/Contests';
import ContestDetails from './components/ContestDetails';
import CreateContest from './components/CreateContest';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/problems" element={<Problems />}></Route>
          <Route path="/contests" element={<Contests />}></Route>
          <Route path="/contest/:id" element={<ContestDetails />}></Route>
          <Route
            path="/contest/:id/add-problem"
            element={<CreateProblem />}
          ></Route>
          <Route path="/contest/create" element={<CreateContest />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/problem/:problemId"
            element={<ProblemDetails />}
          ></Route>
          <Route
            path="/contest/:contestId/problem/:problemId"
            element={<ProblemDetails />}
          ></Route>
          <Route path="/mysubmissions" element={<MySubmissions />}></Route>
          <Route path="/problem/create" element={<CreateProblem />}></Route>
          <Route path="/account" element={<Account />}>
            <Route
              path="/account/settings"
              element={<AccountSettings />}
            ></Route>
            <Route path="/account/notifications" element={<Account />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
