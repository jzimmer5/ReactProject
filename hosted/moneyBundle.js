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

    var overallStats = props.moneyStacks.map(function (overallMoney) {
        return React.createElement("div", { className: "domo" });
    });
    return React.createElement(
        "div",
        { className: "domoList" },
        overallStats
    );
};

var loadMoneyAccountsFromServer = function loadMoneyAccountsFromServer() {
    sendAjax('GET', '/getMoney', null, function (data) {
        ReactDOM.render(React.createElement(MoneyList, { moneyStacks: data.moneyStacks }), document.querySelector("#content"));
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
