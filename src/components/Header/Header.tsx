import logo from '../../assets/todo-list-logo.svg'
import styles from './Header.module.scss'

export function Header() {
  return (
    <div className={styles.header}>
      <img src={logo} alt="ToDo List" />
    </div>
  )
}