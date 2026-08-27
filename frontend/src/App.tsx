import styles from './App.module.css'
import { AppRoutes } from './routes/AppRoutes'

export const App = () => {

    return (
        <div className={styles.container}>
            <AppRoutes />
        </div> 
    )
}
