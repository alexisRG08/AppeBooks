angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function(ItemsModel,$scope) {
    var vm = this;

    function goToBackand() {
        window.location = 'http://docs.backand.com';
    }

    function getAll() {
        ItemsModel.all()
            .then(function (result) {
                vm.data = result.data.data;
            });
    }

    function clearData(){
        vm.data = null;
    }

    function create(object) {
        ItemsModel.create(object)
            .then(function (result) {
                cancelCreate();
                getAll();
            });
    }

    function update(object) {
        ItemsModel.update(object.id, object)
            .then(function (result) {
                cancelEditing();
                getAll();
            });
    }

    function deleteObject(id) {
        ItemsModel.delete(id)
            .then(function (result) {
                cancelEditing();
                getAll();
            });
    }

    function initCreateForm() {
        vm.newObject = {name: '', description: ''};
    }

    function setEdited(object) {
        vm.edited = angular.copy(object);
        vm.isEditing = true;
    }

    function isCurrent(id) {
        return vm.edited !== null && vm.edited.id === id;
    }

    function cancelEditing() {
        vm.edited = null;
        vm.isEditing = false;
    }

    function cancelCreate() {
        initCreateForm();
        vm.isCreating = false;
    }

    vm.objects = [];
    vm.edited = null;
    vm.isEditing = false;
    vm.isCreating = false;
    vm.getAll = getAll;
    vm.create = create;
    vm.update = update;
    vm.delete = deleteObject;
    vm.setEdited = setEdited;
    vm.isCurrent = isCurrent;
    vm.cancelEditing = cancelEditing;
    vm.cancelCreate = cancelCreate;
    vm.goToBackand = goToBackand;
    vm.isAuthorized = false;

    $scope.$on('authorized', function () {
        vm.isAuthorized = true;
        getAll();
    });

    $scope.$on('logout', function () {
        clearData();
    });

    if(!vm.isAuthorized){
        $scope.$broadcast('logout');
    }

    initCreateForm();
    getAll();
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
    }
});
