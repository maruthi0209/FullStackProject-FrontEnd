import { useState } from "react";

export default function EmailInput() {

    let [validEmail, setValidEmail] = useState(true)

    function handleInput(e) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        (e.target.value !== "")? setValidEmail(emailRegex.test(e.target.value)) : setValidEmail(true)
    }

    return  (
        <>
            <input type="input" name="email" id="email" placeholder="Enter email" onInput={handleInput}/>
            {validEmail == false && <p>Please enter a valid email format</p>}
        </>
    )
}