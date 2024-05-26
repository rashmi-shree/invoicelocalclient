import React, {useRef } from "react";
import DealersInvoiceFormGenerate from "../DealersInvoiceFormGenerate/DealersInvoiceFormGenerate";
import CustomizedPrint from "../../atoms/CustomizedPrint/CustomizedPrint";
import { useReactToPrint } from "react-to-print";

const FullScreenModalTwo = ({
    api,
    invoiceFormData,
    fetchdealersdatatoverify
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
                        <h5 className="modal-title" id="exampleModalLabel">Reciept</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div ref={componentRef} className="modal-body">
                    <DealersInvoiceFormGenerate 
                     api={api}
                     fetchdealersdatatoverify={fetchdealersdatatoverify}
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
export default FullScreenModalTwo;