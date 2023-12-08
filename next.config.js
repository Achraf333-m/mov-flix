const withTM = require("next-transpile-modules")(["@invertase/firestore-stripe-payments"]); // pass the modules you would like to see transpiled

module.exports = withTM({});