import { fetchUsers } from '../../api/jsonplaceholder';

describe('jsonplaceholder', () => {
  it('should return users', async () => {
    const users = await fetchUsers();
    console.log(users);
    expect(users).toBeDefined();
  });
});
