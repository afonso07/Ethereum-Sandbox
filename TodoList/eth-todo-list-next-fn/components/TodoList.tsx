import React, { useEffect, useState, useCallback } from "react";
import styles from "../styles/TodoList.module.css";
import detectEthereumProvider from "@metamask/detect-provider";
import { RequestArguments, Events } from "./type_config/metamask.types";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";
import { TransactionReceipt } from "web3-core";
import TodoListContract from "../contracts/TodoList.json";

// ? Ethereum Provider API: https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents

const TodoList = (): JSX.Element => {
  const [bcInfo, setBcInfo] = useState<{
    account?: string;
    taskCount?: number;
    todoList?: Contract;
    tasks?: Array<{ id: number; content: string; completed: boolean }>;
  } | null>(null);

  const [formInfo, setFormInfo] = useState<{
    submitText?: string;
    loading?: { itemID: number; loading: boolean };
  } | null>(null);

  const callTodo = async (todoList: Contract | undefined): Promise<void> => {
    const taskCount = await todoList?.methods.taskCount().call();
    let taskArray = Array<any>();
    for (let i = 1; i <= taskCount; i++) {
      let task = await todoList?.methods.tasks(i).call();
      taskArray.push(task);
    }

    setBcInfo((rest) => ({ ...rest, tasks: taskArray }));
  };

  const completeTask = async (taskID: number): Promise<void> => {
    setFormInfo({ loading: { itemID: taskID, loading: true } });
    bcInfo?.todoList?.methods
      .toggleCompleted(taskID)
      .send({ from: bcInfo.account })
      .once("receipt", (receipt: TransactionReceipt) => {
        const event: Events.TaskCompleted =
          receipt.events?.[Events.EventNames.TaskCompleted].returnValues;
        let tasksLocal = bcInfo.tasks as Array<{
          id: number;
          content: string;
          completed: boolean;
        }>;
        let idIndex = tasksLocal?.findIndex((item) => item.id == event.id);
        tasksLocal[idIndex] = {
          ...tasksLocal[idIndex],
          completed: event.completed,
        };
        setBcInfo((rest) => ({ ...rest, tasks: tasksLocal }));
        setFormInfo({ loading: { itemID: taskID, loading: false } });
      });
  };

  useEffect(() => {
    const custom_onLoad = async (): Promise<void> => {
      // A tiny utility for detecting the MetaMask Ethereum provider, or any provider injected at window.ethereum.
      // https://www.npmjs.com/package/@metamask/detect-provider
      const provider: any = await detectEthereumProvider();
      console.log(window);

      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
      }

      if (provider) {
        const web3 = new Web3(provider);

        // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
        try {
          await provider.enable();
        } catch (error) {
          console.error(error);
        }

        const accounts: Array<string> = await web3.eth.getAccounts();

        console.log(accounts);

        const todoList = new web3.eth.Contract(
          TodoListContract.abi as AbiItem[],
          TodoListContract.networks[5777].address
        );

        const taskCount = await todoList.methods.taskCount().call();

        setBcInfo({ account: accounts[0], todoList, taskCount });

        callTodo(todoList);
      }
    };
    custom_onLoad();
  }, []);

  const submitTask = () => {
    bcInfo?.todoList?.methods
      .createTask(formInfo?.submitText)
      .send({ from: bcInfo.account })
      .once("receipt", (reciept: TransactionReceipt) => {
        console.log(reciept);
        setFormInfo((rest) => ({ ...rest, submitText: "" }));
        callTodo(bcInfo.todoList);
      });
  };

  return (
    <div className={styles.container_box}>
      <div className={styles.container}>
        <div>
          Current accout:{" "}
          <span style={{ color: "darkred" }}>{bcInfo?.account}</span> <br />
        </div>

        <div className={styles.list_container}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitTask();
            }}
          >
            <input
              id="newTask"
              type="text"
              className="form-control"
              placeholder="Add task..."
              required
              value={formInfo?.submitText || ""}
              onChange={(e) =>
                setFormInfo((rest) => ({ ...rest, submitText: e.target.value }))
              }
            />
            <input type="submit" hidden={true} />
          </form>
          {bcInfo?.tasks?.map((value) =>
            !(
              formInfo?.loading?.itemID == value.id && formInfo.loading.loading
            ) ? (
              <div
                className={styles.list_item}
                key={value.id}
                style={{
                  textDecoration: value.completed
                    ? "line-through"
                    : "underline",
                }}
                onClick={() => completeTask(value.id)}
              >
                {value.content}
              </div>
            ) : (
              <div>loading...</div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
