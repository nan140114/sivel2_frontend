import React from "react";
import Instance from './Instance'
import { connect } from "react-redux";
import { initializeCases } from "../actions";
import FilterCases from '../containers/FilterCases' 
import LineChart from './LineChart'
import PieChart from './PieChart'
import * as d3 from "d3";

const mapStateToProps = state => ({
  ...state.cases
})

class CasesList extends React.Component {

  componentDidMount() {
    this.props.dispatch(initializeCases());
  }

  cleanData(_arr) { 
    let parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");
    let arr = []
    _arr.map( _obj => {
      arr.push(
        {
          fecha : parseTime(_obj.fecha),
          contexto : _obj.contexto
        })
    })
    return arr.sort((obj1, obj2) => {
      return obj1.fecha - obj2.fecha
    })
  }

  render() {
    return (
      <div>
        <FilterCases/>
        
        <LineChart 
          height={200}
          width={600}
          data={this.cleanData(this.props.cases)}
          stroke="#111"
        />
        <PieChart 
          data={[1, 2, 3, 4, 5]} 
          height={200}
          width={600} 
        />
        
        {/*
         {this.props.cases.map( (instance, index) =>
          <Instance
          key={index}
            {...instance}
         />)}
        */}
      </div>
    )
  }

}

export default connect(mapStateToProps)(CasesList);
