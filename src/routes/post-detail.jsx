import { getPostById, deletePost } from "../services/post-api"
import { getSeller } from "../services/seller-api";
import { useLoaderData, Form, redirect, useNavigate } from 'react-router-dom'
export async function loader({ params }) {
    console.log(params);
    const post = await getPostById(params.id);
    const seller = await getSeller(post.sellerId);
    return { post, seller };
}
export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data.id);
    await deletePost(data.id);
    return redirect(`/posts`);
}
export default function PostDetail() {
    const { post, seller } = useLoaderData();
    const navagate = useNavigate();
    return (
        <div className="container mt-5 ">
            <h2 className="text-success">Post Detail</h2>
            <label className="fw-bold">Post Id: </label> <span> {post.id}</span>
            <br />
            <lable className="fw-bold">Seller Id: </lable>  <span> {post.sellerId}</span>
            <br />
            <lable className="fw-bold">Seller Name: </lable> <span> {seller.name}</span>
            <br />
            <lable className="fw-bold">Seller Phone: </lable><span>{seller.phoneNumber}</span>
            <br />
            <lable className="fw-bold">Description: </lable><span> {post.description}</span>
            <br />
            <lable className="fw-bold">Address: </lable> <span> {post.address}</span>
            <br />
            <lable className="fw-bold">Posted Time: </lable><span>{post.postedTime}</span>
            <br />
            <lable className="fw-bold">Image: </lable> <img style={{ width: 100 }} src={`http://scollector.fptu.meu-solutions.com/api/file${post.imageUrl}`} alt='img' onError={(e) => { e.target.src = `http://localhost:5000/api/file${post.imageUrl}` }} />
            <br />
            <label className="fw-bold">Status: </label> <span className={post.status == 'Active' ? 'text-success' : 'text-danger'}>{post.status}</span>
            <br />
            {post.status == 'Active' ? (<Form method="post">
                <input type="hidden" name="id" value={post.id} />
                <input type="submit" value="Delete" className="btn btn-danger mt-2" />
            </Form>) : null}
            <input type="button" value="Back" className="btn btn-success mt-2" onClick={() => { navagate(-1) }} />

        </div>)
}