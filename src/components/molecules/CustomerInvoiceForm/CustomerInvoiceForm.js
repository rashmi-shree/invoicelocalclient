import React, { useEffect, useState } from "react";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import { invoicedataverificationsuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import SelectDate from "../../atoms/CustomizedDatepicker/SelectDate";
import '../../../style/style.css';

const CustomerInvoiceForm = ({
    handleClose,
    invoiceFormData,
    api,
    currentCustomerReferenceNoCustomerInvoice
}) => {
    const [listofinvoices, setlistofinvoices] = useState([]);
    const [finalinvoicenumber, setfinalinvoicenumber] = useState('');
    const [updaterowdata, setUpdaterowdata] = useState();
    const [rowdatadisplayed, setRowdatadisplayed] = useState();
    const [rowdatadisplayedalter, setRowdatadisplayedalter] = useState();
    const [errors, seterrors] = useState({
        placeofsupplyerror:"",
        ponumbererror:"",
        vehiclenoerror:"",
        commonError:"Please Enter All Important Fields"
      })
    useEffect(() => {
        api.get('delivery/fetchinvoicesfromdeliverytable')
            .then((res) => {
                setlistofinvoices(res.data);
            })
    }, [])
    useEffect(() => {
        fetchalldatafromcust();
    }, [])
    const fetchalldatafromcust = () => {
        api.post('/delivery/getalldataofcustomer', {
            params: {
                currentCustomerReferenceNoCustomerInvoice
            }
        })
            .then((res) => {
                const data = res.data;
                setRowdatadisplayed(data);
            })
    }
    useEffect(() => {
        var numbers = [];
        var maximum = Math.max(...numbers);
        var newmaximum = maximum + 1;
        if (newmaximum.toString().length === 4) {
            setfinalinvoicenumber("22-2023" + "/" + newmaximum);
        }
        else if (newmaximum.toString().length === 3) {
            setfinalinvoicenumber("22-2023" + "/" + "0" + newmaximum);
        }
        else if (newmaximum.toString().length === 2) {
            setfinalinvoicenumber("22-2023" + "/" + "00" + newmaximum);
        }
        else if (newmaximum.toString().length === 1) {
            setfinalinvoicenumber("22-2023" + "/" + "000" + newmaximum);
        }
    }, [listofinvoices]);

    // const validate = (index) => {
    //     let poserror = "";
    //     let pnerror = "";
    //     let vnerror = "";
    //     let ce = "";

    //     if (rowdatadisplayed){
    //         rowdatadisplayed.find((item, i) => {
    //             if (item.delivery_id === index) {
    //                 if(!rowdatadisplayed[i].place_of_supply || !rowdatadisplayed[i].po_number ||
    //                     !rowdatadisplayed[i].vehicle_number
    //                     ){
    //                         ce = "Please Enter All Important Fields";
    //                 }
    //                 // if(!rowdatadisplayed[i].place_of_supply){
    //                 //     poserror = "Please enter Place Of Supply";
    //                 // }
    //                 // if(!rowdatadisplayed[i].po_number){
    //                 //     pnerror = "Please Enter PO Number";
    //                 // }
    //                 // if(!rowdatadisplayed[i].vehicle_number){
    //                 //     vnerror = "Please Enter Vehicle Number";
    //                 // }
    //             }
    //         })
    //     }
    //     if( ce
    //         // poserror || pnerror || vnerror 
    //         ){
    //       seterrors({...errors, ["commonError"]:ce
    //     });
    //       return false;
    //     }
    //     return true;
    //   }
    const submiteventclicked = (customer_reference_no, delivery_id) => {
        // const isvalid = validate(delivery_id);
        // if(isvalid){
            let date = new Date();
            var date1 = date.toISOString();
            var date2 = date1.split("-");
            var month = Number(date2[1]);
            var year = Number(date2[0]);
            var yearstring = "";
            if(month >= 4 && month <= 12){
                var y1 = year;
                var y2 =year+1; 
                yearstring = y1+"-"+y2;
            }
            if(month>=1 && month <= 3){
                var y1 = year;
                var y2 = year-1;
                yearstring = y2+"-"+y1;
            }
            let finalInvoiceNo = '';
            let s1 = "IN"+yearstring+"/";
            let min = 0;
            let max = 1000;
            let random = Math.floor(Math.random() * (max - min + 1)) + min;
            let notostring = random.toString();
            let size = notostring.length;
            if (size === 4) {
                finalInvoiceNo = s1 + random;
            }
            else if (size === 3) {
                finalInvoiceNo = s1 + "0" + random;
            }
            else if (size === 2) {
                finalInvoiceNo = s1 + "00" + random;
            }
            else if (size === 1) {
                finalInvoiceNo = s1 + "000" + random;
            }
            api.put('/delivery/updatepurchasestatusofdeliverytable', {
                params: {
                    customer_reference_no: customer_reference_no
                }
            })
            .then((res)=>{
                api.put('customer/updatefinalstatuscustomertablepurchased',{
                    params:{
                        customer_reference_no: customer_reference_no
                    }
                })
                .then((res)=>{
                    api.put('delivery/updateDeliveryDataafterverify', {
                        params: {
                            invoice_no: finalInvoiceNo,
                            customer_reference_no: customer_reference_no,
                            po_number: rowdatadisplayed[0].po_number,
                            vehicle_no: rowdatadisplayed[0].vehicle_number,
                            pan_number: rowdatadisplayed[0].pan_number,
                            place_of_supply: rowdatadisplayed[0].place_of_supply
                        }
                    })
                        .then((res) => {
                            if (res) {
                                const res = invoicedataverificationsuccessmsg({});
                                alert(res.msg);
                                handleClose();
                            }
                            api.put('product/updateProductsDetailsProductDataDecrement',{
                                rowdatadisplayed
                            })
                        })
                })
            })

            // seterrors({...errors, ["placeofsupplyerror"]:"", 
            // ["ponumbererror"]:"", 
            // ["vehiclenoerror"]:""
            // });
        // }
        // else{
        //     alert(errors.commonError );
        //   }
    }
    const changeevent = (event, index) => {
        setRowdatadisplayedalter(rowdatadisplayed);
        let updateRowDataByIndex = [...rowdatadisplayed];
        rowdatadisplayed.find((item, i) => {
            if (item.delivery_id === index) {
                updateRowDataByIndex[i][event.target.name] = event.target.value;
                setRowdatadisplayed(() => [...updateRowDataByIndex]);
            }
        })
    }
    return (
        <div>
            <div className="pageheading">
                verify invoice and submit
            </div>
            {
                invoiceFormData && invoiceFormData.length &&
                invoiceFormData.map((data, i) => (
                    <form className="formcontainer">
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Buyer:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.customer_name}
                                        type="text"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Buyer Address:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.customer_address}
                                        type="text"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    State code:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.state}
                                        type="text"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                {/* <sup className="asteriskstyle">*</sup> */}
                                Place of supply:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.place_of_supply}
                                        type="text"
                                        onChange={(event) => changeevent(event, data.delivery_id)}
                                        index={i}
                                        name="place_of_supply"
                                    />
                                    <p className="errormsgstyle">{errors.placeofsupplyerror}</p>
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Invoice No:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.invoice_no}
                                        type="text"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Date of supply:
                                </div>
                                <div>
                                    <SelectDate
                                        disable="yes"
                                        type="delivery_date"
                                        typeOne="delivery_date"
                                        onHandleChangeEvent={(event) => changeevent(event, data.delivery_id)}
                                        incomingdate={
                                            data.delivery_date != null
                                                ? data.delivery_date 
                                                : data.delivery_date
                                        }
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                {/* <sup className="asteriskstyle">*</sup> */}
                                PO no:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        onChange={(event) => changeevent(event, data.delivery_id)}
                                        index={i}
                                        defaultValue={data.po_number}
                                        type="text"
                                        name="po_number"
                                    />
                                    <p className="errormsgstyle">{errors.ponumbererror}</p>
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                {/* <sup className="asteriskstyle">*</sup> */}
                                Vehicle No:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        onChange={(event) => changeevent(event, data.delivery_id)}
                                        index={i}
                                        defaultValue={data.vehicle_number}
                                        type="text"
                                        name="vehicle_number"
                                    />
                                    <p className="errormsgstyle">{errors.vehiclenoerror}</p>
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Contact Number - 1:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.phone_number}
                                        type="number"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Contact Number - 2:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.phone_number_alter_one}
                                        type="number"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Contact Number - 3:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.phone_number_alter_two}
                                        type="number"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Discription of Product:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.product}
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Product HSN Code:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.product_hsn_code}
                                        type="text"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Quantity:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.quantity}
                                        type="number"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Rate:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.rate}
                                        type="text"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Amount:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.final_amount}
                                        type="number"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Total:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.final_amount}
                                        type="number"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    CGST:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.cgst}
                                        type="number"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    SGST:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.sgst}
                                        type="number"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    IGST:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.igst}
                                        type="number"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    Round off:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.final_amount}
                                        type="number"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="nameandinputcontainer">
                            <label className="formdatalabelstyle">
                                <div className="formnamestyle">
                                    TOTAL:
                                </div>
                                <div className="formdatainputstyle">
                                    <input
                                        defaultValue={data.final_amount}
                                        type="number"
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </label>
                        </div>
                        {
                            data.verification_status
                                ? <p className="verificationstyle">Purchase Completed!</p>
                                :
                                <div className="submitcontainee">
                                    <CustomizedBtn
                                        BtnName="Verify and Purchase"
                                        onClick={() => {
                                            submiteventclicked(data.customer_reference_no, data.delivery_id)
                                        }}
                                    />
                                </div>
                        }
                    </form>
                ))
            }

        </div>
    )
}
export default CustomerInvoiceForm;