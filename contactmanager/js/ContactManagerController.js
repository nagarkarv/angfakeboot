// Contact Manager Main Controller
function ContactManagerController($scope) {
    $scope.testValue = "Test Successfull";
    $scope.uid = 0;
    $scope.addFormVisible = false;
    $scope.viewContactsVisible = false;
    
    // newContact - a single object
    $scope.newContact = {};
    
    // contacts array - Holding contact objects
    $scope.contacts = [];

    // Self Invoking function
    (function () {
        // user faker.js to generate a few fake names
        for (i = 0; i < 5; i++) {
            $scope.newContact.id = $scope.uid;
            $scope.newContact.firstName = faker.name.firstName();
            $scope.newContact.lastName = faker.name.lastName();
            $scope.newContact.emailAddress = faker.internet.email();
            $scope.newContact.telephoneNo = 1234;

            $scope.contacts.push($scope.newContact);
            $scope.newContact = {}
            $scope.uid++;
        }
    })();

    $scope.saveContact = function () {
        // If new contact
        if ($scope.newContact.id == null) {
            $scope.newContact.id = $scope.uid++;
            $scope.contacts.push($scope.newContact);
            $scope.newContact = {}
            $scope.testValue = 'Contact has been saved';
        }
        else { // This is an update
            for (i in $scope.contacts) {
                if ($scope.newContact.id == $scope.contacts[i].id) {
                    $scope.contacts[i] = $scope.newContact;
                    $scope.newContact = {}
                    $scope.testValue = 'Contact updated';
                    break;
                }
            }
        }
    };

    $scope.editContact = function (id) {
        for (i in $scope.contacts) {
            if ($scope.contacts[i].id == id) {
                $scope.newContact = angular.copy($scope.contacts[i]);
                $scope.testValue = 'Please save contact after editing';
                $scope.addFormVisible = true;
                $scope.viewContactsVisible = false;
                break;
            }
        }
    };

    $scope.deleteContact = function (id) {
        if (confirm("Please confirm deletion") == true) {
            for (i in $scope.contacts) {
                if ($scope.contacts[i].id == id) {
                    $scope.contacts.splice(i, 1);
                    $scope.testValue = 'Contact deleted';
                }
            }
        }
    };

    $scope.showAddForm = function () {
        $scope.addFormVisible = true;
        $scope.viewContactsVisible = false;
    };

    $scope.showViewContacts = function () {
        $scope.addFormVisible = false;
        $scope.viewContactsVisible = true;
    }
}

var app = angular.module("ContactManagerApp", []);
app.controller("ContactManagerController", ContactManagerController);