const StatsList = function (props) {
    if (props.moneyStacks.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Stats yet</h3>
            </div>
        );
    };
    
    const accountStats = props.moneyStacks.map(function (moneyAccount) {
        return (
            <div className="stats">
                <h3 class="title">{moneyAccount.name} With Different Interests</h3>
                <table>
                    <tr>
                        <th>{moneyAccount.interest}</th>
                        <th>{moneyAccount.interest * 2}</th>
                        <th>{moneyAccount.interest * 4}</th>
                        <th>{moneyAccount.interest * 6}</th>
                    </tr>
                    <tr>
                        <th>{moneyAccount.amount}</th>
                        <th>{moneyAccount.amount * (moneyAccount.interest * 2)}</th>
                        <th>{moneyAccount.amount * (moneyAccount.interest * 4)}</th>
                        <th>{moneyAccount.amount * (moneyAccount.interest * 6)}</th>
                    </tr>
                </table>
            </div>
        );
    });
    return (
        <div className="wrapperForAd">
            <div className="ad">This is an ad</div>
        <div className="domoList">
            {accountStats}
        </div>
        <div className="ad">This is an ad</div>
        </div>
    );
};

const OverallDiv = function (props) {
    const overallStats = function () {
        return (
            <div className="domo">
                <h3 className="title">Combined Amount for all Accounts With Interest</h3>
                <table>
                    <tr>
                        <th>Month 1</th>
                        <th>Month 2</th>
                        <th>Month 3</th>
                        <th>Month 4</th>
                    </tr>
                    <tr>
                        <th>{monthTotal1}</th>
                        <th>{monthTotal2}</th>
                        <th>{monthTotal3}</th>
                        <th>{monthTotal4}</th>
                    </tr>
                </table>
            </div>
        );
    };
    return (
        <div className="wrapperForAd">
            <div className="ad">This is an ad</div>
            <div className="domoList">
                {overallStats}
            </div>
            <div className="ad">This is an ad</div>
        </div>
    );
}

const loadMoneyAccountsFromServer = () => {
    sendAjax('GET', '/getMoney', null, (data) => {
        ReactDOM.render(
            <StatsList moneyStacks={data.moneyStacks} />, document.querySelector("#content")
        );
    });
};

const setup = function (csrf) {
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

$(document).ready(function () {
    getToken();
});