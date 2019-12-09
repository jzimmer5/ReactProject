const handleChange = (e) => {
    e.preventDefault();

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#moneyChangeForm").attr("action"), $("#moneyChangeForm").serialize(), redirect);

    return false;
};

const AccountChange = function(props){
    return (
        <form id="moneyChangeForm" className ="mainForm" name="moneyChangeForm" onSubmit={handleChange} action="/updateMoney" method="POST">
            <h3>Enter a account name and change the total amount</h3>
            <label htmlFor="name">Account Name: </label>
            <input id="user" type="text" name="name" placeholder= "" />
            <label htmlFor="amount">New Amount: </label>
            <input id="user" type="text" name="name" placeholder= "0" />
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="Change" />
        </form>
    )
};

const createSettingsWindow = (csrf) => {
    ReactDOM.render(
        <AccountChange props={csrf} />,
        document.querySelector("#content")
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        createSettingsWindow(result.csrfToken)
    });
};

$(document).ready(function () {
    getToken();
});