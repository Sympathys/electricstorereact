import React from "react";
import attack from './images/attack.png';
import defend from './images/defend.png';
export default class Counter extends React.Component{
    constructor(props){
        super(props);
        this.handleAttackClick=this.handleAttackClick.bind(this);
        this.handleDefendClick=this.handleDefendClick.bind(this);
        this.state = {
            count: 0,
            gameStatus:"",
            lastPlay:"",
        };
    }
    handleAttackClick =()=>{
        this.setState((previousState) => {
            let newCount = previousState.count + Math.round(Math.random()*10);
            return {
                count: newCount,
                gameStatus:newCount>10?"You Won!!" : previousState.gameStatus,
                lastPlay:"Attack",
            };
        });
        //this.setState({count: this.state.count+1});
    }
    handleDefendClick=()=>{
        this.setState((previousState) => {
            let newCount = previousState.count - Math.round(Math.random()*10);
            return {
                count: newCount,
                gameStatus:newCount<-10?"You Lost!!" : previousState.gameStatus,
                lastPlay:"Defence",
            };
        });
        //this.setState({count: this.state.count-1});
    }
    handleRandomPlay=()=>{
        let playMode = Math.round(Math.random());
        if(playMode == 0){
            this.handleAttackClick();
        } else{
            this.handleDefendClick();
        }
    }
    handleReset=()=>{
        this.setState((previousState) => {
            return {
                count: 0,
                gameStatus:"",
                lastPlay:"",
            };
        });
    }
    render(){
        return(
            <div className="row text-black text-center">
                <h1>Game Score: {this.state.count}</h1>
                <p>Last Play: {this.state.lastPlay}</p>
                <h3>Game Status: {this.state.gameStatus}</h3>
                <div className = "col-6 col-md-3 offset-md-3"> 
                    <img
                        style={{
                            width: "50%",
                            cursor: "pointer",
                            border: "1px solid green",
                        }}
                        className="p-4 rounded" src={attack} onClick={(this.handleAttackClick)}/>
                </div>
                <div className = "col-6 col-md-3">
                    <img
                        style={{
                            width: "50%",
                            cursor: "pointer",
                            border: "1px solid red",
                        }}
                        className="p-4 rounded" src={defend} onClick={(this.handleDefendClick)}/>
                </div>
                <div className="col-12 col-md-4 offset-md-4">
                    <button className="btn btn-secondary w-100 mt-2" onClick={this.handleRandomPlay}>Random Play</button>
                    <button className="btn btn-warning w-100 mt-2" onClick={this.handleReset}>Reset</button>
                </div>
            </div>
        )
    }
}