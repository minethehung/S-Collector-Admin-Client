import { getPagedPosts, getPagedPostsByStatus, getPagedPostsByPhone, } from '../services/post-api';
import { useEffect, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { Link } from 'react-router-dom';
export default function Post() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [txtPhone, setTxtPhone] = useState(null);
    const [status, setStatus] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        // console.log(page, rowsPerPage);
        const fetchData = async () => {
            if (txtPhone != null) {
                const result = await getPagedPostsByPhone(page, rowsPerPage, txtPhone);
                setData(result);
            }
            else if (status != null) {
                const result = await getPagedPostsByStatus(page, rowsPerPage, status);
                setData(result);
            }
            else {
                const result = await getPagedPosts(page, rowsPerPage);
                setData(result);
            }

        }
        fetchData();
    }, [page, rowsPerPage, txtPhone, status])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleSearchPhone = (event) => {
        const phone = event.target.value;
        if (phone == null || phone == "" || phone.length < 10) {
            setTxtPhone(null);
            return;
        }
        setTxtPhone(phone);
        setStatus(null);
        setPage(0);
    }
    const handleStatusFiler = (event) => {
        let i = event.target.value;
        console.log(i);
        if (i == 0) {
            setStatus(null);
            setPage(0);
            return;
        }
        if (i == 1) {
            setStatus('Active');
            setTxtPhone(null);
            setPage(0);
            return
        }
        if (i == 2) {
            setStatus('Deleted');
            setTxtPhone(null);
            setPage(0);
            return
        }
    }
    if (data != null) {
        const posts = data.content;
        return (
            <div className="container mt-5 ">
                <h2 className="text-success">Post Page</h2>
                <h6 className="text-success">No. Post: {data.totalElements}</h6>
                <div>
                    <form method="post" className="form-control">
                        <label className="fw-bold">Seller Phone</label>
                        <input type="tel" name="txtPhone" onChange={handleSearchPhone} />
                        <label className="fw-bold">Post Status</label>
                        <select className="form-control-small" onChange={handleStatusFiler}>
                            <option value="0">All</option>
                            <option value="1">Active</option>
                            <option value="2">Deleted</option>
                        </select>
                    </form>
                </div>



                <table className="table-borderless table">
                    <thead>
                        <tr>
                            <th>Post Id</th>
                            <th>Seller Id</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Posted time</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.sellerId}</td>
                                <td>{post.description}</td>
                                <td>{post.address}</td>
                                <td>{post.postedTime}</td>
                                <td><img style={{ width: 100 }} src={`http://scollector.fptu.meu-solutions.com/api/file${post.imageUrl}`} alt='img' onError={(e) => { e.target.src = `http://localhost:5000/api/file${post.imageUrl}` }} /></td>
                                {/* <td><img style="width:100px" src="@($"{NetworkConstants.BE_BASE_URL} /api/file{item.ImageUrl}")" alt="image" /></td> */}
                                <td className={post.status == 'Active' ? 'text-success' : 'text-danger'}>{post.status}</td>

                                <td><Link to={`/posts/${post.id}`} >Detail</Link></td>
                            </tr>
                        ))}



                    </tbody>

                </table>

                <TablePagination component="div" count={data.totalElements} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />


            </div>
        )
    }
}