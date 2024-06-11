import "./App.css";
import { useState } from "react";

function App() {
  // const [firstName, setFirstName] = useState("");                    //handling single state
  // const [lastName, setLastName] = useState("");

  // function changeFirstNameHandler(event) {
  //   // console.log(event.target);
  //   console.log(event.target.value);
  //   setFirstName(event.target.value);
  // }

  // function changeLastNameHandler(event) {
  //   // console.log(event.target);
  //   console.log(event.target.value);
  //   setLastName(event.target.value);
  // }

  const [formData, setFormData] = useState(            {              //using curly braces we are storing an object inside formData [Handling multiple states here]
    firstName: "",
    lastName: "",
    email: "",
    comment: "",
    isAgree: true,
    mode: "",
    favCar: ""
  });

  // console.log(formData);

  function changeHandler(event) {
    const { name, value, checked, type } = event.target;
    setFormData((prevFormData) => {
      // console.log(prevFormData);
      return {
        ...prevFormData,                                                        //*****
        [name]: type === "checkbox" ? checked : value,                        //we have used name here to identify call is made from which input
        //[event.target.name] : event.target.value                      //using : because we are storing it as key value pairs inside object
        //to access an attribute we use [] brackets like [name] -> SYNTAX
        // here we have used checked logic to access value of checkbox
      };
    });
  }

  function submitHandler(event)
  {
    event.preventDefault();
    console.log("Form Give DAta")
    console.log(formData);
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>            //onSubmit initiated by pressing submit button in form
          <input
            type="text"
            placeholder="Enter First name"
            // onChange={changeFirstNameHandler}
            onChange={changeHandler}
            name="firstName"                      //good practice is to use same name as written inside useState beacuse it is laso being used in line 38
            value={formData.firstName}                    //Controlled components here input is also maintaining its state [during rerendering it executes and this rerendeing happens during execution of useState]                        will be used further in projects
          />

          <br />
          <br />
          <input
            type="text"
            placeholder="Enter Last name"
            // onChange={changeLastNameHandler}
            onChange={changeHandler}
            name="lastName"
            value={formData.lastName}
          />

          <br />
          <br />
          <input
            type="email"
            placeholder="Enter Email"
            onChange={changeHandler}
            name="email"
            value={formData.email}
          />

          <br />
          <br />
          <textarea
            name="comment"
            id=""
            cols="30"
            rows="10"
            placeholder="Enter your Comments"
            onChange={changeHandler}
            value={formData.value}
          ></textarea>

          <br />
          <br />
          <input
            type="checkbox"
            name="isAgree"
            onChange={changeHandler}
            id="isAgree"
            checked={formData.isAgree}                //incase of checkbox we dont have value but we have checked state which is to be updated
          />

          <label htmlFor="isAgree">Agree Term and Condition</label>            //// in jsx we use htmlFor rather than for attribute

          <br />
          <br />

          <fieldset>         //to group elements in a box we use field set tag
          <legend> Mode:</legend>            ////// //to add caption to the field
          <input
            type="radio"
            name="mode"
            id="Dark-mode"
            value="Dark-mode"                            //*****
            onChange={changeHandler}
            checked={formData.mode === "Dark-mode"}              //***** (putting a boolean value in checkbox)
          />

          <label htmlFor="Dark-mode">Dark Mode</label>

          <input
            type="radio"
            name="mode"
            id="Light-mode"
            value="Light-mode"
            onChange={changeHandler}
            checked={formData.mode === "Light-mode"}              //*****
          />
          <label htmlFor="Light-mode">Light Mode</label>
        </fieldset>

        <select
          name="favCar"
          id="favCar"
          value={formData.favCar}
          onChange={changeHandler}
        >
          <option value="scarpio">Scarpio</option>
          <option value="russian">Russian</option>
          <option value="thar">Thar</option>
          <option value="bmw">BMW</option>
          <option value="other" selected>Other</option>
        </select>

        <label htmlFor="favCar">Your Favrioute Car</label>

        <br /><br />

        <input type="submit" value="Submit" />            //or we can make it with the help of button tag
            //point to remember is that whenever inside form submit button is pressed then in form onSubmit event is initiated 
      </form>
    </div>
  );
}

export default App;
