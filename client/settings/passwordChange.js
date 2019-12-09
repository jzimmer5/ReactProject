const handleChange = (e) => {
    e.preventDefault();

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#passChangeForm").attr("action"), $("#passChangeForm").serialize(), redirect);

    return false;
};

const PassChange = function(props){
    return (
        <form id="passChangeForm" className ="mainForm" name="passChangeForm" onSubmit={handleChange} action="/updatePass" method="POST">
            <h3>{props.username}</h3>
            <label htmlFor="pass">Password: </label>
            <input id="user" type="text" name="pass" placeholder= {props.password} />
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="change" />
        </form>
    )
};

const createSettingsWindow = (csrf) => {
    sendAjax('GET', '/getAccount', null, (data) => {
    ReactDOM.render(
        <PassChange props={data.moneyStacks} />,
        document.querySelector("#content")
    );
    });
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        createSettingsWindow(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});