angular.module('todoApp', [])
  .controller('TodoListController', function ($window, $scope) {

    var todoList = this;

    todoList.todos = [];

    $scope.$watch(function () {
        return todoList.todos;
      },
      function (newList) {
        $window.localStorage.setItem('js-items', angular.toJson(newList));
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

    todoList.getFromLocalStore = function () {
      var jsonTasks = $window.localStorage.getItem('js-items');

      todoList.todos = angular.fromJson(jsonTasks);
    };

    todoList.storeInLocalStore = function () {
      $window.localStorage.setItem('js-items', angular.toJson(todoList.todos));
    };

    todoList.sendToContainer = function () {
      $window.parent.postMessage({ type: 'sendDataToContainer', items: todoList.todos }, '*');
    };

    function updateData (todos) {
      todoList.todos = todos;
      $scope.$applyAsync();
    };

    function onMessage (event) {
      if (event.data.type === 'sendDataToFrame') {
        updateData(event.data.items);
      }

    };

    $window.addEventListener('message', onMessage, false);
  });