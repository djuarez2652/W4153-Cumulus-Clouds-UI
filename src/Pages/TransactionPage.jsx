import { useState } from "react";
// import button from "../Components/button";

function TransactionPage() {
    const [response, setResponse] = useState("");

    // Function to handle API calls
    const callApi = async (url, method, body = null) => {
        try {
            url = "http://3.145.23.115:8080" + url
            const options = {
                method,
                headers: { "Content-Type": "application/json" },
            };
            if (body) options.body = JSON.stringify(body);

            const res = await fetch(url, options);
            const data = await res.text();
            setResponse(data);
        } catch (error) {
            setResponse("Error: " + error.message);
        }
    };

    return (
        <>
            <h1>Test Transaction</h1>

            {/* button to call the welcome message */}
            <button onClick={() => callApi("/api/transactions/", "GET")}>
                Get Welcome Message
            </button>

            {/* button to update payment information */}
            <button
                onClick={() => callApi("/api/transactions/payments", "POST", { paymentInfo: "Sample Payment Data" })}
            >
                Update Payment Information
            </button>

            {/* button to retrieve payment information */}
            <button
                onClick={() => callApi("/api/transactions/payments/12345", "GET")}
            >
                Get Payment Information
            </button>

            {/* button to update customer information */}
            <button
                onClick={() => callApi("/api/transactions/customers", "POST", { customerInfo: "Sample Customer Data" })}
            >
                Update Customer Information
            </button>

            {/* button to retrieve customer information */}
            <button
                onClick={() => callApi("/api/transactions/customers/67890", "GET")}
            >
                Get Customer Information
            </button>

            {/* Display the API response */}
            <p>{response}</p>
        </>
    );
}

export default TransactionPage;
