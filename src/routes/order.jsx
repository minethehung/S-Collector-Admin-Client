import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { getPagedOrders, getPagedOrdersByPhone } from '../services/order-api'
export default function Order() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [txtPhone, setTxtPhone] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        // console.log(page, rowsPerPage);
        const fetchData = async () => {
            if (txtPhone == null) {
                const result = await getPagedOrders(page, rowsPerPage);
                setData(result);
            } else {
                const result = await getPagedOrdersByPhone(page, rowsPerPage, txtPhone);
                setData(result);
            }

        }
        fetchData();
    }, [page, rowsPerPage, txtPhone])
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
        setPage(0);
    }
    // console.log(data);
    if (data != null) {
        const orders = data.content;
        return (
            <div className="container mt-5 ">
                <h2 className="text-success">Order Page</h2>
                <h6 className="text-success">No. Orders:  {data.totalElements} </h6>
                <div>
                    <form method="post" className="form-control">
                        <label className="fw-bold">Seller Phone</label>
                        <input type="tel" name="txtPhone" onChange={handleSearchPhone} />
                    </form>
                </div>


                <table className="table-borderless table">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Post Id</th>
                            <th>Seller Id</th>
                            <th>Seller Phone</th>
                            <th>Store Id</th>
                            <th>Store Name</th>
                            <th>Ordered Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Order Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.postId}</td>
                                <td>{order.sellerId}</td>
                                <td>{order.sellerPhone}</td>
                                <td>{order.storeId}</td>
                                <td>{order.storeName}</td>
                                <td>{order.orderedDate}</td>
                                <td>{order.price == null ? 'Chưa cập nhật' : order.price}</td>
                                <td style={
                                    order.status == "CANCELLED" ? { color: "red" } : { color: "green" }
                                }>{order.status}</td>
                                <td>{order.orderFee == null ? 'Chưa cập nhật' : order.orderFee}</td>
                            </tr>
                        ))}


                    </tbody>

                </table>

                <TablePagination component="div" count={data.totalElements} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />


            </div>
        )
    } else {
        return (<CircularProgress color="success" />)
    }
}
