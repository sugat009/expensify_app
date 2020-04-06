import { login, logout } from '../../actions/auth';
 
test('should use login action correctly', () => {
    const uid = "abc12345";
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});


test('should make logout action correctly', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});