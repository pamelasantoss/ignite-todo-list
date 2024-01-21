import { Header } from './components/Header/Header'
import { Dashboard } from './components/Dashboard/Dashboard'
import styles from './App.module.scss'

function App() {
  return (
    <main>
      <Header />
      <div className={styles.containter}>
        <Dashboard />
      </div>
    </main>
  )
}

export default App
