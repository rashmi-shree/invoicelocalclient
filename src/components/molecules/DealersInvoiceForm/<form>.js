const changeevent = (event) => {
    setUpdaterowdata({...updaterowdata, [event.target.name]:event.target.value, "invoice_no":finalinvoicenumber})
  }
const selecteventforstate = (e) => {
    setstatename(e.target.outerText);
    setUpdaterowdata({...updaterowdata, "statename":e.target.outerText})
  }
  useEffect(()=>{
    fetch('http://localhost:3000/getstateandstatecodes',{
      method:'get',
      mode:'cors',
    })
    .then(res =>{
        return res.json()
    })
    .then(data => {
      setstate(data);
    })
  },[])
const selectedProductNameEvent = (e) => {
    setSelectedProductName(e)
}
useEffect(()=>{
    fetch('http://localhost:3000/fetchproductdetailsonproductname',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        mode:'cors',
        body:JSON.stringify({
            product_name:selectedProductName
        })
    })
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        setproductdetails(data);
    })
},[selectedProductName])
useEffect(()=>{
    fetch('http://localhost:3000/fetchproductsnamefromproductstable',{
        method:'get',
        mode:'cors',
    })
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        setproductnames(data);
    })
},[])

useEffect(()=>{
    fetch('http://localhost:3000/fetchinvoicesfromdeliverytable',{
        method:'get',
        mode:'cors',
    })
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        setlistofinvoices(data);
    })
},[])
useEffect(()=>{
    var numbers = [];

    listofinvoices.map((data)=>{
        if(data.invoice_no != null){
            var invoicenosplit = data.invoice_no.split('/');
            if (invoicenosplit[1] != undefined){
                numbers.push(invoicenosplit[1]);
            }
        }
    })
    var maximum = Math.max(...numbers);
    var newmaximum = maximum + 1;
    if (newmaximum.toString().length === 4){
        setfinalinvoicenumber("22-2023"+"/"+newmaximum);
    }
    else if (newmaximum.toString().length === 3){
        setfinalinvoicenumber("22-2023"+"/"+"0"+newmaximum);
    }
    else if (newmaximum.toString().length === 2){
        setfinalinvoicenumber("22-2023"+"/"+"00"+newmaximum);
    }
    else if(newmaximum.toString().length === 1){
        setfinalinvoicenumber("22-2023"+"/"+"000"+newmaximum);
    }
},[listofinvoices])

let finalCustomerRefNo = '';
const generateCustomerReferenceNo = () => {
    let s1 = "CUST2022";
    let min = 0;
    let max = 1000;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    finalCustomerRefNo = s1+random;
}
generateCustomerReferenceNo();

const submiteventclicked = () => {
if(productdetails[0]){
    let rateperunit = productdetails[0].rate_per_unit;
    let gstrate = productdetails[0].gst_rate;
    let quantity =updaterowdata.Quantity;
    let state = updaterowdata.statename;
    let finalproductrate = rateperunit * quantity;
    let cgst = gstrate/2;
    let sgst = gstrate/2;
    let igst = gstrate;
    if (state === 'Karnataka'){
        cgst = cgst;
        sgst = sgst;
        igst = 0;
        setcgst(cgst);
        setsgst(sgst);
        setigst(igst);
        let discount = finalproductrate*(productdetails[0].discount/100);
        let amountafterdiscount = finalproductrate-discount;
        let finalamount = amountafterdiscount + (amountafterdiscount*(cgst/100)) + (amountafterdiscount*(sgst/100)) + (amountafterdiscount*(igst/100)) ;
        setfinalamount(finalamount);
        setrateofproduct(finalproductrate);
    }
    else {
        cgst = 0;
        sgst = 0;
        igst = igst;
        setcgst(cgst);
        setsgst(sgst);
        setigst(igst);
        let discount = finalproductrate*(productdetails[0].discount/100);
        let amountafterdiscount = finalproductrate-discount;
        let finalamount = amountafterdiscount + (amountafterdiscount*(cgst/100)) + (amountafterdiscount*(sgst/100)) + (amountafterdiscount*(igst/100)) ;
        setfinalamount(finalamount);
        setrateofproduct(finalproductrate);
    }
}
fetch("http://localhost:3000/insertintodeliveryfromdealers",{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        mode:'cors',
        body:JSON.stringify({
            customer_reference_no:finalCustomerRefNo,
            delivery_date:"2022-09-09",
            invoice_no:updaterowdata.invoice_no,
            customer_address:updaterowdata.Place_of_supply,
            gst:invoiceFormData[0].GST,
            phone_number:updaterowdata.Contact_NO,
            product_hsn_code:productdetails[0].product_hsn_code,
            product:productdetails[0].product_name,
            quantity:updaterowdata.Quantity,
            rate:rateofproduct,
            discount:productdetails[0].discount,
            cgst:cgst,
            sgst:sgst,
            igst:igst,
            final_amount:finalamount,
            customer_name:"enterprise name",
            state:updaterowdata.statename,
            po_number:updaterowdata.PO_no,
            vehicle_number:updaterowdata.Vehicle_No,
            pan_number:updaterowdata.Pan_Number,
            Place_of_supply:updaterowdata.Place_of_supply
        })
    })
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        const res = editedsuccessmsg({});
        alert(res.msg);
        handleClose();
    })
}



