"use strict";

var handleChange = function handleChange(e) {
    e.preventDefault();

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#moneyChangeForm").attr("action"), $("#moneyChangeForm").serialize(), redirect);

    return false;
};

var AccountChange = function AccountChange(props) {
    return React.createElement(
        "form",
        { id: "moneyChangeForm", className: "mainForm", name: "moneyChangeForm", onSubmit: handleChange, action: "/updateMoney", method: "POST" },
        React.createElement(
            "h3",
            null,
            "Enter a account name and change the total amount"
        ),
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Account Name: "
        ),
        React.createElement("input", { id: "user", type: "text", name: "name", placeholder: "" }),
        React.createElement(
            "label",
            { htmlFor: "amount" },
            "New Amount: "
        ),
        React.createElement("input", { id: "user", type: "text", name: "name", placeholder: "0" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Change" })
    );
};

var createSettingsWindow = function createSettingsWindow(csrf) {
    ReactDOM.render(React.createElement(AccountChange, { props: csrf }), document.querySelector("#content"));
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        createSettingsWindow(result.csrfToken);
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
