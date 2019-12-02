"use strict";

React.createElement("script", { src: "https://cdn.jsdelivr.net/npm/chart.js@2.8.0" });
var graphStat = function graphStat(props) {
    if (props.moneyStacks.length === 0) {
        return React.createElement(
            "div",
            { className: "domoList" },
            React.createElement(
                "h3",
                { className: "emptyDomo" },
                "No Stats yet"
            )
        );
    };

    var monthTotal1 = 0;
    var monthTotal2 = 0;
    var monthTotal3 = 0;
    var monthTotal4 = 0;
    for (var acc = 0; acc > props.moneyStacks.length; acc++) {
        monthTotal1 += acc.amount;
    }
    for (var acc = 0; acc > props.moneyStacks.length; acc++) {
        monthTotal2 += acc.amount * acc.interest;
    }
    for (var acc = 0; acc > props.moneyStacks.length; acc++) {
        monthTotal3 += acc.amount * acc.interest * acc.interest;
    }
    for (var acc = 0; acc > props.moneyStacks.length; acc++) {
        monthTotal4 += acc.amount * acc.interest * acc.interest * acc.interest;
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [monthTotal1, monthTotal2, monthTotal3, monthTotal4]
            }]
        },

        // Configuration options go here
        options: {}
    });
    var overallStats = function overallStats() {
        return React.createElement(
            "div",
            { className: "domo" },
            React.createElement(
                "h3",
                { className: "title" },
                "Combined Amount for all Accounts With Interest"
            ),
            React.createElement("canvas", { id: "myChart" }),
            React.createElement(
                "table",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "Month 1"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Month 2"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Month 3"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Month 4"
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        monthTotal1
                    ),
                    React.createElement(
                        "th",
                        null,
                        monthTotal2
                    ),
                    React.createElement(
                        "th",
                        null,
                        monthTotal3
                    ),
                    React.createElement(
                        "th",
                        null,
                        monthTotal4
                    )
                )
            )
        );
    };

    return React.createElement(
        "div",
        { className: "wrapperForAd" },
        React.createElement(
            "div",
            { className: "ad" },
            "This is an ad"
        ),
        React.createElement(
            "div",
            { className: "domoList" },
            overallStats
        ),
        React.createElement(
            "div",
            { className: "ad" },
            "This is an ad"
        )
    );
};

var loadMoneyAccountsFromServer = function loadMoneyAccountsFromServer() {
    sendAjax('GET', '/getMoney', null, function (data) {
        ReactDOM.render(React.createElement("graphStat", { moneyStacks: data.moneyStacks }), document.querySelector("#content"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement("graphStat", { moneyStacks: [] }), document.querySelector("#content"));

    loadMoneyAccountsFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#domoMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
