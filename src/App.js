import { Route } from 'react-router-dom';
import React, { Fragment, useContext, useState, Suspense } from 'react'
import AuthContext from './store/auth-context';

import Home from './pages/Home';
import SignIn from './pages/SignIn';

import SignUp from './pages/SignUp';
import TimerContext from './store/timer-context';

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const NewProblem = React.lazy(() => import('./pages/NewProblem'))
const Timer = React.lazy(() => import('./pages/Timer'))
const Problems = React.lazy(() => import('./pages/Problems'))

function App() {
  const authCtx = useContext(AuthContext);
  const [showTimer, setShowTimer] = useState(false);
  const [problemInfo, setProblemInfo] = useState({});
  return (
    <Fragment>
      <Suspense fallback="">
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/problems" component={Problems} />

        <TimerContext.Provider value={{
          showTimer,
          setShowTimer,
          problemInfo,
          setProblemInfo
        }}>
          <Route exact path="/new-problem" component={showTimer ? Timer : NewProblem} />
        </TimerContext.Provider>
        <Route exact path="/sign-in" component={authCtx.isLoggedIn ? SignIn : SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/" component={authCtx.isLoggedIn ? Dashboard : Home} />
      </Suspense>
    </Fragment>
  );
}

export default App;