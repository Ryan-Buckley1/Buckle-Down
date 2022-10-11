import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_BILL } from "../../utils/mutations";
import { QUERY_FULL_ME, QUERY_BILLS } from "../../utils/queries";

const BillForm = () => {
  const [billFormState, setBillFormState] = useState({
    amount: 0,
    company: "",
    date: "",
    recurring: 0,
    urlToPay: "",
    siteUsername: "",
    notes: "",
    username: "",
  });
  const [addBill, { error }] = useMutation(ADD_BILL, {
    update(cache, { data: { addBill } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_FULL_ME });
        cache.writeQuery({
          query: QUERY_FULL_ME,
          data: { me: { ...me, bills: [...me.bills, addBill] } },
        });
      } catch (e) {
        console.warn("First bill insertion by user!");
      }
      const { bills } = cache.readQuery({ query: QUERY_BILLS });

      cache.writeQuery({
        query: QUERY_BILLS,
        data: { bills: [addBill, ...bills] },
      });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setBillFormState({
      ...billFormState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addBill({
        variables: { billFormState },
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Company"
                name="company"
                type="company"
                id="company"
                value={billFormState.company}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Amount Due"
                name="amount"
                type="amount"
                id="amount"
                value={billFormState.amount}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Due Date"
                name="date"
                type="date"
                id="date"
                value={billFormState.date}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="URL to Bill Pay"
                name="urlToPay"
                type="urlToPay"
                id="urlToPay"
                value={billFormState.urlToPay}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Username on Website"
                name="siteUsername"
                type="siteUsername"
                id="siteUsername"
                value={billFormState.siteUsername}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Notes"
                name="notes"
                type="notes"
                id="notes"
                value={billFormState.notes}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>
            {error && <div>Sign up failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BillForm;
