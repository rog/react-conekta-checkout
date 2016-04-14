import React from 'react'
import classNames from 'classnames'
import reactMixin from 'react-mixin'
import ReactScriptLoaderMixin from 'react-script-loader'

import styles from './styles.css'
import LogoConekta from './LogoConekta'

class ReactConektaCheckout extends React.Component {
  constructor (props) {
    super(props)
  }
  // this function tells ReactScriptLoaderMixin where to load the script from
  getScriptURL () {
    return 'https://conektaapi.s3.amazonaws.com/v0.3.2/js/conekta.js'
  }

  // ReactScriptLoaderMixin calls this function when the script has loaded
  // successfully.
  onScriptLoaded () {
    Conekta.setPublishableKey(this.props.publicKey)
  }

  render () {
    return (
      <div className={classNames({
        [styles.checkout__wrapper]: true,
        [styles['checkout__wrapper--show']]: this.props.show
      })}>
        <form className={styles.checkout__form}>
           <div className={styles.checkout__header}>
             <h1 className={styles.checkout__title}>
               Checkout
               <span className={styles.checkout__price}>$42</span>
             </h1>
           </div>
           <p className={styles.checkout__paragraph}>
             <input
               type='text'
               className={
                 classNames(
                   styles.checkout__input,
                   styles['checkout__input--name']
                 )
               }
               placeholder='Your name'
               autoFocus />

             <input
               type='text'
               className={
                 classNames(
                   styles.checkout__input,
                   styles['checkout__input--exp']
                 )
               }
               placeholder='MM' />

             <input
               type='text'
               className={
                 classNames(
                   styles.checkout__input,
                   styles['checkout__input--exp']
                 )
               }
               placeholder='YY' />
           </p>
           <p className={styles.checkout__paragraph}>
             <input
               type='text'
               className={
                 classNames(
                   styles.checkout__input,
                   styles['checkout__input--card']
                 )
               }
               placeholder='4111 1111 1111 1111' />

             <input
               type='text'
               className={
                 classNames(
                   styles.checkout__input,
                   styles['checkout__input--cvc']
                 )
               }
               placeholder='CVC' />
           </p>
           <p className={styles.checkout__paragraph}>
             <input
               type='submit'
               value='Purchase'
               className={styles.checkout__button} />
           </p>
         </form>
         <div className={styles.checkout__overlay}></div>
         <div className={
             classNames({
               [styles.checkout__https__warning]: true,
               [styles['checkout__https__warning--show']]: window.location.protocol !== 'https:'
             })
         }>
           <p>HTTPS required</p>
         </div>
         <div className={styles.checkout__powered}>
           <LogoConekta />
         </div>
       </div>
    )
  }
}

reactMixin(ReactConektaCheckout.prototype, ReactScriptLoaderMixin)

ReactConektaCheckout.propTypes = {
  publicKey: React.PropTypes.string.isRequired,
  show: React.PropTypes.bool
}

export default ReactConektaCheckout
