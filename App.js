import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";

class App extends React.Component {
    state = {
        value: 1,
        currency: "none",
        result:0,
        currencies: [],
        loadingData: false,

        originalValue: 0,
        originalCurrency: "none",
        originalResult:0,
        originalCurrencies: [],

        sumResult:0


    }

    valueChanges = (event) =>{
        this.setState({
            value: event.target.value
        })
    }

    originalValueChanges = (event) =>{
        this.setState({
            originalValue: event.target.value
        })
    }


    componentDidMount() {
        this.setState({
            loadingData: true
        })

        setTimeout(()=>{
            this.getCurrencies()
        }, 2*1000)
    }

    getCurrencies = () =>{
        this.setState({
            loadingData: true
        })


        {

            axios.get('http://data.fixer.io/api/symbols?access_key=62e97159e404ff2831ba36521e54c0e9')
                .then((response) => {
                    this.setState(
                        { currencies: Object.keys(response.data.symbols),
                            loadingData:false,
                            originalCurrencies: Object.keys(response.data.symbols)
                        })

                }) }

    }


    currencyChanged = (event)=>{
        this.setState({
            currency: event.target.value
        })
    }

    originalCurrencyChanged = (event)=>{
        this.setState({
            originalCurrency: event.target.value
        })
    }

    calculation = ()=>{
        axios.get('http://data.fixer.io/api/latest?access_key=62e97159e404ff2831ba36521e54c0e9')
            .then((response) => {
                this.setState(
                    {
                        result:response.data.rates[this.state.currency] * this.state.value,
                        originalResult:response.data.rates[this.state.originalCurrency] * this.state.originalValue
                    })

            })    }



    render() {
        return (
            <div className="App">
                {
                    this.state.loadingData?
                        <div>
                            Loading...
                        </div>
                        :
                        <div>



                            <div  id={"headLine"}>Currency Converter</div>
                            <div>
                                <br/>
                                <label id={"secondaryHeadline"}>How much do you want to convert? </label>

                                <br/> <br/>

                                <input type={"number"} value={this.state.originalValue}
                                       onChange={this.originalValueChanges}/>

                                <br/><br/>

                            </div>

                            <select value={this.state.originalCurrency} onChange={this.originalCurrencyChanged}>
                                <option disabled={true} value={"none"}> SELECT CURRENCY </option>
                                {
                                    this.state.originalCurrencies.map((item)=> {
                                        return(
                                            <option  value={item}> {item}</option>
                                        )
                                    })
                                }

                            </select>
                            <br/><br/>


                            <select value={this.state.currency} onChange={this.currencyChanged}>
                                <option disabled={true} value={"none"}> SELECT CURRENCY </option>
                                {
                                    this.state.currencies.map((item)=> {
                                        return(
                                            <option  value={item}> {item}</option>
                                        )
                                    })
                                }

                            </select>
                            <br/>
                            <br/>

                            <button onClick={this.calculation} disabled={ this.state.currency == "none"||this.state.originalCurrency == "none"||this.state.originalValue<=0}>
                                Calculate
                            </button>
                            <br/>
                            <div id={"result"}>

                                Result:
                                <br/>
                                {( this.state.currency !== "none" && this.state.originalCurrency !== "none" && this.state.originalValue>0)&&
                                    this.state.result/this.state.originalResult}
                            </div>
                        </div>
                }


            </div>

        );

    }

}

export default App;

