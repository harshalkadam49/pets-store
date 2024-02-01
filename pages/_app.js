import store from "@/store";
import "@/styles/globals.css";
import ThemeProvider from "@/theme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";


export default function App({ Component, pageProps }) {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <Component {...pageProps} />;
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
