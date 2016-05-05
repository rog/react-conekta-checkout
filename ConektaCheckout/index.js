import React from 'react'

import 'whatwg-fetch'
import classNames from 'classnames'
import reactMixin from 'react-mixin'
import ReactScriptLoaderMixin from 'react-script-loader'

import styles from './styles.css'
import LogoConekta from './LogoConekta'

class ReactConektaCheckout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      purchase: false
    }
    this.purchase = this.purchase.bind(this)
    this.tokenizeCard = this.tokenizeCard.bind(this)
    this.getScriptURL = this.getScriptURL.bind(this)
    this.onScriptLoaded = this.onScriptLoaded.bind(this)
    this.errorResponseHandler = this.errorResponseHandler.bind(this)
    this.successResponseHandler = this.successResponseHandler.bind(this)
  }

  componentWillMount () {
    this.getScriptURL()
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

  successResponseHandler (token) {
    fetch(`/process_payment?token_id=${token.id}`, {
      method: 'POST'
    }).then((response) => {
      console.log(response)
    })
  }

  errorResponseHandler (error) {
    return console.log(error)
  }

  tokenizeCard () {
    const tokenParams = {
      card: {
        number: '4242424242424242',
        name: 'Javier Pedreiro',
        exp_year: '2014',
        exp_month: '12',
        cvc: '123',
        address: {
          street1: 'Calle 123 Int 404',
          street2: 'Col. Condesa',
          city: 'Ciudad de Mexico',
          state: 'Distrito Federal',
          zip: '12345',
          country: 'Mexico'
        }
      }
    }

    Conekta.token.create(tokenParams, this.successResponseHandler, this.errorResponseHandler)
  }

  purchase (e) {
    e.preventDefault()
    Conekta.setPublishableKey(this.props.publicKey)
    this.tokenizeCard()
    // this.setState({purchase: !this.state.purchase})
  }

  render () {
    return (
      <div className={classNames({
        [styles.checkout__wrapper]: true,
        [styles['checkout__wrapper--show']]: this.props.show
      })}>
        <form className={styles.checkout__form} onSubmit={this.purchase}>

          <div className={classNames({
            [styles.checkout__form__wrapper]: true,
            [styles['checkout__form__wrapper--show']]: !this.state.purchase
          })}>
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
           </div>

           <div className={classNames({
             [styles.checkout__form__messages]: true,
             [styles['checkout__form__messages--show']]: this.state.purchase
           })}>
             <p>Thank You For Your Purchase</p>
           </div>

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
