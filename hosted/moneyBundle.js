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

    var accountStats = props.moneyStacks.map(function (moneyAccount) {
        var calculatedInterest = function calculatedInterest(amount, interest) {
            return amount + amount * interest;
        };
        var interest2 = moneyAccount.interest * 2;
        var interest3 = moneyAccount.interest * 4;
        var interest4 = moneyAccount.interest * 6;
        return React.createElement(
            "div",
            { className: "stats" },
            React.createElement(
                "h3",
                { "class": "title" },
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
                        "Interest Amount"
                    ),
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
                        moneyAccount.interest
                    ),
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.amount + moneyAccount.amount * moneyAccount.interest
                    ),
                    React.createElement(
                        "th",
                        null,
                        calculatedInterest(moneyAccount.amount, moneyAccount.interest * 2)
                    ),
                    React.createElement(
                        "th",
                        null,
                        calculatedInterest(moneyAccount.amount, moneyAccount.interest * 4)
                    ),
                    React.createElement(
                        "th",
                        null,
                        calculatedInterest(moneyAccount.amount, moneyAccount.interest * 6)
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.interest * 2
                    ),
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.amount + moneyAccount.amount * moneyAccount.interest * 2
                    ),
                    React.createElement(
                        "th",
                        null,
                        calculatedInterest(moneyAccount.amount, interest2 * 2)
                    ),
                    React.createElement(
                        "th",
                        null,
                        calculatedInterest(moneyAccount.amount, interest2 * 4)
                    ),
                    React.createElement(
                        "th",
                        null,
                        calculatedInterest(moneyAccount.amount, interest2 * 6)
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.interest * 4
                    ),
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.amount + moneyAccount.amount * moneyAccount.interest * 4
                    ),
                    React.createElement(
                        "th",
                        null,
                        calculatedInterest(moneyAccount.amount, interest3 * 2)
                    ),
                    React.createElement(
                        "th",
                        null,
                        calculatedInterest(moneyAccount.amount, interest3 * 4)
                    ),
                    React.createElement(
                        "th",
                        null,
                        calculatedInterest(moneyAccount.amount, interest3 * 6)
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.interest * 6
                    ),
                    React.createElement(
                        "th",
                        null,
                        moneyAccount.amount + moneyAccount.amount * moneyAccount.interest * 6
                    ),
                    React.createElement(
                        "th",
                        null,
                        calculatedInterest(moneyAccount.amount, interest4 * 2)
                    ),
                    React.createElement(
                        "th",
                        null,
                        calculatedInterest(moneyAccount.amount, interest4 * 4)
                    ),
                    React.createElement(
                        "th",
                        null,
                        calculatedInterest(moneyAccount.amount, interest4 * 6)
                    )
                )
            )
        );
    });
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
            accountStats
        ),
        React.createElement(
            "div",
            { className: "ad" },
            "This is an ad"
        )
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
        ReactDOM.render(React.createElement(StatsList, { moneyStacks: data.moneyStacks }), document.querySelector("#content"));
    });
};

var setup = function setup(csrf) {
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
