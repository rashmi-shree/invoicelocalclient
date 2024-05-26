import React, { useState, useEffect } from "react";
import CustomizedSearchBar from "../../atoms/CustomizedSearchBar/CustomizedSearchBar";
import OpenModal from "../../molecules/OpenModal/OpenModal";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import moment from 'moment';
import FullScreenModal from "../../molecules/FullScreenModal/FullScreenModal";
import '../../../style/style.css';
import Button from '@mui/material/Button';

const CustomerInvoice = ({
    searchData,
    onHandleChangeEvent,
    api
}) => {
    const [customertable, setCustomertable] = useState([]);
    const [invoiceFormData, setInvoiceFormData] = useState([]);
    const [currentinvoiceno, setcurrentinvoiceno] = useState();
    const [currentCustomerReferenceNoCustomerInvoice, setcurrentCustomerReferenceNoCustomerInvoice] = useState();
    const [modalview, setModalview] = useState('');
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const openevent = (e) =>{
      setOpen(e)
    }
    useEffect(() => {
        displayBookedCustomeerDataEvent();
    }, [])
    const displayBookedCustomeerDataEvent = () => {
        api.post('customer/displayBookedCustomeerData', {
            params:{
                final_status: 'Booked'
            }
        })
        .then((res)=>{
            setCustomertable(res.data);
        })
    }
    const [changedmodalview, setChangedmodalview] = useState('');
    const modalviewchange = () => {
        setChangedmodalview("generatecustomerinvoiceform");
    }
    const openCustomerInvoiceEvent = (customer_reference_no, product_hsn_code) => {
        api.post('delivery/getDeliveryDataForVerification', {
            params:{
                customer_reference_no: customer_reference_no,
                    product_hsn_code:product_hsn_code
            }
        })
        .then((res)=>{
            setInvoiceFormData(res.data);
        })
        }
    const openinvoiceevent = (customer_reference_no) => {
        api.post('delivery/getDeliveryReportData',{
            params:{
                customer_reference_no
            }
        })
        .then((res)=>{
            setInvoiceFormData(res.data);
        })
        }
    
    const [customerrefno, setcustomerrefno] = useState();
    useEffect(()=>{
        invoiceFormData.map((data)=>{
            setcustomerrefno(data.customer_reference_no);
            setcurrentinvoiceno(data.invoice_no);
        })
    },[invoiceFormData])
    const goEventClicked = () => {
        api.post('jointables/getCustomerFollowUpDataBooked', {
            params:{
                phoneno: searchData,
                customer_name: searchData,
                phone_number_alter_one:searchData,
                phone_number_alter_two:searchData
            }
        })
        .then((res)=>{
            setCustomertable(res.data);
        })
    }
    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
      if (e.key === 'Enter') {
        goEventClicked();
        e.preventDefault();
      }
    };
    useEffect(() => {
        if (searchData === "") {
            displayBookedCustomeerDataEvent();
        }
    }, [searchData])
    return (
        <div className="generateinvoicecontainer">
            <div className="searchbarstyle">
              <input
                type="text"
                placeholder="Phone Number / Customer Name"
                onChange={(e)=>setQuery(e.target.value)}
              />
            </div>
            {/* <CustomizedSearchBar
                onHandleChangeEvent={onHandleChangeEvent}
                goEventClicked={goEventClicked}
                onKeyPress={handleKeypress}
                labelname="phone number/ customer name"
                Btnname="search"
            /> */}
            <OpenModal
                api={api}
                modalview={modalview}
                open={open}
                openevent={openevent}
                invoiceFormData={invoiceFormData}
                openinvoiceevent={openinvoiceevent}
                currentCustomerReferenceNoCustomerInvoice={currentCustomerReferenceNoCustomerInvoice}
                displayBookedCustomeerDataEvent={displayBookedCustomeerDataEvent}
            />
            <div className='table-responsive'>
                <table className="table table-striped table-bordered tablebackground">
                    <thead className="theadalter">
                        <tr>
                            <th>Customer Reference Number</th>
                            <th>Enquiry Date</th>
                            <th>Customer Name</th>
                            <th>Customer Address</th>
                            <th>Phone Number</th>
                            <th>Phone Number Alter - 1</th>
                            <th>Phone Number Alter - 2</th>
                            <th>Enquired Product Hsn Code</th>
                            <th>Enquired Product</th>
                            <th>Quantity</th>
                            <th>Comments</th>
                            <th>Follow Up Call </th>
                            <th>Final Status</th>
                            <th>Action</th>
                            {/* <th>Generate</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customertable && customertable.length 
                            ? 
                            customertable.filter((user=>
                                user.customer_name.toLowerCase().includes(query) || 
                                user.phone_number.toString().includes(query) ||
                                user.phone_number_alter_one == query ||
                                user.phone_number_alter_two == query
                                )).map((data, i) => (
                                data.from_dealer == 1 
                                ? <></>
                                :  <tr key={i}>
                                <td>{data.customer_reference_no}</td>
                                <td>{
                                    data.enquiry_date != null ?
                                    moment(data.enquiry_date).format('YYYY-MM-DD'):
                                    data.enquiry_date
                                }
                                </td>
                                <td>{data.customer_name}</td>
                                <td>{data.customer_address}</td>
                                <td>{data.phone_number}</td>
                                <td>{data.phone_number_alter_one}</td>
                                <td>{data.phone_number_alter_two}</td>
                                <td>{data.product_hsn_code}</td>
                                <td>{data.product}</td>
                                <td>{data.quantity}</td>
                                <td>{data.comments}</td>
                                <td>{
                                    data.follow_up_call != null ?
                                    moment(data.follow_up_call).format('YYYY-MM-DD'):
                                    data.follow_up_call 
                                }
                                </td>
                                <td>{data.final_status}</td>
                                <td>
                                    <CustomizedBtn 
                                        BtnName="Verify Invoice"
                                        onClick={()=>{
                                            setcurrentCustomerReferenceNoCustomerInvoice(data.customer_reference_no);
                                            openCustomerInvoiceEvent(data.customer_reference_no, data.product_hsn_code);
                                            setModalview("customerInvoiceForm");
                                            openevent(true);
                                        }}
                                    />
                                </td>
                                {/* <td>
                                 <div className='btnstyle'>
                                    <Button
                                        // id="btn"
                                        // type="button" 
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={()=>{
                                            openinvoiceevent(data.customer_reference_no);
                                        }}
                                        // className="btnstyle"
                                        >
                                            Generate Invoice
                                    </Button>
                                </div> 
                                <FullScreenModal 
                                    api={api}
                                    modalview={modalview}
                                    open={open}
                                    openevent={openevent}
                                    invoiceFormData={invoiceFormData}
                                    openinvoiceevent={openinvoiceevent}
                                    currentCustomerReferenceNoCustomerInvoice={currentCustomerReferenceNoCustomerInvoice}
                                />
                                {/* <CustomizedBtn 
                                        BtnName="Generate Invoice"
                                        onClick={()=>{
                                            openinvoiceevent(data.customer_reference_no);
                                            setModalview("generatecustomerinvoiceform");
                                            openevent(true);
                                        }}
                                    />
                                 
                                    
                                </td> */}
                                </tr>
                              ))
                              : <tr>
                                <td colspan="15">No Record!</td>
                              </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default CustomerInvoice;