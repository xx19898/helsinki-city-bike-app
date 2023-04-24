import { api } from "~/utils/api"
import "~/styles/globals.css"
import { AppProps } from "next/app"
import { Provider } from "jotai"

export function MyApp({ Component, pageProps }: AppProps){
  return(
    <Provider>
      <Component {...pageProps}/>
    </Provider>
    )
}

export default api.withTRPC(MyApp);
