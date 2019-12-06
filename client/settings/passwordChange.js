const PassChange = function(props){
    return (
        <form className = "mainForm">
            <h3>{props.moneyStacks.username}</h3>
            <label htmlFor="pass">Password: </label>
            <input id="user" type="text" name="pass" placeholder= {props.moneyStacks.password} />
            <input className="formSubmit" type="submit" value="pass change" />
        </form>
    )
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken)
    });
};

$(document).ready(function () {
    getToken();
});