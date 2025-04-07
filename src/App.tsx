import * as ToastPrimitive from "@radix-ui/react-toast";
import { Header } from "./components/Header/Header";
import { Dashboard } from "./components/Dashboard/Dashboard";
import styles from "./App.module.scss";

function App() {
  return (
    <main>
      <Header />
      <div className={styles.containter}>
        <ToastPrimitive.ToastProvider swipeDirection="right">
          <Dashboard />
        </ToastPrimitive.ToastProvider>
      </div>
    </main>
  );
}

export default App;
