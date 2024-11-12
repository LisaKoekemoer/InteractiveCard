import './App.css';
import { useState } from 'react';
import bgDesktop from './images/bg-main-desktop.png';
import bgMobile from './images/bg-main-mobile.png';
import logo from './images/card-logo.svg';
import tick from './images/icon-complete.svg';
import { format } from 'date-fns';

function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("01/23");
  const [cvc, setCvc] = useState("");

  return (
    <>
      <section>
        <div className='bgImage'>
          <picture>
            <source media="(min-width: 768px)" srcSet={bgDesktop}/>
            <img src={bgMobile} alt="" />
          </picture>
        </div>

        <div className='container'>
          {/* Credit Card Details */}
          <div className='cardDetails'>
            {/* Front Card */}
            <div className='frontCard'>
              <img className='cardLogo' src={logo} alt="" />
              <p className='placeNumber'>
                {cardNumber}
              </p>
              <div>
                <p className='placeName'>
                  {name}
                </p>
                <p className='placeDate'>
                  {format(new Date(date), "MM/yy")}
                </p>
              </div>
            </div>

            {/* Back Card */}
            <div className='backCard'>
              <p className='placeCVC'>
                {cvc}
              </p>
            </div>
          </div>

          <div className='formDetails'>
            {!confirmed && (
              <form>
                <div>
                  <label htmlFor="cardholder_name">Cardholder Name</label>
                  <input 
                    type="text"
                    name="cardholder_name"
                    id="cardholder_name"
                    placeholder="e.g. Jane Appleseed" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
            
                <div>
                  <label htmlFor="card_number">Card Number</label>
                  <input 
                    type="text"
                    name="card_number"
                    id="card_number"
                    placeholder="e.g. 1234 5678 9012 3456" 
                    required
                    maxLength={19}
                    value={cardNumber
                      .replace(/\s/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim()}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
            
                <article>
                  <div>
                    <label htmlFor="expiry_date">Exp. Date (MM/YY)</label>
                    <input 
                      type="month"
                      name="expiry_date"
                      id="expiry_date"
                      placeholder="MM YY" 
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
            
                  <div>
                    <label htmlFor="cvc">CVC</label>
                    <input 
                      type="number"
                      name="cvc"
                      id="cvc"
                      placeholder="e.g. 123" 
                      maxLength={3}
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                    />
                  </div>
                </article>
            
                <button className='btn' onClick={() => setConfirmed(true)}>
                  Confirm
                </button>
              </form>
            )}

            {confirmed && <ThankYou setConfirmed={setConfirmed} />}
          </div>
        </div>
      </section>
    </>
  );
}

function ThankYou({ setConfirmed }){
  return(
    <>
      <div>
        <img src={tick} alt="" />
        <h1>Thank you!</h1>
        <p>We've added your card details</p>
        <button onClick={() => setConfirmed(false)} className='btn'>Continue</button>
      </div>
    </>
  );
}

export default App;
