import selectExpenseTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if expenses doesnt exist', () => {
    const result = selectExpenseTotal([]);
    expect(result).toBe(0);
});

test('should return the expense of a single item', () => {
    const result = selectExpenseTotal([expenses[1]]);
    expect(result).toBe(109500);
});

test('should add up all the amounts', () => {
    const result = selectExpenseTotal(expenses);
    expect(result).toBe(114195);
});