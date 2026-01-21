let API_BASE;

if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  // Local development
  API_BASE = "http://localhost:8888/system_proposal_api";
} else {
  // On a remote server
  API_BASE = `http://${window.location.hostname}/system_proposal_api`; // adjust port/path if needed
}

export default API_BASE;


// const API_BASE = "http://10.190.102.25/api";
// export default API_BASE;



// const API_BASE = "http://localhost:8888/api";
// export default API_BASE;
