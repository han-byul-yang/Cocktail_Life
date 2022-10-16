import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query'

import Popular from './Popular'
import Search from './Search'
import Detail from './Detail'
import Layout from 'components/Layout'

import styles from './routes.module.scss'

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        suspense: true,
      },
    },
  })

  return (
    <div className={styles.background}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Popular />} />
              <Route path='/search' element={<Search />} />
              <Route path='detail' element={<Detail />} />
            </Route>
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  )
}

export default App
