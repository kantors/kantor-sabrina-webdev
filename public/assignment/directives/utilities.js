(function () {
    angular
        .module("utilities", [])
        .directive("sortableWidgets", sortableWidgets);

    function sortableWidgets() {

        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            $(element).sortable({
                  start: function(event, ui) {
                     start = $(ui.item).index();
                  },
                  stop: function(event, ui) {
                     end = $(ui.item).index();
                      scope.sortableController.sort(start, end);
                  }
              }
            );
        }
        return {
            scope: {

            },
            restrict: 'C',
            link:linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }
    }

    function sortableController (WidgetService, $routeParams) {
        var vm = this;
        vm.sort = sort;
      var pageId = $routeParams.pid;

        function sort(pageId, start, end) {
            console.log([start, end]);
            WidgetService.sort(start, end);
        }

    }
})();