// import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'

import errorMessage from 'utils/errorMessage'
import { errorMessageAtom, isOpenErrorModalAtom } from 'store/atom'
import Popular from './Popular'
import Search from './Search'
import Detail from './Detail'
import Layout from 'components/Layout'

import styles from './routes.module.scss'

// const Detail = lazy(() => import('./Detail'))

const App = () => {
  const setIsOpenErrorModal = useSetRecoilState(isOpenErrorModalAtom)
  const setErrorMessage = useSetRecoilState(errorMessageAtom)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 60,
        refetchOnWindowFocus: false,
        suspense: true,
        onError: () => {
          setIsOpenErrorModal(true)
          setErrorMessage(errorMessage().api.SOMETHING_WRONG)
        },
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.background}>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Popular />} />
            <Route path='search' element={<Search />} />
            <Route path='detail' element={<Detail />} />
          </Route>
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App
