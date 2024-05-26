import React from "react";
import AddFewCustomersForm from "../AddFewCustomersForm/AddFewCustomersForm";

const FullScreenModalOne = ({
    modalview,
    api,
    currentCustomerReferenceNo
}) => {
    console.log("modalview",modalview);
    return(
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add New Customer </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                          <AddFewCustomersForm 
                            api={api}
                          />
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <div>
                         footer
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default FullScreenModalOne;