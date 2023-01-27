import { PageLoadingSpinner } from "./views/global-components";
import React, {
  Suspense
} from "react"
import { Routes, Route } from 'react-router-dom'

const Events = React.lazy(() => import('./views/Events/Events'))

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
