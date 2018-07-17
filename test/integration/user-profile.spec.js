describe('UserProfile Model => integration tests', () => {

  describe('User profiles', () => {

    describe('using POST `/v1/user-profiles`', () => {
      it('can be created');
      it('can be modified by the owner');
      it('cannot be modified by other users');
      it('can be modified by system users');
    });


    it('can be deleted by using the endpoint POST `/v1/user-profiles` ');

    it('can be fetched if not deleted');

    it('cannot be fetched if deleted');

    it('cannot be purged by non-admins');

    it('can be purged by admins');

    it('can be deleted by the given user');

    it('cannot be deleted by other users');

    it('can be fetched by the owner');

    it('can be fetched by system users');

    it('cannot be fetched by other users');


    it('Admins & system users can fetch all profiles');

    it('users cannot get all profiles');

  });

});
