import { Header } from './components/Header/Header'
import { Dashboard } from './components/Dashboard/Dashboard'
import styles from './App.module.scss'
import { DragDropList } from './components/DragDropList/DragDropList'

function App() {
  return (
    <main>
      <Header />
      <div className={styles.containter}>
        <Dashboard />
        <DragDropList />
      </div>
    </main>
  )
}

export default App
