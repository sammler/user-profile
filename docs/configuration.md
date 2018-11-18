
_{%=name%}_ can be configured by the following environment variables:

**General:**

- `PORT` - The port to run the REST API (defaults to `3011`).
- `JWT_SECRET` - The secret used for JWT.

**MongoDB:**

- `MONGODB_DEBUG` - Whether to use the Mongoose debug mode or not, defaults to `false`.
- `MONGODB_HOST` - MongoDB host, defaults to `localhost`.
- `MONGODB_PORT` - MongoDB port, defaults to `27017`. 
- `MONGODB_DATABASE` - The MongoDB database, defaults to `sammlerio`.

**NATS-Streaming**

- `NATS_STREAMIING_SERVER`
- `NATS_STREAMING_CLUSTER`

**Other**

- RESOURCE_AUTH

---

**Behavior:**

- `ENABLE_AUDIT_LOG` - Whether to enable the audit log or not, can be `true` or `false`, defaults to `true`.


## Roles

- system
- admin
- tenant_admin
- user
- guest

## Permissions

- user-profile:createOwn
- user-profile:deleteOwn
- user-profile:getOwn
- user-profile:getTenant
- user-profile:get

- user
