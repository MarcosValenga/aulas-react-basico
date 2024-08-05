import { UsuarioLogadoProvider } from "./core/contexts";
import { Routes } from "./routes";

export const App = () => {
  return (
    <UsuarioLogadoProvider>
      <Routes />
    </UsuarioLogadoProvider>
  );
}
