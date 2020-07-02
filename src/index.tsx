import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { SearchInputContextProvider } from './search-input-context'
import { ListViewContextProvider } from './list-view-context'
import { LocationsContextProvider } from './locations-context'
import { TimeContextProvider } from './time-context'
import { MonthsContextProvider } from './months-context'
import { SortFieldContextProvider } from './sort-field-context'

ReactDOM.render(
  <React.StrictMode>
    <SearchInputContextProvider>
      <LocationsContextProvider>
        <TimeContextProvider>
          <MonthsContextProvider>
            <SortFieldContextProvider>
              <ListViewContextProvider>
                <App />
              </ListViewContextProvider>
            </SortFieldContextProvider>
          </MonthsContextProvider>
        </TimeContextProvider>
      </LocationsContextProvider>
    </SearchInputContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
