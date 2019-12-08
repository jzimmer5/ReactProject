const handleChange = (e) => {
    e.preventDefault();

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#moneyChangeForm").attr("action"), $("#moneyChangeForm").serialize(), redirect);

    return false;
};

const PassChange = function(props){
    return (
        <form id="moneyChangeForm" className ="mainForm" name="moneyChangeForm" onSubmit={handleChange} action="/updateMoney" method="POST">
            <h3>Enter a account name and change the total amount</h3>
            <label htmlFor="name">Account Name: </label>
            <input id="user" type="text" name="name" placeholder= "" />
            <label htmlFor="amount">New Amount: </label>
            <input id="user" type="text" name="name" placeholder= "0" />
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="account change" />
        </form>
    )
};

const createSettingsWindow = (csrf) => {
    ReactDOM.render(
        <PassChange csrf={csrf} />,
        document.querySelector("#content")
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken)
    });
};

$(document).ready(function () {
    getToken();
});