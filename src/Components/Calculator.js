import React, { useState, useEffect} from "react";

const regex = '.+-*/'
const touches = [
  7, 8, 9, "del",
  4, 5, 6, "+",
  1, 2, 3, "-",
  ".", 0, "/", "x",
  "reset", "="
];

const Calculator = ({ 
  handleChangeTheme, 
  formState,
  previousFormState,
  saveForms,
  setFormState,
  setPreviousFormState,
  setSaveForms 
}) => {
  const [resultCpt, setResultCpt] = useState(0)

  useEffect(() => {
    if (resultCpt === 10)
      setFormState("42");
  }, [resultCpt])
  
  const calculate = (calcul) => {
    var checkResult = ''
  
    if (calcul.includes('--'))
        checkResult = calcul.replace('--','+')
    else
      checkResult = calcul
    try {
      return (eval(checkResult) || "" )
    } catch (e) {
      window.alert("Calcul Invalide");
      return calcul
    }
  };

  const handleSubmit = (e) => {
    let result;

    if (e) {
      e.preventDefault();
    }
    if (formState !== "0" && formState !== "") {
      result = calculate(formState);
      let oldState = formState;
      if (result)
        oldState = parseFloat(result.toFixed(2)).toString();
      else
        oldState = "0";
      setFormState(oldState);
    }
    if (formState !== previousFormState)
      setSaveForms([...saveForms, formState])
  };

  const handleChange = (e) => {
    const lastInput = e.target.value[e.target.value.length - 1]

    setPreviousFormState(formState)
    if (e.target.value === '=')
      handleSubmit();
    else if (lastInput === undefined)
      setFormState("");
    else if ((!isNaN(lastInput) || regex.includes(lastInput)) && formState.length <= 10) {
      let oldState = formState;
      oldState = e.target.value;
      setFormState(oldState);
    }
  };

  const handleTouch = (value) => {
    let oldState = formState;
    
    setPreviousFormState(formState)
    if (
      ((value >= 0 && value <= 9) ||
      value === "/" ||
      value === "*" ||
      value === "x" ||
      value === "-" ||
      value === "+" ||
      value === ".")  && formState.length <= 10
    ) {
      if (value === "x")
        oldState += "*";
      else
        oldState += value;
        setFormState(oldState);
      setResultCpt(0)
    } else if (value === "=") {
      handleSubmit();
      setResultCpt(resultCpt + 1);
    } else if (value === "reset") {
      setFormState("");
      setResultCpt(0);
    } else if (value === "del" && oldState !== "") {
      oldState = oldState.substring(
        0,
        oldState.length - 1
      );
      setFormState(oldState);
      setResultCpt(0)
    }
  };

  return (
    <section id="calculator">
      <div className="content-wrapper">
        <div className="in-section">
          <h2>Calculator</h2>
          <div className="result calcul-step">
            <label for="calcul">Calcul</label>
            <input
              type="text" autoFocus
              name="calcul" id="calcul"
              value={formState}
              onChange={handleChange}
              onKeyPress={(e) => {
                if (e.code === 'Enter' || e.key === '=')
                  handleSubmit()
                else if (e.code === 'KeyT')
                  handleChangeTheme()
                else if (e.code === 'KeyR') {
                  setFormState("");
                  setResultCpt(0);
                }
              }}
            />
          </div>
          <div className="touch touches-step">
            {touches.map((tch, k) => {
              return (
                <div
                  key={k}
                  className={`tch tch-${tch}`}
                  onClick={() => handleTouch(tch)}
                >
                  {tch}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calculator