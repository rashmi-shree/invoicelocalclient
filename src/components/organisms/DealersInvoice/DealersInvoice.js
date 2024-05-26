import React,{useState, useEffect} from "react";
import CustomizedSearchBar from "../../atoms/CustomizedSearchBar/CustomizedSearchBar";
import OpenModal from "../../molecules/OpenModal/OpenModal";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import DealersInvoicesListForm from "../../molecules/DealersInvoicesListForm/DealersInvoicesListForm";
import '../../../style/style.css';

const DealersInvoice = ({
    searchData,
    onHandleChangeEvent,
    api
}) => {
    const [dealersDetails, setdealersDetails] = useState({});
    const [invoiceFormData, setInvoiceFormData] = useState([]);
    const [modalview, setModalview] = useState('');
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const openevent = (e) =>{
      setOpen(e)
    }
    const displayDealersDetailsDatawithstatusactiveevent = () =>{
        api.get('dealers/displayDealersDetailsDatawithstatusactive')
        .then((res)=>{
            setdealersDetails(res.data);
        })
    }
    useEffect(()=>{
        displayDealersDetailsDatawithstatusactiveevent();
    },[])
    const openinvoiceevent = (gstin_number) => {
        api.post('dealers/getdealersfromgst',{
            params:{
                gstin_Number:gstin_number
            }
        })
        .then((res)=>{
            setInvoiceFormData(res.data);
        })
    }
    const fetchdeliverydatamatchinggstevent = (gstin_number) => {
        api.post('delivery/fetchdeliverymatchinggstno',{
            params:{
                gst:gstin_number
            }
        })
        .then((res)=>{
            if(res.data && res.data.length == 0){
                res.data.push(
                    {'state':''})
            }
            setInvoiceFormData(res.data);
        })
    }
    useEffect(() => {
        if (searchData === "") {
            displayDealersDetailsDatawithstatusactiveevent();
        }
    }, [searchData])
    const goEventClicked = () => {
        api.post('dealers/getDealersDetailsData',{
            params:{
                searchData
            }
        })
        .then((res)=>{
            setdealersDetails(res.data);
        })
    }
    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
      if (e.key === 'Enter') {
        goEventClicked();
        e.preventDefault();
      }
    };
    const [dealersdata,setdealersdata] = useState();
    const dealersdataevent = (e) => {
        setdealersdata(e)
    };
    const [deliveryinvoices, setdeliveryinvoices] = useState();
    const fetchinvoicesfromdelivery = (e) => {
        api.post('delivery/fetchinvoicesfromdelivery', {
            params:{
                gst:e
            }
        })
        .then((res)=>{
            setdeliveryinvoices(res.data);
        })
    }
    return(
        <div className="generateinvoicecontainer">
            <OpenModal 
                api={api}
                open={open}
                openevent={openevent}
                dealersdata={dealersdata}
                modalview={modalview}
                invoiceFormData={invoiceFormData} 
                deliveryinvoices={deliveryinvoices}
            />
            {/* <CustomizedSearchBar 
                onHandleChangeEvent={onHandleChangeEvent}
                goEventClicked={goEventClicked}
                onKeyPress={handleKeypress}
                labelname="phone number/ name" 
                Btnname="Search"
            /> */}
            <div>
            <DealersInvoicesListForm 
                api={api}
                deliveryinvoices={deliveryinvoices}
                fetchinvoicesfromdelivery={fetchinvoicesfromdelivery}
            />
            </div>
            <div className="searchbarstyle">
                <input
                type="text"
                placeholder="Phone Number / Customer Name"
                onChange={(e)=>setQuery(e.target.value)}
                />
            </div>
            <div className='table-responsive'>
                <table className="table table-striped table-bordered tablebackground">
                    <thead className="theadalter">
                        <tr>
                            <th>GSTIN Number</th>
                            <th>Enterprise Name</th>
                            <th>Enterprise Address</th>
                            <th>Enterprise State</th>
                            <th>Proprietor Name</th>
                            <th>Proprietor Phone Number</th>
                            <th>GST Status</th>
                            <th>Action</th>
                            <th>Generate</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        dealersDetails && dealersDetails.length 
                        ? dealersDetails.filter((user=>
                            user.proprietor_name.toLowerCase().includes(query) ||
                            user.proprietor_phone_number.toString().includes(query)
                            )).map((data, i)=>(
                            <tr key={i}>
                                <td>{data.gstin_number}</td>
                                <td>{data.enterprise_name}</td>
                                <td>{data.enterprise_address}</td>
                                <td>{data.enterprise_state}</td>
                                <td>{data.proprietor_name}</td>
                                <td>{data.proprietor_phone_number}</td>
                                <td>{data.gstin_status}</td>
                                <td>
                                    <CustomizedBtn 
                                        BtnName="Generate Invoice"
                                        onClick={()=>{
                                            dealersdataevent(data);
                                            openinvoiceevent(data.gstin_number);
                                            fetchdeliverydatamatchinggstevent(data.gstin_number);
                                            setModalview("DealersInvoiceForm");
                                            openevent(true);
                                        }}
                                    />
                                </td>
                                <td>
                                    <CustomizedBtn 
                                        BtnName="View Invoices"
                                        onClick={()=>{
                                            dealersdataevent(data);
                                            openinvoiceevent(data.gstin_number);
                                            fetchdeliverydatamatchinggstevent(data.gstin_number);
                                            fetchinvoicesfromdelivery(data.gstin_number);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))
                        : 
                            <tr>
                                <td colspan="15">No Record!</td>
                            </tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DealersInvoice;