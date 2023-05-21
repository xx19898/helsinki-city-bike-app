import { api } from "~/utils/api"
import "~/styles/globals.css"
import { type AppProps } from "next/app"
import { Provider } from "jotai"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export function MyApp({ Component, pageProps }: AppProps){
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Provider>
      <Component {...pageProps}/>
    </Provider>
    </LocalizationProvider>
    )
}

export default api.withTRPC(MyApp);
