import React from 'react'
import classNames from 'classnames'

import styles from './styles.css'

class ReactConektaCheckout extends React.Component {
  render () {
    return (
      <form className={styles.checkout}>
         <div className={styles.checkoutHeader}>
           <h1 className={styles.checkoutTitle}>
             Checkout
             <span className={styles.checkoutPrice}>$42</span>
           </h1>
         </div>
         <p>
           <input
             type='text'
             className={classNames(styles.checkoutInput, styles.checkoutName)}
             placeholder='Your name'
             autoFocus />

           <input
             type='text'
             className={classNames(styles.checkoutInput, styles.checkoutExp)}
             placeholder='MM' />

           <input
             type='text'
             className={classNames(styles.checkoutInput, styles.checkoutExp)}
             placeholder='YY' />
         </p>
         <p>
           <input
             type='text'
             className={classNames(styles.checkoutInput, styles.checkoutCard)}
             placeholder='4111 1111 1111 1111' />

           <input
             type='text'
             className={classNames(styles.checkoutInput, styles.checkoutCvc)}
             placeholder='CVC' />
         </p>
         <p>
           <input
             type='submit'
             value='Purchase'
             className={styles.checkoutBtn} />
         </p>
       </form>
    )
  }
}

export default ReactConektaCheckout
