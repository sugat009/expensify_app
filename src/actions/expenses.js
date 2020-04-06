import uuid from "uuid";
import { database } from "../firebase/firebase";
import expenses from "../tests/fixtures/expenses";

// ADD_EXPENSE
export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    return database
      .ref(`users/${uid}/expenses`)
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// SET_REMOVE_EXPENSE
export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    return database
      .ref(`users/${getState().auth.uid}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

// START edit expense
export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    return database
      .ref(`users/${getState().auth.uid}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

// SET_EXPENSE
export const setExpense = expenses => ({
  type: "SET_EXPENSE",
  expenses
});

// SET_START_EXPENSE
export const startSetExpense = () => {
  return (dispatch, getState) => {
    return database
      .ref(`users/${getState().auth.uid}/expenses`)
      .once("value")
      .then(snapshot => {
        const expenseData = [];
        snapshot.forEach(childSnapshot => {
          expenseData.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setExpense(expenseData));
      });
  };
};
