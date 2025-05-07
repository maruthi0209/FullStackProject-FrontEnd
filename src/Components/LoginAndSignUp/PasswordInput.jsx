import { useState } from "react";

export default function PasswordInput() {

    let [validPassword, setValidPassword] = useState(true)

    function handleInput(e) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
        (e.target.value !== "")? setValidPassword(passwordRegex.test(e.target.value)) : setValidPassword(true)
    }

    return (
        <>
            <input type="password" name="password" id="password" placeholder="Enter password" onInput={handleInput}/>
            {validPassword==false && <p>Enter a password that:
                    <ul>
                        <li>Is 8 to 16 characters long</li>
                        <li>Contains only
                            <ul>
                                <li>lowercase letters</li>
                                <li>uppercase letters</li>
                                <li>numbers</li>
                            </ul>
                        </li>
                        <li>no special characters or spaces</li>
                    </ul>
                </p>}
        </>
    )
}