import { getSellers, enableSeller, disableSeller } from "../services/seller-api"
import { NavLink, useLoaderData } from "react-router-dom";
export async function loader() {

    const sellers = await getSellers()
    // console.log(sellers)
    return {
        sellers
    };
}


export default function Sellers() {
    const { sellers } = useLoaderData();
    async function updateStatus(id, status) {
        if (status) {
            await disableSeller(id)
        }
        else {
            await enableSeller(id)
        }
        window.location.reload();
    }

    return (
        <div className="container mt-5 ">
            <h2 className="text-success">Seller Management</h2>
            <div className="container-fluid bg-white pt-3 seller-container">
                <table className="table-borderless table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Registration Date</th>
                            <th>Is Active</th>
                            <th>Reset Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map(seller =>
                            <tr key={seller.id}>
                                <td>{seller.id}</td>
                                <td>{seller.name}</td>
                                <td>{seller.phoneNumber}</td>
                                <td>{seller.registrationDate}</td>
                                <td>
                                    <form method="post" >
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="switch1" onChange={() => { updateStatus(seller.id, seller.isActive) }} checked={seller.isActive} />
                                        </div>
                                    </form>
                                </td>
                                <td><NavLink to={`/sellers/reset/${seller.id}`} className="btn btn-success">Reset</NavLink></td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}