import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';
// import { startRemoveExpense } from '../../actions/expenses';


let history, startEditExpense, startRemoveExpense, wrapper;

beforeEach(() => {
    history = { push: jest.fn() };
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    wrapper = shallow(<EditExpensePage 
                        expense={expenses[1]} 
                        startEditExpense={startEditExpense} 
                        history={history}
                        startRemoveExpense={startRemoveExpense}
                      />);
});


test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
});


test('should handle EditExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});

test('should handle RemoveExpense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[1].id });
});