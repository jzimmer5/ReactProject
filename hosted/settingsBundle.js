"use strict";

var handleChange = function handleChange(e) {
    e.preventDefault();

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#passChangeForm").attr("action"), $("#passChangeForm").serialize(), redirect);

    return false;
};

var PassChange = function PassChange(props) {
    return React.createElement(
        "form",
        { id: "passChangeForm", className: "mainForm", name: "passChangeForm", onSubmit: handleChange, action: "/updatePass", method: "POST" },
        React.createElement(
            "h3",
            null,
            props.username
        ),
        React.createElement(
            "label",
            { htmlFor: "pass" },
            "Password: "
        ),
        React.createElement("input", { id: "user", type: "text", name: "pass", placeholder: props.password }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "change" })
    );
};

var createSettingsWindow = function createSettingsWindow(csrf) {
    sendAjax('GET', '/getAccount', null, function (data) {
        ReactDOM.render(React.createElement(PassChange, { props: data.moneyStacks }), document.querySelector("#content"));
    });
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
