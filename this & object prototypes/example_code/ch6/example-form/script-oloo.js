var LoginController = {
    errors: [],

    getUser: function() {
        return document.getElementById("login_username").value;
    },

    getPassword: function() {
        return document.getElementById("login_password").value;
    },

    showDialog: function(title, msg) {
        // display success message to user in dialog
    },

    failure: function(err) {
        this.errors.push(err);
        this.showDialog("Error", "Login invalid:");
    },

    validateEntry: function(user, pw) {
        user = user || this.getUser();
        pw = pw || this.getPassword();
        if (!(user && pw)) {
            return this.failure("Please enter a username & password!");
        } 
        else if (pw.length < 5) {
            return this.failure("Password must be 5+ characters!");
        }
        return true
    }
}

var AuthController = Object.create(LoginController);

AuthController.errors = [];
AuthController.accepted = function () {
    this.showDialog("Success", "Authenticated!");
}
AuthController.rejected = function (err) {
    this.failure("Auth Failed: " + err);
}
AuthController.checkAuth = function() {
    var user = this.getUser();
    var pw = this.getPassword();

    if (this.validateEntry(user, pw)) {
        this.server("/check-auth", {
            user: user,
            pw: pw
        })
        .then(this.accepted.bind(this))
        .fail(this.rejected.bind(this))
    }
}

AuthController.checkAuth();