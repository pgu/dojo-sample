angular.module('todoApp', [])
  .controller('TodoListController', function ($window, $scope) {

    var todoList = this;

    todoList.todos = [
      { text: 'learn angular', done: true },
      { text: 'build an angular app', done: false } ];

    $scope.$watch(function () {
        return todoList.todos;
      },
      function (newList) {
        $window.localStorage.setItem('frame-tasks', angular.toJson(newList));
      },
      true
    );

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

    todoList.refreshFromContainer = function () {
      var jsonTasks = $window.localStorage.getItem('container-tasks');

      todoList.todos = angular.fromJson(jsonTasks);
    };

    todoList.sendToContainer = function () {
      $window.parent.postMessage({ type: 'updateData', todos: todoList.todos }, '*');
    };

    function updateData (todos) {
      todoList.todos = todos;
      $scope.$applyAsync();
    };

    function onMessage (event) {
      if (event.data.type === 'updateData') {
        updateData(event.data.todos);

      } else {
        throw 'Unknown message ' + event.data;
      }

    };

    $window.addEventListener("message", onMessage, false);
  });