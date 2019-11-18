"use strict";

var StatsList = function StatsList(props) {
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
    var overallStats = function overallStats() {
        return React.createElement(
            "div",
            { className: "domo" },
            React.createElement(
                "h3",
                { className: "title" },
                "Combined Amount for all Accounts With Interest"
            ),
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
    var accountStats = props.moneyStacks.map(function (moneyAccount) {
        return React.createElement(
            "div",
            { className: "stats" },
            React.createElement(
                "h3",
                { className: "title" },
                moneyAccount.name,
                " With Different Interests"
            ),
            React.createElement(
                "table",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.interest
                    ),
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.interest * 2
                    ),
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.interest * 4
                    ),
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.interest * 6
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.amount
                    ),
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.amount * (moneyAccount.interest * 2)
                    ),
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.amount * (moneyAccount.interest * 4)
                    ),
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.amount * (moneyAccount.interest * 6)
                    )
                )
            )
        );
    });
    return React.createElement(
        "div",
        { className: "domoList" },
        accountStats
    );
};

var OverallDiv = function OverallDiv(props) {
    var overallStats = function overallStats() {
        return React.createElement(
            "div",
            { className: "domo" },
            React.createElement(
                "h3",
                { className: "title" },
                "Combined Amount for all Accounts With Interest"
            ),
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
        { className: "domoList" },
        overallStats
    );
};

var loadMoneyAccountsFromServer = function loadMoneyAccountsFromServer() {
    sendAjax('GET', '/getMoney', null, function (data) {
        ReactDOM.render(React.createElement(OverallDiv, { moneyStacks: [data.moneyStacks] }), document.querySelector("#overall"));
        ReactDOM.render(React.createElement(StatsList, { moneyStacks: data.moneyStacks }), document.querySelector("#content"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(OverallDiv, { moneyStacks: [] }), document.querySelector("#overall"));
    ReactDOM.render(React.createElement(StatsList, { moneyStacks: [] }), document.querySelector("#content"));

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
