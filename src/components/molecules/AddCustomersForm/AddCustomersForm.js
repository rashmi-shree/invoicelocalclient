import React, { useEffect, useState, useRef } from "react";
import CustomizedBtn from '../../atoms/CustomizedBtn/CustomizedBtn';
import { purchasesuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import SelectDate from "../../atoms/CustomizedDatepicker/SelectDate";
import { useReactToPrint } from "react-to-print";
import CustomizedPrint from "../../atoms/CustomizedPrint/CustomizedPrint";
import CustomizedComboboxForOwner from "../../atoms/CustomizedCombobox/CustomizedCombobboxForOwner";
import CustomizedComboboxForOwnerDefault from "../../atoms/CustomizedCombobox/CustomizedComboboxForOwnerDefault";
import CustomizedComboboxForState from "../../atoms/CustomizedCombobox/CustomizedComboboxForState";
import CustomizedComboboxForStateDefault from "../../atoms/CustomizedCombobox/CustomizedComboboxForStateDefault";
import '../../../style/style.css';

const AddCustomersForm = ({
    currentCustomerReferenceNo,
    handleClose,
    displaycustomerfollowupevent,
    purchasestatus,
    bookingstatus,
    api,
    setpurchasemsgevent
}) => {
    const [rowdatadisplayed, setRowdatadisplayed] = useState();
    const [paymentstatus, setpaymentstatus] = useState(["paid", "pending"]);
    const [bookeddate, setbookeddate] = useState('');
    const [productdata, setproductdata] = useState({});
    const [finalpurchasestatus, setfinalpurchasestatus] = useState();
    const [finalbookingstatus, setfinalbookingstatus] = useState();
    const [selectedowner, setselectedowner] = useState();
    useEffect(() => {
        if (rowdatadisplayed) {
            rowdatadisplayed.map((data) => {
                setselectedowner(data.owner_company)
            })
        }
    }, [rowdatadisplayed])
    const [customerdata, setcustomerdata] = useState(
        {
            customerReferenceNo: "",
            enquiryDate: "",
            customerName: "",
            customerAddress: "",
            // statename: { value: 29, label: 'Karnataka' },
            statename: "",
            phoneno: "",
            phonenoalterone: "",
            phonenoaltertwo: "",
            finalStatus: "",
            phone_number: "",
            phone_number_alter_one: "",
            phone_number_alter_two: "",
            product_hsn_code: "",
            product: "",
            quantity: "",
            customer_name: "",
            owner_company: "SRI PARAMANANDA ENTERPRISES"
        }
    );
    const [comboboxdata, setComboboxdata] = useState([]);
    const [owner, setowner] = useState([
        {
            "ownerid": 1,
            "ownername": "SDD ENTERPRISES"
        },
        {
            "ownerid": 2,
            "ownername": "SRI PARAMANANDA ENTERPRISES"
        }]);
    const selecteventforstate = (e, index) => {

        let updateRowDataByIndex = [...rowdatadisplayed];
        rowdatadisplayed.find((item, i) => {
            if (item.delivery_id === index) {
                updateRowDataByIndex[i]["state"] = e.label;
                updateRowDataByIndex[i]["state_code"] = e.value;
                setRowdatadisplayed(() => [...updateRowDataByIndex]);
            }
        })

        // setcustomerdata({ ...customerdata, "statename": e })
    }
    const [state, setstate] = useState([]);
    useEffect(() => {
        api.get('/stateandstatecodes/getstateandstatecodes', {})
            .then((res) => {
                setstate(res.data);
            })
    }, [])
    const recalldisplayProductDetailsDataforcomboboxevent = (selectedowner) => {
        api.post('product/displayProductDetailsDataforcombobox', {
            params: {
                selectedowner
            }
        })
            .then((res) => {
                setComboboxdata(res.data);
            })
    }
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    useEffect(() => {
        if (purchasestatus) {
            setfinalpurchasestatus(purchasestatus[0].purchase_status);
        }
    }, [purchasestatus])
    useEffect(() => {
        if (bookingstatus) {
            setfinalbookingstatus(bookingstatus[0].booking_status);
        }
    }, [bookingstatus])
    const selectevent = (event, index) => {
        let updateRowDataByIndex = [...rowdatadisplayed];
        rowdatadisplayed.find((item, i) => {
            if (item.delivery_id === index) {
                updateRowDataByIndex[i]["payment_status"] = event.target.innerHTML;
                setRowdatadisplayed(() => [...updateRowDataByIndex]);
            }
        })
    }
    const bookeddateevent = () => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let finaldate = year + "-" + month + "-" + date;
        setbookeddate(finaldate);
    }
    const [updaterowdata, setUpdaterowdata] = useState();
    useEffect(() => {
        bookeddateevent();
    }, [])
    useEffect(() => {
        fetchalldatafromcust();
    }, [])
    const fetchalldatafromcust = () => {
        api.post('/delivery/getalldataofcustomer', {
            params: {
                currentCustomerReferenceNo
            }
        })
            .then((res) => {
                const data = res.data;
                setRowdatadisplayed(data);
                setUpdaterowdata(data[0]);
            })
    }
    useEffect(() => {
        if (updaterowdata && updaterowdata.product_hsn_code) {
            api.post('/product/displayProductDetailsDatabasedonproducthsn', {
                params: {
                    product_hsn_code: updaterowdata.product_hsn_code
                }
            })
                .then((res) => {
                    const data = res.data;
                    setproductdata(data);
                })
        }
    }, [updaterowdata]);
    const submiteventclicked = () => {
        api.put('/customer/updatefinalstatuscustomertable', {
            params: {
                final_status: "Booked",
                customer_reference_no: currentCustomerReferenceNo
            }
        })
            .then((res) => {
                // displaycustomerfollowupevent();
                api.put('/delivery/updatebookingstatusofdeliverytable', {
                    params: {
                        customer_reference_no: currentCustomerReferenceNo
                    }
                })
                    .then((res) => {
                        // displaycustomerfollowupevent();
                        api.put('/delivery/updateDeliveryData', {
                            params: {
                                rowdatadisplayed: rowdatadisplayed,
                                customerdata: customerdata
                            }
                        })
                            .then((res) => {
                                api.put('/delivery/updaterateofdelivery', {
                                    params: {
                                        rowdatadisplayed: rowdatadisplayed
                                    }
                                })
                                    .then((res) => {
                                        api.post('/delivery/getstatecodefromdelivery', {
                                            params: {
                                                rowdatadisplayed: rowdatadisplayed
                                            }
                                        })
                                            .then((res) => {
                                                const data = res.data;
                                                for (var i = 0; i < data.length; i++) {
                                                    if (
                                                        (data[i].owner_company == 'SRI PARAMANANDA ENTERPRISES' && data[i].state_code === 29) ||
                                                        (data[i].owner_company == 'SDD ENTERPRISES' && data[i].state_code === 33)
                                                    ) {
                                                        api.put('/jointables/updatekarnatakagstrates', {
                                                            params: {
                                                                customer_reference_no: data[i].customer_reference_no,
                                                                product_hsn_code: data[i].product_hsn_code
                                                            }
                                                        })
                                                            .then((res) => {
                                                                api.put('/jointables/updatefinalamountdelivery', {
                                                                    params: {
                                                                        rowdatadisplayed: rowdatadisplayed
                                                                    }
                                                                })
                                                                    .then((res) => {
                                                                        api.put('/delivery/updatebalanceamountdelivery', {
                                                                            params: {
                                                                                rowdatadisplayed: rowdatadisplayed
                                                                            }
                                                                        })
                                                                            .then((res) => {
                                                                                if (res) {
                                                                                    setpurchasemsgevent("Booking Successfully");
                                                                                    // alert(res.msg);
                                                                                    // const res = purchasesuccessmsg({});
                                                                                    handleClose();
                                                                                }
                                                                            })
                                                                    })
                                                            })
                                                    }
                                                    else {
                                                        api.put('/delivery/updateotherstatesgstrates', {
                                                            params: {
                                                                customer_reference_no: data[i].customer_reference_no,
                                                                product_hsn_code: data[i].product_hsn_code
                                                            }
                                                        })
                                                            .then((res) => {
                                                                api.put('/jointables/updatefinalamountdelivery', {
                                                                    params: {
                                                                        rowdatadisplayed: rowdatadisplayed
                                                                    }
                                                                })
                                                                    .then((res) => {
                                                                        api.put('/delivery/updatebalanceamountdelivery', {
                                                                            params: {
                                                                                rowdatadisplayed: rowdatadisplayed
                                                                            }
                                                                        })
                                                                            .then((res) => {
                                                                                if (res) {
                                                                                    setpurchasemsgevent("Order Placed Successfully");
                                                                                    // const res = purchasesuccessmsg({});
                                                                                    // alert(res.msg);
                                                                                    handleClose();
                                                                                }
                                                                            })
                                                                    })
                                                            })
                                                    }
                                                }
                                            })
                                    })
                            })
                    })
            })


    }
    const changeevent = (event, index) => {
        let updateRowDataByIndex = [...rowdatadisplayed];
        rowdatadisplayed.find((item, i) => {
            if (item.delivery_id === index) {
                updateRowDataByIndex[i][event.target.name] = event.target.value;
                setRowdatadisplayed(() => [...updateRowDataByIndex]);
            }
        })
    }
    const selecteventforowner = (e) => {
        setselectedowner(e.label);
        recalldisplayProductDetailsDataforcomboboxevent(e.label);
        setcustomerdata({ ...customerdata, "owner_company": e.label })
        // if (e.label == "SDD ENTERPRISES") {
        //     setcustomerdata({ ...customerdata, "owner_company": e.label, "statename": { label: 'Tamil Nadu', value: 33 } })
        // }
        // else if (e.label == "SRI PARAMANANDA ENTERPRISES") {
        //     setcustomerdata({ ...customerdata, "owner_company": e.label, "statename": { label: 'Karnataka', value: 29 } })
        // }
    }
    return (
        <div>
            <div>
                <CustomizedPrint
                    onClick={handlePrint}
                />
            </div>
            <div ref={componentRef}>
                <div className="formheading">
                    <h5><bold>SHREE PARAMANANDA ENTERPRISES</bold></h5>
                    <p>Shop #05,Medhini Arcade,Kithaganahalli Gate,
                        Opp Anna
                        Building,Hosur Main Road Bangalore-560099,
                        <br></br>Mobile: 9035757145/9902880851/9141070705</p>
                </div>
                <div className="pageheading">
                    Purchase Order
                </div>
                {
                    rowdatadisplayed && rowdatadisplayed.length &&
                    rowdatadisplayed.map((data, i) => (
                        <form className="formcontainer">
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Owner Company:
                                    </div>
                                    <div className="formdatainputstyle">
                                    <input
                                            defaultValue={data.owner_company}
                                            type="text"
                                            readOnly
                                            disabled
                                        />
                                        {/* <CustomizedComboboxForOwnerDefault
                                            comboboxdata={owner}
                                            dvalue={data.owner_company}
                                            // type="state"
                                            selectevent={selecteventforowner}
                                        /> */}
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Customer Reference Number:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            defaultValue={currentCustomerReferenceNo}
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
                                        Booked date:
                                    </div>
                                    <div>
                                        <SelectDate
                                            type="booked_date"
                                            typeOne="booked_date"
                                            incomingdate={
                                                data.booked_date != null
                                                    ? data.booked_date = data.booked_date
                                                    : data.booked_date = data.booked_date
                                            }
                                            disable="yes"
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Requested delivery date:
                                    </div>
                                    <div>
                                        <SelectDate
                                            typeOne="requested_delivery_date"
                                            onHandleChangeEvent={(event) => changeevent(event, data.delivery_id)}
                                            incomingdate={
                                                data.requested_delivery_date != null
                                                    ? data.requested_delivery_date = data.requested_delivery_date
                                                    : data.requested_delivery_date = data.requested_delivery_date
                                            }
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Customer Name:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            defaultValue={data.customer_name}
                                            name="customer_name"
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
                                        Customer Address:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            defaultValue={data.customer_address}
                                            name="customer_address"
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
                                        State:
                                    </div>
                                    <div className="formdatainputstyle">
                                        {/* <CustomizedComboboxForStateDefault
                                            dvaluestate={data.state}
                                            dvaluestate_code={data.state_code}
                                            // selectedowner={selectedowner}
                                            comboboxdata={state}
                                            // type="state"
                                            // selectevent={selecteventforstate}
                                            selectevent={(event) => selecteventforstate(event, data.delivery_id)}
                                        /> */}
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
                                        Phone number:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="number"
                                            name="phone_number"
                                            defaultValue={data.phone_number}
                                            readOnly
                                            disabled
                                            // onChange={(event) => changeevent(event, data.delivery_id)}
                                            // onWheel={(e) => e.target.blur()}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Product hsn code:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="number"
                                            defaultValue={data.product_hsn_code}
                                            onWheel={(e) => e.target.blur()}
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Product:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="text"
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
                                        Quantity:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="number"
                                            name="quantity"
                                            defaultValue={data.quantity}
                                            readOnly
                                            disabled
                                            // onWheel={(e) => e.target.blur()}
                                            // onChange={(event) => changeevent(event, data.delivery_id)}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Product Rate:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="text"
                                            defaultValue={data.rate / data.quantity}
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Discount:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="text"
                                            defaultValue={data.discount}
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Rate After Extended Discount:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="number"
                                            name="extended_discount"
                                            onChange={(event) => changeevent(event, data.delivery_id)}
                                            defaultValue={data.extended_discount}
                                            onWheel={(e) => e.target.blur()}
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
                                            type="text"
                                            defaultValue={data.cgst}
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
                                            type="text"
                                            defaultValue={data.sgst}
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
                                            type="text"
                                            defaultValue={data.igst}
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
                                            type="text"
                                            defaultValue={data.rate}
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Final amount:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="text"
                                            defaultValue={data.final_amount}
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Balance amount:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="number"
                                            defaultValue={data.balance_amount}
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Payment status:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="text"
                                            defaultValue={data.payment_status}
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Booking advance amount:
                                    </div>
                                    <div className="formdatainputstyle">
                                        <input
                                            type="number"
                                            name="booking_advance_amount"
                                            defaultValue={data.booking_advance_amount}
                                            onChange={(event) => changeevent(event, data.delivery_id)}
                                            onWheel={(e) => e.target.blur()}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="divider"></div>
                        </form>
                    ))
                }
            </div>
            {
                finalpurchasestatus == 1
                    ? <p className="verificationstyle">Purchase completed!</p>
                    : finalbookingstatus == 1
                        ? <p className="verificationstyle">Booking completed!</p>
                        : <div className="submitcontainee">
                            <CustomizedBtn
                                BtnName="Book"
                                onClick={submiteventclicked}
                            />
                        </div>
            }
        </div>
    )
}
export default AddCustomersForm;