<form>
{
    invoiceFormData && invoiceFormData.length &&
    invoiceFormData.map((data)=>(
        <>        
            {/* Buyer details start  */}
        <div className="nameandinputcontainer">
            <label className="formdatalabelstyle">
                <div className="formnamestyle">
                    Buyer:
                </div>
                <div className="formdatainputstyle">
                    <input
                        defaultValue={data.buyer}
                        readOnly
                    />
                </div>
            </label>
        </div>
        {/* Buyer detailsend */}
        </>
    ))
}

{
    formdisplaydata && formdisplaydata.length &&
    formdisplaydata.map((data)=>(
        <>
        {/* State code start  */}
        <div className="nameandinputcontainer">
        <label className="formdatalabelstyle">
                <div className="formnamestyle">
                State:
                </div>
                <CustomizedComboboxForState
                    comboboxdata={state}
                    type="state"
                    selectevent={selecteventforstate}
                />
            </label>
        </div>
        {/* State code end */}

         {/* Place of supply start  */}
        <div className="nameandinputcontainer">
        <label className="formdatalabelstyle">
                <div className="formnamestyle">
                Place of supply:
                </div>
                <div className="formdatainputstyle">
                    <input
                        defaultValue={data.customer_address}
                        type="text"
                        onChange={changeevent}
                        name="Place_of_supply"
                    />
                </div>
            </label>
        </div>
        {/* Place of supply end  */}

         {/*  Invoice No start  */}
        <div className="nameandinputcontainer">
            <label className="formdatalabelstyle">
                <div className="formnamestyle">
                Invoice No:
                </div>
                <div className="formdatainputstyle">
                    <input
                        type="text"
                        onChange={changeevent}
                        name="Invoice_No"
                    />
                </div>
            </label>
        </div>
        {/* Invoice No end  */}

        {/* Date of supply start  */}
        <div className="nameandinputcontainer">
            <label className="formdatalabelstyle">
                <div className="formnamestyle">
                Date of supply:
                </div>
                <SelectDate 
                    typeOne = "booked_date"
                    onHandleChangeEvent={changeevent}
                    incomingdate = {data.delivery_date != null ?
                        data.delivery_date = data.delivery_date.substring(0,10):
                        data.delivery_date}
                />
            </label>
        </div>
        {/* Date of supply end  */}

        {/* PO no start  */}
        <div className="nameandinputcontainer">
            <label className="formdatalabelstyle">
                <div className="formnamestyle">
                PO no:
                </div>
                <div className="formdatainputstyle">
                    <input
                        defaultValue={data.po_number}
                        type="text"
                        onChange={changeevent}
                        name="PO_no"
                    />
                </div>
            </label>
        </div>
        {/* PO no end  */}

        {/* Vehicle No start  */}
        <div className="nameandinputcontainer">
            <label className="formdatalabelstyle">
                <div className="formnamestyle">
                Vehicle No:
                </div>
                <div className="formdatainputstyle">
                    <input
                        defaultValue={data.vehicle_number}
                        type="text"
                        onChange={changeevent}
                        name="Vehicle_No"
                    />
                </div>
            </label>
        </div>
        {/* Vehicle No end */}

        {/* Pan Number start  */}
        <div className="nameandinputcontainer">
            <label className="formdatalabelstyle">
                <div className="formnamestyle">
                Pan Number:
                </div>
                <div className="formdatainputstyle">
                    <input
                        defaultValue={data.pan_number}
                        type="text"
                        onChange={changeevent}
                        name="Pan_Number"
                    />
                </div>
            </label>
        </div>
        {/* Pan Number end  */}

        </>
     ))
} 

{
    invoiceFormData && invoiceFormData.length &&
    invoiceFormData.map((data) => (
        <>
            {/* Contact NO start  */}
            <div className="nameandinputcontainer">
                <label className="formdatalabelstyle">
                    <div className="formnamestyle">
                    Contact NO:
                    </div>
                    <div className="formdatainputstyle">
                        <input
                            defaultValue={data.contactNo}
                            type="text"
                            onChange={changeevent}
                            name="Contact_NO"
                        />
                    </div>
                </label>
            </div>
            {/* Contact NO end  */}
        </>
    ))
}

