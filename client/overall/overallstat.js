<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

const GraphStat = function(props){
    if (props.moneyStacks.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Stats yet</h3>
            </div>
        );
    };

    const overallStats = function () {
        var monthTotal1 = 0;
    var monthTotal2 = 0;
    var monthTotal3 = 0;
    var monthTotal4 = 0;
    for (var acc = 0; acc > props.moneyStacks.length; acc++) {
        monthTotal1 += acc.amount;
    }
    for (var acc = 0; acc > props.moneyStacks.length; acc++) {
        monthTotal2 += acc.amount * acc.interest;
    }
    for (var acc = 0; acc > props.moneyStacks.length; acc++) {
        monthTotal3 += (acc.amount * acc.interest) * acc.interest;
    }
    for (var acc = 0; acc > props.moneyStacks.length; acc++) {
        monthTotal4 += ((acc.amount * acc.interest) * acc.interest) * acc.interest;
    }
    var ctx = document.getElementById('myChart').getContext("2d");
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
        data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [monthTotal1, monthTotal2, monthTotal3, monthTotal4]
            }]
        },

        // Configuration options go here
        options: {}
    });
        debug();
        return (
            <div className="domo">
                <h3 className="title">Combined Amount for all Accounts With Interest</h3>
                <canvas id="myChart" width="400" height="400"></canvas>
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