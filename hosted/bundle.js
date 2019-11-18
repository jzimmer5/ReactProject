"use strict";

var handleMoney = function handleMoney(e) {
    e.preventDefault();

    $("#errorMessage").animate({ width: 'hide' }, 350);
    if ($("#moneyName").val() == '' || $("#amount").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#moneyForm").attr("action"), $("#moneyForm").serialize(), function () {
        loadMoneyAccountsFromServer();
    });
    return false;
};

var MoneyForm = function MoneyForm(props) {
    return React.createElement(
        "form",
        { id: "moneyForm", onSubmit: handleMoney, name: "moneyForm", action: "/maker", method: "POST", className: "domoForm" },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "moneyName", type: "text", name: "name", placeholder: "Bank Name" }),
        React.createElement(
            "label",
            { htmlFor: "amount" },
            "Amount: "
        ),
        React.createElement("input", { id: "amount", type: "text", name: "amount", placeholder: "0" }),
        React.createElement(
            "label",
            { htmlFor: "interest" },
            "Interest: "
        ),
        React.createElement("input", { id: "interest", type: "text", name: "interest", placeholder: "0" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Money Account" })
    );
};

var MoneyList = function MoneyList(props) {
    if (props.moneyStacks.length === 0) {
        return React.createElement(
            "div",
            { className: "domoList" },
            React.createElement(
                "h3",
                { className: "emptyDomo" },
                "No Accounts yet"
            )
        );
    }

    var moneyNodes = props.moneyStacks.map(function (moneyAccount) {
        return React.createElement(
            "div",
            { key: moneyAccount._id, className: "domo" },
            React.createElement(
                "h3",
                { className: "domoName" },
                "Name: ",
                moneyAccount.name
            ),
            React.createElement(
                "h3",
                { className: "domoAge" },
                "Amount: ",
                moneyAccount.amount
            )
        );
    });
    return React.createElement(
        "div",
        { className: "domoList" },
        moneyNodes
    );
};

var loadMoneyAccountsFromServer = function loadMoneyAccountsFromServer() {
    sendAjax('GET', '/getMoney', null, function (data) {
        ReactDOM.render(React.createElement(MoneyList, { moneyStacks: data.moneyStacks }), document.querySelector("#moneyAccounts"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(MoneyForm, { csrf: csrf }), document.querySelector("#makeMoney"));

    ReactDOM.render(React.createElement(MoneyForm, { moneyStacks: [] }), document.querySelector("#moneyAccounts"));

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
