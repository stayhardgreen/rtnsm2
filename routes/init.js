const indexRoutes = require('./index');
const signOutRoutes = require('./sign-out');
const loginRoutes = require('./log-in');
const adminRoutes = require('./admin');
const registerRoutes = require('./register');

const constructorMethod = (app) => {
    app.use('/', indexRoutes);
    app.use('/sign-out', signOutRoutes);
    app.use('/register', registerRoutes);
    app.use('/log-in', loginRoutes);
    app.use('/admin', adminRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;