import { useNavigate, useLoaderData, redirect, Form } from 'react-router-dom'
import { updateSeller } from '../services/seller-api';
export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await updateSeller(data.id, { password: data.password });
    return redirect(`/sellers`);
}
export async function loader({ params }) {
    const id = params.id;
    return { id };
}
export default function SellerResetPass() {
    const navigate = useNavigate()
    const { id } = useLoaderData()
    return (
        <div className="containerk mt-5">
            <h2 className="text-success">Seller Management</h2>
            <div className="container-fluid bg-white pt-3 seller-container">
                <h4 className="text-center mt-5 pt-5">Reset password</h4>
                <Form method="post" className="w-25 m-auto">
                    <input type="hidden" name="id" value={id} />
                    <label className="form-label mt-3 mb-2">Enter new password</label>
                    <input type="password" name="password" className="form-control mb-3" />
                    <input type="submit" value="Submit" className="btn btn-success form-control" />
                    <input type="button" value="Cancel" className="form-control btn btn-danger mt-2" onClick={() => navigate(-1)} />
                </Form>
            </div>
        </div>
    )
}