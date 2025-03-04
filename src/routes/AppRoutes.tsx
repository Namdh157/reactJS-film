import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePages/HomePage'
import TestComponent from '../components/Common/TestComponent'
import Error from '../pages/ErorrPage/Error'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/trang-chu' element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path='about' element={<h1>About</h1>} />
            </Route>
            <Route path='/test'>
                <Route index element={<TestComponent />} />
            </Route>
            <Route path='/error-timeout' element={<Error />} />
            <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
    )
}

export default AppRoutes