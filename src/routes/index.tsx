import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query'

import Popular from './Popular'
import Search from './Search'
import Result from './Result'

import styles from './routes.module.scss'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <div className={styles.page}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path='/' element={<Popular />} />
            <Route path='search' element={<Search />} />
            <Route path='result' element={<Result />} />
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  )
}

export default App
