import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNDdkOTQxYi01NWU5LTRiYTAtYTkyYi1lMjgyODMwODA1ZTMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTRUxMRVIiLCJzZWxsZXJJZCI6IjI3IiwicGhvbmVOdW1iZXIiOiIwODY4NDM1MTAxIiwiZXhwIjoxNzAyNTU0MjgyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0In0.EYjQ1RvqzveHSsZUVTFIOKanMG26aQ1wzMrlv2uTY1I'
    }
});
export default instance;