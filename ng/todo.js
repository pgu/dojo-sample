angular.module('todoApp', [])
  .controller('TodoListController', function ($window, $scope) {

    var todoList = this;
    todoList.todos = [
      { text: 'learn angular', done: true },
      { text: 'build an angular app', done: false }];

    todoList.addTodo = function () {
      todoList.todos.push({ text: todoList.todoText, done: false });
      todoList.todoText = '';
    };

    todoList.remaining = function () {
      var count = 0;
      angular.forEach(todoList.todos, function (todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function () {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };


    function listenToDojo() {
      $window.Bridge.onEventDojo(function () {
        todoList.todos.push({ text: 'Dojo event received', done: true });
        $scope.$applyAsync();

        $window.Bridge.sendEventNG('Yipeeee!');

      });

    }

    function onBridgeLoaded(event) {

      console.info(event);

      if (event.data === 'bridgeIsLoaded') {
        listenToDojo();
      }

    };

    if (!$window.Bridge) {
      $window.addEventListener("message", onBridgeLoaded, false);
    } else {
      listenToDojo();
    }


  });