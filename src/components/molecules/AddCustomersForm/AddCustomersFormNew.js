import React, {useEffect, useState} from "react";

const AddCustomersFormNew = ({
    api,
    currentCustomerReferenceNo
}) => {
    const [rowdatadisplayed, setRowdatadisplayed] = useState();
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
                // setUpdaterowdata(data[0]);
            })
    }
    return(
        <div>
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
                                        {/* <CustomizedComboboxForOwner
                                            comboboxdata={owner}
                                            dvalue = {data.owner_company}
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
                                        {/* <SelectDate
                                            type="booked_date"
                                            typeOne="booked_date"
                                            incomingdate={
                                                data.booked_date != null
                                                    ? data.booked_date = data.booked_date
                                                    : data.booked_date = data.booked_date
                                            }
                                            disable="yes"
                                        /> */}
                                    </div>
                                </label>
                            </div>
                            <div className="nameandinputcontainer">
                                <label className="formdatalabelstyle">
                                    <div className="formnamestyle">
                                        Requested delivery date:
                                    </div>
                                    <div>
                                        {/* <SelectDate
                                            typeOne="requested_delivery_date"
                                            onHandleChangeEvent={(event) => changeevent(event, data.delivery_id)}
                                            incomingdate={
                                                data.requested_delivery_date != null
                                                    ? data.requested_delivery_date = data.requested_delivery_date
                                                    : data.requested_delivery_date = data.requested_delivery_date
                                            }
                                        /> */}
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
                                            // onChange={(event) => changeevent(event, data.delivery_id)}
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
                                            // onChange={(event) => changeevent(event, data.delivery_id)}
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
                                        {/* <CustomizedComboboxForState
                                            selectedowner={selectedowner}
                                            comboboxdata={state}
                                            // type="state"
                                            selectevent={selecteventforstate}
                                        /> */}
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
                                            onWheel={(e) => e.target.blur()}
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
                                            onWheel={(e) => e.target.blur()}
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
                                            // onChange={(event) => changeevent(event, data.delivery_id)}
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
                                            // onChange={(event) => changeevent(event, data.delivery_id)}
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
    );
}
export default AddCustomersFormNew;