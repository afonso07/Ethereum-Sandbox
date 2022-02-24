import React, { useEffect, useState } from "react";
import styles from "../styles/TodoList.module.css";
import detectEthereumProvider from "@metamask/detect-provider";
import { RequestArguments } from "./type_config/metamask.types";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";
import TodoListContract from "../contracts/TodoList.json";

// ? Ethereum Provider API: https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents

const TodoList = (): JSX.Element => {
  const [bcInfo, setBcInfo] = useState<{
    account?: string;
    taskCount?: number;
    todoList?: Contract;
  } | null>(null);

  useEffect(() => {
    const custom_onLoad = async (): Promise<void> => {
      // A tiny utility for detecting the MetaMask Ethereum provider, or any provider injected at window.ethereum.
      // https://www.npmjs.com/package/@metamask/detect-provider
      const provider: any = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        const accounts: Array<string> = await web3.eth.getAccounts();

        const todoList = new web3.eth.Contract(
          TodoListContract.abi as AbiItem[],
          TodoListContract.networks[5777].address
        );

        const taskCount = await todoList.methods.taskCount().call();
      }
    };
    custom_onLoad();
  }, []);

  return (
    <div className={styles.container}>
      Current accout: &nbsp; <span style={{ color: "darkred" }}>{account}</span>
    </div>
  );
};

export default TodoList;
