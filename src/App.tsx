import { LeadsProvider } from "./context/LeadsContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./components/atoms/Toast";
import { AppRouter } from "./components/router";

function App() {
  return (
    <ThemeProvider>
      <LeadsProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </LeadsProvider>
    </ThemeProvider>
  );
}

export default App;
