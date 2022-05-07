import React, { useEffect, useState } from "react";
import "./styles.css";

type Args = { [argname: string]: string };
type Operation = { [operationName: string]: any };

const args_children: Args[] = [];

const ops_children: Operation[] = [
  { Constant: [true, false] },
  { Argument: { args_children } },
  { AND: "AND" },
  { OR: "OR" },
];

/* 
a system for defining logical operations 
(not, and, or... more if you want) that can be passed:
 - selected args by name: (X and Y)
 - constant values not dependent on args: (true and X)
 - other operations: ((X and Y) or Z) 
 */

function evaluateOperation(operation: Operation, args: Args): boolean {
  // if (operation.operationName === operations.constant) {
  //   return true;
  // } else {
  //   return false;
  // }
  /* ...todo: implement an evaluator for your operations, 
  given some args */
  return true;
}

function OperationBuilder(props: {
  value: Operation;
  onChange: (value: Operation) => void;
}): JSX.Element {
  if (Object.keys(props.value)[0] === "Constant") {
    return (
      <div key={props.value[0]}>
        <select>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <button onClick={() => props.onChange({ delete: true })}>X</button>
      </div>
    );
  } else if (Object.keys(props.value)[0] === "Argument") {
    return (
      <div key={props.value[0]}>
        <select>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <button onClick={() => props.onChange({ delete: true })}>X</button>
      </div>
    );
  }

  // }
  // if (props.value.delete === true) {
  //   return (
  //     <div key={props.value.toString()}>
  //       <select >
  //         <option onChange={() => props.onChange({constant: true})} value="constant">Constant</option>
  //         <option value="argument">Argument</option>
  //         <option value="and">AND</option>
  //         <option value="or">OR</option>
  //       </select>
  //       <button>X</button>
  //     </div>
  //   );
  // }
  // else{

  function parseEvent(event: string) {
    let operation: Operation = { [event]: true };
    props.onChange(operation);
  }

  return (
    <div key={props.value.toString()}>
      <select onChange={(event) => parseEvent(event.target.value)}>
        <option disabled selected>
          Select..
        </option>
        <option value="constant">Constant</option>
        <option value="argument">Argument</option>
        <option value="and">AND</option>
        <option value="or">OR</option>
      </select>
    </div>
  );
  // }
}

function ArgsBuilder(props: {
  onValueChanged: (value: string, bool: string) => void;
}): JSX.Element {
  const [input, setInput] = useState("");
  const [bool, setBool] = useState("true");

  function valueUpdated() {
    props.onValueChanged(input, bool);
  }
  return (
    <div className="row" onChange={valueUpdated}>
      <input onChange={(e) => setInput(e.target.value)} />
      <div className="arg_options">
        <select id="arg_options" onChange={(e) => setBool(e.target.value)}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
    </div>
  );
}

export default function App() {
  const [operationsValue, setOperation] = useState({});
  const [argsinput, setInput] = useState("");
  const [argsbool, setBool] = useState("true");
  const [argsValue, setArgsValue] = useState(1);

  function updateArgsData(value_: string, bool_: string) {
    setInput(value_);
    setBool(bool_);
  }

  function pushArgsChildren(argsValue: number, value_: string, bool_: string) {
    setArgsValue((argsValue += 1));
    args_children.push({ [value_]: bool_ });
    console.log(args_children);
  }

  function updateOperationsValue(operVal: Operation) {
    let ops_Index: number;

    if (Object.keys(operVal)[0].toString() === "constant") {
      ops_Index = 0;
      setOperation(ops_children[ops_Index]);
    } else if (Object.keys(operVal)[0].toString() === "argument") {
      ops_Index = 1;
      setOperation(ops_children[ops_Index]);
    } else if (Object.keys(operVal)[0].toString() === "and") {
      ops_Index = 2;
      setOperation(ops_children[ops_Index]);
    } else if (Object.keys(operVal)[0].toString() === "or") {
      ops_Index = 3;
      setOperation(ops_children[ops_Index]);
    }
  }

  return (
    <div>
      <h1>Operation Builder</h1>

      <label>Choose an argument:</label>
      <br />
      <br />
      {[...Array(argsValue)].map((_, i) => (
        <ArgsBuilder key={i} onValueChanged={(v, b) => updateArgsData(v, b)} />
      ))}
      <button onClick={() => pushArgsChildren(argsValue, argsinput, argsbool)}>
        Add Args
      </button>

      <br />
      <br />
      <label>Choose an operation:</label>
      <br />
      <br />
      {/* {[...Array(operationsValue)].map((_, i) => ( */}
      <OperationBuilder
        value={operationsValue}
        // key={i}
        onChange={updateOperationsValue}
      />
      {/* ))} */}
      <button>Add Operation</button>
      {/* <OperationBuilder value={} onChange={}/> */}
      {/* todo: use <OperationBuilder> and have an interface
      for entering arguments and seeing the result */}
    </div>
  );
}
