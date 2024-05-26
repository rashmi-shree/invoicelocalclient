import React, {useRef } from "react";
import AddFewCustomersForm from "../AddFewCustomersForm/AddFewCustomersForm";
import InvoiceFormat from "../InvoiceFormat/InvoiceFormat";
import CustomizedPrint from "../../atoms/CustomizedPrint/CustomizedPrint";
import { useReactToPrint } from "react-to-print";

const FullScreenModal = ({
    api,
    invoiceFormData,
    custrefno,
    openinvoiceevent
}) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return(
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Receipt </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div ref={componentRef} className="modal-body">
                    <InvoiceFormat
                        api={api}
                        invoiceFormData={invoiceFormData}
                        custrefno={custrefno}
                        openinvoiceevent={openinvoiceevent}
                    />
                    </div>
                    <div className="modal-footer">
                        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <div>
                            <CustomizedPrint
                                onClick={handlePrint}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FullScreenModal;