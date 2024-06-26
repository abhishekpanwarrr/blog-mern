import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { ReactNode } from 'react'

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const theme = useSelector((state: RootState) => state.theme.theme)
    return (
        <div className={theme}>
            <div className='bg-white min-h-screen text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)]'>
                {children}
            </div>
        </div>
    )
}

export default ThemeProvider