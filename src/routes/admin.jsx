import { useLoaderData } from 'react-router-dom';
import { getSellers } from '../services/seller-api';
import { getStores } from '../services/store-api';
import { getTransactions } from '../services/transaction-api';
import { getOrders } from '../services/order-api';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
} from "chart.js";
import { Bar, Pie, Line } from 'react-chartjs-2';

export async function loader() {
    const sellers = await getSellers();
    const stores = await getStores();
    const transactions = await getTransactions();
    const orders = await getOrders();
    return { sellers, stores, transactions, orders };
}

export default function Admin() {
    const { sellers, stores, transactions, orders } = useLoaderData();


    // setSellerChartCanvas(canvas1);
    let sum = 0
    for (let i = 0; i < transactions.length; ++i) if (transactions[i].amount > 0) {
        sum += transactions[i].amount
    }
    let sellerChart = {
        labels: ["Seller", "Buyer"],
        datasets: [
            {
                data: [sellers.length, stores.length],
                backgroundColor: ["#FF0060", "#0079FF"]
            }
        ]
    };

    let previousSevenDates = [];
    let currentDate = new Date();

    // Loop to calculate the previous 14 dates
    for (let i = 13; i >= 0; i--) { // Start from 6 (current date) and go backward
        // Clone the current date to avoid modifying it
        let date = new Date(currentDate);
        // Subtract one day from the date
        date.setDate(currentDate.getDate() - i);
        // Push the date to the array
        previousSevenDates.push(date);
    }

    // Count element with the same date
    function countElementsWithSameDate(dateArray, dateToCompare) {
        let count = dateArray.reduce(function (acc, dateString) {
            let date = new Date(dateString);

            let isSameDate = date.getDate() === dateToCompare.getDate() &&
                date.getMonth() === dateToCompare.getMonth() &&
                date.getFullYear() === dateToCompare.getFullYear();

            if (isSameDate) {
                return acc + 1;
            }
            return acc;
        }, 0);
        return count;
    }

    //order chart
    let orderDate = orders.map(o => o.orderedDate);
    let transDate = transactions.map(t => t.time)
    let barChart = {
        labels: previousSevenDates,
        datasets: [
            {
                type: 'bar',
                label: 'Number of orders',
                data: previousSevenDates.map(p => countElementsWithSameDate(orderDate, p)),
                backgroundColor: '#379237', // Bar color
                borderColor: '#379237',     // Border color
                borderWidth: 1,
                barThickness: 30
            },
            {
                type: 'line',
                label: 'Number of transactions',
                data: previousSevenDates.map(p => countElementsWithSameDate(transDate, p)),
                backgroundColor: '#FBD85D',
                borderColor: '#FBD85D',
                borderWidth: 2,
                fill: false,
                lineTension: 0.1,
            }
        ],
    };

    //trans chart
    var sellerDate = sellers.map(s => s.registrationDate)
    var buyerDate = stores.map(s => s.registrationDate)
    var lineChart = {
        labels: previousSevenDates,
        datasets: [
            {
                type: 'line',
                label: 'Number of sellers',
                data: previousSevenDates.map(p => countElementsWithSameDate(sellerDate, p)),
                backgroundColor: '#FF0060',
                borderColor: '#FF0060',
                borderWidth: 2,
                fill: false,
                lineTension: 0.1,
            },
            {
                type: 'line',
                label: 'Number of buyers',
                data: previousSevenDates.map(p => countElementsWithSameDate(buyerDate, p)),
                backgroundColor: '#0079FF',
                borderColor: '#0079FF',
                borderWidth: 2,
                fill: false,
                lineTension: 0.1,
            }
        ],
    };

    ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    return (

        <div className="container mt-2 .hidescroll" style={{ overflow: "auto", height: "90vh" }}>
            <h2 className="text-success">Main Dashboard</h2>
            <div className="row mt-2 mb-4">
                <div className="col-2 small-badge" style={{ borderBottom: "solid 5px black", paddingBottom: "15px" }}>
                    <span className="title">Total Revenue</span>
                    <span className="content" id="revenue">{sum + " Đ"}</span>
                </div>
                <div className="col-2 small-badge" style={{ borderBottom: "solid 5px #379237", paddingBottom: "15px" }}>
                    <span className="title">Total Orders</span>
                    <span className="content" id="numOrder">{orders.length} </span>
                </div>
                <div className="col-2 small-badge" style={{ borderBottom: "solid 5px #FBD85D", paddingBottom: "15px" }}>
                    <span className="title">Total Transactions</span>
                    <span className="content" id="numTran">{transactions.length}</span>
                </div>

                <div className="col-2 small-badge" style={{ borderBottom: "solid 5px #FF0060", paddingBottom: "15px" }}>
                    <span className="title">Total seller</span>
                    <span className="content" id="newUser">{sellers.length}</span>
                </div>
                <div className="col-2 small-badge" style={{ borderBottom: "solid 5px #0079FF", paddingBottom: "15px" }}>
                    <span className="title">Total buyer</span>
                    <span className="content" id="newBuyer">{stores.length}</span>
                </div>
            </div>
            <div className="row ms-1 me-1">
                <div className="bg-white rounded-3 p-3 mb-3" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                    <h5>Number Of Orders And Transaction</h5>
                    {/* <canvas id="orderChart" height="50"></canvas> */}
                    <Bar data={barChart} height={50} options={{
                        scales: {
                            x: {
                                display: false
                            },
                            y: {
                                beginAtZero: true,
                                stepSize: 1,
                            },
                        },
                    }} />
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <div className="bg-white rounded-3 p-3" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <h5 id="totalUser">Total: {sellers.length + stores.length} </h5>
                        {/* <canvas id="sellerChart" ></canvas> */}
                        <Pie data={sellerChart} />
                    </div>
                </div>
                <div className="col-9">

                    <div className="bg-white rounded-3 p-3" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                        <h5>Number Of Users</h5>
                        {/* <canvas id="tranChart" height="87"></canvas> */}
                        <Line data={lineChart} height={87} options={{
                            scales: {
                                x: {
                                    display: false
                                },
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }} />
                    </div>
                </div>

            </div>
        </div>

    )
}