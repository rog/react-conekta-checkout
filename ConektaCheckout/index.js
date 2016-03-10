import React from 'react'
import styles from './styles.css'

class ReactConektaCheckout extends React.Component {
  render () {
    return (
      <form className={styles.checkout}>
         <div className='checkout-header'>
           <h1 className='checkout-title'>
             Checkout
             <span className='checkout-price'>$10</span>
           </h1>
         </div>
         <p>
           <input type='text' className='checkout-input checkout-name' placeholder='Your name' autoFocus />
           <input type='text' className='checkout-input checkout-exp' placeholder='MM' />
           <input type='text' className='checkout-input checkout-exp' placeholder='YY' />
         </p>
         <p>
           <input type='text' className='checkout-input checkout-card' placeholder='4111 1111 1111 1111' />
           <input type='text' className='checkout-input checkout-cvc' placeholder='CVC' />
         </p>
         <p>
           <input type='submit' value='Purchase' className='checkout-btn' />
         </p>
       </form>
    )
  }
}

export default ReactConektaCheckout
