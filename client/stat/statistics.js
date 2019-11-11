const StatsList = function(props) {
    if(props.moneyStacks.length === 0){
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Stats yet</h3>
            </div>
        );
    };

    const overallStats = props.moneyStacks.map(function(overallMoney){
        return (
            <div className="domo">

            </div>
        );
    });
    return (
        <div className="domoList">
            {overallStats}
        </div>
    );
};

const loadMoneyAccountsFromServer = () => {
    sendAjax('GET', '/getMoney', null, (data) => {
        ReactDOM.render(
            <MoneyList moneyStacks={data.moneyStacks} />, document.querySelector("#content")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <StatsList moneyStacks={[]} />, document.querySelector("#content")
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