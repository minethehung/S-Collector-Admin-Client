import { useNavigate, useLoaderData, redirect, Form } from 'react-router-dom'
import { payInStore } from '../services/store-api';
export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await payInStore(data.id, data.amount);
    return redirect(`/stores`);
}

export default function PayIn() {
    const navigate = useNavigate()
    const { id } = useLoaderData()
    return (
        <div className="containerk mt-5">
            <h2 className="text-success">Store Management</h2>
            <div className="container-fluid bg-white pt-3 seller-container">
                <h4 className="text-center mt-5 pt-5">Pay in</h4>
                <Form method="post" className="w-25 m-auto">
                    <input type="hidden" name="id" value={id} />
                    <label className="form-label mt-3 mb-2">Enter amount to pay in</label>
                    <input type="number" name="amount" className="form-control mb-3" />
                    <input type="submit" value="Submit" className="btn btn-success form-control" />
                    <input type="button" value="Cancel" className="form-control btn btn-danger mt-2" onClick={() => navigate(-1)} />
                </Form>
            </div>
        </div>
    )
}