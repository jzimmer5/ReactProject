<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

const GraphStat = function(props){
    if (props.moneyStacks.length === 0) {
        return (
            <div class="wrapperForAd">
            <div class="leftAd">This is an ad</div>
        <div className="domoList">
            <h3 className="emptyDomo">No Accounts yet</h3>
        </div>
        <div class="leftAd">This is an ad</div>
        </div>
        );
    };

    const overallStats = function (props) {
        var monthTotal1 = 0;
    var monthTotal2 = 0;
    var monthTotal3 = 0;
    var monthTotal4 = 0;
    for (var acc = 0; acc < props.moneyStacks.length; acc++) {
        monthTotal1 += props.moneyStacks[acc].amount;
    }
    for (var acc = 0; acc < props.moneyStacks.length; acc++) {
        monthTotal2 += props.moneyStacks[acc].amount * props.moneyStacks[acc].interest;
    }
    for (var acc = 0; acc < props.moneyStacks.length; acc++) {
        monthTotal3 += (props.moneyStacks[acc].amount * props.moneyStacks[acc].interest) * props.moneyStacks[acc].interest;
    }
    for (var acc = 0; acc < props.moneyStacks.length; acc++) {
        monthTotal4 += ((props.moneyStacks[acc].amount * props.moneyStacks[acc].interest) * props.moneyStacks[acc].interest) * props.moneyStacks[acc].interest;
    }
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
            {overallStats(props= props)}
        </div>
        <div className="ad">This is an ad</div>
        </div>
    );
};

const loadMoneyAccountsFromServer = () => {
    sendAjax('GET', '/getMoney', null, (data) => {
        ReactDOM.render(
            <GraphStat moneyStacks={data.moneyStacks} />, document.querySelector("#content")
        );
    });
};

const setup = function (csrf) {
    ReactDOM.render(
        <GraphStat moneyStacks={[]} />, document.querySelector("#content")
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