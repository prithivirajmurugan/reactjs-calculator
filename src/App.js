import React, { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format';
import './App.css';


function App() {

  const [preState, setPreState] = useState('');
  const [currState, setCurrState] = useState('');
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);
  useEffect(() => {
    if (currState !== '')
      {
        setInput(currState);
      }
    
  }, [currState]);

  useEffect(() => {
    setInput('0');
  }, [])

  const reset = () => {
    setPreState('');
    setCurrState('');
    setInput('0');
   }
  const percent = () => {
    preState ? setCurrState(prev => { return String(parseFloat(prev) / 100 * preState) })
      : setCurrState(prev => { return String(parseFloat(prev) / 100) });
   }
  const minusPlus = () => {
    if (currState.charAt(0) === "-") {
      setCurrState(prev=>prev.substring(1))
    } else {
      setCurrState(prev => "-" + prev);
    }
   }
  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (currState === "") return;
    if (preState !== "") {
      equals()
    }
    else {
      setPreState(currState);
      setCurrState('');
    }
    
  }
  const InputNum = (e) => {
    if (currState.includes(".") && e.target.innerText == ".") return;
    if (total) {
      setPreState("");
    }
    currState ? setCurrState((pre) => pre + e.target.innerText) : setCurrState(e.target.innerText);
    setTotal(false)
   }
  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(currState)); break;
      case "+":
        cal = String(parseFloat(preState) + parseFloat(currState)); break;
      case "X":
        cal = String(parseFloat(preState) * parseFloat(currState)); break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(currState)); break;
      default: return;
    }
    setInput('');
    setPreState(cal)
    setCurrState("");
   }
  
  return (
    <div className='container'>
      <div className="wrapper">
        <div className="screen">{input !== "" || input === "0" ? (
          <NumberFormat
            value={input}
            displayType={'text'}
            thousandSeparator={true} />)
          : (<NumberFormat
            value={preState}
            displayType={'text'}
            thousandSeparator={true} />)}
        </div>
        <div className="btn light-gray" onClick={() => { reset() }}>AC</div>
        <div className="btn light-gray" onClick={() => { percent() }}>%</div>
        <div className="btn light-gray" onClick={() => { minusPlus() }}>+/-</div>
        <div className="btn orange" onClick={(e) => { operatorType(e) }}>/</div>
        <div className="btn" onClick={(e) => { InputNum(e) }}>7</div>
        <div className="btn" onClick={(e) => { InputNum(e) }}>8</div>
        <div className="btn" onClick={(e) => { InputNum(e) }}>9</div>
        <div className="btn orange" onClick={(e) => { operatorType(e) }}>X</div>
        <div className="btn" onClick={(e) => { InputNum(e) }}>4</div>
        <div className="btn" onClick={(e) => { InputNum(e) }}>5</div>
        <div className="btn" onClick={(e) => { InputNum(e) }}>6</div>
        <div className="btn orange" onClick={(e) => { operatorType(e) }}>+</div>
        <div className="btn" onClick={(e) => { InputNum(e) }}>1</div>
        <div className="btn" onClick={(e) => { InputNum(e) }}>2</div>
        <div className="btn" onClick={(e) => { InputNum(e) }}>3</div>
        <div className="btn orange" onClick={(e) => { operatorType(e) }}>-</div>
        <div className="btn zero" onClick={(e) => { InputNum(e) }}>0</div>
        <div className="btn" onClick={(e) => { InputNum(e) }}>.</div>
        <div className="btn" onClick={(e) => { equals(e) }}>=</div>
      </div>
    </div>
  )
}

export default App
