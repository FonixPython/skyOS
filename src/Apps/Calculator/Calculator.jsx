import "./Calculator.css"
import { useState } from "react"

export function CalculatorApp() {
    const [equationArray, setEquationArray] = useState([])
    const buttonArray = [
        "7", "8", "9", "x",
        "4", "5", "6", "/",
        "1", "2", "3", "+",
        "0", ".", "CA", "-"
    ]

    const handleClick = (e) => {
        console.log(equationArray)
        const { innerText } = e.target
        const updatedArray = [...equationArray]
        if (innerText == "CA") {
            setEquationArray([])
            return
        }
        if (/\d/.test(innerText) || innerText == ".") {
            if (/\d/.test(equationArray[equationArray.length - 1])) {
                updatedArray[equationArray.length - 1] = updatedArray[equationArray.length - 1] + innerText
                setEquationArray(updatedArray)
                return;
            } else {
                if (innerText == ".") {
                    updatedArray.push("0" + innerText)
                    setEquationArray(updatedArray)
                    return
                } else {
                    updatedArray.push(innerText)
                    setEquationArray(updatedArray)
                    return
                }
            }
        } else {
            if (/\d/.test(equationArray[equationArray.length - 1])) {
                console.log("a")
                if (innerText == "x") {
                    updatedArray.push("*")
                } else {
                    updatedArray.push(innerText)
                }
                setEquationArray(updatedArray)
                return
            } else {
                if (innerText == "x") {
                    updatedArray[equationArray.length - 1] = "*"
                } else {
                    updatedArray[equationArray.length - 1] = innerText
                }
                setEquationArray(updatedArray)
                return
            }
        }
    }

    function handleCalculate() {
        const result = String(eval(equationArray.join("")))
        setEquationArray([result])
    }


    return (
        <div className="app calculatorApp">
            <div className="display">
                <p className="equation">{equationArray}</p>
                <p className="currentNumber">{equationArray[equationArray.length - 1]}</p>
            </div>
            <div className="keypad">
                {buttonArray.map((btn) => (
                    <button className={["x", "/", "+", "-"].includes(btn) ? "operator" : ""} onClick={handleClick}>{btn}</button>
                ))}
            </div>
            <button onClick={handleCalculate}>=</button>
        </div>
    )
}