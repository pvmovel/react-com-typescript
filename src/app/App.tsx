import { AppRoutes } from "./routes";
import { UsuarioLogadoProvider } from "./shared/contexts";

export const App = () => {
  return (
    <UsuarioLogadoProvider>
      <AppRoutes />
    </UsuarioLogadoProvider>
  );
}