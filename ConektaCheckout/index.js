import React from 'react'

import 'whatwg-fetch'
import classNames from 'classnames'

import styles from './styles.css'
import LogoConekta from './LogoConekta'
import Loader from './Loader'

class ReactConektaCheckout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      purchase: false,
      scriptLoaded: false
    }
    this.purchase = this.purchase.bind(this)
    this.tokenizeCard = this.tokenizeCard.bind(this)
    this.loadScriptURL = this.loadScriptURL.bind(this)
    this.errorResponseHandler = this.errorResponseHandler.bind(this)
    this.successResponseHandler = this.successResponseHandler.bind(this)
  }

  componentWillMount () {
    this.loadScriptURL()
  }
  componentDidMount () {
    if (this.state.scriptLoaded) {
      Conekta.setPublishableKey(this.props.publicKey)
    }
  }

  loadScriptURL () {
    const script = document.createElement('script')
    script.src = 'https://conektaapi.s3.amazonaws.com/v0.3.2/js/conekta.js'
    script.async = 1
    script.onload = () => {
      if (Conekta !== undefined) {
        this.setState({scriptLoaded: true})
      }
    }
    script.onerror = () => {
      this.setState({scriptLoaded: false})
      throw new Error('Error: Conekta script wasn\'t loaded.')
    }
    document.body.appendChild(script)
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
        [styles.Checkout__wrapper]: true,
        [styles['Checkout__wrapper--show']]: this.props.show
      })}>
        <div className={styles.Checkout__loader}>
          <Loader />
        </div>
        <form className={styles.Checkout__form} onSubmit={this.purchase}>

          <div className={classNames({
            [styles.Checkout__form__wrapper]: true,
            [styles['Checkout__form__wrapper--show']]: !this.state.purchase
          })}>
             <div className={styles.Checkout__header}>
               <h1 className={styles.Checkout__title}>
                 Checkout
                 <span className={styles.Checkout__price}>$42</span>
               </h1>
             </div>
             <p className={styles.Checkout__paragraph}>
               <input
                 type='text'
                 className={
                   classNames(
                     styles.Checkout__input,
                     styles['Checkout__input--name']
                   )
                 }
                 placeholder='Your name'
                 autoFocus />

               <input
                 type='text'
                 className={
                   classNames(
                     styles.Checkout__input,
                     styles['Checkout__input--exp']
                   )
                 }
                 placeholder='MM' />

               <input
                 type='text'
                 className={
                   classNames(
                     styles.Checkout__input,
                     styles['Checkout__input--exp']
                   )
                 }
                 placeholder='YY' />
             </p>
             <p className={styles.Checkout__paragraph}>
               <input
                 type='text'
                 className={
                   classNames(
                     styles.Checkout__input,
                     styles['Checkout__input--card']
                   )
                 }
                 placeholder='4111 1111 1111 1111' />

               <input
                 type='text'
                 className={
                   classNames(
                     styles.Checkout__input,
                     styles['Checkout__input--cvc']
                   )
                 }
                 placeholder='CVC' />
             </p>
             <p className={styles.Checkout__paragraph}>
               <input
                 type='submit'
                 value='Purchase'
                 className={styles.Checkout__button} />
             </p>
           </div>

           <div className={classNames({
             [styles.Checkout__form__messages]: true,
             [styles['Checkout__form__messages--show']]: this.state.purchase
           })}>
             <p>Thank You For Your Purchase</p>
           </div>

         </form>
         <div className={styles.Checkout__overlay}></div>
         <div className={
             classNames({
               [styles.Checkout__httpsWarning]: true,
               [styles['Checkout__httpsWarning--show']]: window.location.protocol !== 'https:'
             })
         }>
           <p>HTTPS required</p>
         </div>
         <div className={styles.Checkout__powered}>
           <LogoConekta />
         </div>
       </div>
    )
  }
}

ReactConektaCheckout.propTypes = {
  publicKey: React.PropTypes.string.isRequired,
  show: React.PropTypes.bool
}

export default ReactConektaCheckout
