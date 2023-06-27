# Model

Init Sequelize
```
npx sequelize-cli init
```


# Model Generation
sequelize /sequelize-auto
https://github.com/sequelize/sequelize-auto

Using the define approach instead of init-models.

```
npx sequelize-auto --host localhost --port 5432 --database supra_inv --user supra_inv_mgr --pass --output db/models --dialect postgres --caseModel c --noInitModels --useDefine
```

# Seeders / Data Generation
I'll use [Faker](https://github.com/faker-js/faker) and [unique-names-generator](https://github.com/andreasonny83/unique-names-generator) with Sequelize seeders to generate some data.

Install js-faker and unique-names-generator:
```
npm install --save-dev @faker-js/faker unique-names-generator
```

Create seeders:
```
npx sequelize-cli seed:generate --name 00-add-users-and-items
```

Edit seeders to use Faker.
Tricky parts:
- usernames must be unique.  Didn't solve this one.  Just rerun the data generation on collisions.
- 1-n relationship between users and items.  A user can have multiple items.
- passwords must be encrypted. 

Generate data
```
npx sequelize-cli db:seed:all --debug
```

To clear data
```
npx sequelize-cli db:seed:undo:all --debug
```