{/* Product Name  */}
<div className="nameandinputcontainer">
    <label className="formdatalabelstyle">
        <div className="formnamestyle">
        Product Name:
        </div>
        <CSOne choices={productnames} 
            selectedProductNameEvent={selectedProductNameEvent}
        />
    </label>
</div>
{/* Discription of Product end  */}

{
    productdetails && productdetails.length &&
    productdetails.map((data)=>(
        <>
        {/* Discription of Product start  */}
        <div className="nameandinputcontainer">
            <label className="formdatalabelstyle">
                <div className="formnamestyle">
                Discription of Product:
                </div>
                <div className="formdatainputstyle">
                    <input
                        type="text"
                        readOnly
                    />
                </div>
            </label>
        </div>
        {/* Discription of Product end  */}
        {/* HSN CODE start  */}
        <div className="nameandinputcontainer">
            <label className="formdatalabelstyle">
                <div className="formnamestyle">
                HSN CODE:
                </div>
                <div className="formdatainputstyle">
                    <input
                        type="text"
                        readOnly
                    />
                </div>
            </label>
        </div>
        {/* HSN CODE end  */}
        </>
    ))
}

{
    formdisplaydata && formdisplaydata.length &&
    formdisplaydata.map((data)=>(
        <>
    {/* Quantity start  */}
    <div className="nameandinputcontainer">
        <label className="formdatalabelstyle">
            <div className="formnamestyle">
            Quantity:
            </div>
            <div className="formdatainputstyle">
                <input
                    defaultValue={data.quantity}
                    type="number"
                    onChange={changeevent}
                    name="Quantity"
                    onWheel={(e) => e.target.blur()}
                />
            </div>
        </label>
    </div>
    {/* Quantity end  */}

      {/* Rate start  */}
    <div className="nameandinputcontainer">
        <label className="formdatalabelstyle">
            <div className="formnamestyle">
            Rate:
            </div>
            <div className="formdatainputstyle">
                <input
                    type="number"
                    readOnly
                />
            </div>
        </label>
    </div>
    {/* Rate end  */}

    {/* Amount start  */}
    <div className="nameandinputcontainer">
        <label className="formdatalabelstyle">
            <div className="formnamestyle">
            Amount:
            </div>
            <div className="formdatainputstyle">
                <input
                    type="number"
                    readOnly
                />
            </div>
        </label>
    </div>
    {/* Amount end  */}

    {/* Total start  */}
    <div className="nameandinputcontainer">
        <label className="formdatalabelstyle">
            <div className="formnamestyle">
            Total:
            </div>
            <div className="formdatainputstyle">
                <input
                    type="number"
                    readOnly
                />
            </div>
        </label>
    </div>
    {/* Total end  */}

    {/* CGST start */}
    <div className="nameandinputcontainer">
        <label className="formdatalabelstyle">
            <div className="formnamestyle">
            CGST:
            </div>
            <div className="formdatainputstyle">
                <input
                    type="number"
                    readOnly
                />
            </div>
        </label>
    </div>
    {/* CGST end  */}

    {/* SGST start */}
    <div className="nameandinputcontainer">
        <label className="formdatalabelstyle">
            <div className="formnamestyle">
            SGST:
            </div>
            <div className="formdatainputstyle">
                <input
                    type="number"
                    readOnly
                />
            </div>
        </label>
    </div>
    {/* SGST end  */}

    {/* IGST start */}
    <div className="nameandinputcontainer">
        <label className="formdatalabelstyle">
            <div className="formnamestyle">
            IGST:
            </div>
            <div className="formdatainputstyle">
                <input
                    type="number"
                    readOnly
                />
            </div>
        </label>
    </div>
    {/* IGST end  */}

    {/* Round off start */}
    <div className="nameandinputcontainer">
        <label className="formdatalabelstyle">
            <div className="formnamestyle">
            Round off:
            </div>
            <div className="formdatainputstyle">
                <input
                    type="number"
                    readOnly
                />
            </div>
        </label>
    </div>
    {/* Round off end  */}

    {/* TOTAL start  */}
    <div className="nameandinputcontainer">
        <label className="formdatalabelstyle">
            <div className="formnamestyle">
            TOTAL:
            </div>
            <div className="formdatainputstyle">
                <input
                    type="number"
                    readOnly
                />
            </div>
        </label>
    </div>
    {/* TOTAL end  */}
    </>
    ))
}

<div className="submitcontainee">
<CustomizedBtn 
    BtnName="submit"
    onClick={submiteventclicked}
    />
</div>
</form>