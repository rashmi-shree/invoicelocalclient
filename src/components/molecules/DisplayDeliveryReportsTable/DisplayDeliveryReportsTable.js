import React, { useState, useEffect } from "react";
import CustomizedSearchBar from "../../atoms/CustomizedSearchBar/CustomizedSearchBar";
import OpenModal from '../OpenModal/OpenModal';
import CustomizedEditIcon from "../../atoms/CustomizedEditIcon/CustomizedEditIcon";
import { CSVLink } from "react-csv";
import CustomizedDownload from "../../atoms/CustomizedDownload/CustomizedDownload";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import moment from 'moment';

const DisplayDeliveryReportsTable = ({
    deliverystatus,
    paymentstatus,
    setTableDataEvent,
    tabledata,
    api
}) => {
    const [filterflag, setfilterflag] = useState(false);
    const [searchvalue, setSearchvalue] = React.useState('');
    const [rowdata, setrowdata] = useState({});
    const [modalview, setmodalview] = useState();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const openevent = (e) =>{
      setOpen(e)
    }
    useEffect(() => {
        if (filterflag && deliverystatus && paymentstatus) {
            statusfilterdeliveryreport();
        } else {
            displayDeliveryReportsData();
        }
    }, [deliverystatus, paymentstatus])
    useEffect(()=>{
        if (paymentstatus){
            paymentstatusfilteronly();
        }
    },[paymentstatus])
    useEffect(()=>{
        if(deliverystatus){
            deliverystatusfilteronly();
        }
    },[deliverystatus])
    const headers = [
        { label: 'customer reference no', key: 'customer_reference_no' },
        { label: 'booked date', key: 'booked_date' },
        { label: 'requested delivery date', key: 'requested_delivery_date' },
        { label: 'delivery date', key: 'delivery_date' },
        { label: 'invoice no', key: 'invoice_no' },
        { label: 'customer address', key: 'customer_address' },
        { label: 'gst', key: 'gst' },
        { label: 'phone number', key: 'phone_number' },
        { label: 'product hsn code', key: 'product_hsn_code' },
        { label: 'product', key: 'product' },
        { label: 'quantity', key: 'quantity' },
        { label: 'rate', key: 'rate' },
        { label: 'discount', key: 'discount' },
        { label: 'cgst', key: 'cgst' },
        { label: 'sgst', key: 'sgst' },
        { label: 'igst', key: 'igst' },
        { label: 'final amount', key: 'final_amount' },
        { label: 'balance amount', key: 'balance_amount' },
        { label: 'payment status', key: 'payment_status' },
        { label: 'booking advance amount', key: 'booking_advance_amount' },
        { label: 'delivery status', key: 'delivery_status' },
        { label: 'customer name', key: 'customer_name' },
    ];
    const csvReport = {
        filename: 'DeliveryReports.csv',
        headers: headers,
        data: tabledata
    }
    const displayDeliveryReportsData = () => {
        api.get('delivery/displayDeliveryReportsData')
        .then((res)=>{
            setTableDataEvent(res.data);
            setfilterflag(true);
        })
    }
    const statusfilterdeliveryreport = () => {
        api.post('delivery/statusfilterdeliveryreport',{
            params:{
                deliverystatus: deliverystatus,
                paymentstatus: paymentstatus
            }
        })
        .then((res)=>{
            setTableDataEvent(res.data);
        })
    }
    const paymentstatusfilteronly = () => {
        api.post('delivery/paymentstatusfilteronly',{
            params:{
                paymentstatus: paymentstatus
            }
        })
        .then((res)=>{
            setTableDataEvent(res.data);
        })
    }
    const deliverystatusfilteronly = () => {
        api.post('delivery/deliverystatusfilteronly',{
            params:{
                deliverystatus: deliverystatus,
            }
        })
        .then((res)=>{
            setTableDataEvent(res.data);
        })
    }
    const searchHandle = (e) => {
        setSearchvalue(e.target.value);
    }
    const searchclicked = () => {
        api.post('delivery/getDeliveryReportData',{
            params:{
                phoneno: searchvalue,
                customer_name: searchvalue
            }
        })
        .then((res)=>{
            setTableDataEvent(res.data);
        })
    }
    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
      if (e.key === 'Enter') {
        searchclicked();
        e.preventDefault();
      }
    };
    const rowdataevent = (e) => {
        setrowdata(e);
    }
    useEffect(() => {
        if (searchvalue === "") {
            displayDeliveryReportsData();
        }
    }, [searchvalue])
    const [adminloggedin, setadminloggedin] = useState();
    useEffect(() => {
        var user = window.localStorage.getItem('adminloggedin');
        setadminloggedin(base64_decode(user))
      }, []);
    return (
        <div>
            <OpenModal
                api={api}
                modalview={modalview}
                open={open}
                openevent={openevent}
                displayDeliveryReportsData={displayDeliveryReportsData}
                rowdata={rowdata}
            />
            <div className="searchbarstyle">
              <input
                type="text"
                placeholder="Phone Number / Customer Name"
                onChange={(e)=>setQuery(e.target.value)}
              />
            </div>
            {/* <CustomizedSearchBar
                labelname="customer :- phone number / name"
                Btnname="search"
                onHandleChangeEvent={searchHandle}
                goEventClicked={searchclicked}
                onKeyPress={handleKeypress}
            /> */}
            <div>
                {
                    adminloggedin == "Admin"
                    ?
                     tabledata && tabledata.length ?
                        <CSVLink {...csvReport}><CustomizedDownload /></CSVLink> : null
                        :
                        null
                }
            </div>
            <div className='table-responsive'>
                <table className="table table-striped table-bordered tablebackground">
                    <thead className="theadalter">
                        <tr>
                            <th>Customer Reference Number</th>
                            <th>Product Sl Number</th>
                            <th>Booked Date</th>
                            <th>Requested Delivery Date</th>
                            <th>Delivery Date</th>
                            <th>Invoice Number</th>
                            <th>Customer Name </th>
                            <th>Customer Address</th>
                            <th>GSTIN/UIN:</th>
                            <th>Phone number</th>
                            <th>Phone number alter one</th>
                            <th>Phone number alter two</th>
                            <th>Product HSN Code </th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Discount</th>
                            <th>CGST</th>
                            <th>SGST</th>
                            <th>IGST</th>
                            <th>Final Amount</th>
                            <th>Balance Amount</th>
                            <th>Payment status </th>
                            <th>Booking Advance Amount</th>
                            <th>Delivery Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tabledata && tabledata.length 
                            ? tabledata.filter((user=>
                                user.customer_name.toLowerCase().includes(query) || 
                                user.phone_number.toString().includes(query) ||
                                user.phone_number_alter_one == query ||
                                user.phone_number_alter_two == query
                                )).map((data, i) => (
                                <tr key={i}>
                                    <td>{data.customer_reference_no}</td>
                                    <td>{data.product_sl_no}</td>
                                    <td>
                                        {
                                            data.booked_date != null ?
                                            moment(data.booked_date).format('YYYY-MM-DD'):
                                            data.booked_date 
                                        }
                                    </td>
                                    <td>
                                        {
                                            data.requested_delivery_date != null ?
                                            moment(data.requested_delivery_date).format('YYYY-MM-DD'):
                                            data.requested_delivery_date 
                                        }
                                    </td>
                                    <td>
                                        {
                                            data.delivery_date != null ?
                                            moment(data.delivery_date).format('YYYY-MM-DD'):
                                            data.delivery_date
                                        }
                                    </td>
                                    <td>{data.invoice_no}</td>
                                    <td>{data.customer_name}</td>
                                    <td>{data.customer_address}</td>
                                    <td>{data.gst}</td>
                                    <td>{data.phone_number}</td>
                                    <td>{data.phone_number_alter_one}</td>
                                    <td>{data.phone_number_alter_two}</td>
                                    <td>{data.product_hsn_code}</td>
                                    <td>{data.product}</td>
                                    <td>{data.quantity}</td>
                                    <td>{data.rate}</td>
                                    <td>{data.discount}</td>
                                    <td>{data.cgst}</td>
                                    <td>{data.sgst}</td>
                                    <td>{data.igst}</td>
                                    <td>{data.final_amount}</td>
                                    <td>{data.balance_amount}</td>
                                    <td>{data.payment_status}</td>
                                    <td>{data.booking_advance_amount}</td>
                                    <td>{data.delivery_status}</td>
                                    <td>
                                    <CustomizedEditIcon
                                        onClick={() => { 
                                            rowdataevent(data);
                                            setmodalview("deliverydetailsform");
                                            openevent(true);
                                            }}
                                    />
                                    </td>
                                </tr>
                            ))
                            : 
                                <tr>
                                    <td colSpan={23}>No Record!</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DisplayDeliveryReportsTable;