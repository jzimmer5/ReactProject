const handleMoney = (e) => {
    e.preventDefault();

    $("#errorMessage").animate({width:'hide'},350);
    if($("#moneyName").val() == '' || $("#amount").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#moneyForm").attr("action"), $("#moneyForm").serialize(), function() {
        loadMoneyAccountsFromServer();
    });
    return false;
};

const MoneyForm = (props) => {
    return (
        <form id="moneyForm" onSubmit={handleMoney} name="moneyForm" action="/maker" method="POST" className="domoForm">
            <label htmlFor="name">Name: </label>
            <input id="moneyName" type="text" name="name" placeholder="Bank Name"/>
            <label htmlFor="amount">Amount: </label>
            <input id="amount" type="text" name="amount" placeholder="0"/>
            <label htmlFor="interest">Interest: </label>
            <input id="interest" type="text" name="interest" placeholder="0"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="makeDomoSubmit" type="submit" value="Make Money Account"/>
        </form>
    );
};

const MoneyList = function(props) {
    if(props.moneyStacks.length === 0) {
        return (
            <div class="wrapperForAd">
                <div class="leftAd">This is an ad</div>
            <div className="domoList">
                <h3 className="emptyDomo">No Accounts yet</h3>
            </div>
            <div class="leftAd">This is an ad</div>
            </div>
        );
    }

    const moneyNodes = props.moneyStacks.map(function(moneyAccount) {
        return (
            <div key={moneyAccount._id} className="domo">
                <h3 className="domoName">Name: {moneyAccount.name}</h3>
                <h3 className="domoAge">Amount: {moneyAccount.amount}</h3>
            </div>
        );
    });
    return (
        <div className="wrapperForAd">
                <div className="ad">This is an ad</div>
        <div className="domoList">
            {moneyNodes}
        </div>
        <div className="ad">This is an ad</div>
        </div>
    );
};

const loadMoneyAccountsFromServer = () => {
    sendAjax('GET', '/getMoney', null, (data) => {
        ReactDOM.render(
            <MoneyList moneyStacks={data.moneyStacks} />, document.querySelector("#moneyAccounts")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <MoneyForm csrf={csrf}/>, document.querySelector("#makeMoney")
    );

    ReactDOM.render(
        <MoneyForm moneyStacks={[]} />, document.querySelector("#moneyAccounts")
    );

    loadMoneyAccountsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken)
    });
};

$(document).ready(function() {
    getToken();
});