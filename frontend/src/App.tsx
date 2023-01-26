import React, {
  Suspense
} from "react"
import { Routes, Route } from 'react-router-dom'

const Events = React.lazy(() => import('./views/Events/Events'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/'>
          <Route path='care-recipients'>
            <Route index element={<div>Recipient Root</div>} />
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
