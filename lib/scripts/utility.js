app.filter('gravatar', function () {
    return function (input) {
        if (_.isNil(input)) {
            return '';
        }
        return md5(input.trim());
    };
});

app.directive('focusOnShow', function ($timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attr) {
            if ($attr.ngShow || $attr.ngHide) {
                $scope.$watch($attr.ngShow || $attr.ngHide, function (newValue) {
                    if (newValue) {
                        $timeout(function () {

                            var inputElement = $element.is('input')
                                ? $element
                                : $element.find('input');

                            inputElement.focus();
                        }, 0);
                    }
                })
            }
        }
    };
})
