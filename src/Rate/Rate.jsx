import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import './Rate.css';
import Calc from '../Calc/Calc'

class Rate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          date: '',
          curRate : {}
      }
      this.currency = ['USD', 'RUB', 'CAD']

      this.getRate();
    }

    getRate = async () => {
        fetch('http://api.exchangeratesapi.io/v1/latest?access_key=83c025730e644a92760e351cc38191ef')
            .then( data => data.json() )
            .then( data => {
                this.setState({
                    date: data.date
                })

                let results = {}
                for( let i = 0; i < this.currency.length; i++){
                    results[ this.currency[i] ] = data.rates[this.currency[i]]
                }
                this.setState({
                    curRate : results
                })
            });

    }

    render() {
        return (
            <div className="Rate">
                <button onClick={this.getRate}>Click me...</button>
                <h3> Курс валют на {this.state.date}</h3>
                <div className="flex-container">
                    {Object.keys(this.state.curRate).map((keyName, i)=>
                        (
                            <div className="block flex-item" key={keyName}>
                                <div className="currency-name">{keyName}</div>
                                <div className="currency-in">{this.state.curRate[keyName].toFixed(2)}</div>
                                <p>* Можно купить за 1 EUR</p>
                            </div>  
                        )
                    )}
                </div>
                <Calc rate={this.state.curRate}/>            
            </div>
        );
    }
}

export default Rate;