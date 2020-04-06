import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
  addExpense, 
  editExpense, 
  removeExpense, 
  startAddExpense, 
  setExpense, 
  startRemoveExpense, 
  startEditExpense 
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import { database } from '../../firebase/firebase';

const uid = "somerandomuid";
const defaultAuthObject = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expenseData[id] = { id, description, note, amount, createdAt };
  });
  database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should remove expense from firebase', (done) => {
  const store = createMockStore(defaultAuthObject);
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should update the expense from firebase too', (done) => {
  const store = createMockStore(defaultAuthObject);
  const id = expenses[2].id;
  const updates = {
    note: "some fucking note",
    description: "some fucking description"
  };
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().note).toBe(updates.note);
    expect(snapshot.val().description).toBe(updates.description);
    done();
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthObject);
  const expenseData = {
    description: "a random description",
    note: "a random note",
    amount: 1000,
    createdAt: 9
  };
  store.dispatch(startAddExpense(expenseData))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
              id: expect.any(String),
              ...expenseData
            }
          });
          return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
        }).then((snapshot) => {
          expect(snapshot.val()).toEqual(expenseData);
          done();
        });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthObject);
  const expenseData = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0
  };
  store.dispatch(startAddExpense({}))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
              id: expect.any(String),
              ...expenseData
            }
          });
          return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
        }).then((snapshot) => {
          expect(snapshot.val()).toEqual(expenseData);
          done();
        });
});


test('should setup set expense object with data', () => {
  const action = setExpense(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSE',
    expenses
  });
});