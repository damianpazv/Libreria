import axios from "axios";

const sigecoApi=axios.create({ baseURL:"http://localhost:4000"});

export default sigecoApi;