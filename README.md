## Orm-squelize-nodejs

#Course: Back-end in NodeJs with Express and MySql \*\*Model for english course

-- Sequelize in MySql

- NPM / Yarn install
- npm start

Sequelize is an ORM (Object-Relational Mapping) tool for Node.js that allows you
to connect to a MySql database and map the data in the database to objects in
your application. It provides a set of functions for performing various
operations on the database, such as creating, reading, updating, and deleting
data.

You can find more information about using Sequelize in the official
documentation at https://sequelize.org/docs/v6/other-topics/migrations/.

#Project requirements

The client does not want important system records, such as People, to be
permanently deleted from the database.

To make the interface cleaner, the client would like only active users to be
displayed in the People list by default.

There have been some validation failures on the front-end side, resulting in
invalid email data in the database. It is desirable that this validation is not
the exclusive responsibility of the front-end.

It is important to be able to quickly consult all confirmed registrations for
student X.

The client would like to be able to consult open classes by date range, to avoid
receiving unnecessary information (such as old classes).

The client wants to be able to consult enrollments by class and know which ones
are full, to better organize enrollments.

The client would like that, once a student's registration is deactivated, all
enrollments related to this student automatically become "cancelled".
