import { fetchWrapper } from "../utils/fetchWrapper";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const urlBase = process.env.API_URL;
//const navigate = useNavigate()
const callBackError = (response) => {
  if ([401, 403].includes(response.status)) {
    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    history.push("/");
  }
};

export let request = fetchWrapper({ urlBase, callBackError });

export const updateRequest = () => {
  request = fetchWrapper({ urlBase, callBackError });
};

