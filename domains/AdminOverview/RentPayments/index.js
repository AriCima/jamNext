import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import { useForm, Controller } from "react-hook-form";

import DataService from '../../../../services/DataService';
import Calculations from '../../../../services/Calculations';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const RentPaymentsInfo = ({ jamId, rooms, jammers, jamDetails }) => {    
    
    const [showRentInput, setShowRentInput] = useState(false);
   
    const { register, errors, handleSubmit, control, setValue } = useForm();

    const cTenants = Calculations.getCurrentTenants(jammers);
    const today = new Date();
    const cM = Number(today.getMonth()); // current Month in numbers
    const currentMonth = months[cM];
    let currentPayments = [];


    for (let i = 0; i < cTenants.length; i++) {
        const { userId, rentsArray, firstName, lastName, roomNr } = cTenants[i];
        // const teoricalRoomRent = rooms.filter(e => e.roomNr).rent;
        const currentMonthRent = rentsArray[cM];
        const tenantPayment = {firstName, lastName, roomNr, userId, currentMonthRent};
        currentPayments.push(tenantPayment);
    };

    const takeMeToTenantInfo


    onSubmit = (data) => {
        const rentInfo = {month: currentMonth, paidRent: paidRent};
        DataService.editMontRentPaymnet(jamId, tenantId, rentInfo);
    }

    const renderTenantsPayments = () => {
        
        // if (cp.currentMonthRent.paid) return;

        return  currentPayments.map((cP, userId) => {
            
            if (cP.paid === true) return;
        
            return (
                <div
                    className="rent-payment-line"
                    key={userId}
                    onCLick={takeMeToTenantInfo(cp.userId)}
                >
                    <div className="rent-payment-block">
                        {cP.firstName} {cP.lastName}
                    </div>
                    <div className="rent-payment-block">
                        {cp.roomNr}
                    </div>
                    <div className="rent-payment-block">
                        {cp.currentMonthRent.rent}
                    </div>
                    <button>send reminder</button>
                    <button
                        onClick={setShowRentInput(true)}
                    >
                        already paid
                    </button>
                    {showRentInput && (
                        <form
                         autocomplete="off"
                         className="hook-form"
                         onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="custom-input-block">
                                <div className="block-label">
                                    <label>Amount paid</label>
                                    {errors.paidRent && <div className="field-error">Required</div>}
                                </div>
                                <input name="paidRent" ref={register({required: true})}/>
                            </div>
                        </form>
                            
                    )}
                </div>
            )
        }
    )}

    return (
        <div className="rent-payments-wrapper">

        {renderTenantsPayments()}

        </div>
    );
};

const mapStateToProps = state => {
    const jamId = state.nav.jamId;
    const { userId } = state.userInfo;
    const { jamDetails, jammers, rooms } = state.jamInfo

    return { jamId, jamDetails, userId, jammers, rooms };
};
export default connect(mapStateToProps, null)(RentPaymentsInfo);