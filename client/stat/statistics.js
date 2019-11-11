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
};