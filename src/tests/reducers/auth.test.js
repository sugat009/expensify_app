import authReducer from '../../reducers/auth';

test('should test login', () => {
    const action = {
        type: 'LOGIN',
        uid: 'abc12345'
    };
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
});

test('should test logout', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({ uid: 'abc12345' }, action);
    expect(state.uid).toBeFalsy();
});