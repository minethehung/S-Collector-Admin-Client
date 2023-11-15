import { getStores, enableStore, disableStore } from "../services/store-api"
import { NavLink, useLoaderData } from "react-router-dom";
export async function loader() {

    const stores = await getStores()
    console.log(stores)
    return {
        stores
    };
}


export default function Stores() {
    const { stores } = useLoaderData();
    async function updateStatus(id, status) {
        if (status) {
            await disableStore(id)
        }
        else {
            await enableStore(id)
        }
        window.location.reload();
    }

    return (
        <div className="container mt-5 ">
            <h2 className="text-success">Store Management</h2>
            <div className="container-fluid bg-white pt-3 store-container">
                <table className="table-borderless table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Registration Date</th>
                            <th>Is Active</th>
                            <th>Reset Password</th>
                            <th>Money</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map(store =>
                            <tr key={store.id}>
                                <td>{store.id}</td>
                                <td>{store.storeName}</td>
                                <td>{store.phoneNumber}</td>
                                <td>{store.registrationDate}</td>
                                <td>
                                    <form method="post" >
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="switch1" onChange={() => { updateStatus(store.id, store.isActive) }} checked={store.isActive} />
                                        </div>
                                    </form>
                                </td>
                                <td><NavLink to={`/stores/reset/${store.id}`} className="btn btn-success">Reset</NavLink></td>
                                <td><NavLink to={`/stores/pay-in/${store.id}`} className="btn btn-success">Pay in</NavLink></td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}