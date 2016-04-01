import React from 'react'
import classNames from 'classnames'

import styles from './styles.css'

class ReactConektaCheckout extends React.Component {
  render () {
    return (
      <form className={styles.checkout}>
         <div className={styles.checkout__header}>
           <h1 className={styles.checkout__title}>
             Checkout
             <span className={styles.checkoutPrice}>$42</span>
           </h1>
         </div>
         <p className={styles.checkout__paragraph}>
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
         <p className={styles.checkout__paragraph}>
           <input
             type='text'
             className={classNames(styles.checkoutInput, styles.checkoutCard)}
             placeholder='4111 1111 1111 1111' />

           <input
             type='text'
             className={classNames(styles.checkoutInput, styles.checkoutCvc)}
             placeholder='CVC' />
         </p>
         <p className={styles.checkout__paragraph}>
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
