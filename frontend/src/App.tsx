import React, {
  Suspense
} from "react";
import { Route, Routes } from 'react-router-dom';
import { PageLoadingSpinner } from "./components/global-components";

const Events = React.lazy(() => import('./components/views/Events/Events'))

function App() {
  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      <Routes>
        <Route path='/'>
          <Route path='care-recipients'>
            <Route index />
            <Route path=':id'>
              <Route path='events' element={<Events />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
